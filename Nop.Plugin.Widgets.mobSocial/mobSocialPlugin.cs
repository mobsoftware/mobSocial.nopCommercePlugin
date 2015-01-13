using System.Collections.Generic;
using System.Web.Routing;
using Nop.Core.Domain.Media;
using Nop.Core.Domain.Messages;
using Nop.Core.Domain.Tasks;
using Nop.Core.Plugins;
using Nop.Plugin.Widgets.MobSocial.Core;
using Nop.Plugin.Widgets.MobSocial.Data;
using Nop.Services.Cms;
using Nop.Services.Configuration;
using Nop.Services.Localization;
using Nop.Services.Messages;
using Nop.Services.Tasks;
using Nop.Web.Framework.Web;
using Nop.Web.Framework.Menu;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class mobSocialPlugin : BasePlugin, IWidgetPlugin, IAdminMenuPlugin

    {
        private readonly MobSocialObjectContext _context;
        private readonly mobSocialSettings _mobSocialSettings;
        private readonly ISettingService _settingService;
        private readonly IMessageTemplateService _messageTemplateService;
        private readonly IScheduleTaskService _scheduleTaskService;
        private readonly IMobSocialService _mobSocialService;
        private readonly ILocalizationService _localizationService;

        public mobSocialPlugin(MobSocialObjectContext context, mobSocialSettings mobSocialSettings, 
            ISettingService settingService, IMessageTemplateService messageTemplateService, 
            IScheduleTaskService scheduleTaskService,
            IMobSocialService mobSocialService,
            ILocalizationService localizationService)
        {
            _context = context;
            _mobSocialSettings = mobSocialSettings;
            _settingService = settingService;
            _messageTemplateService = messageTemplateService;
            _scheduleTaskService = scheduleTaskService;
            _mobSocialService = mobSocialService;
            _localizationService = localizationService;
        }


        #region Methods

        public IList<string> GetWidgetZones()
        {
            return !string.IsNullOrWhiteSpace(_mobSocialSettings.WidgetZone)
                      ? new List<string>() { 
                          _mobSocialSettings.WidgetZone, 
                          "header_menu_after", 
                          "account_navigation_after", 
                          "profile_page_info_userdetails" 
                      } 
                      : new List<string>() { "after_header_links" };   
        }

        /// <summary>
        /// Gets a route for provider configuration
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>
        public void GetConfigurationRoute(out string actionName, out string controllerName, out RouteValueDictionary routeValues)
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
        public void GetDisplayWidgetRoute(string widgetZone, out string actionName, out string controllerName, out RouteValueDictionary routeValues)
        {
           

            switch(widgetZone)
            {
                case "footer": {
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
                case "header_menu_after" : {
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
                case "account_navigation_after" : {
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
                default:  {
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
            var mobSocialSettings = new mobSocialSettings()
            {
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
                FacebookWebsiteAppId = "1234567890123456"
            };


            var mediaSettings = new MediaSettings()
                {
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


       


        #endregion

        public bool Authenticate()
        {
            return true;
        }

        public SiteMapNode BuildMenuItem()
        {


            var menuItem = new SiteMapNode()
            {
                Title = _localizationService.GetResource("Plugins.Widgets.MobSocial.AdminMenu.Text"),
                ControllerName = "TeamPage",
                ActionName = "Index",
                Visible = true,
                RouteValues = new RouteValueDictionary() { { "area", null } },
            };

            var manageTeamSubMenu = new SiteMapNode()
            {
                Title = _localizationService.GetResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageTeamPage"),
                ControllerName = "TeamPage",
                ActionName = "Index",
                Visible = true,
                RouteValues = new RouteValueDictionary() { { "area", null } },
            };




            var manageEventsSubMenu = new SiteMapNode()
            {
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
            int every24hrs = 24 * 60 * 60;
            AddScheduledTask("Friend Request Notification Task", every24hrs, false, false, "Nop.Plugin.Widgets.MobSocial.Tasks.FriendRequestNotificationTask, Nop.Plugin.Widgets.MobSocial");
            AddScheduledTask("Product Review Notification Task", every24hrs, false, false, "Nop.Plugin.Widgets.MobSocial.Tasks.ProductReviewNotificationTask, Nop.Plugin.Widgets.MobSocial");

        }


        private void AddScheduledTask(string name, int seconds, bool enabled, bool stopOnError, string type)
        {
            var task = _scheduleTaskService.GetTaskByType(type);

            if (task == null)
            {
                task = new ScheduleTask
                {
                    Name = name,
                    Seconds = seconds,
                    Type = type,
                    Enabled = enabled,
                    StopOnError = stopOnError,
                };

                _scheduleTaskService.InsertTask(task);
            }

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
            this.AddOrUpdatePluginLocaleResource("Plugins.Widgets.MobSocial.AdminMenu.Text", "Social Network");
            this.AddOrUpdatePluginLocaleResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageTeamPage", "Manage Team Pages");
            this.AddOrUpdatePluginLocaleResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageEventPage", "Manage Event Pages");
            this.AddOrUpdatePluginLocaleResource("Admin.EventPage.BackToList", "Back to list");


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
            var friendRequestNotification = new MessageTemplate()
            {
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
            var friendRequestReminderNotification = new MessageTemplate()
            {
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
            var eventInvitationNotification = new MessageTemplate()
            {
                Name = "MobSocial.EventInvitationNotification",
                Subject = "You have been invited to an event on %Store.Name%",
                Body = "You have just been invited to an event!<br/><br/>" +
                       "<a href=\"%Store.URL%\">Log in</a> to view the event invitation.",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false

            };
            _messageTemplateService.InsertMessageTemplate(eventInvitationNotification);

            
            var productReviewNotification = new MessageTemplate()
            {
                Name = "MobSocial.ProductReviewNotification",
                Subject = "How do you like your products?",
                Body = "We see that you've had your products for a while now. Click on the products below and let other skaters know what you think?<br/><br/>" +
                       "%ProductLinks%",
                EmailAccountId = 1,
                IsActive = true,
                LimitedToStores = false

            };
            _messageTemplateService.InsertMessageTemplate(productReviewNotification);
        }

        #endregion
    }
}
