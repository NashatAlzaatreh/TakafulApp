using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Employee_DataManagement
    {
        public class MainObject
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public string Position { get; set; }
            public string Department { get; set; }
            public DateTime? JoinDate { get; set; }
            public string JobDegree { get; set; }
            public int Salary { get; set; }
            public int EndServiceBenefits { get; set; }
            public string Nationality { get; set; }
            public int Gender { get; set; }
            public bool IsCitizen { get; set; }
            public DateTime? BirthDate { get; set; }
            public string Email { get; set; }
            public string Mobile { get; set; }
        }

    }

}
