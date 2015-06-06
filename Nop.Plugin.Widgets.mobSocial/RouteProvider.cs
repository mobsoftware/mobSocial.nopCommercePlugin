using System.Web.Mvc;
using System.Web.Routing;
using Nop.Web.Framework.Localization;
using Nop.Web.Framework.Mvc.Routes;
using Nop.Web.Framework.Seo;

namespace Nop.Plugin.Widgets.MobSocial
{
    public partial class RouteProvider : IRouteProvider
    {
        public void RegisterRoutes(RouteCollection routes)
        {

            // redirects to your store
            routes.MapRoute("FacebookWebsiteApp",
                "FacebookWebsiteApp",
                new {controller = "FacebookWebsiteApp", action = "Index"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );


            routes.MapRoute("GetCustomerProfile",
                "MobSocial/GetCustomerProfile/{customerId}",
                new {controller = "mobSocial", action = "GetCustomerProfile"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );

            routes.MapLocalizedRoute("PopulateUrlSlugs",
                "MobSocial/PopulateUrlSlugs",
                new {controller = "mobSocial", action = "PopulateUrlSlugs"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"});


            routes.MapLocalizedRoute("Plugin.Widgets.mobSocial.Configure",
                "Plugins/mobSocial/Configure",
                new {controller = "mobSocial", action = "Configure"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );

            routes.MapLocalizedRoute("Plugin.Widgets.mobSocial.PublicInfo",
                "Plugins/mobSocial/PublicInfo",
                new {controller = "mobSocial", action = "PublicInfo"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );








            routes.MapLocalizedRoute("TeamPage",
                "Team/{teamId}",
                new {controller = "mobSocial", action = "Team"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );

            routes.MapLocalizedRoute("AddFriend",
                "MobSocial/AddFriend/{toCustomerId}",
                new {controller = "mobSocial", action = "AddFriend"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );

            routes.MapLocalizedRoute("FriendRequests",
                "MobSocial/FriendRequests",
                new {controller = "mobSocial", action = "FriendRequests"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );

            routes.MapLocalizedRoute("ConfirmFriend",
                "MobSocial/ConfirmFriend/{friendCustomerId}",
                new {controller = "mobSocial", action = "ConfirmFriend"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );


            routes.MapLocalizedRoute("PeopleSearchAutoComplete",
                "MobSocial/SearchTermAutoComplete",
                new {controller = "mobSocial", action = "SearchTermAutoComplete"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"});


            routes.MapLocalizedRoute("EventPageSearchAutoComplete",
                "EventPage/EventPageSearchAutoComplete",
                new {controller = "EventPage", action = "EventPageSearchAutoComplete"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"});

            routes.MapLocalizedRoute("BusinessPageSearchAutoComplete",
                "BusinessPage/BusinessPageSearchAutoComplete",
                new {controller = "BusinessPage", action = "BusinessPageSearchAutoComplete"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"});


            //TODO: Change to new PictureController
            routes.MapLocalizedRoute("BusinessPageUploadFile",
                "BusinessPage/UploadFile/{entityId}/{entityName}",
                new {controller = "BusinessPage", action = "UploadFile"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}


                );

            routes.MapLocalizedRoute("BusinessPageAddPicture",
                "BusinessPage/AddPicture/{entityId}/{entityName}",
                new {controller = "BusinessPage", action = "AddPicture"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}


                );


            // TODO: Make business page search url driven from mobSocial settings
            // for use in views
            routes.MapLocalizedRoute("BusinessPageSearchUrl",
                "BusinessPageSearch",
                new {controller = "BusinessPage", action = "Search"},
                new[] {"Nop.Plugin.Widgets.MobSocial.Controllers"});



            // admin routes
            routes.MapRoute("ManageTeamPage",
                "ManageTeamPage/{action}",
                new {controller = "TeamPage", action = "Index"},
                new[] {"Nop.Plugin.Widgets.MobSocial.Admin.Controllers"}
                );

            routes.MapRoute("ManageEventPage",
                "ManageEventPage/{action}",
                new {controller = "ManageEventPage", action = "Index"},
                new[] {"Nop.Plugin.Widgets.MobSocial.Admin.Controllers"}
                );

            routes.MapLocalizedRoute("MusicSearch",
                "Music",
                new { controller = "ArtistPage", action = "Search" },
                new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                );

            routes.MapLocalizedRoute("ArtistSearch",
             "ArtistSearch",
             new { controller = "ArtistPage", action = "Search" },
             new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
             );


            routes.MapLocalizedRoute("ArtistsPage",
                "artists/{action}",
                new { controller = "ArtistPage", action = "Index" },
                new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                );

            //remote -artists dynamic page creation
            routes.MapLocalizedRoute("ArtistPageRemote",
                  "remote-artist/{remoteEntityId}",
                  new { controller = "ArtistPage", action = "RemoteArtist" },
                  new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                  );

            routes.MapLocalizedRoute("ArtistPageUploadPicture",
                "artists/UploadPicture/{ArtistPageId}",
                new { controller = "ArtistPage", action = "UploadPicture" },
                new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }


                );


            //remote -songs dynamic page creation
            routes.MapLocalizedRoute("SongRemote",
                  "remote-song/{remoteEntityId}",
                  new { controller = "Song", action = "RemoteArtist" },
                  new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                  );

            routes.MapLocalizedRoute("SongsPage",
                "songs/{action}",
                new { controller = "Song", action = "Index" },
                new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                );

         
            routes.MapLocalizedRoute("SongSearch",
               "SongSearch",
               new { controller = "Song", action = "Search" },
               new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
               );


            // Use SignalR 1.x until nopCommerce uses Microsoft Owin IAppBuilder
            routes.MapHubs();
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
