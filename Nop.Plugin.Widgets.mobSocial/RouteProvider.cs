using System.Web.Mvc;
using System.Web.Routing;
using Nop.Plugin.Widgets.MobSocial.ViewEngines;
using Nop.Web.Framework.Localization;
using Nop.Web.Framework.Mvc.Routes;
using Nop.Web.Framework.Themes;
using System.Linq;
using System.Diagnostics;

namespace Nop.Plugin.Widgets.MobSocial
{
    public partial class RouteProvider : IRouteProvider
    {
        public void RegisterRoutes(RouteCollection routes)
        {
            // Make MobSocialViewEngine views the Highest Priority
            System.Web.Mvc.ViewEngines.Engines.Add(new MobSocialViewEngine());

            Debug.WriteLine("Added view engine");

           
          
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

            routes.MapLocalizedRoute("CustomerProfileUploadPicture",
                          "CustomerProfile/UploadPicture",
                          new { controller = "CustomerProfile", action = "UploadPicture" },
                          new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                          );
            routes.MapLocalizedRoute("CustomerProfileSetPictureAsCover",
                "CustomerProfile/SetPictureAs",
                new { controller = "CustomerProfile", action = "SetPictureAs" },
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"});

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
                "Friends/AddFriend",
                new {controller = "Friends", action = "AddFriend"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );

            routes.MapLocalizedRoute("FriendButton",
               "Friends/FriendButton",
               new { controller = "Friends", action = "FriendButton" },
               new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
               );
            routes.MapLocalizedRoute("FriendRequests",
                "Friends/FriendRequests",
                new {controller = "Friends", action = "FriendRequests"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );

            routes.MapLocalizedRoute("GetFriendRequests",
                "Friends/GetFriendRequests",
                new { controller = "Friends", action = "GetFriendRequests" },
                new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                );

            routes.MapLocalizedRoute("ConfirmFriend",
                "Friends/ConfirmFriend",
                new {controller = "Friends", action = "ConfirmFriend"},
                new[] {"Nop.Plugin.Widgets.mobSocial.Controllers"}
                );

            routes.MapLocalizedRoute("DeclineFriend",
              "Friends/DeclineFriend",
              new { controller = "Friends", action = "DeclineFriend" },
              new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
              );

            routes.MapLocalizedRoute("Friends",
            "Friends/{CustomerId}",
            new { controller = "Friends", action = "CustomerFriends", CustomerId = UrlParameter.Optional },
            new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
            );

            routes.MapLocalizedRoute("SearchPeople",
              "SearchPeople",
              new { controller = "Friends", action = "SearchPeople" },
              new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
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
                  new { controller = "Song", action = "RemoteSong" },
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

            routes.MapLocalizedRoute("SongPageUploadPicture",
               "songs/UploadPicture/{SongId}",
               new { controller = "Song", action = "UploadPicture" },
               new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

               );

            routes.MapLocalizedRoute("SongPageUploadSong",
               "songs/UploadSong/{SongId}",
               new { controller = "Song", action = "UploadSong" },
               new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

               );

            routes.MapLocalizedRoute("SongPageEditor",
              "songs/SongEditor/{ArtistPageId}",
              new { controller = "Song", action = "SongEditor" },
              new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

              );

            //video battles
            routes.MapLocalizedRoute("VideoBattles",
                          "VideoBattles/view/{ViewType}",
                          new { controller = "VideoBattle", action = "VideoBattles", ViewType = UrlParameter.Optional },
                          new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                          );
            routes.MapLocalizedRoute("VideoBattleList",
                       "VideoBattles/GetBattles",
                       new { controller = "VideoBattle", action = "GetBattles" },
                       new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                       );

            routes.MapLocalizedRoute("VideoBattleEditor",
                          "VideoBattles/Editor/{VideoBattleId}",
                          new { controller = "VideoBattle", action = "VideoBattleEditor", VideoBattleId = UrlParameter.Optional },
                          new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                          );


            routes.MapLocalizedRoute("VideoBattleSave",
                          "VideoBattles/SaveVideoBattle",
                          new { controller = "VideoBattle", action = "SaveVideoBattle" },
                          new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                          );
            routes.MapLocalizedRoute("VideoBattleUploadVideo",
                          "VideoBattles/UploadVideo",
                          new { controller = "VideoBattle", action = "UploadVideo" },
                          new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                          );
            routes.MapLocalizedRoute("VideoBattleUploadPicture",
                          "VideoBattles/UploadPicture",
                          new { controller = "VideoBattle", action = "UploadPicture" },
                          new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                          );
            routes.MapLocalizedRoute("VideoBattleSetPictureAsCover",
                         "VideoBattles/SetPictureAsCover",
                         new { controller = "VideoBattle", action = "SetPictureAsCover" },
                         new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                         );
            routes.MapLocalizedRoute("VideoBattlePage",
                          "VideoBattle/{SeName}/{ViewMode}",
                          new { controller = "VideoBattle", action = "Index", ViewMode = UrlParameter.Optional },
                          new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                          );

            routes.MapLocalizedRoute("VideoBattleInviteParticipants",
                          "VideoBattles/InviteParticipants",
                          new { controller = "VideoBattle", action = "InviteParticipants" },
                          new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                          );
            routes.MapLocalizedRoute("VideoBattleInviteVoters",
                         "VideoBattles/InviteVoters",
                         new { controller = "VideoBattle", action = "InviteVoters" },
                         new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                         );
            routes.MapLocalizedRoute("VideoBattleUpdateParticipantStatus",
                          "VideoBattles/UpdateParticipantStatus",
                          new { controller = "VideoBattle", action = "UpdateParticipantStatus" },
                          new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                          );
            routes.MapLocalizedRoute("VideoBattleVoteBattle",
                         "VideoBattles/VoteBattle",
                         new { controller = "VideoBattle", action = "VoteBattle" },
                         new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                         );

            routes.MapLocalizedRoute("VideoBattleJoinBattle",
                        "VideoBattles/JoinBattle",
                        new { controller = "VideoBattle", action = "JoinBattle" },
                        new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                        );

            routes.MapLocalizedRoute("VideoBattleDelete",
                        "VideoBattles/DeleteVideoBattle",
                        new { controller = "VideoBattle", action = "DeleteVideoBattle" },
                        new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                        );

            routes.MapLocalizedRoute("VideoBattleMarkVideoWatched",
                        "VideoBattles/MarkVideoWatched",
                        new { controller = "VideoBattle", action = "MarkVideoWatched" },
                        new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                        );

            routes.MapLocalizedRoute("VideoBattleSavePrize",
                        "VideoBattles/SavePrize",
                        new { controller = "VideoBattle", action = "SavePrize" },
                        new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                        );

            routes.MapLocalizedRoute("VideoBattleDeletePrize",
                       "VideoBattles/DeletePrize",
                       new { controller = "VideoBattle", action = "DeletePrize" },
                       new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                       );

            routes.MapLocalizedRoute("VideoBattleGetPrizeDetails",
                       "VideoBattles/GetPrizeDetails",
                       new { controller = "VideoBattle", action = "GetPrizeDetails" },
                       new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                       );

            //payments
            routes.MapLocalizedRoute("PaymentFormPopup",
                       "Payment/PaymentFormPopup",
                       new { controller = "Payment", action = "PaymentFormPopup" },
                       new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                       );

            routes.MapLocalizedRoute("AddressFormPopup",
                       "Payment/AddressFormPopup",
                       new { controller = "Payment", action = "AddressFormPopup" },
                       new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                       );

            routes.MapLocalizedRoute("PurchasePass",
                       "Payment/PurchasePass",
                       new { controller = "Payment", action = "PurchasePass" },
                       new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                       );

            //sponsors
            routes.MapLocalizedRoute("SaveSponsor",
                      "Sponsor/SaveSponsor",
                      new { controller = "Sponsor", action = "SaveSponsor" },
                      new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                      );

            routes.MapLocalizedRoute("UpdateSponsor",
                       "Sponsor/UpdateSponsor",
                       new { controller = "Sponsor", action = "UpdateSponsor" },
                       new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                       );

            routes.MapLocalizedRoute("SaveSponsorData",
                   "Sponsor/SaveSponsorData",
                   new { controller = "Sponsor", action = "SaveSponsorData" },
                   new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                   );
            routes.MapLocalizedRoute("SponsorDashboard",
                       "SponsorDashboard/{BattleType}/{BattleId}",
                       new { controller = "Sponsor", action = "SponsorDashboard" },
                       new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                       );
            routes.MapLocalizedRoute("GetSponsors",
                       "Sponsor/GetSponsors",
                       new { controller = "Sponsor", action = "GetSponsors" },
                       new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                       );

            routes.MapLocalizedRoute("UploadSponsorPicture",
                   "Sponsor/UploadPicture",
                   new { controller = "Sponsor", action = "UploadPicture" },
                   new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                   );
            routes.MapLocalizedRoute("SaveSponsorProductPrizes",
                   "Sponsor/SaveSponsorProductPrizes",
                   new { controller = "Sponsor", action = "SaveSponsorProductPrizes" },
                   new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }

                   );
            
            //follow unfollow
            routes.MapLocalizedRoute("CustomerFollowEntity",
                   "Follow/{entityName}",
                   new { controller = "CustomerFollow", action = "Follow" },
                   new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                   );
            routes.MapLocalizedRoute("CustomerUnfollowEntity",
                  "Unfollow/{entityName}",
                  new { controller = "CustomerFollow", action = "Unfollow" },
                  new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                  );
            routes.MapLocalizedRoute("CustomerFollowButton",
                 "CustomerFollowButton",
                 new { controller = "CustomerFollow", action = "CustomerFollowButton" },
                 new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                 );

            routes.MapLocalizedRoute("TimelinePage",
                 "Timeline",
                 new { controller = "Timeline", action = "Timeline" },
                 new[] { "Nop.Plugin.Widgets.mobSocial.Controllers" }
                 );

            // Use SignalR 1.x until nopCommerce uses Microsoft Owin IAppBuilder
            //routes.MapHubs(); Video Conferrencing on hold until Owin IAppBuilder

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
