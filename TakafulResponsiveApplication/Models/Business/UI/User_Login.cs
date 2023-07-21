using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;
using static TakafulResponsiveApplication.Models.Business.Common.Common;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class User_Login
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.User_Login.LoggedUser Login(long employeeNumber, string password)
        {

            DataObjects.Internal.User_Login.LoggedUser loggedUser = null;

            /*Encrypt Passwords*/
            var emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeNumber && i.Emp_AccountStatus == true);
            if (emp.Emp_Password_Enc != Helper.EncyptDecrypt.Encrypt(password, emp.SecurityStamp))
            {
                emp = null;
            }
            //var emp = tpDB.Employees.FirstOrDefault(i => i.Emp_ID == employeeNumber && i.Emp_Password == password && i.Emp_AccountStatus == true);

            if (emp != null)
            {
                loggedUser = new DataObjects.Internal.User_Login.LoggedUser();
                loggedUser.EmployeeID = emp.Emp_ID;
                loggedUser.FullName = emp.Emp_FullName;
                if (emp.Emp_IsAdmin == true)
                {
                    loggedUser.IsAdmin = true;
                }

                if (tpDB.CommitteeMembers.Count(c => c.Emp_ID == emp.Emp_ID) > 0)
                {
                    loggedUser.IsCommitteeMember = true;
                }

                if (emp.Emp_IsHelpDesk == true)
                {
                    loggedUser.IsHelpDesk = true;
                }

                if (emp.FundSubscriptions.FirstOrDefault(f => f.FSu_Status == 1) != null)
                {
                    loggedUser.IsEmployee = true;
                }

            }
            else    //Check if the user is auditor
            {
                //Get the user from config file
                string userName = ConfigurationManager.AppSettings["AuditUserName"];
                string uPassword = ConfigurationManager.AppSettings["AuditPassword"];

                if (userName != null && userName == employeeNumber.ToString() && uPassword != null && uPassword == password)
                {
                    loggedUser = new DataObjects.Internal.User_Login.LoggedUser();
                    loggedUser.EmployeeID = 0;
                    loggedUser.FullName = "Audit User";
                    loggedUser.IsAuditor = true;
                }

            }


            return loggedUser;

        }



    }
}
