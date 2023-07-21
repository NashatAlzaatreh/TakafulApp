using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Employee_FinancialTransactionsManagement
    {
        public class MainObject
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public string Position { get; set; }
            public int? CurrentSubscriptionAmount { get; set; }
            public int? TotalSubscriptionAmount { get; set; }
            public int LoanAmount { get; set; }
            public int LoanInstallmentAmount { get; set; }
            public int PaidLoanAmount { get; set; }
            public int RemainingLoanAmount { get; set; }

            public LastSubscriptionTransaction LastSubscriptionTransaction { get; set; }
            public LastLoanTransaction LastLoanTransaction { get; set; }
        }

        public class LastSubscriptionTransaction
        {
            public DateTime Date { get; set; }
            public int Amount { get; set; }
            public string Type { get; set; }
        }

        public class LastLoanTransaction
        {
            public DateTime Date { get; set; }
            public int Amount { get; set; }
            public string Type { get; set; }
        }

    }

}
