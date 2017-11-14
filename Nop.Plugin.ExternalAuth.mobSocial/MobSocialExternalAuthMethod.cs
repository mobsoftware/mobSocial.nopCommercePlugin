using System.Collections.Generic;
using System.Web.Routing;
using Nop.Core.Plugins;
using Nop.Services.Authentication.External;
using Nop.Services.Cms;
using Nop.Services.Configuration;
using Nop.Services.Localization;

namespace Nop.Plugin.ExternalAuth.mobSocial
{
    /// <summary>
    /// MobSocial externalAuth processor
    /// </summary>
    public class MobSocialExternalAuthMethod : BasePlugin, IExternalAuthenticationMethod, IWidgetPlugin
    {
        #region Fields

        private readonly ISettingService _settingService;

        #endregion

        #region Ctor

        public MobSocialExternalAuthMethod(ISettingService settingService)
        {
            this._settingService = settingService;
        }

        #endregion

        #region Methods
        public IList<string> GetWidgetZones()
        {
            return new List<string>()
            {
                "mobsocial_login"
            };
        }
        public void GetDisplayWidgetRoute(string widgetZone, out string actionName, out string controllerName,
            out RouteValueDictionary routeValues)
        {
            GetPublicInfoRoute(out actionName, out controllerName, out routeValues);
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
            controllerName = "ExternalAuthMobSocial";
            routeValues = new RouteValueDictionary { { "Namespaces", "Nop.Plugin.ExternalAuth.mobSocial.Controllers" }, { "area", null } };
        }

        /// <summary>
        /// Gets a route for displaying plugin in public store
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller name</param>
        /// <param name="routeValues">Route values</param>
        public void GetPublicInfoRoute(out string actionName, out string controllerName, out RouteValueDictionary routeValues)
        {
            actionName = "PublicInfo";
            controllerName = "ExternalAuthMobSocial";
            routeValues = new RouteValueDictionary { { "Namespaces", "Nop.Plugin.ExternalAuth.mobSocial.Controllers" }, { "area", null } };
        }

        /// <summary>
        /// Install plugin
        /// </summary>
        public override void Install()
        {
            //settings
            var settings = new MobSocialExternalAuthSettings
            {
                ClientKeyIdentifier = "",
                ClientSecret = "",
            };
            _settingService.SaveSetting(settings);

            //locales
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.MobSocial.ClientKeyIdentifier", "App ID/API Key");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.MobSocial.ClientKeyIdentifier.Hint", "Enter your app ID/API key here. You can find it on your mobSocial application page.");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.MobSocial.ClientSecret", "App Secret");
            this.AddOrUpdatePluginLocaleResource("Plugins.ExternalAuth.MobSocial.ClientSecret.Hint", "Enter your app secret here. You can find it on your mobSocial application page.");

            base.Install();
        }

        public override void Uninstall()
        {
            //settings
            _settingService.DeleteSetting<MobSocialExternalAuthSettings>();

            //locales
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.MobSocial.ClientKeyIdentifier");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.MobSocial.ClientKeyIdentifier.Hint");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.MobSocial.ClientSecret");
            this.DeletePluginLocaleResource("Plugins.ExternalAuth.MobSocial.ClientSecret.Hint");

            base.Uninstall();
        }

        #endregion
    }
}
