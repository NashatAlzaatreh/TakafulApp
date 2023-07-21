using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Misc_HomePageSettings
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Misc_HomePageSettings.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Misc_HomePageSettings.MainObject();

            var sf = tpDB.SolidarityFundInformations.First();
            defaultDataObj.Title1 = sf.SFI_HomePageBannerPhrase_1;
            defaultDataObj.Title2 = sf.SFI_HomePageBannerPhrase_2;
            defaultDataObj.Title3 = sf.SFI_HomePageBannerPhrase_3;


            return defaultDataObj;

        }

        public string Save(string title1, string title2, string title3)
        {

            var sf = tpDB.SolidarityFundInformations.First();
            sf.SFI_HomePageBannerPhrase_1 = title1;
            sf.SFI_HomePageBannerPhrase_2 = title2;
            sf.SFI_HomePageBannerPhrase_3 = title3;

            tpDB.Entry(sf).State = EntityState.Modified;
            tpDB.SaveChanges();

            return "True";

        }

        public string SaveFile(int index, string fileName)
        {
            string oldFilePath = "";
            fileName = fileName.Replace("dottttt", ".");
            string tempPath_Server = HttpContext.Current.Server.MapPath("~/" + Common.Common.PathConfig.UploadPath_Temp);
            string filePath_Temp = tempPath_Server + "\\" + fileName;
            var sf = tpDB.SolidarityFundInformations.First();
            string newFileName = "";
            string uploadsSubPath = "";

            if (index == 1)
            {
                oldFilePath = HttpContext.Current.Server.MapPath("~/" + sf.SFI_HomePageBannerFilePath_1);
                newFileName = "001" + Path.GetExtension(filePath_Temp);
                uploadsSubPath = Common.Common.PathConfig.UploadPath_HomePageBanner;
            }
            else if (index == 2)
            {
                oldFilePath = HttpContext.Current.Server.MapPath("~/" + sf.SFI_HomePageBannerFilePath_2);
                newFileName = "002" + Path.GetExtension(filePath_Temp);
                uploadsSubPath = Common.Common.PathConfig.UploadPath_HomePageBanner;
            }
            else if (index == 3)
            {
                oldFilePath = HttpContext.Current.Server.MapPath("~/" + sf.SFI_HomePageBannerFilePath_3);
                newFileName = "003" + Path.GetExtension(filePath_Temp);
                uploadsSubPath = Common.Common.PathConfig.UploadPath_HomePageBanner;
            }
            else if (index == 4)
            {
                oldFilePath = HttpContext.Current.Server.MapPath("~/" + sf.SFI_SFInfoFilePath1);
                newFileName = Path.GetFileNameWithoutExtension(fileName) + "_1" + Path.GetExtension(fileName);
                uploadsSubPath = Common.Common.PathConfig.UploadPath_HomePageFile;
            }
            else if (index == 5)
            {
                oldFilePath = HttpContext.Current.Server.MapPath("~/" + sf.SFI_SFInfoFilePath2);
                newFileName = Path.GetFileNameWithoutExtension(fileName) + "_2" + Path.GetExtension(fileName);
                uploadsSubPath = Common.Common.PathConfig.UploadPath_HomePageFile;
            }
            else if (index == 6)
            {
                oldFilePath = HttpContext.Current.Server.MapPath("~/" + sf.SFI_SFInfoFilePath3);
                newFileName = Path.GetFileNameWithoutExtension(fileName) + "_3" + Path.GetExtension(fileName);
                uploadsSubPath = Common.Common.PathConfig.UploadPath_HomePageFile;
            }

            if (File.Exists(oldFilePath))
            {
                File.Delete(oldFilePath);
            }

            string newFilePath_Perm = HttpContext.Current.Server.MapPath("~/" + uploadsSubPath + "/" + newFileName);
            File.Move(filePath_Temp, newFilePath_Perm);

            if (index == 1)
            {
                sf.SFI_HomePageBannerFilePath_1 = Common.Common.PathConfig.UploadPath_HomePageBanner + "/" + newFileName;
            }
            else if (index == 2)
            {
                sf.SFI_HomePageBannerFilePath_2 = Common.Common.PathConfig.UploadPath_HomePageBanner + "/" + newFileName;
            }
            else if (index == 3)
            {
                sf.SFI_HomePageBannerFilePath_3 = Common.Common.PathConfig.UploadPath_HomePageBanner + "/" + newFileName;
            }
            else if (index == 4)
            {
                sf.SFI_SFInfoFilePath1 = Common.Common.PathConfig.UploadPath_HomePageFile + "/" + newFileName;
            }
            else if (index == 5)
            {
                sf.SFI_SFInfoFilePath2 = Common.Common.PathConfig.UploadPath_HomePageFile + "/" + newFileName;
            }
            else if (index == 6)
            {
                sf.SFI_SFInfoFilePath3 = Common.Common.PathConfig.UploadPath_HomePageFile + "/" + newFileName;
            }

            tpDB.Entry(sf).State = EntityState.Modified;
            tpDB.SaveChanges();

            return "True";

        }
    }
}
