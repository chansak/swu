using Microsoft.Owin;
using Owin;
using Swu.Portal.Web.Api.v2;

[assembly: OwinStartupAttribute(typeof(Swu.Portal.Web.Api.v2.Startup))]
namespace Swu.Portal.Web.Api.v2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureApp(app);
        }
    }
}
