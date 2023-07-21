using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Misc_SystemConfiguration
    {
        public class MainObject
        {
            public int SubscriptionPercentage { get; set; }
            public int MinSubscriptionAmount { get; set; }
            public int MaxSubscriptionAmount { get; set; }
            public int MaxInstallmentsCount { get; set; }
            public int MinSubscriptionPeriod { get; set; }
            public int MaxLoanAmount1 { get; set; }
            public int MaxLoanAmount2 { get; set; }
            public int TotalSubscriptionForMaxLoanAmount { get; set; }
            public int MinPeriodBetweenLoans { get; set; }
            public int MaxDeductionPercentage { get; set; }
            public string Email { get; set; }

            public Nullable<int> SuI_LessPeriodForReSbubscrition { get; set; }
            public Nullable<int> SuI_LessPeriodForLoan4ReSubscriber { get; set; }
            public Nullable<int> SuI_LessPeriodForLoanNewEmployee { get; set; }
        }
    }

}
