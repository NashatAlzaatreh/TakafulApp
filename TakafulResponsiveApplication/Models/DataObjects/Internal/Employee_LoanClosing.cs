using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Employee_LoanClosing
    {
        public class MainObject
        {
            public MainObject()
            {
                this.Employees = new List<Employee>();
                this.Employees2 = new List<Employee>();
            }

            public List<Employee> Employees { get; set; }
            public List<Employee> Employees2 { get; set; }
        }

        public class Employee
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public int LoanAmount { get; set; }
            public int LoanInstallmentAmount { get; set; }
            public int PaidLoanAmount { get; set; }
            public int RemainingLoanAmount { get; set; }
            public bool IsSelected { get; set; }
        }

    }

}
