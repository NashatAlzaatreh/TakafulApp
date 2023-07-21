using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TakafulResponsiveApplication.Models.DataObjects.External
{

    public class Employee_UpdatePaidInstallments_In
    {
        public long EmployeeNumber { get; set; }
        public int Amount { get; set; }
        public DateTime TransactionDate { get; set; }
    }

}
