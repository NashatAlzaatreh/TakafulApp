using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Request_EditLoan_Approve
    {
        public class MainObject
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public string Position { get; set; }
            public DateTime? JoinDate { get; set; }
            public int? Salary { get; set; }
            public int CurrentInstallmentAmount { get; set; }
            public int NewInstallmentAmount { get; set; }
            public int LoanAmount { get; set; }
            public int PaidLoanAmount { get; set; }
            public int RemainingLoanAmount { get; set; }
            public bool IsTransferredToCommittee { get; set; }
            public string UserNotes { get; set; }
            public string Applicant { get; set; }

        }

        public class NavigationObject
        {
            public long EmpID { get; set; }
            public int Year { get; set; }
            public int Serial { get; set; }
        }
    }

}
