using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Home_CommitteeMember
    {
        public class MainObject
        {
            
            public string InfoFile1 { get; set; }
            public string InfoFile2 { get; set; }
            public string InfoFile3 { get; set; }
            public int Requests_Subscription_New { get; set; }
            public int Requests_Subscription_Modification { get; set; }
            public int Requests_Subscription_Cancellation { get; set; }
            public int Requests_Loan_New { get; set; }
            public int Requests_Loan_Modification { get; set; }
            public int Requests_Loan_Cancellation { get; set; }

        }
    }

}
