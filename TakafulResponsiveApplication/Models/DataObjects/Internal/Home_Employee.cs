using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Home_Employee
    {
        public class MainObject
        {

            public string InfoFile1 { get; set; }
            public string InfoFile2 { get; set; }
            public string InfoFile3 { get; set; }
            public int? MonthlySubscriptionAmount { get; set; }
            public int? TotalSubscriptions { get; set; }
            public int? LoanAmount { get; set; }
            public int? LoanInstallment { get; set; }
            public int? PaidLoanAmount { get; set; }
            public string LastRequestType { get; set; }
            public DateTime? LastRequestDate { get; set; }
            public int ZakahAmount { get; set; }
        }
    }

}
