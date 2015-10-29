using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class VoterPassMap: BaseMobEntityTypeConfiguration<VoterPass>
    {
        public VoterPassMap()
        {
            Property(x => x.CustomerId);
            Property(x => x.BattleId);
            Property(x => x.BattleType);
            Property(x => x.Status);
            Property(x => x.VoterPassOrderId);
        }
    }
}