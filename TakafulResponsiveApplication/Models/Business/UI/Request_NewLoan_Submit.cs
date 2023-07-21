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
    public class Request_NewLoan_Submit
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_NewLoan_Submit.MainObject GetInitialData()
        {

            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var defaultDataObj = new DataObjects.Internal.Request_NewLoan_Submit.MainObject();
            var bus = new Common.Common.Business();

            var employee = bus.GetEmployee(empID);

            if (employee != null)
            {
                defaultDataObj.EmployeeNumber = employee.EmpID;
                defaultDataObj.Name = employee.FullName;
                defaultDataObj.Department = employee.Department;
                defaultDataObj.Position = employee.Position;
                defaultDataObj.Date = DateTime.UtcNow;
                defaultDataObj.MaximumAllowedLoanAmount = employee.LoanBasicInfo.MaximumLoanAmount_Exception;
                defaultDataObj.LoanInstallmentsCount = employee.SubscriptionInformation.NumberOfInstallments;
                defaultDataObj.MinimumLoanInstallmentAmount = employee.SubscriptionInformation.MinimumAmount;
                //Get max allowed deduction amount
                int maxAllowedDeduction = bus.GetMaxAllowedDeduction(empID);
                //Get the max installment amount which is (max allowed deduction amount - subscription amount)
                //defaultDataObj.MaximumLoanInstallmentAmount = (int)((employee.ServiceData.TotalSalary / 2) - employee.SubscriptionData.Amount);
                defaultDataObj.MaximumLoanInstallmentAmount = maxAllowedDeduction - employee.SubscriptionData.Amount;

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

        public string Submit(int loanAmount, int installmentAmount, string notes)
        {
            var empID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());
            var bus = new Common.Common.Business();
            var emp = bus.GetEmployee(empID);

            //Check if eligible to request new loan
            string result = bus.IsEligibleToRequestLoan(empID);

            if (result != "True")
            {
                switch (result)
                {
                    case "AlreadySubmittedRequest":
                        return result;
                        break;
                    case "EmployeeNotFound":
                        return result;
                        break;
                    case "NoValidSubscription":
                        return result;
                        break;
                    case "MinimumSubscriptionPeriodViolation":
                        return result;
                        break;
                    case "SubscriptionCancellationSubmitted":
                        return result;
                        break;
                    case "LoanExists":
                        return result;
                        break;
                    case "PeriodBetweenLoansExists":
                        return result;
                        break;
                    case "NoJoininDateExist":
                        return result;
                        break;
                    case "JoiningDateLessThanPeriod":
                        return result;
                        break;
                    case "Loan4ReSubscriberSuT_DateError":
                        return result;
                        break;
                    case "Loan4ReSubscriberApprovalDateError":
                        return result;
                        break;
                    case "Loan4ReSubscriberLessThanPeriod":
                        return result;
                        break;
                    default:
                        return result;
                        break;
                }
            }

            int remainingLoanAmount = 0;
            if (emp.LoanData != null)
            {
                remainingLoanAmount = emp.LoanData.RemainingAmount;
            }

            //Validate loan amount (only if not local citizen)
            //if (emp.Emp_IsLocalCitizen != true)
            //{
            if ((loanAmount + remainingLoanAmount) > emp.LoanBasicInfo.MaximumLoanAmount_Exception)
            {
                return "MaxLoanViolation";
            }
            //}

            //Get max allowed deduction amount
            int maxAllowedDeduction = bus.GetMaxAllowedDeduction(empID);

            if (installmentAmount > (maxAllowedDeduction - emp.SubscriptionData.Amount))
            {
                return "MaxInstallmentViolation";
            }

            var calcInstallment = (int)((loanAmount + remainingLoanAmount) / emp.SubscriptionInformation.NumberOfInstallments);
            if (calcInstallment < emp.SubscriptionInformation.MinimumAmount)
            {
                calcInstallment = emp.SubscriptionInformation.MinimumAmount;
            }

            if (installmentAmount < calcInstallment)
            {
                return "MinInstallmentViolation";
            }

            //Submit the request
            var subInfo = tpDB.SubscriptionInformations.First(j => j.SuI_IsActive == true);
            var fs = tpDB.FundSubscriptions.FirstOrDefault(f => f.Emp_ID == empID && f.FSu_Status == 1);

            var suTSerial = tpDB.SubscriptionTransactions.Where(s => s.SuT_SubscriptionType == 4).OrderByDescending(s => s.SortIndex).FirstOrDefault();

            //var suTSerial = from SubscriptionTransactions in tpDB.SubscriptionTransactions
            //                where
            //                  SubscriptionTransactions.SuT_SubscriptionType == 4
            //                orderby
            //                  SubscriptionTransactions.SuT_Year descending,
            //                  SubscriptionTransactions.SuT_Serial descending
            //                select new
            //                {
            //                    Emp_ID = SubscriptionTransactions.Emp_ID,
            //                    SuT_Year = SubscriptionTransactions.SuT_Year,
            //                    SuT_Serial = SubscriptionTransactions.SuT_Serial,
            //                    SuT_SubscriptionType = SubscriptionTransactions.SuT_SubscriptionType,
            //                    SuT_Date = SubscriptionTransactions.SuT_Date,
            //                    SuT_Amount = SubscriptionTransactions.SuT_Amount,
            //                    SuT_Notes = SubscriptionTransactions.SuT_Notes,
            //                    SuT_ApprovalStatus = SubscriptionTransactions.SuT_ApprovalStatus,
            //                    SuT_ApprovalDate = SubscriptionTransactions.SuT_ApprovalDate,
            //                    SuI_ID = SubscriptionTransactions.SuI_ID
            //                };

            var la = new LoanAmount();
            var suT = new SubscriptionTransaction();

            la.Emp_ID = empID;
            la.LAm_Date = DateTime.UtcNow;
            la.LAm_LoanAmount = loanAmount;

            suT.Emp_ID = empID;
            suT.SuT_Year = DateTime.UtcNow.Year;
            suT.SuT_SubscriptionType = 4;
            suT.SuT_Date = DateTime.UtcNow;
            suT.SuT_Amount = installmentAmount;
            suT.SuT_Notes = notes;
            suT.SuT_ApprovalStatus = 1;
            suT.SuI_ID = subInfo.SuI_ID;
            suT.LoanAmount = la;

            if (suTSerial == null || DateTime.UtcNow.Year > suTSerial.SuT_Year)
            {
                suT.SuT_Serial = 0001;
            }
            else
            {
                suT.SuT_Serial = suTSerial.SuT_Serial + 1;
            }


            tpDB.LoanAmounts.Add(la);
            tpDB.SubscriptionTransactions.Add(suT);

            //Check if exception is used for another loan with active loan
            if (emp.LoanData != null && emp.LoanData.RemainingAmount > 0)   //Loan already exists, there must be exception available (otherwise a data inconsistency)
            {
                var ex = tpDB.LoanExceptions.FirstOrDefault(l => l.Emp_ID == empID && l.FundSubscription.FSu_Status == 1);
                ex.LEx_CanRequestLoanWithCurrentActiveLoan = false;
                tpDB.Entry(ex).State = EntityState.Modified;
            }

            //Save changes
            tpDB.SaveChanges();


            return "True";
        }


    }
}
