using Nop.Core.Configuration;

namespace Nop.Plugin.ExternalAuth.mobSocial
{
    public class MobSocialExternalAuthSettings : ISettings
    {
        public string ClientKeyIdentifier { get; set; }
        public string ClientSecret { get; set; }
    }
}
