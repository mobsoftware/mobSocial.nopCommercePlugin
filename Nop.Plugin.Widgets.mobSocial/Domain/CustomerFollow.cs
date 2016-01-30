using Mob.Core;
using Mob.Core.Domain;
using Nop.Core.Domain.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerFollow : BaseMobEntity
    {
        public int CustomerId { get; set; }

        public int FollowingEntityId { get; set; }

        public string FollowingEntityName { get; set; }
    }
}