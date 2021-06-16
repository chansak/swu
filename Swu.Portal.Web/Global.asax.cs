using Swu.Portal.Data.Context;
using Swu.Portal.Data.Migrations;
using Swu.Portal.Web.Api.App_Start;
using System;
using System.Data.Entity;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Swu.Portal.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private const string ROOT_DOCUMENT = "/app";
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //Database.SetInitializer(new DatabaseInitializer());
            Database.SetInitializer<SwuDBContext>(null);
        }
        protected void Application_PostAuthorizeRequest()
        {
            System.Web.HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        }
        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            //UrlRewrite for fixing issues about nested state in html5 mode
            string url = Request.Url.LocalPath;
            if (url.Contains("/settings/V1"))
            {
                Context.RewritePath(url.Replace("/settings/V1", "/V1"));
            }
            if (url.Contains("/forum/V1"))
            {
                Context.RewritePath(url.Replace("/forum/V1", "/V1"));
            }
            if (url.Contains("/board/V1"))
            {
                Context.RewritePath(url.Replace("/board/V1", "/V1"));
            }
            if (url.Contains("/research/V1"))
            {
                Context.RewritePath(url.Replace("/research/V1", "/V1"));
            }
            if (url.Contains("board/1/forum/V1") || url.Contains("board/2/course/V1") || url.Contains("board/3/research/V1"))
            {
                if (url.Contains("board/1/forum/V1"))
                    Context.RewritePath(url.Replace("board/1/forum/V1", "/V1"));
                if (url.Contains("board/2/course/V1"))
                    Context.RewritePath(url.Replace("board/2/course/V1", "/V1"));
                if (url.Contains("board/3/research/V1"))
                    Context.RewritePath(url.Replace("board/3/research/V1", "/V1"));
            }
        }
    }
}
