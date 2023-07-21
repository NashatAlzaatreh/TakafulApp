using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Request_AdminCommitteeNewLoan_Approve
    {
        public class MainObject
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public string Position { get; set; }
            public DateTime? JoinDate { get; set; }
            public int? Salary { get; set; }

            public int LoanInstallmentsCount { get; set; }
            public int MinimumLoanInstallmentAmount { get; set; }
            public int RequestedLoanAmount { get; set; }
            public int PreviousLoanAmount { get; set; }
            public int TotalLoanAmount { get; set; }
            public int SuggestedLoanAmount { get; set; }

            public int? CurrentSubscriptionAmount { get; set; }
            public int? TotalSubscriptionAmount { get; set; }

            public int TotalDeductedAmount { get; set; }
            public int MaxDeductedAmount { get; set; }

            public int EndServiceBenefitAmount { get; set; }
            public int EndServiceBenefitAmountAndTotalSubscription { get; set; }

            public bool IsTransferredToCommittee { get; set; }
        }

    }

}
