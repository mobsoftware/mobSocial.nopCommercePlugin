using System.Collections.Generic;
using System.Web.Routing;
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

namespace Nop.Plugin.Widgets.MobSocial
{
    public class mobSocialPlugin : BasePlugin, IWidgetPlugin

    {
        private readonly MobSocialObjectContext _context;
        private readonly mobSocialSettings _socialNetworkSettings;
        private readonly ISettingService _settingService;
        private readonly IMessageTemplateService _messageTemplateService;
        private readonly IScheduleTaskService _scheduleTaskService;
        private readonly IMobSocialService _socialNetworkService;

        public mobSocialPlugin(MobSocialObjectContext context, mobSocialSettings socialNetworkSettings, 
            ISettingService settingService, IMessageTemplateService messageTemplateService, IScheduleTaskService scheduleTaskService,
            IMobSocialService socialNetworkService)
        {
            _context = context;
            _socialNetworkSettings = socialNetworkSettings;
            this._settingService = settingService;
            _messageTemplateService = messageTemplateService;
            _scheduleTaskService = scheduleTaskService;
            _socialNetworkService = socialNetworkService;
        }


        #region Methods

        public IList<string> GetWidgetZones()
        {
            return !string.IsNullOrWhiteSpace(_socialNetworkSettings.WidgetZone)
                      ? new List<string>() { _socialNetworkSettings.WidgetZone }
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
            controllerName = "SocialNetwork";
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
            actionName = "PublicInfo";
            controllerName = "SocialNetwork";

            routeValues = new RouteValueDictionary()
            {
                {"Namespaces", "Nop.Plugin.Widgets.mobSocial.Controllers" },
                {"area", null},
                {"widgetZone", widgetZone}
            };
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
            var settings = new mobSocialSettings()
            {
                ProfilePictureSize = 100,
                WidgetZone = "after_header_links",
                PeopleSearchAutoCompleteEnabled = true,
                PeopleSearchAutoCompleteNumberOfPeople = 10,
                PeopleSearchTermMinimumLength = 3,
                ShowProfileImagesInSearchAutoComplete = true,
            };

            
            this.AddOrUpdatePluginLocaleResource("SocialNetwork.MessageButtonText", "Send Message");
            this.AddOrUpdatePluginLocaleResource("SocialNetwork.AddFriendButtonText", "Add Friend");
            this.AddOrUpdatePluginLocaleResource("SocialNetwork.FriendsLabelText", "Friends");
            this.AddOrUpdatePluginLocaleResource("SocialNetwork.FriendRequestSentLabel", "Friend Request Sent!");
            this.AddOrUpdatePluginLocaleResource("SocialNetwork.ConfirmFriendButtonText", "Confirm");
            this.AddOrUpdatePluginLocaleResource("SocialNetwork.ConfirmedButtonText", "Confirmed!");

            // Update core locales. do not remove core locales during uninstall
            this.AddOrUpdatePluginLocaleResource("Profile.ProfileOf", "{0}"); 
            this.AddOrUpdatePluginLocaleResource("Account.Avatar", "Profile Picture");
            this.AddOrUpdatePluginLocaleResource("Account.Avatar.MaximumUploadedFileSize", "Maximum profile picture size is {0} bytes");
            this.AddOrUpdatePluginLocaleResource("Account.Avatar.RemoveAvatar", "Remove Profile Picture");
            this.AddOrUpdatePluginLocaleResource("Account.Avatar.UploadRules", "Profile Picture must be in GIF or JPEG format with the maximum size of 20 KB");

            

            

            _settingService.SaveSetting(settings);



            var friendRequestNotification = new MessageTemplate()
                {
                    Name = "SocialNetwork.FriendRequestNotification",
                    Subject = "%Store.Name%. You have a new friend request from %FromFriend.FullName%.",
                    Body = "You have a new friend request from %FromFriend.FullName%!<br/><br/>" +
                           "<a href=\"%Store.URL%\">Log in</a> to confirm your friend request.",
                    EmailAccountId = 1,
                    IsActive = true,
                    LimitedToStores = false

                };

            _messageTemplateService.InsertMessageTemplate(friendRequestNotification);


            var task = _scheduleTaskService.GetTaskByType("Nop.Plugin.Widgets.mobSocial.FriendNotificationTask, Nop.Plugin.Widgets.mobSocial");

            if (task == null)
            {
                task = new ScheduleTask
                {
                    Name = "Friend Request Notification Task",
                    //every 24 hours
                    Seconds = 24 * 60 * 60,
                    Type = "Nop.Plugin.Widgets.mobSocial.FriendNotificationTask, Nop.Plugin.Widgets.mobSocial",
                    Enabled = false,
                    StopOnError = false,
                };

                _scheduleTaskService.InsertTask(task);
            }



            _context.Install();



            base.Install();


       
        }

       
        public override void Uninstall()
        {
            //locales
            this.DeletePluginLocaleResource("SocialNetwork.MessageButtonText");
            this.DeletePluginLocaleResource("SocialNetwork.AddFriendButtonText");
            this.DeletePluginLocaleResource("SocialNetwork.FriendsLabelText");
            this.DeletePluginLocaleResource("SocialNetwork.FriendRequestSentLabel");
            this.DeletePluginLocaleResource("SocialNetwork.ConfirmFriendButtonText");
            // do not remove core locales



            //settings
            _settingService.DeleteSetting<mobSocialSettings>();

            _context.Uninstall();

            base.Uninstall();
        }

        #endregion

        #region Tasks
        public void SendFriendRequestNotifications()
        {
            _socialNetworkService.SendFriendRequestNotifications();
        }
        #endregion



    }
}
