using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class SponsorDataMap : BaseMobEntityTypeConfiguration<SponsorData>
    {
        public SponsorDataMap()
        {
            Property(m => m.BattleType);
            Property(m => m.BattleId);
            Property(m => m.DisplayName);
            Property(m => m.DisplayOrder);
            Property(m => m.PictureId).IsOptional();
            Property(m => m.SponsorCustomerId);
            Property(m => m.TargetUrl);
        } 
    }
}