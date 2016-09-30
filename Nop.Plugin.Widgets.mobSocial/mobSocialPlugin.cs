using System.Collections.Generic;
using System.Web.Routing;
using Nop.Plugin.WebApi.MobSocial.Data;
using Nop.Services.Configuration;
using Nop.Services.Localization;
using Nop.Services.Messages;
using Nop.Services.Tasks;
using Nop.Web.Framework.Menu;
using System.Web.Configuration;
using MobAds.Public;
using Nop.Core;
using System.Linq;
using Nop.Plugin.WebApi.MobSocial;
using Nop.Plugin.WebApi.MobSocial.Constants;
using Nop.Plugin.WebApi.MobSocial.Services;

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
            actionName = "";
            controllerName = "";
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
                            {"area", ""},
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
            AddLocaleResourceStrings();
            if (!MobSocialConstant.SuiteInstallation)
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

            if (!MobSocialConstant.SuiteInstallation)
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

        public SiteMapNode BuildMenuItem()
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
        #endregion


        public void ManageSiteMap(SiteMapNode rootNode)
        {

           /* var menuItem = new SiteMapNode() {
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
                rootNode.ChildNodes.Add(menuItem);*/

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

