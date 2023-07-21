using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Home_HelpDesk
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Home_HelpDesk.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Home_HelpDesk.MainObject();
            var bus = new Common.Common.Business();

            //Get the info files URL
            SolidarityFundInformation sFI = bus.GetSolidarityFundInformation();
            if (sFI != null)
            {
                defaultDataObj.InfoFile1 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath1;
                defaultDataObj.InfoFile2 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath2;
                defaultDataObj.InfoFile3 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath3;
            }


            return defaultDataObj;

        }


    }
}
