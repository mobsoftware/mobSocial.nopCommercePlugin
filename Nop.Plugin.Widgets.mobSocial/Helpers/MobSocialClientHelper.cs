using Nop.Core.Infrastructure;
using Nop.Plugin.Widgets.MobSocial.Sdk;

namespace Nop.Plugin.Widgets.MobSocial.Helpers
{
    public static class MobSocialClientHelper
    {
        public static MobSocialClient NewClient()
        {
            var mobsocialSettings = EngineContext.Current.Resolve<mobSocialSettings>();
            return new MobSocialClient(mobsocialSettings.ClientId, mobsocialSettings.ClientSecret);
        }

        public static bool IsMobSocialActive()
        {
            var mobsocialSettings = EngineContext.Current.Resolve<mobSocialSettings>();
            return !string.IsNullOrEmpty(mobsocialSettings.ClientSecret) &&
                   !string.IsNullOrEmpty(mobsocialSettings.ClientId);
        }
    }
}