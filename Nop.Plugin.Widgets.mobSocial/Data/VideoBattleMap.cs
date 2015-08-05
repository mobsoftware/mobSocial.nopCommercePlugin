using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class VideoBattleMap : EntityTypeConfiguration<VideoBattle>
    {
        public VideoBattleMap()
        {
            ToTable("VideoBattle");
            HasKey(x => x.Id);
            Property(x => x.ChallengerId);
            Property(x => x.Title);
            Property(x => x.Description);
            Property(x => x.DateCreated).HasColumnType("datetime2");
            Property(x => x.DateUpdated).HasColumnType("datetime2");
            Property(x => x.AcceptanceLastDate).HasColumnType("datetime2");
            Property(x => x.VotingLastDate).HasColumnType("datetime2");

            Property(x => x.VideoBattleType);
            Property(x => x.VideoBattleVoteType);
            Property(x => x.VideoBattleStatus);
        }
    }
}
