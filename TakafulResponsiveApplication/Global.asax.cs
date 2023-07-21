using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using System.Web.SessionState;
//using TakafulResponsiveApplication.Models.Common;
using TakafulResponsiveApplication.Models.Business.Common;

namespace TakafulResponsiveApplication
{
    public class WebApiApplication : System.Web.HttpApplication
    {

        class FirstRequestInitialisation
        {
            private static string host = null;

            private static Object s_lock = new Object();

            // Initialise only on the first request
            public static string Initialise(HttpContext context)
            {
                if (string.IsNullOrEmpty(host))
                {
                    lock (s_lock)
                    {
                        if (string.IsNullOrEmpty(host))
                        {
                            Uri uri = HttpContext.Current.Request.Url;
                            //host = uri.Scheme + Uri.SchemeDelimiter + uri.Host + ":" + uri.Port;
                            host = uri.Scheme + Uri.SchemeDelimiter + uri.Host + (uri.IsDefaultPort ? "" : ":" + uri.Port);
                        }
                    }
                }

                return host;
            }
        }


        private const string _WebApiPrefix = "api";

        private static string _WebApiExecutionPath = String.Format("~/{0}", _WebApiPrefix);

        protected void Application_PostAuthorizeRequest()
        {

            if (IsWebApiRequest())
            {
                HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
                //var ff = HttpContext.Current.Request.Headers["Cookie"];
            }

        }

        private static bool IsWebApiRequest()
        {

            return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(_WebApiExecutionPath);

        }

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //Common.CurrentHostingServer.Host = Request.RequestUri.Scheme + System.Uri.SchemeDelimiter + Request.RequestUri.Host + (Request.RequestUri.IsDefaultPort ? "" : ":" + Request.RequestUri.Port); ;

            // Initialize log4net.
            log4net.Config.XmlConfigurator.Configure();

        }

        public void Session_OnStart(object sender, EventArgs e)
        {
            Session.Timeout = 11;

            //Application.Lock();
            //Application["UsersOnline"] = (int)Application["UsersOnline"] + 1;
            //Application.UnLock();
        }

        public void Session_OnEnd(object sender, EventArgs e)
        {




            //Application.Lock();
            //Application["UsersOnline"] = (int)Application["UsersOnline"] - 1;
            //Application.UnLock();
        }

        void Application_BeginRequest(Object source, EventArgs e)
        {
            HttpApplication app = (HttpApplication)source;
            HttpContext context = app.Context;

            //Common.CurrentHostingServer.Host = FirstRequestInitialisation.Initialise(context);
            //Common.CurrentHostingServer.Host = "http://localhost:11205";
            //Common.CurrentHostingServer.Host = "http://192.168.1.105:11205";
            //Common.CurrentHostingServer.Host = "http://97.74.115.232:8090";
            //production
            //Common.CurrentHostingServer.Host = "https://takaful.iacad.gov.ae";
            //Development 

            #if DEVELOPMENT
                Common.CurrentHostingServer.Host = "http://localhost:11205";
            #elif STAGING
                                        //Common.CurrentHostingServer.Host = "http://172.16.1.168:8088";
                                        Common.CurrentHostingServer.Host = "http://172.16.120.164:8099";
            #elif RELEASE
                                        Common.CurrentHostingServer.Host = "https://takaful.iacad.gov.ae";
            #endif
            //Common.CurrentHostingServer.Host = "http://takaful.iacad.gov.ae:8888";
        }





    }

}


