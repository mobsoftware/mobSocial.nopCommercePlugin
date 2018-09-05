using System.Web.Configuration;
using DryIoc;
using mobSocial.Core.Infrastructure.AppEngine;
using mobSocial.Data.Integration;
using mobSocial.Data.Entity.Settings;
using mobSocial.Services.Installation;
using mobSocial.Services.Settings;
using Nop.Core;
using Nop.Core.Plugins;
using Nop.MobSocial.WebApi.Integration;
using Nop.Web.Framework.Menu;

namespace Nop.MobSocial.WebApi
{
    public class MobSocialWebApi : BasePlugin, IAdminMenuPlugin
    {
        private IInstallationService _installationService;
        private readonly IStoreContext _storeContext;
        private readonly IWorkContext _workContext;
        private MediaSettings _mobMediaSettings;
        private ISettingService _mobSettingService;
        
        public MobSocialWebApi(IStoreContext storeContext, IWorkContext workContext)
        {
            _storeContext = storeContext;
            _workContext = workContext;
         
        }

        public override void Install()
        {
            ApiHelper.InitializeDatabaseAccess();
            //set mappings
            IntegrationManager.SetIntegrationMap(new CustomerIntegrationMap());
            IntegrationManager.SetIntegrationMap(new CustomerRoleIntegrationMap());
            IntegrationManager.SetIntegrationMap(new CustomerRoleMappingIntegrationMap());

            _installationService = mobSocialEngine.ActiveEngine.Resolve<IInstallationService>();
            _installationService.Install();

          
            using (mobSocialEngine.ActiveEngine.IocContainer.OpenScope(Reuse.WebRequestScopeName))
            {
                _mobMediaSettings = mobSocialEngine.ActiveEngine.Resolve<MediaSettings>();
                _mobSettingService = mobSocialEngine.ActiveEngine.Resolve<ISettingService>();

                _installationService.FillRequiredSeedData(_workContext.CurrentCustomer.Email,
                    _workContext.CurrentCustomer.Password, _storeContext.CurrentStore.Url);

                //update some settings
                _mobMediaSettings.PictureSavePath = @"~/Plugins/MobSocial.WebApi/Content/Uploads";
                _mobMediaSettings.VideoSavePath = @"~/Plugins/MobSocial.WebApi/Content/Uploads";
                _mobMediaSettings.DefaultUserProfileImageUrl = "/Plugins/MobSocial.WebApi/Content/Media/d_male.jpg";
                _mobMediaSettings.DefaultUserProfileCoverUrl = "/Plugins/MobSocial.WebApi/Content/Media/d_cover.jpg";
                _mobMediaSettings.DefaultSkillCoverUrl = "/Plugins/MobSocial.WebApi/Content/Media/d_cover.jpg";
                _mobSettingService.Save(_mobMediaSettings);
            }

            
           
            base.Install();

            //set web.config
            SetOwinStartup(true);
        }

        public override void Uninstall()
        {
            base.Uninstall();
            SetOwinStartup(false);
        }

        public void ManageSiteMap(SiteMapNode rootNode)
        {
        }

        private void SetOwinStartup(bool set)
        {
            var settingName = "owin:AutomaticAppStartup";
            SetConfigurationValue(settingName, set ? "true" : "false");
        }

        private void SetConfigurationValue(string name, string value)
        {
            var configuration = WebConfigurationManager.OpenWebConfiguration("~");
            if (configuration.AppSettings.Settings[name] != null)
                configuration.AppSettings.Settings[name].Value = value;
            else
                configuration.AppSettings.Settings.Add(name, value);
            configuration.Save();
        }
    }
}
