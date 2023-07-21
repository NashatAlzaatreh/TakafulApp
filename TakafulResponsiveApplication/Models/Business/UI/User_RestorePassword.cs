using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;
using static TakafulResponsiveApplication.Models.Business.Common.Common;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class User_RestorePassword
    {

        TakafulEntities tpDB = new TakafulEntities();

        public string Send(long employeeNumber, string email)
        {

            //Get the employee
            var employee = tpDB.Employees.FirstOrDefault(e => e.Emp_ID == employeeNumber && e.Emp_Email.Trim() == email && e.Emp_AccountStatus == true);

            if (employee == null)
            {
                return "NotFound";
            }

            var send = new Common.Common.SendEmail();
            //send.RestorePassword(employeeNumber.ToString(), employee.Emp_Password, employee.Emp_FullName, email);
            send.RestorePassword(employeeNumber.ToString(), Helper.EncyptDecrypt.Decrypt(employee.Emp_Password_Enc,employee.SecurityStamp), employee.Emp_FullName, email);


            return "True";
        }



    }
}
