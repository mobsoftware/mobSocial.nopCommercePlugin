
using Nop.Core.Configuration;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class mobSocialSettings : ISettings
    {
        public string ClientId { get; set; }

        public string ClientSecret { get; set; }
    }
}