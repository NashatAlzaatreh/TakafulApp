using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Meeting_AddRequestToMeeting
    {
        public class MainObject
        {
            public MainObject()
            {
                this.Meetings = new List<Meeting>();
                this.AllRequests = new List<Request>();
            }

            public List<Meeting> Meetings { get; set; }
            public List<Request> AllRequests { get; set; }
        }

        public class ResultObject
        {
            public ResultObject()
            {
                this.AllRequests = new List<Request>();
                this.MeetingRequests = new List<Request>();
            }

            public List<Request> AllRequests { get; set; }
            public List<Request> MeetingRequests { get; set; }
        }

        public class Meeting
        {

            public int ID { get; set; }
            public int Serial { get; set; }
            public string FormattedSerial { get; set; }
            public DateTime Date { get; set; }
            public string Notes { get; set; }
            public bool IsActive { get; set; }
            public bool IsOpenForEvaluation { get; set; }

        }

        public class Request
        {

            public long EmployeeNumber { get; set; }
            public int Year { get; set; }
            public int Serial { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public DateTime RequestDate { get; set; }
            public string Type { get; set; }
            public int TypeID { get; set; }

        }

    }

}
