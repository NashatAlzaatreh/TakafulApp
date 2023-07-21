using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Exception_Loan_Submit
    {
        public class MainObject
        {
            public MainObject()
            {
                this.Employees = new List<Employee>();
                this.Exceptions = new List<DataObjects.Internal.Common.LoanException>();
            }

            public List<Employee> Employees { get; set; }
            public List<DataObjects.Internal.Common.LoanException> Exceptions { get; set; }
        }

        public class Employee
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
        }


    }

}
