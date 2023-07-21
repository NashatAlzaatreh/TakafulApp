using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Employee_UpdatePaidSubscriptions
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
            public int CurrentSubscriptionAmount { get; set; }
            public int TotalSubscriptionAmount { get; set; }
            public DateTime LastTransactionDate { get; set; }
            public int CurrentPaidAmount { get; set; }
            public bool IsSelected { get; set; }
        }

    }

}
