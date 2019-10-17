using System.Collections.Generic;

namespace Nop.Plugin.Widgets.MobSocial.Sdk
{
    public class MobSocialResponse
    {
        public bool Success { get; set; }

        public Dictionary<string, List<string>> ErrorMessages { get; set; }

        public Dictionary<string, List<string>> Messages { get; set; }

        public Dictionary<string, object> ResponseData { get; set; }
    }
}