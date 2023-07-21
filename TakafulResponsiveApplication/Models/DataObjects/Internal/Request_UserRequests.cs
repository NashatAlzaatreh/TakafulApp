using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{
    public class Request_UserRequests
    {

        public class MainObject
        {
            public string Type { get; set; }
            public string Date { get; set; }
            public string Status { get; set; }
            public string Amount { get; set; }
            public RequestCancellationKey CancellationKey { get; set; }

        }

        public class RequestCancellationKey
        {
            public int Year { get; set; }
            public int Serial { get; set; }
        }

    }
}
