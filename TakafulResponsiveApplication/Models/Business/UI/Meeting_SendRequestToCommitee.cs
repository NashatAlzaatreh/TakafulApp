using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Meeting_SendRequestToCommitee
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Meeting_SendRequestToCommitee.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Meeting_SendRequestToCommitee.MainObject();

            //Get the active meeting
            var me = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true);

            if (me == null)
            {
                return null;
            }

            defaultDataObj.FormattedSerial = me.Mee_Date.Value.Year.ToString() + "/" + me.Mee_Serial.ToString();
            defaultDataObj.Date = me.Mee_Date.Value;
            if (me.Mee_IsNotificationSent == true)
            {
                defaultDataObj.IsNotificationSent = true;
            }

            //Get requests that are assigned to this meeting (transferred to the committee)
            var allRequests = tpDB.MeetingTransactions.Include("SubscriptionTransaction.Employee").Where(m => m.Mee_ID == me.Mee_ID && m.SubscriptionTransaction != null && (m.SubscriptionTransaction.SuT_ApprovalStatus == 4 || m.SubscriptionTransaction.SuT_ApprovalStatus == 5)).ToList();

            for (int i = 0; i < allRequests.Count; i++)
            {
                var temp = new DataObjects.Internal.Meeting_SendRequestToCommitee.Request();
                temp.EmployeeNumber = allRequests[i].Emp_ID;
                temp.Name = allRequests[i].SubscriptionTransaction.Employee.Emp_FullName;
                temp.Year = allRequests[i].SuT_Year;
                temp.Serial = allRequests[i].SuT_Serial;
                temp.Department = allRequests[i].SubscriptionTransaction.Employee.Emp_Department;
                temp.RequestDate = allRequests[i].SubscriptionTransaction.SuT_Date.Value;
                temp.Notes = allRequests[i].SubscriptionTransaction.SuT_NotesForCommittee;
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

                defaultDataObj.Requests.Add(temp);
            }


            return defaultDataObj;
        }

        public string SaveNotes(long empID, int year, int serial, int typeID, string notes)
        {

            //Get the request
            var request = tpDB.SubscriptionTransactions.FirstOrDefault(s => s.Emp_ID == empID && s.SuT_Year == year && s.SuT_Serial == serial && s.SuT_SubscriptionType == typeID && (s.SuT_ApprovalStatus == 4 || s.SuT_ApprovalStatus == 5));

            request.SuT_NotesForCommittee = notes;
            tpDB.Entry(request).State = EntityState.Modified;
            tpDB.SaveChanges();


            return "True";
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "CommitteeRequests";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

        public string SendNotifications()
        {
            string serial = "";
            DateTime date = new DateTime();
            var lstEmails = new List<string>();

            //Get the active meeting
            var me = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true);

            if (me == null)
            {
                return "NoActiveMeeting";
            }

            serial = me.Mee_Date.Value.Year.ToString() + "/" + me.Mee_Serial.ToString();
            date = me.Mee_Date.Value.Date;

            //Get requests count that are assigned to this meeting (transferred to the committee)
            int requestsCount = tpDB.MeetingTransactions.Include("SubscriptionTransaction.Employee").Count(m => m.Mee_ID == me.Mee_ID && m.SubscriptionTransaction != null && (m.SubscriptionTransaction.SuT_ApprovalStatus == 4 || m.SubscriptionTransaction.SuT_ApprovalStatus == 5));

            if (requestsCount == 0)
            {
                return "NoRequests";
            }

            //Get committee members email accounts
            var members = tpDB.Employees.Where(em => em.CommitteeMember != null).ToList();

            if (members.Count == 0)
            {
                return "RequestCannotBeCompletedRightNow";
            }

            for (int i = 0; i < members.Count; i++)
            {
                if (!string.IsNullOrEmpty(members[i].Emp_Email))
                {
                    lstEmails.Add(members[i].Emp_Email.Trim());
                }
            }


            var sm = new Common.Common.SendEmail();
            var result = sm.SendRequestNotificationToCommittee(serial, date.ToShortDateString(), lstEmails);

            if (result == true) //Update the notification flag in the meeting
            {
                me.Mee_IsNotificationSent = true;
                tpDB.Entry(me).State = EntityState.Modified;
                tpDB.SaveChanges();
            }

            return "True";
        }

    }
}
