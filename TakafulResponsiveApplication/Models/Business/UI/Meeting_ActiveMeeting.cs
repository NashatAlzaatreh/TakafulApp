using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Meeting_ActiveMeeting
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Meeting_ActiveMeeting.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Meeting_ActiveMeeting.MainObject();


            //Get all meetings
            var lstMeetings = tpDB.Meetings.OrderByDescending(m => m.Mee_Serial).ToList();

            for (int i = 0; i < lstMeetings.Count; i++)
            {
                var meeting = new DataObjects.Internal.Meeting_ActiveMeeting.Meeting();
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

        public string Save(int meetingID, bool isOpenForEvaluation)
        {

            //Check if another active meeting
            var prevActiveMeeting = tpDB.Meetings.FirstOrDefault(m => m.Mee_IsActive == true);
            if (prevActiveMeeting == null)
            {
                var meeting = tpDB.Meetings.FirstOrDefault(m => m.Mee_ID == meetingID);
                meeting.Mee_IsActive = true;
                meeting.Mee_IsOpenForEvaluation = isOpenForEvaluation;
                tpDB.Entry(meeting).State = EntityState.Modified;
            }
            else
            {
                //Check if the same meeting
                if (prevActiveMeeting.Mee_ID == meetingID)
                {
                    if (prevActiveMeeting.Mee_IsOpenForEvaluation == isOpenForEvaluation)
                    {
                        return "AlreadySaved";
                    }
                    else
                    {
                        prevActiveMeeting.Mee_IsOpenForEvaluation = isOpenForEvaluation;
                        tpDB.Entry(prevActiveMeeting).State = EntityState.Modified;
                    }

                }
                else
                {
                    //Update the old meeting
                    prevActiveMeeting.Mee_IsActive = false;
                    prevActiveMeeting.Mee_IsOpenForEvaluation = false;
                    tpDB.Entry(prevActiveMeeting).State = EntityState.Modified;

                    //Update the new meeting
                    var meeting = tpDB.Meetings.FirstOrDefault(m => m.Mee_ID == meetingID);
                    meeting.Mee_IsActive = true;
                    meeting.Mee_IsOpenForEvaluation = isOpenForEvaluation;
                    tpDB.Entry(meeting).State = EntityState.Modified;
                }

            }



            //Save
            tpDB.SaveChanges();

            return "True";
        }

    }
}
