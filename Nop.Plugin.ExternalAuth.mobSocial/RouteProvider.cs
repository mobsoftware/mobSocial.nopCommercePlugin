using System.Web.Mvc;
using System.Web.Routing;
using Nop.Web.Framework.Mvc.Routes;

namespace Nop.Plugin.ExternalAuth.mobSocial
{
    public partial class RouteProvider : IRouteProvider
    {
        public void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute("Plugin.ExternalAuth.MobSocial.Login",
                 "Plugins/ExternalAuthMobSocial/Login",
                 new { controller = "ExternalAuthMobSocial", action = "Login" },
                 new[] { "Nop.Plugin.ExternalAuth.mobSocial.Controllers" }
            );

            routes.MapRoute("Plugin.ExternalAuth.MobSocial.LoginCallback",
                 "mobsocial/login-callback",
                 new { controller = "ExternalAuthMobSocial", action = "LoginCallback" },
                 new[] { "Nop.Plugin.ExternalAuth.mobSocial.Controllers" }
            );
        }
        public int Priority
        {
            get
            {
                return 0;
            }
        }
    }
}
