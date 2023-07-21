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
    public class Request_CommitteeNewSubscription_Approve
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_CommitteeNewSubscription_Approve.MainObject GetInitialData(long empID, int year, int serial)
        {

            var defaultDataObj = new DataObjects.Internal.Request_CommitteeNewSubscription_Approve.MainObject();
            var bus = new Common.Common.Business();

            var employee = bus.GetEmployee(empID);

            if (employee != null)
            {
                defaultDataObj.EmployeeNumber = employee.EmpID;
                defaultDataObj.Name = employee.FullName;
                defaultDataObj.Department = employee.Department;
                defaultDataObj.Position = employee.Position;
                defaultDataObj.JoinDate = employee.JoiningDate;
                if (employee.ServiceData != null && employee.ServiceData.TotalSalary != null)
                {
                    defaultDataObj.Salary = employee.ServiceData.TotalSalary;
                }

                if (employee.SubscriptionData != null)
                {
                    defaultDataObj.PrevousSubscriptionCancellationDate = employee.SubscriptionData.PreviousCancellationDate;
                }

                //Get the submitted request
                var request = tpDB.SubscriptionTransactions.FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == 1 && (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5));

                if (request == null || request.SuT_Amount == null)    //No submitted request with the provided parameters
                {
                    return null;
                }

                defaultDataObj.UserNotes = request.SuT_Notes;

                defaultDataObj.RequestedSubscriptionAmount = request.SuT_Amount;

                if (request.SuT_ApprovalStatus == 4)
                {
                    defaultDataObj.IsTransferredToCommittee = true;
                }
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
            TransactionCommitteeDecision tcd = tpDB.TransactionCommitteeDecisions.FirstOrDefault(t => t.Emp_ID == empID && t.SuT_Year == year && t.SuT_Serial == serial && t.SuT_SubscriptionType == 1 && t.TCD_CommitteeMemberID == committeeMemberID);

            if (tcd == null)
            {
                tcd = new TransactionCommitteeDecision();
                tcd.Emp_ID = empID;
                tcd.SuT_Year = year;
                tcd.SuT_Serial = serial;
                tcd.SuT_SubscriptionType = 1;
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

        public DataObjects.Internal.Request_CommitteeNewSubscription_Approve.NavigationObject Navigate(long empID, int year, int serial, int direction)
        {

            var defaultDataObj = new DataObjects.Internal.Request_CommitteeNewSubscription_Approve.NavigationObject();
            var lst = new List<SubscriptionTransaction>();
            const int type = 1;

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
