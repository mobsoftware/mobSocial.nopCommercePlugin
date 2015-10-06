using Mob.Core.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class WatchedVideo: BaseMobEntity
    {
        public int VideoId { get; set; }

        public int CustomerId { get; set; }

        public VideoType VideoType { get; set; }
    }
}