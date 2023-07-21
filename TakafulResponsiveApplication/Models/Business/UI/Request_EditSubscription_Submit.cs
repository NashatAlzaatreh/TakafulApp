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
    public class Request_EditSubscription_Submit
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_EditSubscription_Submit.MainObject GetInitialData()
        {

            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var defaultDataObj = new DataObjects.Internal.Request_EditSubscription_Submit.MainObject();
            var bus = new Common.Common.Business();

            var employee = bus.GetEmployee(empID);

            if (employee != null)
            {
                defaultDataObj.EmployeeNumber = employee.EmpID;
                defaultDataObj.Name = employee.FullName;
                defaultDataObj.Department = employee.Department;
                defaultDataObj.Position = employee.Position;
                defaultDataObj.Date = DateTime.UtcNow;
                defaultDataObj.SubscriptionBoundaries = bus.GetSubscriptionBoundaries(empID);
                if (employee.SubscriptionData != null)
                {
                    defaultDataObj.CurrentSubscriptionAmount = employee.SubscriptionData.Amount;
                }

                //Get max allowed deduction amount for subscription
                int maxAllowedDeduction = bus.GetMaxAllowedDeduction(empID);

                //Loan installment (if exists)
                if (employee.LoanData != null)
                {
                    maxAllowedDeduction = maxAllowedDeduction - employee.LoanData.LoanInstallment;
                }

                if (defaultDataObj.SubscriptionBoundaries.MaximumAmount > maxAllowedDeduction)
                {
                    defaultDataObj.SubscriptionBoundaries.MaximumAmount = maxAllowedDeduction;
                }

                if (defaultDataObj.SubscriptionBoundaries.MaximumAmount_Normal > maxAllowedDeduction)
                {
                    defaultDataObj.SubscriptionBoundaries.MaximumAmount_Normal = maxAllowedDeduction;
                }
            }


            return defaultDataObj;
        }

        public string EditSubscription(int amount, string notes)
        {
            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var bus = new Common.Common.Business();

            var loanData = bus.GetLoanData(empID);

            //Check if eligible to edit subscription
            string result = bus.IsEligibleToEditSubscription(empID);

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
                    case "SubscriptionCancellationSubmitted":
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

            //Check if subscription amount within range
            var bounds = bus.GetSubscriptionBoundaries(empID);
            //Max allowed deduction amount
            int maxAllowedDeduction = bus.GetMaxAllowedDeduction(empID);
            //Loan installment (if exists)
            if (loanData != null)
            {
                maxAllowedDeduction = maxAllowedDeduction - loanData.LoanInstallment;
            }

            if (amount > bounds.MaximumAmount || amount > maxAllowedDeduction || amount < bounds.MinimumAmount)
            {
                return "AmountIsOutsideBoundaries";
            }

            //Submit the request
            var subInfo = tpDB.SubscriptionInformations.First(j => j.SuI_IsActive == true);
            var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == empID && f.FSu_Status == 1);
            var suTSerial = from SubscriptionTransactions in tpDB.SubscriptionTransactions
                            where
                              SubscriptionTransactions.SuT_SubscriptionType == 2
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
            suT.SuT_SubscriptionType = 2;
            suT.SuT_Date = DateTime.UtcNow;
            suT.SuT_Amount = amount;
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
            tpDB.SaveChanges();


            return "True";
        }


    }
}
