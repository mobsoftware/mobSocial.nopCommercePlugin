using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class MobSocialUser : BaseEntity
    {
        public int CustomerId { get; set; }

        public int MobSocialUserId { get; set; } 
    }
}