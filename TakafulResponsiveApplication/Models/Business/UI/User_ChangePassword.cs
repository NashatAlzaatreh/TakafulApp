using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;
using static TakafulResponsiveApplication.Models.Business.Common.Common;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class User_ChangePassword
    {

        TakafulEntities tpDB = new TakafulEntities();

        public string Submit(string oldPassword, string newPassword)
        {

            //Get the employee
            var employeeNumber = long.Parse(HttpContext.Current.Session["EmployeeID"].ToString());

            /*Encypt the password*/
            //var employee = tpDB.Employees.FirstOrDefault(e => e.Emp_ID == employeeNumber && e.Emp_Password == oldPassword);
            var employee = tpDB.Employees.FirstOrDefault(e => e.Emp_ID == employeeNumber);
            if (employee.Emp_Password_Enc != Helper.EncyptDecrypt.Encrypt(oldPassword, employee.SecurityStamp))
            {
                employee = null;
            }

            if (employee == null)
            {
                return "WrongPassword";
            }

            //Update password
            //employee.Emp_Password = newPassword;
            employee.SecurityStamp = Helper.EncyptDecrypt.GenerateEncryptionKey();
            employee.Emp_Password_Enc = Helper.EncyptDecrypt.Encrypt(newPassword, employee.SecurityStamp);
            tpDB.Entry(employee).State = EntityState.Modified;
            tpDB.SaveChanges();

            return "True";
        }



    }
}
