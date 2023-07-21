using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class Home_Main
    {

        TakafulEntities tpDB = new TakafulEntities();

        public DataObjects.Internal.Home_Main.MainObject GetInitialData()
        {

            var defaultDataObj = new DataObjects.Internal.Home_Main.MainObject();
            var bus = new Common.Common.Business();

            SolidarityFundInformation sFI = bus.GetSolidarityFundInformation();
            if (sFI != null)
            {
                defaultDataObj.Phrase1 = sFI.SFI_HomePageBannerPhrase_1;
                defaultDataObj.Phrase2 = sFI.SFI_HomePageBannerPhrase_2;
                defaultDataObj.Phrase3 = sFI.SFI_HomePageBannerPhrase_3;

                defaultDataObj.Phrase1FilePath = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_HomePageBannerFilePath_1;
                defaultDataObj.Phrase2FilePath = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_HomePageBannerFilePath_2;
                defaultDataObj.Phrase3FilePath = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_HomePageBannerFilePath_3;

                defaultDataObj.InfoFile1 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath1;
                defaultDataObj.InfoFile2 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath2;
                defaultDataObj.InfoFile3 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath3;
                defaultDataObj.InfoFile4 = Common.Common.CurrentHostingServer.Host + "/" + sFI.SFI_SFInfoFilePath4;
            }

            return defaultDataObj;

        }

        public string Register(long employeeNumber)
        {

            var bus = new Common.Common.Business();

            string result = bus.IsEligibleToRegister(employeeNumber);

            if (result == "True")
            {
                Employee emp = tpDB.Employees.SingleOrDefault(i => i.Emp_ID == employeeNumber);
                var send = new Common.Common.SendEmail();
                int res = send.ContinueRegistration(employeeNumber, emp.Emp_Email);

                if (res == 2)
                {
                    return "SMSSent";
                }
                else
                {
                    return "EmailSent";
                }
            }
            else if (result == "EmployeeNotFound")
            {
                SolidarityFundInformation sFI = tpDB.SolidarityFundInformations.First(i => i.SFI_ID == 1);
                if (sFI != null && !string.IsNullOrEmpty(sFI.SFI_GeneralEmail))
                {
                    //try
                    //{
                    //    string DomainName = HttpContext.Current.Request.Url.Host;
                    //    if (!DomainName.Contains("takaful.iacad.gov.ae"))
                    //    {
                    //        sFI.SFI_GeneralEmail = "ahami@iacad.gov.ae";
                    //    }
                    //}
                    //catch { }
                    var send = new Common.Common.SendEmail();
                    send.EmployeeNotFound(employeeNumber, sFI.SFI_GeneralEmail);
                }

                return "EmployeeNotFound";
            }

            return result;

            //long empNum = employeeNumber;
            //Employee emp = tpDB.Employees.SingleOrDefault(i => i.Emp_ID == empNum && (i.Emp_AccountStatus == false || i.Emp_AccountStatus == null));

            //Employee subEmp = tpDB.Employees.SingleOrDefault(i => i.Emp_ID == empNum && i.Emp_AccountStatus == true);

            //if (emp != null && !string.IsNullOrEmpty(emp.Emp_Email))
            //{
            //    var send = new Common.Common.SendEmail();
            //    int res = send.ContinueRegistration(employeeNumber, emp.Emp_Email);

            //    if (res == 2)
            //    {
            //        return "SMSSent";
            //    }
            //    else
            //    {
            //        return "EmailSent";
            //    }
            //}
            //else if (emp == null && subEmp == null)
            //{
            //    SolidarityFundInformation sFI = tpDB.SolidarityFundInformations.First(i => i.SFI_ID == 1);
            //    if (sFI != null && !string.IsNullOrEmpty(sFI.SFI_GeneralEmail))
            //    {
            //        var send = new Common.Common.SendEmail();
            //        send.EmployeeNotFound(employeeNumber, sFI.SFI_GeneralEmail);
            //    }

            //    return "EmployeeNotFound";
            //    //Response.Redirect("~/Email/NotFound.aspx?EmpID=" + EmployeeNumber.Text);
            //}
            //else if (subEmp != null)
            //{
            //    return "AlreadyRegistered";
            //    //Error.Text = "انت بالفعل مشترك بالصندوق، يرجى الدخول باستخدام رقمك الوظيفى وكلمة المرور لتتمتع بخدمات الصندوق";
            //}



            //return "NoEmail";   //No suitable condition found
            ////Error.Text = "يرجى مراجعة ادارة صندوق التكافل لعدم توافر بريد الكترونى يمكنك من استكمال خطوات التسجيل";


        }



    }
}
