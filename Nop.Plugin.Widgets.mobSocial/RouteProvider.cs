using System.Web.Mvc;
using System.Web.Routing;
using Nop.Web.Framework.Localization;
using Nop.Web.Framework.Mvc.Routes;

namespace Nop.Plugin.Widgets.MobSocial
{
    public partial class RouteProvider : IRouteProvider
    {
        public void RegisterRoutes(RouteCollection routes)
        {
            routes.MapLocalizedRoute("Plugin.Widgets.mobSocial.Configure",
                 "Plugins/SocialNetwork/Configure",
                 new { controller = "SocialNetwork", action = "Configure" },
                 new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("Plugin.Widgets.mobSocial.PublicInfo",
                 "Plugins/SocialNetwork/PublicInfo",
                 new { controller = "SocialNetwork", action = "PublicInfo" },
                 new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("TeamPage",
                  "Team/{teamId}",
                  new { controller = "SocialNetwork", action = "Team" },
                  new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("AddFriend",
                  "SocialNetwork/AddFriend/{toCustomerId}",
                  new { controller = "SocialNetwork", action = "AddFriend" },
                  new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("FriendRequests",
                  "SocialNetwork/FriendRequests",
                  new { controller = "SocialNetwork", action = "FriendRequests" },
                  new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("ConfirmFriend",
                "SocialNetwork/ConfirmFriend/{friendCustomerId}",
                new { controller = "SocialNetwork", action= "ConfirmFriend" },
                new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("PeopleSearchAutoComplete",
                            "SocialNetwork/SearchTermAutoComplete",
                            new { controller = "SocialNetwork", action = "SearchTermAutoComplete" },
                            new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" });







        }
        public int Priority
        {
            get
            {
                return 100;
            }
        }
    }
}
