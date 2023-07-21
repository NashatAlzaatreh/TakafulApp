using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Request_AdminCommitteeSubmittedRequests
    {
        public class MainObject
        {
            public MainObject()
            {
                this.CommitteeMembers = new List<CommitteeMember>();
            }

            public Meeting Meeting { get; set; }
            public List<CommitteeMember> CommitteeMembers { get; set; }
        }

        public class Meeting
        {
            public string FormattedSerial { get; set; }
            public DateTime Date { get; set; }
        }

        public class Request
        {
            public long EmployeeNumber { get; set; }
            public int Year { get; set; }
            public int Serial { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public DateTime? JoinDate { get; set; }
            public DateTime RequestDate { get; set; }
            public string Type { get; set; }
            public int TypeID { get; set; }
            public string Notes { get; set; }
            public string Decision { get; set; }
            public string DecisionEntry { get; set; }
        }

        public class CommitteeMember
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
        }

    }

}
