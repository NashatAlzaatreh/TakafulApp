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
    public class Request_EditLoan_Submit
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_EditLoan_Submit.MainObject GetInitialData()
        {

            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var defaultDataObj = new DataObjects.Internal.Request_EditLoan_Submit.MainObject();
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
                defaultDataObj.CurrentInstallmentAmount = employee.LoanData.LoanInstallment;
                //Get max allowed deduction amount
                int maxAllowedDeduction = bus.GetMaxAllowedDeduction(empID);
                //Get the max installment amount which is (max allowed deduction amount - subscription amount)
                //defaultDataObj.MaximumLoanInstallmentAmount = (int)((employee.ServiceData.TotalSalary / 2) - employee.SubscriptionData.Amount);
                defaultDataObj.MaximumLoanInstallmentAmount = maxAllowedDeduction - employee.SubscriptionData.Amount;
                //Get minimum allowed installment amount for this loan
                var calcInstallment = (int)(loan.LAm_LoanAmount.Value / employee.SubscriptionInformation.NumberOfInstallments);
                if (calcInstallment < employee.SubscriptionInformation.MinimumAmount)
                {
                    calcInstallment = employee.SubscriptionInformation.MinimumAmount;
                }
                defaultDataObj.MinimumLoanInstallmentAmount = calcInstallment;
            }


            return defaultDataObj;
        }

        public string Submit(int amount, string notes)
        {
            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var bus = new Common.Common.Business();
            var emp = bus.GetEmployee(empID);
            var loan = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.LAm_Status == 1);    //Get the active loan for this employee

            //Check if eligible to edit loan installment
            string result = bus.IsEligibleToEditLoanInstallment(empID);

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

            //Check if installment amount within range
            //Get max allowed deduction amount
            int maxAllowedDeduction = bus.GetMaxAllowedDeduction(empID);
            //Get the max installment amount which is (max allowed deduction amount - subscription amount)
            int maxInstallment = (maxAllowedDeduction - emp.SubscriptionData.Amount);

            if (amount > maxInstallment)
            {
                return "MaxInstallmentViolation";
            }

            //Get minimum allowed installment amount for this loan
            var calcInstallment = (int)(loan.LAm_LoanAmount.Value / emp.SubscriptionInformation.NumberOfInstallments);
            if (calcInstallment < emp.SubscriptionInformation.MinimumAmount)
            {
                calcInstallment = emp.SubscriptionInformation.MinimumAmount;
            }

            if (amount < calcInstallment)
            {
                return "MinInstallmentViolation";
            }


            //Submit the request
            var subInfo = tpDB.SubscriptionInformations.First(j => j.SuI_IsActive == true);
            //var la = tpDB.LoanAmounts.FirstOrDefault(l => l.Emp_ID == empID && l.LAm_Status == 1);

            var suTSerial = from SubscriptionTransactions in tpDB.SubscriptionTransactions
                            where
                              SubscriptionTransactions.SuT_SubscriptionType == 5
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
            suT.SuT_SubscriptionType = 5;
            suT.SuT_Date = DateTime.UtcNow;
            suT.SuT_Amount = amount;
            suT.SuT_Notes = notes;
            suT.SuT_ApprovalStatus = 1;
            suT.SuI_ID = subInfo.SuI_ID;
            suT.LAm_ID = loan.LAm_ID;

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
