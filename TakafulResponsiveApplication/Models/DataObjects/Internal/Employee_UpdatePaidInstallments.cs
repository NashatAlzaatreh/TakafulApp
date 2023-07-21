using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Employee_UpdatePaidInstallments
    {
        public class MainObject
        {
            public MainObject()
            {
                this.Employees = new List<Employee>();
            }

            public List<Employee> Employees { get; set; }
        }

        public class Employee
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }

            //public string Department { get; set; }
            //public string Position { get; set; }
            //public int? CurrentSubscriptionAmount { get; set; }
            //public int? TotalSubscriptionAmount { get; set; }

            public int LoanAmount { get; set; }
            public int LoanInstallmentAmount { get; set; }
            public int PaidLoanAmount { get; set; }
            public int RemainingLoanAmount { get; set; }
            public DateTime LastTransactionDate { get; set; }
            public int CurrentPaidAmount { get; set; }
            public bool IsSelected { get; set; }
        }

    }

}
