using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class VideoBattleMap : BaseMobEntityTypeConfiguration<VideoBattle>
    {
        public VideoBattleMap()
        {
            Property(x => x.ChallengerId);
            Property(x => x.Name);
            Property(x => x.Description);
            Property(x => x.VotingStartDate).HasColumnType("datetime2");
            Property(x => x.VotingEndDate).HasColumnType("datetime2");

            Property(x => x.VideoBattleType);
            Property(x => x.VideoBattleVoteType);
            Property(x => x.VideoBattleStatus);

            Property(x => x.MaximumParticipantCount);

            Property(x => x.CoverImageId).IsOptional();
        }
    }
}
