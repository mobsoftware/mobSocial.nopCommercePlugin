using System.Collections.Generic;
using System.Web.Configuration;
using Nop.Core.Plugins;
using Nop.Plugin.WebApi.MobSocial;
using Nop.Plugin.Widgets.MobSocial;
using Nop.Services.Common;
using System.Web.Routing;
using Nop.Services.Configuration;
using Nop.Web.Framework.Menu;
using Nop.Services.Cms;

namespace MobSocial.Suite
{
    public class MobSocialSuitePlugin : BasePlugin, IAdminMenuPlugin, IWidgetPlugin
    {
        
        private readonly MobSocialSuiteSettings _mobSocialSuiteSettings;
        private readonly ISettingService _settingService;

        public MobSocialSuitePlugin(MobSocialSuiteSettings mobSocialSuiteSettings, ISettingService settingService)
        {
            _mobSocialSuiteSettings = mobSocialSuiteSettings;
            _settingService = settingService;
        }

        public override void Install()
        {
            //set owin startup
            SetOwinStartup(true);

            //save the settings
            var suiteSettings = new MobSocialSuiteSettings()
            {
                WebInterfaceEnabled = true
            };
            _settingService.SaveSetting(suiteSettings);

            var webApiPlugin = ChildPluginInstances.GetPluginInsance<MobSocialWebApiPlugin>();
            webApiPlugin.Install();

            var mobSocialPlugin = ChildPluginInstances.GetPluginInsance<mobSocialPlugin>();
            mobSocialPlugin.Install();
            base.Install();
        }

        public override void Uninstall()
        {
            //reset owin in web.config
            SetOwinStartup(false);
            //delete settings
            _settingService.DeleteSetting<MobSocialSuiteSettings>();

            var webApiPlugin = ChildPluginInstances.GetPluginInsance<MobSocialWebApiPlugin>();
            webApiPlugin.Uninstall();

            var mobSocialPlugin = ChildPluginInstances.GetPluginInsance<mobSocialPlugin>();
            mobSocialPlugin.Uninstall();
            base.Uninstall();
        }

        public void ManageSiteMap(SiteMapNode rootNode)
        {
            var webApiPlugin = ChildPluginInstances.GetPluginInsance<MobSocialWebApiPlugin>();
            webApiPlugin.ManageSiteMap(rootNode);

            if (_mobSocialSuiteSettings.WebInterfaceEnabled)
            {
                var mobSocialPlugin = ChildPluginInstances.GetPluginInsance<mobSocialPlugin>();
                mobSocialPlugin.ManageSiteMap(rootNode);
            }
        }

        public IList<string> GetWidgetZones()
        {
            var mobSocialPlugin = ChildPluginInstances.GetPluginInsance<mobSocialPlugin>();
            return mobSocialPlugin.GetWidgetZones();

        }

        public void GetConfigurationRoute(out string actionName, out string controllerName,
            out RouteValueDictionary routeValues)
        {
            throw new System.NotImplementedException();
        }

        public void GetDisplayWidgetRoute(string widgetZone, out string actionName, out string controllerName,
            out RouteValueDictionary routeValues)
        {
            var mobSocialPlugin = ChildPluginInstances.GetPluginInsance<mobSocialPlugin>();
            mobSocialPlugin.GetDisplayWidgetRoute(widgetZone, out actionName, out controllerName, out routeValues);
        }

        private void SetOwinStartup(bool set)
        {
            var configuration = WebConfigurationManager.OpenWebConfiguration("~");
            configuration.AppSettings.Settings["owin:AutomaticAppStartup"].Value = set ? "true" : "false";
            configuration.Save();
        }
    }
}