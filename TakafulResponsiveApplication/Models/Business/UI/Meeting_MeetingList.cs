using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Meeting_MeetingList
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Meeting_MeetingList.MainObject GetInitialData(DateTime fromDate, DateTime toDate)
        {

            var defaultDataObj = new DataObjects.Internal.Meeting_MeetingList.MainObject();


            //Get all meetings
            var lstMeetings = tpDB.Meetings.Where(m => m.Mee_Date >= fromDate && m.Mee_Date <= toDate).OrderBy(m => m.Mee_Serial).ToList();

            for (int i = 0; i < lstMeetings.Count; i++)
            {
                var meeting = new DataObjects.Internal.Meeting_MeetingList.Meeting();
                meeting.ID = lstMeetings[i].Mee_ID;
                meeting.Serial = lstMeetings[i].Mee_Serial;
                meeting.Date = lstMeetings[i].Mee_Date.Value;
                meeting.Notes = lstMeetings[i].Mee_Notes;
                meeting.FormattedSerial = meeting.Date.Year.ToString() + "/" + meeting.Serial.ToString();
                defaultDataObj.Meetings.Add(meeting);
            }


            return defaultDataObj;

        }

        public DataObjects.Internal.Meeting_MeetingList.MainObject Save(int meetingID, DateTime date, string notes, out string resultMessage)
        {

            var bus = new Common.Common.Business();
            bool isMeetingWithLaterDateExists = false;
            var defaultDataObj = new DataObjects.Internal.Meeting_MeetingList.MainObject();


            //Check whether new or modified meeting
            if (meetingID == 0) //New meeting
            {
                int iYear = 0, iSerial = 0;

                //Get the last inserted item to generate the new serial
                var lstMeeting = tpDB.Meetings.OrderByDescending(m => m.Mee_ID).Take(1).ToList();

                if (lstMeeting.Count == 0)  //No data exist
                {
                    iYear = DateTime.UtcNow.Year;
                    iSerial = 1;
                }
                else
                {
                    iYear = DateTime.UtcNow.Year;

                    //Check if the last inserted year is the same current year
                    if (lstMeeting[0].Mee_Year == iYear)
                    {
                        iSerial = lstMeeting[0].Mee_Serial + 1;
                    }
                    else
                    {
                        iSerial = 1;
                    }
                }

                //Check if another meeting has later date than this one
                isMeetingWithLaterDateExists = (tpDB.Meetings.Count(m => m.Mee_Date > date) > 0);

                //Insert the data to db
                var meeting = new Meeting();
                meeting.Mee_Year = iYear;
                meeting.Mee_Serial = iSerial;
                meeting.Mee_Date = date;
                meeting.Mee_Notes = notes;
                meeting.Mee_IsActive = false;
                meeting.Mee_IsOpenForEvaluation = false;
                tpDB.Meetings.Add(meeting);
            }
            else
            {
                //Check if a previous meeting has later date than this one
                isMeetingWithLaterDateExists = (tpDB.Meetings.Count(m => m.Mee_Date > date && m.Mee_ID < meetingID) > 0);

                var meeting = tpDB.Meetings.FirstOrDefault(m => m.Mee_ID == meetingID);
                meeting.Mee_Date = date;
                meeting.Mee_Notes = notes;
                tpDB.Entry(meeting).State = EntityState.Modified;
            }

            //Save
            tpDB.SaveChanges();

            //Check if previous meeting with later date
            if (isMeetingWithLaterDateExists == true)
            {
                resultMessage = "MeetingWithLaterDateExists";
            }
            else
            {
                resultMessage = "True";
            }

            //Return all the existing meetings
            //var lstMeetings = tpDB.Meetings.OrderBy(m => m.Mee_Serial).ToList();

            //for (int i = 0; i < lstMeetings.Count; i++)
            //{
            //    var meeting = new DataObjects.Internal.Meeting_MeetingList.Meeting();
            //    meeting.ID = lstMeetings[i].Mee_ID;
            //    meeting.Serial = lstMeetings[i].Mee_Serial;
            //    meeting.Date = lstMeetings[i].Mee_Date.Value;
            //    meeting.Notes = lstMeetings[i].Mee_Notes;
            //    meeting.FormattedSerial = meeting.Date.Year.ToString() + "/" + meeting.Serial.ToString();
            //    defaultDataObj.Meetings.Add(meeting);
            //}

            DateTime from = new DateTime(1900, 01, 01);
            DateTime to = new DateTime(2099, 12, 31);
            return this.GetInitialData(from, to);
        }

        public DataObjects.Internal.Meeting_MeetingList.MainObject Delete(int meetingID, out string resultMessage)
        {

            var bus = new Common.Common.Business();
            DateTime from = new DateTime(1900, 01, 01);
            DateTime to = new DateTime(2099, 12, 31);

            //Check if already exists
            var me = tpDB.Meetings.Include("MeetingTransactions").FirstOrDefault(m => m.Mee_ID == meetingID);

            if (me != null)
            {
                //Check if related to another data
                //Subscription transaction
                if (me.MeetingTransactions.Count > 0)
                {
                    resultMessage = "DataRelationExists";
                    return new DataObjects.Internal.Meeting_MeetingList.MainObject();
                }

                //Delete the meeting
                tpDB.Entry(me).State = EntityState.Deleted;
                //Save
                tpDB.SaveChanges();
            }


            resultMessage = "True";
            return this.GetInitialData(from, to);
        }

        public string ExportDataToExcel(List<List<string>> data, string path)
        {

            string fileName = "Meetings";

            var utl = new Common.Common.Utility();
            string createdFileName = utl.ExportToExcelFile(data, fileName, path);


            return createdFileName;
        }

    }
}
