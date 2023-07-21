using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Home_Start
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Home_Start.MainObject GetInitialData(Models.DataObjects.Internal.User_Login.LoggedUser loggedUser)
        {

            var defaultDataObj = new DataObjects.Internal.Home_Start.MainObject();

            defaultDataObj.IsAdmin = loggedUser.IsAdmin;
            defaultDataObj.IsCommitteeMember = loggedUser.IsCommitteeMember;
            defaultDataObj.IsHelpDesk = loggedUser.IsHelpDesk;
            defaultDataObj.IsEmployee = loggedUser.IsEmployee;
            defaultDataObj.IsAuditor = loggedUser.IsAuditor;

            return defaultDataObj;

        }


    }
}
