using Nop.Web.Framework;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.ExternalAuth.mobSocial.Models
{
    public class ConfigurationModel : BaseNopModel
    {
        public int ActiveStoreScopeConfiguration { get; set; }

        [NopResourceDisplayName("Plugins.ExternalAuth.MobSocial.ClientKeyIdentifier")]
        public string ClientKeyIdentifier { get; set; }
        public bool ClientKeyIdentifier_OverrideForStore { get; set; }

        [NopResourceDisplayName("Plugins.ExternalAuth.MobSocial.ClientSecret")]
        public string ClientSecret { get; set; }
        public bool ClientSecret_OverrideForStore { get; set; }
    }
}