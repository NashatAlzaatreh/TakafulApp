using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Request_SubmittedRequests
    {
        public class MainObject
        {
            public MainObject()
            {
                this.Requests = new List<SubmittedRequest>();
            }

            public List<SubmittedRequest> Requests { get; set; }

        }

        public class SubmittedRequest
        {

            public long EmployeeNumber { get; set; }
            public int Year { get; set; }
            public int Serial { get; set; }
            public int SubscriptionType { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public string Position { get; set; }
            public DateTime? JoinDate { get; set; }
            public DateTime? RequestDate { get; set; }

        }
    }

}
