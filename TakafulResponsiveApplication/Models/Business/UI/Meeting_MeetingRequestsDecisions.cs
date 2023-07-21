using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Meeting_MeetingRequestsDecisions
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Meeting_MeetingRequestsDecisions.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Meeting_MeetingRequestsDecisions.MainObject();

            //Get all meetings
            var lstMeetings = tpDB.Meetings.OrderByDescending(m => m.Mee_Serial).ToList();

            for (int i = 0; i < lstMeetings.Count; i++)
            {
                var meeting = new DataObjects.Internal.Meeting_MeetingRequestsDecisions.Meeting();
                meeting.ID = lstMeetings[i].Mee_ID;
                meeting.Serial = lstMeetings[i].Mee_Serial;
                meeting.Date = lstMeetings[i].Mee_Date.Value;
                meeting.Notes = lstMeetings[i].Mee_Notes;
                meeting.FormattedSerial = meeting.Date.Year.ToString() + "/" + meeting.Serial.ToString();
                meeting.IsActive = lstMeetings[i].Mee_IsActive.Value;
                meeting.IsOpenForEvaluation = lstMeetings[i].Mee_IsOpenForEvaluation.Value;
                defaultDataObj.Meetings.Add(meeting);
            }



            return defaultDataObj;
        }

        public List<DataObjects.Internal.Meeting_MeetingRequestsDecisions.Request> GetMeetingRequests(int meetingID)
        {

            var resultDataObj = new List<DataObjects.Internal.Meeting_MeetingRequestsDecisions.Request>();

            //Get requests that are assigned to this meeting (transferred to the committee)
            var allRequests = tpDB.MeetingTransactions.Include("SubscriptionTransaction.Employee").Include("SubscriptionTransaction.ApprovalStatu").Where(m => m.Mee_ID == meetingID && m.SubscriptionTransaction != null).ToList();
            //var allRequests = tpDB.SubscriptionTransactions.Include("Employee").Where(s => (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) && s.MeetingTransactions.Count == 0).OrderByDescending(s => s.SortIndex).ToList();

            for (int i = 0; i < allRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Meeting_MeetingRequestsDecisions.Request();
                temp.EmployeeNumber = allRequests[i].Emp_ID;
                temp.Name = allRequests[i].SubscriptionTransaction.Employee.Emp_FullName;
                temp.Year = allRequests[i].SuT_Year;
                temp.Serial = allRequests[i].SuT_Serial;
                temp.Department = allRequests[i].SubscriptionTransaction.Employee.Emp_Department;
                temp.RequestDate = allRequests[i].SubscriptionTransaction.SuT_Date.Value;
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

                temp.Status = allRequests[i].SubscriptionTransaction.ApprovalStatu.ApS_ApprovalStatus;

                resultDataObj.Add(temp);
            }

            resultDataObj = resultDataObj.OrderByDescending(m => m.RequestDate).ToList();

            return resultDataObj;
        }

    }
}


