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
    public class Request_CommitteeNewLoan_Approve
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_CommitteeNewLoan_Approve.MainObject GetInitialData(long empID, int year, int serial)
        {

            var defaultDataObj = new DataObjects.Internal.Request_CommitteeNewLoan_Approve.MainObject();
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
                if (defaultDataObj.PreviousLoanAmount > 0)
                {
                    defaultDataObj.TotalLoanAmount = defaultDataObj.RequestedLoanAmount + defaultDataObj.PreviousLoanAmount;
                }
                else
                {
                    defaultDataObj.TotalLoanAmount = defaultDataObj.RequestedLoanAmount;
                }


                if (request.LoanAmount.LAm_SuggestedLoanAmount != null) //Suggested loan amount
                {
                    defaultDataObj.SuggestedLoanAmount = request.LoanAmount.LAm_SuggestedLoanAmount.Value;
                }

                //Approved loan amount
                var mt = request.MeetingTransactions.FirstOrDefault(l => l.Emp_ID == empID && l.SuT_Year == year && l.SuT_Serial == serial && l.SuT_SubscriptionType == 4);
                if (mt != null && mt.MeT_ApprovedAmount.HasValue)
                {
                    defaultDataObj.ApprovedLoanAmount = mt.MeT_ApprovedAmount.Value;
                }

                defaultDataObj.TotalDeductedAmount = employee.SubscriptionData.Amount + request.SuT_Amount.Value;  //Total deduction amount
                defaultDataObj.MaxDeductedAmount = (int)(defaultDataObj.Salary / 2);

                defaultDataObj.EndServiceBenefitAmount = employee.ServiceData.EndOfServiceBenefit.Value;    //End of service benefits
                defaultDataObj.EndServiceBenefitAmountAndTotalSubscription = defaultDataObj.EndServiceBenefitAmount + defaultDataObj.TotalSubscriptionAmount.Value; //End of service benefits + Total subscriptions
            }


            return defaultDataObj;
        }

        public string TakeAction(long empID, int year, int serial, int action)
        {

            var committeeMemberID = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());

            var aStatus = 0;

            if (action == 1)
            {
                aStatus = 2;
            }
            else if (action == 3)
            {
                aStatus = 3;
            }

            //Add the decision to the decision table
            TransactionCommitteeDecision tcd = tpDB.TransactionCommitteeDecisions.FirstOrDefault(t => t.Emp_ID == empID && t.SuT_Year == year && t.SuT_Serial == serial && t.SuT_SubscriptionType == 4 && t.TCD_CommitteeMemberID == committeeMemberID);

            if (tcd == null)
            {
                tcd = new TransactionCommitteeDecision();
                tcd.Emp_ID = empID;
                tcd.SuT_Year = year;
                tcd.SuT_Serial = serial;
                tcd.SuT_SubscriptionType = 4;
                tcd.TCD_CommitteeMemberID = committeeMemberID;
                tcd.TCD_Date = DateTime.UtcNow.Date;
                tcd.TCD_CommitteeApprovalStatus = aStatus;
                tpDB.TransactionCommitteeDecisions.Add(tcd);
            }
            else
            {
                tcd.TCD_Date = DateTime.UtcNow.Date;
                tcd.TCD_CommitteeApprovalStatus = aStatus;
                tcd.TCD_AdminID = null;
                tpDB.Entry(tcd).State = EntityState.Modified;
            }

            tpDB.SaveChanges();


            return "True";
        }

        public DataObjects.Internal.Request_CommitteeNewLoan_Approve.NavigationObject Navigate(long empID, int year, int serial, int direction)
        {

            var defaultDataObj = new DataObjects.Internal.Request_CommitteeNewLoan_Approve.NavigationObject();
            var lst = new List<SubscriptionTransaction>();
            const int type = 4;

            //Get requests that are assigned to this meeting (transferred to the committee)
            var me = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true && m.Mee_IsOpenForEvaluation == true);

            if (me == null)
            {
                return null;
            }

            //Get the current request
            var currentRequest = tpDB.SubscriptionTransactions.First(st => st.Emp_ID == empID && st.SuT_Year == year && st.SuT_Serial == serial && st.SuT_SubscriptionType == type);
            int currentIndex = currentRequest.SortIndex;

            //Get the Next or Previous submitted request of the current one (according to direction)
            if (direction == 1)
            {
                lst = tpDB.SubscriptionTransactions.Where(s => (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) && s.SortIndex > currentIndex && s.MeetingTransactions.Any(mt => mt.Mee_ID == me.Mee_ID)).OrderBy(s => s.SortIndex).Take(1).ToList();
            }
            else if (direction == 2)
            {
                lst = tpDB.SubscriptionTransactions.Where(s => (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) && s.SortIndex < currentIndex && s.MeetingTransactions.Any(mt => mt.Mee_ID == me.Mee_ID)).OrderByDescending(s => s.SortIndex).Take(1).ToList();
            }
            else
            {
                return null;
            }

            if (lst.Count == 0)
            {
                return null;
            }

            defaultDataObj.EmpID = lst[0].Emp_ID;
            defaultDataObj.Year = lst[0].SuT_Year;
            defaultDataObj.Serial = lst[0].SuT_Serial;
            defaultDataObj.Type = lst[0].SuT_SubscriptionType;


            return defaultDataObj;
        }


    }
}
