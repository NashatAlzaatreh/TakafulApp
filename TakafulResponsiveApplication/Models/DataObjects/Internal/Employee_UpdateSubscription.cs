using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Employee_UpdateSubscription
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
            public int PreviousSalary { get; set; }
            public int CurrentSalary { get; set; }
            public int CurrentSubscription { get; set; }
            public int CalculatedSubscription { get; set; }
            public int MinimumSubscription { get; set; }
            public int MaximumSubscription { get; set; }
            public bool IsSelected { get; set; }
        }

    }

}
