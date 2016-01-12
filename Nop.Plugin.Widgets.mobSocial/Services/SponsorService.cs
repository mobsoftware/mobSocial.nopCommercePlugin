using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Services.Media;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class SponsorService : BaseEntityService<Sponsor>, ISponsorService
    {
        private readonly IMobRepository<SponsorData> _sponsorDataRepository;

        public SponsorService(IMobRepository<Sponsor> repository,
            IMobRepository<SponsorData> sponsorDataRepository)
            : base(repository)
        {
            _sponsorDataRepository = sponsorDataRepository;
        }


        public override List<Sponsor> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new System.NotImplementedException();
        }

        public IList<Sponsor> GetSponsors(int? SponsorCustomerId, int? BattleId, Enums.BattleType? BattleType, SponsorshipStatus? SponsorshipStatus)
        {
            var query = Repository.Table;

            if (SponsorCustomerId.HasValue)
                query = query.Where(x => x.CustomerId == SponsorCustomerId);

            if (BattleId.HasValue)
                query = query.Where(x => x.BattleId == BattleId);

            if (BattleType.HasValue)
                query = query.Where(x => x.BattleType == BattleType);

            if (SponsorshipStatus.HasValue)
                query = query.Where(x => x.SponsorshipStatus == SponsorshipStatus);

            return query.ToList();
        }

        /// <summary>
        /// Groups the list of sponsors so that sponsors with multiple trasactions get summed up into a single object
        /// </summary>
        /// <param name="SponsorCustomerId"></param>
        /// <param name="BattleId"></param>
        /// <param name="BattleType"></param>
        /// <returns></returns>
        public IList<Sponsor> GetSponsorsGrouped(int? SponsorCustomerId, int? BattleId, BattleType? BattleType, SponsorshipStatus? SponsorshipStatus)
        {
            var sponsors = GetSponsors(SponsorCustomerId, BattleId, BattleType, SponsorshipStatus);
            if (sponsors.Any() && sponsors.Count > 1)
            {
                sponsors = sponsors.GroupBy(x => new { x.CustomerId, x.BattleId, x.BattleType, x.SponsorshipStatus }).Select(g => new Sponsor() {
                    BattleId = g.Key.BattleId,
                    BattleType = g.Key.BattleType,
                    CustomerId = g.Key.CustomerId,
                    SponsorshipStatus = g.Key.SponsorshipStatus,
                    SponsorshipAmount = g.Sum(x => x.SponsorshipAmount)

                }).ToList();
            }

            return sponsors;
        }

        public void UpdateSponsorStatus(int SponsorCustomerId, int BattleId, Enums.BattleType BattleType, Enums.SponsorshipStatus SponsorshipStatus)
        {
            var sponsors = GetSponsors(SponsorCustomerId, BattleId, BattleType, null);
            foreach (var sponsor in sponsors)
            {
                sponsor.SponsorshipStatus = SponsorshipStatus;
                //update
                Update(sponsor);
                //TODO: Update all in one go to improve performance
            }

            //if it's an approval, lets save sponsor data which will contain details about the sponsorship display part
            if (SponsorshipStatus != SponsorshipStatus.Accepted)
                return;

            var sponsorData = GetSponsorData(BattleId, BattleType, SponsorCustomerId) ?? new SponsorData() {
                BattleType = BattleType,
                BattleId = BattleId,
                SponsorCustomerId = SponsorCustomerId,
                PictureId = 0,
                DateCreated = DateTime.UtcNow,
                DateUpdated = DateTime.UtcNow,
                DisplayName = "",
                DisplayOrder = 0,
                TargetUrl = ""
            };

            SaveSponsorData(sponsorData);
        }


        public void SaveSponsorData(SponsorData SponsorData)
        {
            if (SponsorData.Id == 0)
                _sponsorDataRepository.Insert(SponsorData);
            else
                _sponsorDataRepository.Update(SponsorData);

        }

        public SponsorData GetSponsorData(int BattleId, BattleType BattleType, int SponsorCustomerId)
        {
            var query = _sponsorDataRepository.Table.Where(x => x.BattleType == BattleType && x.BattleId == BattleId && x.SponsorCustomerId == SponsorCustomerId);

            return query.FirstOrDefault();
        }

        public IList<SponsorData> GetSponsorData(int BattleId, BattleType BattleType)
        {
            return _sponsorDataRepository.Table.Where(x => x.BattleType == BattleType && x.BattleId == BattleId).ToList();
        }

        public bool IsSponsor(int SponsorCustomerId, int BattleId, BattleType BattleType)
        {
            return
                Repository.Table.Any(
                    x => x.BattleId == BattleId && x.BattleType == BattleType && x.CustomerId == SponsorCustomerId);
        }
    }
}