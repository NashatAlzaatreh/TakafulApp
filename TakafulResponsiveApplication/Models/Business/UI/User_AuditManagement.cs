using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class User_AuditManagement
    {

        TakafulEntities tpDB = new TakafulEntities();

        public Models.DataObjects.Internal.User_AuditManagement.MainObject GetInitialData()
        {
            var defaultDataObj = new DataObjects.Internal.User_AuditManagement.MainObject();

            //Get the username and password from config file
            string userName = ConfigurationManager.AppSettings["AuditUserName"];
            string password = ConfigurationManager.AppSettings["AuditPassword"];

            if (userName != null)
            {
                defaultDataObj.UserName = userName;
            }

            if (password != null)
            {
                defaultDataObj.Password = password;
            }


            return defaultDataObj;
        }

        public string Save(long userName, string password)
        {

            ConfigurationManager.AppSettings.Set("AuditUserName", userName.ToString());
            ConfigurationManager.AppSettings.Set("AuditPassword", password);

            return "True";
        }



    }
}
