using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface ISponsorService : IBaseEntityService<Sponsor>
    {
        IList<Sponsor> GetSponsors(int? SponsorCustomerId, int? BattleId, BattleType? BattleType, SponsorshipStatus? SponsorshipStatus);

        IList<Sponsor> GetSponsorsGrouped(int? SponsorCustomerId, int? BattleId, BattleType? BattleType, SponsorshipStatus? SponsorshipStatus);
 
        void UpdateSponsorStatus(int SponsorCustomerId, int BattleId, BattleType BattleType,
            SponsorshipStatus SponsorshipStatus);

        void SaveSponsorData(SponsorData SponsorData);

        SponsorData GetSponsorData(int BattleId, BattleType BattleType, int SponsorCustomerId);
        IList<SponsorData> GetSponsorData(int BattleId, BattleType BattleType);

        bool IsSponsor(int SponsorCustomerId, int BattleId, BattleType BattleType);
    }
}