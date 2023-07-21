using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Request_NewLoan_Submit
    {
        public class MainObject
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public DateTime Date { get; set; }
            public string Department { get; set; }
            public string Position { get; set; }
            public int LoanAmount { get; set; }
            public int PaidLoanAmount { get; set; }
            public int RemainingLoanAmount { get; set; }
            public int MaximumAllowedLoanAmount { get; set; }
            public int LoanInstallmentsCount { get; set; }
            public int MinimumLoanInstallmentAmount { get; set; }
            public int MaximumLoanInstallmentAmount { get; set; }

        }
    }

}
