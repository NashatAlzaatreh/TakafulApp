using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Meeting_MeetingList
    {
        public class MainObject
        {
            public MainObject()
            {
                this.Meetings = new List<Meeting>();
            }

            public List<Meeting> Meetings { get; set; }

        }

        public class Meeting
        {

            public int ID { get; set; }
            public int Serial { get; set; }
            public string FormattedSerial { get; set; }
            public DateTime Date { get; set; }
            public string Notes { get; set; }

        }
    }

}
