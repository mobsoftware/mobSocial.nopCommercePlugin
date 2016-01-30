using Mob.Core;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class CustomerFollowMap : BaseMobEntityTypeConfiguration<CustomerFollow>
    {
        public CustomerFollowMap()
        {
            Property(x => x.CustomerId);
            Property(x => x.FollowingEntityId);
            Property(x => x.FollowingEntityName);
        } 
    }
}