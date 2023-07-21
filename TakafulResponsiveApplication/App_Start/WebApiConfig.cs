using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http.Cors;
using System.Web.Http.Routing;
using Newtonsoft.Json;

namespace TakafulResponsiveApplication
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            // Web API configuration and services
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;
            serializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            config.Formatters.Clear();  //Clear all formatters
            config.Formatters.Add(new JsonMediaTypeFormatter());    //Return only json (the default & only format)


            config.Formatters.JsonFormatter.SerializerSettings = serializerSettings;
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));    //To enable CORS

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute("DefaultApiWithAction", "api/{controller}/{action}");
            config.Routes.MapHttpRoute("DefaultApiGet", "api/{controller}", new { action = "Get" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) });
            config.Routes.MapHttpRoute("DefaultApiPost", "api/{controller}", new { action = "Post" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Post) });







        }
    }
}
