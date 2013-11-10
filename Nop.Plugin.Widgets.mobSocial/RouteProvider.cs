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
                 "Plugins/mobSocial/Configure",
                 new { controller = "mobSocial", action = "Configure" },
                 new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("Plugin.Widgets.mobSocial.PublicInfo",
                 "Plugins/mobSocial/PublicInfo",
                 new { controller = "mobSocial", action = "PublicInfo" },
                 new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("TeamPage",
                  "Team/{teamId}",
                  new { controller = "mobSocial", action = "Team" },
                  new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("AddFriend",
                  "SocialNetwork/AddFriend/{toCustomerId}",
                  new { controller = "mobSocial", action = "AddFriend" },
                  new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("FriendRequests",
                  "SocialNetwork/FriendRequests",
                  new { controller = "mobSocial", action = "FriendRequests" },
                  new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("ConfirmFriend",
                "SocialNetwork/ConfirmFriend/{friendCustomerId}",
                new { controller = "mobSocial", action = "ConfirmFriend" },
                new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("PeopleSearchAutoComplete",
                            "SocialNetwork/SearchTermAutoComplete",
                            new { controller = "mobSocial", action = "SearchTermAutoComplete" },
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
