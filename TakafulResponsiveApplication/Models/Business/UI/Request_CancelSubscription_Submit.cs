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
    public class Request_CancelSubscription_Submit
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_CancelSubscription_Submit.MainObject GetInitialData()
        {

            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var defaultDataObj = new DataObjects.Internal.Request_CancelSubscription_Submit.MainObject();
            var bus = new Common.Common.Business();

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
                    defaultDataObj.CurrentSubscriptionAmount = employee.SubscriptionData.Amount;
                    defaultDataObj.TotalSubscriptionAmount = employee.SubscriptionData.TotalSubscription;
                }

                if (employee.LoanData != null)
                {
                    defaultDataObj.LoanAmount = employee.LoanData.LoanAmount;
                    defaultDataObj.PaidLoanAmount = employee.LoanData.PaidAmount;
                    defaultDataObj.RemainingLoanAmount = employee.LoanData.RemainingAmount;
                }
                else
                {
                    defaultDataObj.LoanAmount = 0;
                    defaultDataObj.PaidLoanAmount = 0;
                    defaultDataObj.RemainingLoanAmount = 0;
                }

            }


            return defaultDataObj;
        }

        public string CancelSubscription(string notes)
        {
            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var bus = new Common.Common.Business();

            //Check if eligible to edit subscription
            string result = bus.IsEligibleToCancelSubscription(empID);

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
                    case "LoanExists":
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
            var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == empID && f.FSu_Status == 1);
            var suTSerial = from SubscriptionTransactions in tpDB.SubscriptionTransactions
                            where
                              SubscriptionTransactions.SuT_SubscriptionType == 3
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
            suT.SuT_SubscriptionType = 3;
            suT.SuT_Date = DateTime.UtcNow;
            suT.SuT_Amount = null;
            suT.SuT_Notes = notes;
            suT.SuT_ApprovalStatus = 1;
            suT.SuI_ID = subInfo.SuI_ID;
            suT.FSu_ID = fs.FSu_ID;

            if (suTSerial.FirstOrDefault() == null || DateTime.UtcNow.Year > suTSerial.FirstOrDefault().SuT_Year)
            {
                suT.SuT_Serial = 0001;
            }
            else
            {
                suT.SuT_Serial = suTSerial.FirstOrDefault().SuT_Serial + 1;
            }

            tpDB.SubscriptionTransactions.Add(suT);

            //Cancel all the open requests from this user
            var openRequests = tpDB.SubscriptionTransactions.Where(s => s.Emp_ID == empID && (s.SuT_ApprovalStatus == 1 || s.SuT_ApprovalStatus == 4)).ToList();

            if (openRequests.Count > 0)
            {
                for (int i = 0; i < openRequests.Count; i++)
                {
                    openRequests[i].SuT_ApprovalStatus = 3;
                    openRequests[i].SuT_ApprovalDate = suT.SuT_Date;
                    openRequests[i].SuT_Notes = "Rejected By the system automatically.";
                    tpDB.Entry(openRequests[i]).State = EntityState.Modified;
                    //Check if one belongs to a new loan request
                    if (openRequests[i].SuT_SubscriptionType == 4)
                    {
                        int id = openRequests[i].LAm_ID.Value;
                        var loan = tpDB.LoanAmounts.FirstOrDefault(l => l.LAm_ID == id);
                        loan.LAm_Status = 3;
                        tpDB.Entry(loan).State = EntityState.Modified;
                    }
                }
            }

            //Save changes
            tpDB.SaveChanges();


            return "True";
        }


    }
}
