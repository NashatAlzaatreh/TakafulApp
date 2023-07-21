using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Request_CommitteeNewSubscription_Reset
    {
        public class MainObject
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public string Position { get; set; }
            public DateTime? JoinDate { get; set; }
            public int? Salary { get; set; }
            public int? RequestedSubscriptionAmount { get; set; }
            public DateTime? PrevousSubscriptionCancellationDate { get; set; }
            public bool IsTransferredToCommittee { get; set; }
            public string UserNotes { get; set; }
        }

    }

}
