using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.Internal
{

    public class Request_EditLoan_Submit
    {
        public class MainObject
        {
            public long EmployeeNumber { get; set; }
            public string Name { get; set; }
            public DateTime Date { get; set; }
            public string Department { get; set; }
            public string Position { get; set; }
            public int CurrentInstallmentAmount { get; set; }
            public int MinimumLoanInstallmentAmount { get; set; }
            public int MaximumLoanInstallmentAmount { get; set; }
        }
    }

}
