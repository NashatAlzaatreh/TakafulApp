using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Request_AdminCommitteeSubmittedRequests
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Request_AdminCommitteeSubmittedRequests.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Request_AdminCommitteeSubmittedRequests.MainObject();

            //Get the active meeting
            var me = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true && m.Mee_IsOpenForEvaluation == true);

            if (me != null)
            {
                defaultDataObj.Meeting = new DataObjects.Internal.Request_AdminCommitteeSubmittedRequests.Meeting();
                defaultDataObj.Meeting.FormattedSerial = me.Mee_Date.Value.Year.ToString() + "/" + me.Mee_Serial.ToString();
                defaultDataObj.Meeting.Date = me.Mee_Date.Value;
            }

            //Get committee members
            var lstMembers = tpDB.CommitteeMembers.Include("Employee").OrderBy(c => c.CoM_OSSortingOrder).ToList();

            for (int i = 0; i < lstMembers.Count; i++)
            {
                var temp = new DataObjects.Internal.Request_AdminCommitteeSubmittedRequests.CommitteeMember();
                temp.EmployeeNumber = lstMembers[i].Emp_ID;
                temp.Name = lstMembers[i].Employee.Emp_FullName;
                defaultDataObj.CommitteeMembers.Add(temp);
            }


            return defaultDataObj;
        }

        public List<DataObjects.Internal.Request_AdminCommitteeSubmittedRequests.Request> GetRequests(long committeeMemberID)
        {

            var resultDataObj = new List<DataObjects.Internal.Request_AdminCommitteeSubmittedRequests.Request>();

            //Get requests that are assigned to this meeting (transferred to the committee)
            var me = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true && m.Mee_IsOpenForEvaluation == true);

            if (me == null)
            {
                return resultDataObj;
            }

            var allRequests =
                tpDB.SubscriptionTransactions.Include("Employee")
                    .Where(
                        s =>
                            (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) &&
                            s.MeetingTransactions.Any(mt => mt.Mee_ID == me.Mee_ID)
                /*&& s.TransactionCommitteeDecisions.FirstOrDefault(d => d.TCD_CommitteeMemberID == committeeMemberID) == null*/
                            )
                    .OrderBy(s => s.SortIndex)
                    .ToList();


            for (int i = 0; i < allRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Request_AdminCommitteeSubmittedRequests.Request();
                temp.EmployeeNumber = allRequests[i].Emp_ID;
                temp.Name = allRequests[i].Employee.Emp_FullName;
                temp.JoinDate = allRequests[i].Employee.Emp_JoiningDate;
                temp.Year = allRequests[i].SuT_Year;
                temp.Serial = allRequests[i].SuT_Serial;
                temp.Department = allRequests[i].Employee.Emp_Department;
                temp.RequestDate = allRequests[i].SuT_Date.Value;
                temp.Notes = allRequests[i].SuT_NotesForCommittee;
                temp.TypeID = allRequests[i].SuT_SubscriptionType;
                switch (temp.TypeID)
                {
                    case 1:
                        temp.Type = "طلب اشتراك";
                        break;
                    case 2:
                        temp.Type = "تعديل اشتراك";
                        break;
                    case 3:
                        temp.Type = "إلغاء اشتراك";
                        break;
                    case 4:
                        temp.Type = "طلب قرض";
                        break;
                    case 5:
                        temp.Type = "تعديل قرض";
                        break;
                    case 6:
                        temp.Type = "إلغاء قرض";
                        break;
                }

                var decision = allRequests[i].TransactionCommitteeDecisions.FirstOrDefault(d => d.TCD_CommitteeMemberID == committeeMemberID);
                if (decision != null)
                {
                    //Decision
                    if (decision.TCD_CommitteeApprovalStatus == 2)
                    {
                        temp.Decision = "اعتماد";
                    }
                    else if (decision.TCD_CommitteeApprovalStatus == 3)
                    {
                        temp.Decision = "رفض";
                    }

                    //Decision entry
                    if (decision.TCD_AdminID == null)
                    {
                        temp.DecisionEntry = "بنفسه";
                    }
                    else
                    {
                        temp.DecisionEntry = decision.Employee1.Emp_FullName;
                    }
                }
                else
                {
                    temp.Decision = "-";
                    temp.DecisionEntry = "-";
                }

                resultDataObj.Add(temp);
            }


            return resultDataObj;
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "CommitteeRequests";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
