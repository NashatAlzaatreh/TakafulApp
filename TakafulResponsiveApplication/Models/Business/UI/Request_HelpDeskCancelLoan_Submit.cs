using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Request_HelpDeskCancelLoan_Submit
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_CancelLoan_Submit.MainObject GetInitialData(long empID)
        {

            //var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var defaultDataObj = new DataObjects.Internal.Request_CancelLoan_Submit.MainObject();
            var bus = new Common.Common.Business();
            var loan = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.LAm_Status == 1);    //Get the active loan for this employee (if exists)

            if (loan == null)
            {
                return null;
            }

            var employee = bus.GetEmployee(empID);

            if (employee != null)
            {
                defaultDataObj.EmployeeNumber = employee.EmpID;
                defaultDataObj.Name = employee.FullName;
                defaultDataObj.Department = employee.Department;
                defaultDataObj.Position = employee.Position;
                defaultDataObj.Date = DateTime.UtcNow;

                if (employee.SubscriptionData != null)
                {
                    defaultDataObj.TotalSubscriptionAmount = employee.SubscriptionData.TotalSubscription;
                }

                defaultDataObj.LoanAmount = employee.LoanData.LoanAmount;
                defaultDataObj.PaidLoanAmount = employee.LoanData.PaidAmount;
                defaultDataObj.RemainingLoanAmount = employee.LoanData.RemainingAmount;

            }


            return defaultDataObj;
        }

        public string CancelSubscription(long empID, string notes)
        {
            var helpDeskID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var bus = new Common.Common.Business();
            var loan = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.LAm_Status == 1);    //Get the active loan for this employee

            //Check if eligible to edit subscription
            string result = bus.IsEligibleToCancelLoan(empID);

            if (result != "True")
            {
                switch (result)
                {
                    case "EmployeeNotFound":
                        return result;
                        break;
                    case "NoValidSubscription":
                        return result;
                        break;
                    case "AlreadySubmittedRequest":
                        return result;
                        break;
                    default:
                        return result;
                        break;
                }
            }


            //Submit the request
            var subInfo = tpDB.SubscriptionInformations.First(j => j.SuI_IsActive == true);
            //var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == empID && f.FSu_Status == 1);

            var suTSerial = from SubscriptionTransactions in tpDB.SubscriptionTransactions
                            where
                              SubscriptionTransactions.SuT_SubscriptionType == 6
                            orderby
                              SubscriptionTransactions.SuT_Year descending,
                              SubscriptionTransactions.SuT_Serial descending
                            select new
                            {
                                Emp_ID = SubscriptionTransactions.Emp_ID,
                                SuT_Year = SubscriptionTransactions.SuT_Year,
                                SuT_Serial = SubscriptionTransactions.SuT_Serial,
                                SuT_SubscriptionType = SubscriptionTransactions.SuT_SubscriptionType,
                                SuT_Date = SubscriptionTransactions.SuT_Date,
                                SuT_Amount = SubscriptionTransactions.SuT_Amount,
                                SuT_Notes = SubscriptionTransactions.SuT_Notes,
                                SuT_ApprovalStatus = SubscriptionTransactions.SuT_ApprovalStatus,
                                SuT_ApprovalDate = SubscriptionTransactions.SuT_ApprovalDate,
                                SuI_ID = SubscriptionTransactions.SuI_ID
                            };

            SubscriptionTransaction suT = new SubscriptionTransaction();

            suT.Emp_ID = empID;
            suT.SuT_Year = DateTime.UtcNow.Year;
            suT.SuT_SubscriptionType = 6;
            suT.SuT_Date = DateTime.UtcNow;
            suT.SuT_Amount = null;
            suT.SuT_Notes = notes;
            suT.SuT_ApprovalStatus = 1;
            suT.SuI_ID = subInfo.SuI_ID;
            suT.LAm_ID = loan.LAm_ID;
            suT.SuT_ServiceEmployeeID = helpDeskID;

            if (suTSerial.FirstOrDefault() == null || DateTime.UtcNow.Year > suTSerial.FirstOrDefault().SuT_Year)
            {
                suT.SuT_Serial = 0001;
            }
            else
            {
                suT.SuT_Serial = suTSerial.FirstOrDefault().SuT_Serial + 1;
            }

            tpDB.SubscriptionTransactions.Add(suT);


            //Save changes
            tpDB.SaveChanges();


            return "True";
        }


    }
}
