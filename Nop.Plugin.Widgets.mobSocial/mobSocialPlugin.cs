using System.Collections.Generic;
using Microsoft.AspNetCore.Routing;
using Nop.Plugin.Widgets.MobSocial.Components;
using Nop.Services.Localization;
using Nop.Web.Framework.Menu;
using Nop.Services.Cms;
using Nop.Services.Plugins;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class mobSocialPlugin : BasePlugin, IAdminMenuPlugin, IWidgetPlugin
    {
      
        private readonly ILocalizationService _localizationService;
        public mobSocialPlugin(ILocalizationService localizationService)
        {
            _localizationService = localizationService;
        }


        #region Methods

        public IList<string> GetWidgetZones()
        {
            return new List<string>()
            {
                "head_html_tag",
                "header_menu_after",
                "account_navigation_after",
                "profile_page_info_userdetails",
                "searchbox_before_search_button",
                "body_end_html_tag_before"
            };
        }

        /// <summary>
        /// Gets a route for provider configuration
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>
        public void GetConfigurationRoute(out string actionName, out string controllerName, out RouteValueDictionary routeValues)
        {
            actionName = "";
            controllerName = "";
            routeValues = new RouteValueDictionary() { { "Namespaces", "Nop.Plugin.Widgets.mobSocial.Controllers" }, { "area", null } };
        }

        /// <summary>
        /// Install plugin
        /// </summary>
        public override void Install()
        {
            AddLocaleResourceStrings();
            base.Install();

        }

        public override void Uninstall()
        {
            //locales
            _localizationService.DeletePluginLocaleResource("MobSocial.MessageButtonText");
            _localizationService.DeletePluginLocaleResource("MobSocial.AddFriendButtonText");
            _localizationService.DeletePluginLocaleResource("MobSocial.FriendsLabelText");
            _localizationService.DeletePluginLocaleResource("MobSocial.FriendRequestSentLabel");
            _localizationService.DeletePluginLocaleResource("MobSocial.ConfirmFriendButtonText");
            _localizationService.DeletePluginLocaleResource("SearchDropdown.PeopleSearchText");
            // do not remove core locales

            base.Uninstall();
        }

        #endregion

        #region Tasks
        public void SendFriendRequestNotifications()
        {
            //_mobSocialService.SendFriendRequestNotifications();
        }

        public void SendProductReviewNotifications()
        {
           // _mobSocialService.SendProductReviewNotifications();
        }


        public void SetScheduledVideoBattlesOpenOrClosed()
        {
            
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
            _localizationService.AddOrUpdatePluginLocaleResource("MobSocial.MessageButtonText", "Send Message");
            _localizationService.AddOrUpdatePluginLocaleResource("MobSocial.AddFriendButtonText", "Add Friend");
            _localizationService.AddOrUpdatePluginLocaleResource("MobSocial.FriendsLabelText", "Friends");
            _localizationService.AddOrUpdatePluginLocaleResource("MobSocial.FriendRequestSentLabel", "Friend Request Sent!");
            _localizationService.AddOrUpdatePluginLocaleResource("MobSocial.ConfirmFriendButtonText", "Confirm");
            _localizationService.AddOrUpdatePluginLocaleResource("MobSocial.ConfirmedButtonText", "Confirmed!");
            _localizationService.AddOrUpdatePluginLocaleResource("SearchDropdown.PeopleSearchText", "People");
            _localizationService.AddOrUpdatePluginLocaleResource("SearchDropdown.EventPageSearchText", "Events");
            _localizationService.AddOrUpdatePluginLocaleResource("SearchDropdown.BusinessPageSearchText", "Businesses");
            _localizationService.AddOrUpdatePluginLocaleResource("Plugins.Widgets.MobSocial.AdminMenu.Text", "Social Network");
            _localizationService.AddOrUpdatePluginLocaleResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageTeamPage", "Manage Team Pages");
            _localizationService.AddOrUpdatePluginLocaleResource("Plugins.Widgets.MobSocial.AdminMenu.SubMenu.ManageEventPage", "Manage Event Pages");
            _localizationService.AddOrUpdatePluginLocaleResource("Admin.EventPage.BackToList", "Back to list");
            _localizationService.AddOrUpdatePluginLocaleResource("BusinessPages.HoursOfOperationText", "Hours of Operation");
            _localizationService.AddOrUpdatePluginLocaleResource("BusinessPages.HeaderMenuName", "Businesses");
            _localizationService.AddOrUpdatePluginLocaleResource("ArtistPages.SendPaymentMessageText", "When my song purchases reach $10 net amount, send payment to:");


            // Update core locales. do not remove core locales during uninstall
            _localizationService.AddOrUpdatePluginLocaleResource("Profile.ProfileOf", "{0}");
            _localizationService.AddOrUpdatePluginLocaleResource("Account.Avatar", "Profile Picture");
            _localizationService.AddOrUpdatePluginLocaleResource("Account.Avatar.MaximumUploadedFileSize", "Maximum profile picture size is {0} bytes");
            _localizationService.AddOrUpdatePluginLocaleResource("Account.Avatar.RemoveAvatar", "Remove Profile Picture");
            _localizationService.AddOrUpdatePluginLocaleResource("Account.Avatar.UploadRules", "Profile Picture must be in GIF or JPEG format with the maximum size of 20 KB");

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

        public string GetWidgetViewComponentName(string widgetZone)
        {
            switch (widgetZone)
            {
                case "head_html_tag":
                    return HeadTagInclusionsViewComponent.ViewName;
                case "header_menu_after":
                    return HeaderMenuViewComponent.ViewName;
                case "account_navigation_after":
                    return AccountNavigationViewComponent.ViewName;
                case "profile_page_info_userdetails":
                    return CustomerProfileViewComponent.ViewName;
                case "body_end_html_tag_before":
                    return ConversationBoxViewComponent.ViewName;
                case "searchbox_before_search_button":
                    return GlobalSearchViewComponent.ViewName;
                default:
                    return null;
            }
        }

        public string AppId
        {
            get { return "MobSocialPluginNop3.5"; }
        }


        public int MobAdsClientId
        {
            get { return 0; }
        }

        public bool HideInWidgetList => false;
    }
}

