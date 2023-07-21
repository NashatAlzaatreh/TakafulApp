using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using TakafulResponsiveApplication.Models.DB;

namespace TakafulResponsiveApplication.Models.Business.UI
{
    public class MasterP
    {

        TakafulEntities tpDB = new TakafulEntities();

        public object GetInternalMenus()
        {

            dynamic menuObject = new ExpandoObject();
            var utl = new Common.Common.Utility();

            //Check login status
            if (utl.IsLoggedin())   //Loggedin
            {
                //Check the user object
                if (HttpContext.Current.Session["LoggedUser"] != null)
                {
                    var loggedUser = (Models.DataObjects.Internal.User_Login.LoggedUser)HttpContext.Current.Session["LoggedUser"];

                    menuObject.Small = "<li>" +
                                   "<label>مرحباً بك " + loggedUser.FullName + "</label>" +
                                   "</li>" +
                                   "<li class=\"active\"><a href=\"../../UI/Home/Start.html\">صفحتى</a></li>" +
                                   "<li><a onclick=\"MasterPage.EventHandlers.btnLogout_onclick();\" href=\"#\">تسجيل الخروج</a></li>" +
                                   "<li>" +
                                   "<label>القائمة الرئيسية</label>" +
                                   "</li>" +
                                   "<li><a href=\"../Home/Main.html\">الصفحة الرئيسية</a></li>" +
                                   "<li><a href=\"../Misc/ContactUs.html\">اتصل بنا</a></li>";

                    menuObject.Large = "<li><a href=\"#\"></a></li>" +
                                       "<li class=\"has-dropdown\">" +
                                       "<a href=\"#\"><i></i>مرحباً بك " + loggedUser.FullName + "</a>" +
                                       "<ul class=\"dropdown\">" +
                                       "<li class=\"active\"><a href=\"../../UI/Home/Start.html\">صفحتى</a></li>" +
                                       "<li class=\"\"><a onclick=\"MasterPage.EventHandlers.btnLogout_onclick();\" href=\"#\">تسجيل الخروج</a></li>" +
                                       "</ul>" +
                                       "</li>";
                }

            }
            else    //Not loggeding
            {
                menuObject.Small = "<li>" +
                                   "<label>مرحباً بك</label>" +
                                   "</li>" +
                                   "<li class=\"active\"><a href=\"../User/Login.html\">تسجيل الدخول</a></li>" +
                                   "<li>" +
                                   "<label>القائمة الرئيسية</label>" +
                                   "</li>" +
                                   "<li><a href=\"../Home/Main.html\">الصفحة الرئيسية</a></li>" +
                                   "<li><a href=\"../Misc/ContactUs.html\">اتصل بنا</a></li>";

                menuObject.Large = "<li><a href=\"#\"></a></li>" +
                                   "<li>" +
                                   "<a href=\"../User/Login.html\"><i class=\"fa fa-user fa\"></i>&nbsp;&nbsp; تسجيل الدخول</a>" +
                                   //"<ul class=\"dropdown\">" +
                                   //"<li><a href=\"#\">اسم المستخدم</a></li>" +
                                   //"<li class=\"\"><a href=\"#\">تسجيل الخروج</a></li>" +
                                   //"</ul>" +
                                   "</li>";
            }



            return menuObject;

        }

    }
}
