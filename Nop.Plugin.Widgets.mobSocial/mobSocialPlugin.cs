using System.Collections.Generic;
using System.Web.Routing;
using Nop.Core.Domain.Media;
using Nop.Core.Domain.Messages;
using Nop.Core.Domain.Tasks;
using Nop.Core.Plugins;
using Nop.Plugin.Widgets.MobSocial.Data;
using Nop.Services.Cms;
using Nop.Services.Configuration;
using Nop.Services.Localization;
using Nop.Services.Messages;
using Nop.Services.Tasks;
using Nop.Web.Framework.Menu;
using System.Web.Configuration;
using MobAds.Public;
using Nop.Core;
using System.Linq;
using Nop.Plugin.Widgets.MobSocial.Services;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class mobSocialPlugin : MobAdsPublic, IAdminMenuPlugin
    {


        private readonly MobSocialObjectContext _context;
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly ISettingService _settingService;
        private readonly IMessageTemplateService _messageTemplateService;
        private readonly IScheduleTaskService _scheduleTaskService;
        private readonly IMobSocialService _mobSocialService;
        private readonly ILocalizationService _localizationService;
        private readonly HttpRuntimeSection _config;
        private readonly IStoreContext _storeContext;
        private readonly IVideoBattleService _videoBattleService;

        public mobSocialPlugin(MobSocialObjectContext context, mobSocialSettings mobSocialSettings,
            ISettingService settingService, IMessageTemplateService messageTemplateService,
            IScheduleTaskService scheduleTaskService,
            IMobSocialService mobSocialService,
            ILocalizationService localizationService,
            IStoreContext storeContext,
            IVideoBattleService videoBattleService)
            : base(storeContext, settingService)
        {
            _context = context;
            _mobSocialSettings = mobSocialSettings;
            _settingService = settingService;
            _messageTemplateService = messageTemplateService;
            _scheduleTaskService = scheduleTaskService;
            _mobSocialService = mobSocialService;
            _localizationService = localizationService;
            _videoBattleService = videoBattleService;
            _storeContext = storeContext;
            _config = new HttpRuntimeSection(); //TODO Move to dependency registrar and perform injection

        }


        #region Methods

        public override IList<string> GetWidgetDisplayZones()
        {
            return !string.IsNullOrWhiteSpace(_mobSocialSettings.WidgetZone)
                      ? new List<string>() { 
                          _mobSocialSettings.WidgetZone, 
                          "head_html_tag",
                          "header_menu_after", 
                          "account_navigation_after", 
                          "profile_page_info_userdetails",
                          "searchbox_before_search_button"
        }
                      : new List<string>() { "after_header_links" };
        }

        /// <summary>
        /// Gets a route for provider configuration
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>
        public override void GetConfigurationRoute(out string actionName, out string controllerName, out RouteValueDictionary routeValues)
        {
            actionName = "Configure";
            controllerName = "MobSocial";
            routeValues = new RouteValueDictionary() { { "Namespaces", "Nop.Plugin.Widgets.mobSocial.Controllers" }, { "area", null } };
        }

        /// <summary>
        /// Gets a route for displaying widget
        /// </summary>
        /// <param name="widgetZone">Widget zone where it's displayed</param>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>
        public override void GetWidgetRoute(string widgetZone, out string actionName, out string controllerName, out RouteValueDictionary routeValues)
        {

            switch (widgetZone)
            {
                case "head_html_tag":
                    {
                        actionName = "HeadTagInclusions";
                        controllerName = "mobSocial";

                        routeValues = new RouteValueDictionary()
                        {
                            {"Namespaces", "Nop.Plugin.Widgets.MobSocial.Controllers"},
                            {"area", null},
                            {"widgetZone", widgetZone}
                        };

                        break;
                    }
                case "footer":
                    {
                        actionName = "SocialNetworkByMobSocial";
                        controllerName = "mobSocial";

                        routeValues = new RouteValueDictionary()
                        {
                            {"Namespaces", "Nop.Plugin.Widgets.MobSocial.Controllers"},
                            {"area", null},
                            {"widgetZone", widgetZone}
                        };

                        break;
                    }

                case "header_menu_after":
                    {
                        actionName = "PublicInfo";
                        controllerName = "HeaderMenu";

                        routeValues = new RouteValueDictionary()
                    {
                        {"Namespaces", "Nop.Plugin.Widgets.MobSocial.Controllers" },
                        {"area", null},
                        {"widgetZone", widgetZone}
                    };
                        break;
                    }


                case "account_navigation_after":
                    {
                        actionName = "PublicInfo";
                        controllerName = "SocialNetworkNavigation";

                        routeValues = new RouteValueDictionary()
                    {
                        {"Namespaces", "Nop.Plugin.Widgets.MobSocial.Controllers" },
                        {"area", null},
                        {"widgetZone", widgetZone}
                    };
                        break;
                    }
                case "profile_page_info_userdetails":
                    {
                        actionName = "PublicInfo";
                        controllerName = "CustomerProfile";

                        routeValues = new RouteValueDictionary()
                    {
                        {"Namespaces", "Nop.Plugin.Widgets.MobSocial.Controllers" },
                        {"area", null},
                        {"widgetZone", widgetZone}
                    };
                        break;
                    }
                case "searchbox_before_search_button":
                    {
                        actionName = "GlobalSearchOptions";
                        controllerName = "mobSocial";

                        routeValues = new RouteValueDictionary()
                        {
                            {"Namespaces", "Nop.Plugin.Widgets.MobSocial.Controllers"},
                            {"area", null},
                            {"widgetZone", widgetZone}
                        };

                        break;
                    }
                default:
                    {
                        actionName = "PublicInfo";
                        controllerName = "mobSocial";

                        routeValues = new RouteValueDictionary()
                        {
                            {"Namespaces", "Nop.Plugin.Widgets.MobSocial.Controllers" },
                            {"area", null},
                            {"widgetZone", widgetZone}
                        };
                        break;
                    }
            }
        }


        /// <summary>
        /// Install plugin
        /// </summary>
        public override void Install()
        {
            //locales
            //this.AddOrUpdatePluginLocaleResource("Plugins.ProductCarousel.Cache", "true");
            //It's required to set initializer to null (for SQL Server Compact).
            //otherwise, you'll get something like "The model backing the 'your context name' context has changed since the database was created. Consider using Code First Migrations to update the database"

            //settings
            var mobSocialSettings = new mobSocialSettings() {
                ProfilePictureSize = 100,
                WidgetZone = "after_header_links",
                PeopleSearchAutoCompleteEnabled = true,
                PeopleSearchAutoCompleteNumberOfResults = 10,
                EventPageSearchAutoCompleteNumberOfResults = 10,
                PeopleSearchTermMinimumLength = 3,
                EventPageSearchTermMinimumLength = 1,
                ShowProfileImagesInSearchAutoComplete = true,
                CustomerAlbumPictureThumbnailWidth = 290,
                MaximumMainAlbumPictures = 10,
                MaximumMainAlbumVideos = 10,
                EventPageAttendanceThumbnailSize = 25,
                UninvitedFriendsNumberOfResults = 20,
                CustomerProfileUpdateViewCountAfterNumberOfSeconds = 180, // 3 minutes,
                FacebookWebsiteAppId = "1234567890123456",
                BusinessPageSearchUrl = "BusinessSearch",
                ArtistPageMainImageSize = 300,
                ArtistPageThumbnailSize = 150,
                // Would you like to replace the api key with your own? 
                // Find more info here by contacting us at info@skatemob.com
                EchonestAPIKey = "DQFW7ZCMHBBLMLVFE",
                // Would you like to replace the partner id with your own? 
                // Find more info here by contacting us at info@skatemob.com
                SevenDigitalPartnerId = "9378",
                SongFileMaximumUploadSize = _config.MaxRequestLength,
                SongFileSampleMaximumUploadSize = _config.MaxRequestLength,
                PurchasedSongFeePercentage = 30,
                ShowVideoThumbnailsForBattles = true,
                DefaultVotingChargeForPaidVoting = 0.99m
            };


            var mediaSettings = new MediaSettings() {
                AvatarPictureSize = 200
            };



            AddLocaleResourceStrings();



            _settingService.SaveSetting(mediaSettings);
            _settingService.SaveSetting(mobSocialSettings);


            InsertMessageTemplates();

            AddScheduledTasks();



            _context.Install();

            base.Install();

        }






        public override void Uninstall()
        {
            //locales
            this.DeletePluginLocaleResource("MobSocial.MessageButtonText");
            this.DeletePluginLocaleResource("MobSocial.AddFriendButtonText");
            this.DeletePluginLocaleResource("MobSocial.FriendsLabelText");
            this.DeletePluginLocaleResource("MobSocial.FriendRequestSentLabel");
            this.DeletePluginLocaleResource("MobSocial.ConfirmFriendButtonText");
            this.DeletePluginLocaleResource("SearchDropdown.PeopleSearchText");
            // do not remove core locales

            RemoveScheduledTask("Nop.Plugin.Widgets.MobSocial.Tasks.FriendRequestNotificationTask, Nop.Plugin.Widgets.MobSocial");
            RemoveScheduledTask("Nop.Plugin.Widgets.MobSocial.Tasks.VideoBattlesStatusUpdateTask, Nop.Plugin.Widgets.MobSocial");

            //delete message templates
            DeleteMessageTemplates();

            //settings
            _settingService.DeleteSetting<mobSocialSettings>();

            _context.Uninstall();

            base.Uninstall();
        }

        #endregion

        #region Tasks
        public void SendFriendRequestNotifications()
        {
            _mobSocialService.SendFriendRequestNotifications();
        }

        public void SendProductReviewNotifications()
        {
            _mobSocialService.SendProductReviewNotifications();
        }


        public void SetScheduledVideoBattlesOpenOrClosed()
        {
            _videoBattleService.SetScheduledBattlesOpenOrClosed();
        }


        #endregion

        public bool Authenticate()
        {
            return true;
        }

        public Nop.Web.Framework.Menu.SiteMapNode BuildMenuItem()
        {


            var menuItem = new Nop.Web.Framework.Menu.SiteMapNode() {
                Title = _localizationService.GetResource("Plugins.Widgets.MobSocial.AdminMenu.Text"),
                ControllerName = "TeamPage",
                ActionName = "Index",
                Visible = true,
                RouteValues = new RouteValueDictionary() { { "area", null } },
            };

            var manageTeamSubMenu = new Nop.Web.Framework.Menu.SiteMapNode() {
                Title = _localizationService.GetResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageTeamPage"),
                ControllerName = "TeamPage",
                ActionName = "Index",
                Visible = true,
                RouteValues = new RouteValueDictionary() { { "area", null } },
            };




            var manageEventsSubMenu = new Nop.Web.Framework.Menu.SiteMapNode() {
                Title = _localizationService.GetResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageEventPage"),
                ControllerName = "ManageEventPage",
                ActionName = "List",
                Visible = true,
                RouteValues = new RouteValueDictionary() { { "area", null } },

            };

            menuItem.ChildNodes.Add(manageTeamSubMenu);
            menuItem.ChildNodes.Add(manageEventsSubMenu);


            return menuItem;
        }




        #region Helper Methods
        private void AddScheduledTasks()
        {
            const int every24hrs = 24 * 60 * 60;
            AddScheduledTask("Friend Request Notification Task", every24hrs, false, false, "Nop.Plugin.Widgets.MobSocial.Tasks.FriendRequestNotificationTask, Nop.Plugin.Widgets.MobSocial");
            AddScheduledTask("Product Review Notification Task", every24hrs, false, false, "Nop.Plugin.Widgets.MobSocial.Tasks.ProductReviewNotificationTask, Nop.Plugin.Widgets.MobSocial");

            const int every5Min = 5 * 60;
            AddScheduledTask("Video Battle Status Update Task", every5Min, true, false, "Nop.Plugin.Widgets.MobSocial.Tasks.VideoBattlesStatusUpdateTask, Nop.Plugin.Widgets.MobSocial");


        }


        private void AddScheduledTask(string name, int seconds, bool enabled, bool stopOnError, string type)
        {
            var task = _scheduleTaskService.GetTaskByType(type);

            if (task != null)
                return;
            task = new ScheduleTask {
                Name = name,
                Seconds = seconds,
                Type = type,
                Enabled = enabled,
                StopOnError = stopOnError,
            };

            _scheduleTaskService.InsertTask(task);
        }


        private void RemoveScheduledTask(string type)
        {
            var task = _scheduleTaskService.GetTaskByType(type);

            if (task != null)
                _scheduleTaskService.DeleteTask(task);

        }



        private void AddLocaleResourceStrings()
        {
            this.AddOrUpdatePluginLocaleResource("MobSocial.MessageButtonText", "Send Message");
            this.AddOrUpdatePluginLocaleResource("MobSocial.AddFriendButtonText", "Add Friend");
            this.AddOrUpdatePluginLocaleResource("MobSocial.FriendsLabelText", "Friends");
            this.AddOrUpdatePluginLocaleResource("MobSocial.FriendRequestSentLabel", "Friend Request Sent!");
            this.AddOrUpdatePluginLocaleResource("MobSocial.ConfirmFriendButtonText", "Confirm");
            this.AddOrUpdatePluginLocaleResource("MobSocial.ConfirmedButtonText", "Confirmed!");
            this.AddOrUpdatePluginLocaleResource("SearchDropdown.PeopleSearchText", "People");
            this.AddOrUpdatePluginLocaleResource("SearchDropdown.EventPageSearchText", "Events");
            this.AddOrUpdatePluginLocaleResource("SearchDropdown.BusinessPageSearchText", "Businesses");
            this.AddOrUpdatePluginLocaleResource("Plugins.Widgets.MobSocial.AdminMenu.Text", "Social Network");
            this.AddOrUpdatePluginLocaleResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageTeamPage", "Manage Team Pages");
            this.AddOrUpdatePluginLocaleResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageEventPage", "Manage Event Pages");
            this.AddOrUpdatePluginLocaleResource("Admin.EventPage.BackToList", "Back to list");
            this.AddOrUpdatePluginLocaleResource("BusinessPages.HoursOfOperationText", "Hours of Operation");
            this.AddOrUpdatePluginLocaleResource("BusinessPages.HeaderMenuName", "Businesses");
            this.AddOrUpdatePluginLocaleResource("ArtistPages.SendPaymentMessageText", "When my song purchases reach $10 net amount, send payment to:");


            // Update core locales. do not remove core locales during uninstall
            this.AddOrUpdatePluginLocaleResource("Profile.ProfileOf", "{0}");
            this.AddOrUpdatePluginLocaleResource("Account.Avatar", "Profile Picture");
            this.AddOrUpdatePluginLocaleResource("Account.Avatar.MaximumUploadedFileSize", "Maximum profile picture size is {0} bytes");
            this.AddOrUpdatePluginLocaleResource("Account.Avatar.RemoveAvatar", "Remove Profile Picture");
            this.AddOrUpdatePluginLocaleResource("Account.Avatar.UploadRules", "Profile Picture must be in GIF or JPEG format with the maximum size of 20 KB");

        }

        private void InsertMessageTemplates()
        {
            // Require user to login in order to view who and confirm the requests. Curiousity will drive traffic back to the site. - Bruce Leggett
            var friendRequestNotification = new MessageTemplate() {
                Name = "MobSocial.FriendRequestNotification",
                Subject = "You have a new friend request at %Store.Name%",
                Body = "You have a new friend request!<br/><br/>" +
                       "<a href=\"%Store.URL%\">Log in</a> to view and confirm your friend request.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false

            };
            _messageTemplateService.InsertMessageTemplate(friendRequestNotification);


            // Send periodic friend request reminders, but not too many that frustrate users - Bruce Leggett
            var friendRequestReminderNotification = new MessageTemplate() {
                Name = "MobSocial.PendingFriendRequestNotification",
                Subject = "You have pending friend requests at %Store.Name%",
                Body = "You have friends waiting for you to confirm their requests!<br/><br/>" +
                       "<a href=\"%Store.URL%\">Log in</a> to view and confirm your friend requests.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false

            };
            _messageTemplateService.InsertMessageTemplate(friendRequestReminderNotification);

            // Require user to login in order to view what event - Bruce Leggett
            var eventInvitationNotification = new MessageTemplate() {
                Name = "MobSocial.EventInvitationNotification",
                Subject = "You have been invited to an event on %Store.Name%",
                Body = "You have just been invited to an event!<br/><br/>" +
                       "<a href=\"%Store.URL%\">Log in</a> to view the event invitation.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false

            };
            _messageTemplateService.InsertMessageTemplate(eventInvitationNotification);


            var productReviewNotification = new MessageTemplate() {
                Name = "MobSocial.ProductReviewNotification",
                Subject = "How do you like the products you ordered?",
                Body = "Hi %Customer.FirstName%,<br/><br/> What do you think about the products you've ordered? What do you think about the products you've ordered? Click on the products below to write a review and let us and others know what you think?<br/><br/>" +
                       "%ProductUrls% <br/><br/>" +
                       "Thanks!<br/> %Store.Name% Team",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false

            };
            _messageTemplateService.InsertMessageTemplate(productReviewNotification);



            var someoneSentYouASongNotification = new MessageTemplate() {
                Name = "MobSocial.SomeoneSentYouASongNotification",
                Subject = "%Friend.FirstName% sent you a song!",
                Body = "<a href=\"%Store.URL%\">Log in</a> to %Friend.FirstName%'s song to you.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false
            };

            _messageTemplateService.InsertMessageTemplate(someoneSentYouASongNotification);


            var someoneChallengedForBattleNotification = new MessageTemplate() {
                Name = "MobSocial.SomeoneChallengedYouForBattleNotification",
                Subject = "%Challenger.FirstName% challenged you for a video battle!",
                Body = "<a href=\"%Store.URL%\">Log in</a> to accept the challege.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false
            };

            _messageTemplateService.InsertMessageTemplate(someoneChallengedForBattleNotification);

            var videoBattleCompleteNotificationToParticipants = new MessageTemplate() {
                Name = "MobSocial.VideoBattleCompleteNotificationToParticipants",
                Subject = "%VideoBattle.Title% is complete!",
                Body = "<a href=\"%VideoBattle.Url%\">Visit Battle Page</a> to see the winner.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false
            };
            _messageTemplateService.InsertMessageTemplate(videoBattleCompleteNotificationToParticipants);

            var videoBattleCompleteNotificationToVoters = new MessageTemplate() {
                Name = "MobSocial.VideoBattleCompleteNotificationToVoters",
                Subject = "%VideoBattle.Title% is complete!",
                Body = "<a href=\"%VideoBattle.Url%\">Visit Battle Page</a> to see the winner.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false
            };
            _messageTemplateService.InsertMessageTemplate(videoBattleCompleteNotificationToVoters);

            var someoneInvitedYouToVote = new MessageTemplate() {
                Name = "MobSocial.SomeoneInvitedYouToVoteNotification",
                Subject = "You have been invited to judge %VideoBattle.Title%!",
                Body = "<a href=\"%VideoBattle.Url%\">Visit Battle Page</a> to judge the participants.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false
            };
            _messageTemplateService.InsertMessageTemplate(someoneInvitedYouToVote);

            var voteReminderNotification = new MessageTemplate() {
                Name = "MobSocial.VoteReminderNotification",
                Subject = "You have been invited to judge %VideoBattle.Title%!",
                Body = "<a href=\"%VideoBattle.Url%\">Visit Battle Page</a> to judge the participants.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false
            };

            _messageTemplateService.InsertMessageTemplate(voteReminderNotification);

            var battleSignupNotification = new MessageTemplate() {
                Name = "MobSocial.VideoBattleSignupNotification",
                Subject = "%Challenger.Name% has signed up for %VideoBattle.Title%!",
                Body = "<a href=\"%VideoBattle.Url%\">Visit Battle Page</a> to approve the participants.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false
            };

            _messageTemplateService.InsertMessageTemplate(battleSignupNotification);

            var battleJoinNotification = new MessageTemplate() {
                Name = "MobSocial.VideoBattleJoinNotification",
                Subject = "%Challenger.Name% is also participating in %VideoBattle.Title%!",
                Body = "<a href=\"%VideoBattle.Url%\">Visit Battle Page</a> to view the participants.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false
            };

            _messageTemplateService.InsertMessageTemplate(battleJoinNotification);

            var signupAcceptedNotification = new MessageTemplate() {
                Name = "MobSocial.VideoBattleSignupAcceptedNotification",
                Subject = "You have been approved to participate in %VideoBattle.Title%!",
                Body = "<a href=\"%VideoBattle.Url%\">Visit Battle Page</a> to view the battle.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false
            };

            _messageTemplateService.InsertMessageTemplate(signupAcceptedNotification);

        }

        private void DeleteMessageTemplates()
        {
            var messageTemplates = new List<string>()
            {
                "MobSocial.FriendRequestNotification",
                "MobSocial.PendingFriendRequestNotification",
                "MobSocial.EventInvitationNotification",
                "MobSocial.ProductReviewNotification",
                "MobSocial.SomeoneSentYouASongNotification",
                "MobSocial.SomeoneChallengedYouForBattleNotification",
                "MobSocial.VideoBattleCompleteNotificationToParticipants",
                "MobSocial.VideoBattleCompleteNotificationToVoters",
                "MobSocial.SomeoneInvitedYouToVoteNotification",
                "MobSocial.VoteReminderNotification",
                "MobSocial.VideoBattleSignupNotification",
                "MobSocial.VideoBattleJoinNotification",
                "MobSocial.VideoBattleSignupAcceptedNotification"
            };

            foreach (var template in messageTemplates)
            {
                var messageTemplate = _messageTemplateService.GetMessageTemplateByName(template, _storeContext.CurrentStore.Id);
                if (messageTemplate == null)
                    continue;

                _messageTemplateService.DeleteMessageTemplate(messageTemplate);
            }
        }
        #endregion


        public void ManageSiteMap(SiteMapNode rootNode)
        {

            var menuItem = new SiteMapNode() {
                Title = _localizationService.GetResource("Plugins.Widgets.MobSocial.AdminMenu.Text"),
                ControllerName = "TeamPage",
                ActionName = "Index",
                Visible = true,
                RouteValues = new RouteValueDictionary() { { "area", null } },
            };

            var manageTeamSubMenu = new SiteMapNode() {
                Title = _localizationService.GetResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageTeamPage"),
                ControllerName = "TeamPage",
                ActionName = "Index",
                Visible = true,
                RouteValues = new RouteValueDictionary() { { "area", null } },
            };




            var manageEventsSubMenu = new SiteMapNode() {
                Title = _localizationService.GetResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageEventPage"),
                ControllerName = "ManageEventPage",
                ActionName = "List",
                Visible = true,
                RouteValues = new RouteValueDictionary() { { "area", null } },

            };

            menuItem.ChildNodes.Add(manageTeamSubMenu);
            menuItem.ChildNodes.Add(manageEventsSubMenu);


            var pluginNode = rootNode.ChildNodes.FirstOrDefault(x => x.SystemName == "Third party plugins");

            if (pluginNode != null)
                pluginNode.ChildNodes.Add(menuItem);
            else
                rootNode.ChildNodes.Add(menuItem);

        }


        public override string AppId
        {
            get { return "MobSocialPluginNop3.5"; }
        }


        public override int MobAdsClientId
        {
            get { return 0; }
        }



    }
}

