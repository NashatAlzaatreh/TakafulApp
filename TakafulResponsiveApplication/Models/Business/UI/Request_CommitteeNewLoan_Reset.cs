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
    public class Request_CommitteeNewLoan_Reset
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_CommitteeNewLoan_Reset.MainObject GetInitialData(long empID, int year, int serial)
        {

            var defaultDataObj = new DataObjects.Internal.Request_CommitteeNewLoan_Reset.MainObject();
            var bus = new Common.Common.Business();

            var employee = bus.GetEmployee(empID);

            if (employee != null)
            {
                defaultDataObj.EmployeeNumber = employee.EmpID;
                defaultDataObj.Name = employee.FullName;
                defaultDataObj.Department = employee.Department;
                defaultDataObj.Position = employee.Position;
                defaultDataObj.JoinDate = employee.JoiningDate;
                if (employee.ServiceData != null)
                {
                    defaultDataObj.Salary = employee.ServiceData.TotalSalary;
                }

                if (employee.SubscriptionData == null)
                {
                    return null;
                }

                defaultDataObj.CurrentSubscriptionAmount = employee.SubscriptionData.Amount;
                defaultDataObj.TotalSubscriptionAmount = employee.SubscriptionData.TotalSubscription;
                defaultDataObj.LoanInstallmentsCount = employee.SubscriptionInformation.NumberOfInstallments;
                defaultDataObj.MinimumLoanInstallmentAmount = employee.SubscriptionInformation.MinimumAmount;

                //Get the submitted request
                var request = tpDB.SubscriptionTransactions.Include("LoanAmount").FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 4 && (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5));

                if (request == null || request.LoanAmount == null)    //No submitted request with the provided parameters
                {
                    return null;
                }

                defaultDataObj.UserNotes = request.SuT_Notes;

                if (request.SuT_ApprovalStatus == 4)
                {
                    defaultDataObj.IsTransferredToCommittee = true;
                }

                defaultDataObj.RequestedLoanAmount = request.LoanAmount.LAm_LoanAmount.Value;   //Requested loan amount
                int prevLoan = 0;
                if (employee.LoanData != null)
                {
                    prevLoan = employee.LoanData.RemainingAmount;
                }
                defaultDataObj.PreviousLoanAmount = prevLoan;
                defaultDataObj.TotalLoanAmount = defaultDataObj.RequestedLoanAmount + defaultDataObj.PreviousLoanAmount;

                if (request.LoanAmount.LAm_SuggestedLoanAmount != null) //Suggested loan amount
                {
                    defaultDataObj.SuggestedLoanAmount = request.LoanAmount.LAm_SuggestedLoanAmount.Value;
                }


                defaultDataObj.TotalDeductedAmount = employee.SubscriptionData.Amount + request.SuT_Amount.Value;  //Total deduction amount
                defaultDataObj.MaxDeductedAmount = (int)(defaultDataObj.Salary / 2);

                defaultDataObj.EndServiceBenefitAmount = employee.ServiceData.EndOfServiceBenefit.Value;    //End of service benefits
                defaultDataObj.EndServiceBenefitAmountAndTotalSubscription = defaultDataObj.EndServiceBenefitAmount + defaultDataObj.TotalSubscriptionAmount.Value; //End of service benefits + Total subscriptions
            }


            return defaultDataObj;
        }

        public string Reset(long empID, int year, int serial)
        {

            //Delete all the committee members decisions regarding this user request
            using (var Context = new TakafulEntities())
            {
                Context.Database.ExecuteSqlCommand("DELETE FROM TransactionCommitteeDecision WHERE Emp_ID = {0} AND SuT_Year = {1} AND SuT_Serial = {2} AND SuT_SubscriptionType = {3}; ", new object[] { empID, year, serial, 4 });
            }



            return "True";
        }

    }
}
