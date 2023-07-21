using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class HR_HRSheetModification_ModifiedInstallments
    {
        public class MainObject
        {
            public MainObject()
            {
                this.Sheets = new List<Sheet>();
            }

            public List<Sheet> Sheets { get; set; }
        }

        public class ResultObject
        {
            public ResultObject()
            {
                this.Employees = new List<Employee>();
            }

            public List<Employee> Employees { get; set; }
        }

        public class Sheet
        {
            public int ID { get; set; }
            public int Serial { get; set; }
            public DateTime Date { get; set; }
            //public string Month { get; set; }
            public string Notes { get; set; }
            public bool IsClosed { get; set; }
        }

        public class Employee
        {
            public long ID { get; set; }
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public string Department { get; set; }
            public string Position { get; set; }
            public int LoanAmount { get; set; }
            public int LoanInstallment { get; set; }
            public DateTime RequestDate { get; set; }
            public bool IsIncluded { get; set; }
            
        }

    }

}
