using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Meeting_AddRequestToMeeting
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Meeting_AddRequestToMeeting.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Meeting_AddRequestToMeeting.MainObject();


            //Get all meetings
            var lstMeetings = tpDB.Meetings.OrderByDescending(m => m.Mee_Serial).ToList();

            for (int i = 0; i < lstMeetings.Count; i++)
            {
                var meeting = new DataObjects.Internal.Meeting_AddRequestToMeeting.Meeting();
                meeting.ID = lstMeetings[i].Mee_ID;
                meeting.Serial = lstMeetings[i].Mee_Serial;
                meeting.Date = lstMeetings[i].Mee_Date.Value;
                meeting.Notes = lstMeetings[i].Mee_Notes;
                meeting.FormattedSerial = meeting.Date.Year.ToString() + "/" + meeting.Serial.ToString();
                meeting.IsActive = lstMeetings[i].Mee_IsActive.Value;
                meeting.IsOpenForEvaluation = lstMeetings[i].Mee_IsOpenForEvaluation.Value;
                defaultDataObj.Meetings.Add(meeting);
            }

            //Get all requests (transferred to the committee)
            var allRequests = tpDB.SubscriptionTransactions.Include("Employee").Where(s => (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) && s.MeetingTransactions.Count == 0).OrderBy(s => s.SortIndex).ToList();

            for (int i = 0; i < allRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Meeting_AddRequestToMeeting.Request();
                temp.EmployeeNumber = allRequests[i].Emp_ID;
                temp.Name = allRequests[i].Employee.Emp_FullName;
                temp.Year = allRequests[i].SuT_Year;
                temp.Serial = allRequests[i].SuT_Serial;
                temp.Department = allRequests[i].Employee.Emp_Department;
                temp.RequestDate = allRequests[i].SuT_Date.Value;
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

                defaultDataObj.AllRequests.Add(temp);
            }


            return defaultDataObj;
        }

        public List<DataObjects.Internal.Meeting_AddRequestToMeeting.Request> GetMeetingRequests(int meetingID)
        {

            var resultDataObj = new List<DataObjects.Internal.Meeting_AddRequestToMeeting.Request>();

            //Get requests that are assigned to this meeting (transferred to the committee)
            var allRequests = tpDB.MeetingTransactions.Include("SubscriptionTransaction.Employee").Where(m => m.Mee_ID == meetingID && m.SubscriptionTransaction != null && (m.SubscriptionTransaction.SuT_ApprovalStatus == 4 || m.SubscriptionTransaction.SuT_ApprovalStatus == 5)).ToList();
            //var allRequests = tpDB.SubscriptionTransactions.Include("Employee").Where(s => (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) && s.MeetingTransactions.Count == 0).OrderByDescending(s => s.SortIndex).ToList();

            for (int i = 0; i < allRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Meeting_AddRequestToMeeting.Request();
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

                resultDataObj.Add(temp);
            }


            return resultDataObj;
        }

        public DataObjects.Internal.Meeting_AddRequestToMeeting.ResultObject Add(int meetingID, long empID, int year, int serial, int typeID, out string resultMessage)
        {

            var resultData = new DataObjects.Internal.Meeting_AddRequestToMeeting.ResultObject();

            //Get the request
            var request = tpDB.SubscriptionTransactions.FirstOrDefault(s =>
                s.Emp_ID == empID
                && s.SuT_Year == year
                && s.SuT_Serial == serial
                && s.SuT_SubscriptionType == typeID
                && (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5)
                && s.MeetingTransactions.Count == 0);

            //Get the meeting
            var meeting = tpDB.Meetings.FirstOrDefault(m => m.Mee_ID == meetingID);

            //Check if the meeting in the past
            var mDate = new DateTime(meeting.Mee_Date.Value.Year, meeting.Mee_Date.Value.Month, meeting.Mee_Date.Value.Day);
            var cDate = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day);

            if (mDate < cDate)
            {
                resultMessage = "PastDate";
                return resultData;
            }

            //Assign the request to the meeting
            var mt = new MeetingTransaction();
            mt.Mee_ID = meeting.Mee_ID;
            mt.Emp_ID = request.Emp_ID;
            mt.SuT_Year = request.SuT_Year;
            mt.SuT_Serial = request.SuT_Serial;
            mt.SuT_SubscriptionType = request.SuT_SubscriptionType;
            mt.MeT_Date = DateTime.UtcNow;
            tpDB.MeetingTransactions.Add(mt);
            tpDB.SaveChanges();

            //Get all the requests (not assigned to any meeting)
            var allRequests = tpDB.SubscriptionTransactions.Include("Employee").Where(s => (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) && s.MeetingTransactions.Count == 0).OrderBy(s => s.SortIndex).ToList();

            for (int i = 0; i < allRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Meeting_AddRequestToMeeting.Request();
                temp.EmployeeNumber = allRequests[i].Emp_ID;
                temp.Name = allRequests[i].Employee.Emp_FullName;
                temp.Year = allRequests[i].SuT_Year;
                temp.Serial = allRequests[i].SuT_Serial;
                temp.Department = allRequests[i].Employee.Emp_Department;
                temp.RequestDate = allRequests[i].SuT_Date.Value;
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

                resultData.AllRequests.Add(temp);
            }


            //Get requests that are assigned to this meeting (transferred to the committee)
            var meetingRequests = tpDB.MeetingTransactions.Include("SubscriptionTransaction.Employee").Where(m => m.Mee_ID == meetingID && m.SubscriptionTransaction != null && (m.SubscriptionTransaction.SuT_ApprovalStatus == 4 || m.SubscriptionTransaction.SuT_ApprovalStatus == 5)).ToList();

            for (int i = 0; i < meetingRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Meeting_AddRequestToMeeting.Request();
                temp.EmployeeNumber = meetingRequests[i].Emp_ID;
                temp.Name = meetingRequests[i].SubscriptionTransaction.Employee.Emp_FullName;
                temp.Year = meetingRequests[i].SuT_Year;
                temp.Serial = meetingRequests[i].SuT_Serial;
                temp.Department = meetingRequests[i].SubscriptionTransaction.Employee.Emp_Department;
                temp.RequestDate = meetingRequests[i].SubscriptionTransaction.SuT_Date.Value;
                temp.TypeID = meetingRequests[i].SuT_SubscriptionType;
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

                resultData.MeetingRequests.Add(temp);
            }


            resultMessage = "True";
            return resultData;
        }

        public DataObjects.Internal.Meeting_AddRequestToMeeting.ResultObject Remove(int meetingID, long empID, int year, int serial, int typeID, out string resultMessage)
        {

            var resultData = new DataObjects.Internal.Meeting_AddRequestToMeeting.ResultObject();

            //Get the meeting request
            var mt = tpDB.MeetingTransactions.Include("Meeting").Include("SubscriptionTransaction.TransactionCommitteeDecisions").FirstOrDefault(m => m.Mee_ID == meetingID && m.Emp_ID == empID && m.SuT_Year == year && m.SuT_Serial == serial && m.SuT_SubscriptionType == typeID);

            //Check if a committee decision related to this request
            if (mt.SubscriptionTransaction.TransactionCommitteeDecisions.Count > 0)
            {
                resultMessage = "RelatedDecisions";
                return resultData;
            }

            //Check if the meeting in the past
            var mDate = new DateTime(mt.Meeting.Mee_Date.Value.Year, mt.Meeting.Mee_Date.Value.Month, mt.Meeting.Mee_Date.Value.Day);
            var cDate = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day);

            if (mDate < cDate)
            {
                resultMessage = "PastDate";
                return resultData;
            }

            //Remove the request from this meeting
            tpDB.Entry(mt).State = EntityState.Deleted;
            tpDB.SaveChanges();

            //Get all the requests (not assigned to any meeting)
            var allRequests = tpDB.SubscriptionTransactions.Include("Employee").Where(s => (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5) && s.MeetingTransactions.Count == 0).OrderBy(s => s.SortIndex).ToList();

            for (int i = 0; i < allRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Meeting_AddRequestToMeeting.Request();
                temp.EmployeeNumber = allRequests[i].Emp_ID;
                temp.Name = allRequests[i].Employee.Emp_FullName;
                temp.Year = allRequests[i].SuT_Year;
                temp.Serial = allRequests[i].SuT_Serial;
                temp.Department = allRequests[i].Employee.Emp_Department;
                temp.RequestDate = allRequests[i].SuT_Date.Value;
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

                resultData.AllRequests.Add(temp);
            }


            //Get requests that are assigned to this meeting (transferred to the committee)
            var meetingRequests = tpDB.MeetingTransactions.Include("SubscriptionTransaction.Employee").Where(m => m.Mee_ID == meetingID && m.SubscriptionTransaction != null && (m.SubscriptionTransaction.SuT_ApprovalStatus == 4 || m.SubscriptionTransaction.SuT_ApprovalStatus == 5)).ToList();

            for (int i = 0; i < meetingRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Meeting_AddRequestToMeeting.Request();
                temp.EmployeeNumber = meetingRequests[i].Emp_ID;
                temp.Name = meetingRequests[i].SubscriptionTransaction.Employee.Emp_FullName;
                temp.Year = meetingRequests[i].SuT_Year;
                temp.Serial = meetingRequests[i].SuT_Serial;
                temp.Department = meetingRequests[i].SubscriptionTransaction.Employee.Emp_Department;
                temp.RequestDate = meetingRequests[i].SubscriptionTransaction.SuT_Date.Value;
                temp.TypeID = meetingRequests[i].SuT_SubscriptionType;
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

                resultData.MeetingRequests.Add(temp);
            }


            resultMessage = "True";
            return resultData;
        }

    }
}
