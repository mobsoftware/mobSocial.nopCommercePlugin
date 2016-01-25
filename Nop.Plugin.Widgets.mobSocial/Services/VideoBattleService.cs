using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Services.Configuration;
using Nop.Services.Logging;
using Nop.Services.Media;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class VideoBattleService : BaseEntityWithPictureService<VideoBattle, VideoBattlePicture>, IVideoBattleService
    {
        private readonly IMobRepository<VideoBattle> _videoBattleRepository;
        private readonly IMobRepository<VideoBattleParticipant> _videoBattleParticipantRepository;
        private readonly IMobRepository<VideoBattleGenre> _videoBattleGenreRepository;
        private readonly IMobRepository<VideoBattleVideo> _videoBattleVideoRepository;

        private readonly IWorkContext _workContext;

        private IUrlRecordService _urlRecordService;
        private readonly IPictureService _pictureService;

        public VideoBattleService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger,
            IMobRepository<VideoBattle> videoBattleRepository,
            IMobRepository<VideoBattlePicture> videoBattlePictureRepository,
            IMobRepository<VideoBattleParticipant> videoBattleParticpantRepository,
            IMobRepository<VideoBattleGenre> videoBattleGenreRepository,
            IMobRepository<VideoBattleVideo> videoBattleVideoRepository,
            IUrlRecordService urlRecordService,
            IWorkContext workContext,
            IPictureService pictureService)
            : base(videoBattleRepository, videoBattlePictureRepository, pictureService, workContext, urlRecordService)
        {
            _urlRecordService = urlRecordService;
            _workContext = workContext;
            _pictureService = pictureService;
            _videoBattleRepository = videoBattleRepository;
            _videoBattleParticipantRepository = videoBattleParticpantRepository;
            _videoBattleGenreRepository = videoBattleGenreRepository;
            _videoBattleVideoRepository = videoBattleVideoRepository;
        }

        /// <summary>
        /// A multipurpose method for getting the video battles
        /// </summary>
        public System.Collections.Generic.IList<VideoBattle> GetAll(int? OwnerId, int? ParticipantId, int? VideoGenreId, Enums.VideoBattleStatus? BattleStatus, VideoBattleType? BattleType, bool? IsSponsorshipSupported, string SearchTerm, BattlesSortBy? BattlesSortBy, SortOrder? SortOrder, out int TotalPages, int Page = 1, int Count = 15)
        {
            var battles = _videoBattleRepository.Table;
            if (OwnerId != null)
            {
                battles = battles.Where(x => x.ChallengerId == OwnerId.Value);
            }

            if (ParticipantId != null)
            {
                var participantBattleIds =
                    _videoBattleParticipantRepository.Table.Where(x => x.ParticipantId == ParticipantId.Value)
                        .Select(x => x.VideoBattleId);

                battles = battles.Where(x => participantBattleIds.Contains(x.Id));
            }

            if (VideoGenreId != null)
            {
                var videoGenreBattleIds =
                    _videoBattleGenreRepository.Table.Where(x => x.VideoGenreId == VideoGenreId.Value)
                        .Select(x => x.VideoBattleId);
                battles = battles.Where(x => videoGenreBattleIds.Contains(x.Id));
            }

            if (BattleStatus != null)
            {
                battles = battles.Where(x => x.VideoBattleStatus == BattleStatus.Value);
            }

            if (BattleType != null)
            {
                battles = battles.Where(x => x.VideoBattleType == BattleType.Value);
            }

            if (IsSponsorshipSupported != null)
            {
                battles = battles.Where(x => x.IsSponsorshipSupported);
            }

            if (!string.IsNullOrEmpty(SearchTerm))
            {
                battles = battles.Where(x => x.Name.ToLower().Contains(SearchTerm.ToLower()));
            }
            TotalPages = int.Parse(Math.Ceiling((decimal)battles.Count() / Count).ToString());

            IOrderedQueryable<VideoBattle> orderedBattles;
            if (BattlesSortBy.HasValue)
            {
                switch (BattlesSortBy)
                {
                    case Enums.BattlesSortBy.PrizeAmount:
                        orderedBattles = SortOrder == Enums.SortOrder.Ascending
                            ? battles.OrderBy(x => x.Prizes.Sum(z => z.PrizeAmount))
                            : battles.OrderByDescending(x => x.Prizes.Sum(z => z.PrizeAmount));
                        break;
                    case Enums.BattlesSortBy.VotingStartDate:
                        orderedBattles = SortOrder == Enums.SortOrder.Ascending
                            ? battles.OrderBy(x => x.VotingStartDate)
                            : battles.OrderByDescending(x => x.VotingStartDate);
                        break;
                    case Enums.BattlesSortBy.VotingEndDate:
                        orderedBattles = SortOrder == Enums.SortOrder.Ascending
                            ? battles.OrderBy(x => x.VotingEndDate)
                            : battles.OrderByDescending(x => x.VotingEndDate);
                        break;
                    case Enums.BattlesSortBy.SponsorshipAmount:
                        orderedBattles = SortOrder == Enums.SortOrder.Ascending
                            ? battles.OrderBy(x => x.MinimumSponsorshipAmount)
                            : battles.OrderByDescending(x => x.MinimumSponsorshipAmount);
                        break;
                    case Enums.BattlesSortBy.NumberOfParticipants:
                        var tempBattles = battles.Join(_videoBattleParticipantRepository.Table, b => b.Id, p => p.VideoBattleId,
                            (b, p) => new {Battle = b, ParticipantCount = _videoBattleParticipantRepository.Table.Count(x => x.VideoBattleId == b.Id)});
                        orderedBattles = (SortOrder == Enums.SortOrder.Ascending)
                            ? tempBattles.OrderBy(x => x.ParticipantCount).Select(x => x.Battle).OrderBy(x => x.Id)
                            : tempBattles.OrderByDescending(x => x.ParticipantCount)
                                .Select(x => x.Battle)
                                .OrderBy(x => x.Id);


                        break;
                    default:
                        orderedBattles = SortOrder == Enums.SortOrder.Ascending
                            ? battles.OrderBy(x => x.Id)
                            : battles.OrderByDescending(x => x.Id);
                        break;
                }
            }
            else
            {
                orderedBattles = SortOrder == Enums.SortOrder.Ascending
                          ? battles.OrderBy(x => x.Id)
                          : battles.OrderByDescending(x => x.Id);
            }

            //return paginated result
            return orderedBattles.Skip((Page - 1) * Count).Take(Count).ToList();
        }

        /// <summary>
        /// Sets all the scheduled battles open for public when they reach the end date. It also changes the participant status of the participants who 
        /// have not responded to the challenge 
        /// </summary>
        public void SetScheduledBattlesOpenOrClosed()
        {
            //get the battles which have acceptance date equal to or less than now
            var now = DateTime.UtcNow;
            var videoBattles =
                _videoBattleRepository.Table.Where(
                    x =>
                        (x.VotingStartDate <= now || x.VotingEndDate <= now) &&
                        (x.VideoBattleStatus == VideoBattleStatus.Pending ||
                         x.VideoBattleStatus == VideoBattleStatus.Locked)).ToList();

            foreach (var battle in videoBattles)
            {
                //do we need to open or complete the battle?
                if (battle.VotingEndDate <= now)
                {
                    //lets complete the battle as it's more than voting last date
                    battle.VideoBattleStatus = VideoBattleStatus.Complete;
                }
                else if (battle.VotingStartDate <= now)
                {
                    //get participants of this battle
                    var participants = _videoBattleParticipantRepository.Table.Where(x => x.VideoBattleId == battle.Id);

                    //all the participants who have not accepted will now be changed to denied
                    foreach (var participant in participants.Where(x => x.ParticipantStatus == VideoBattleParticipantStatus.Challenged || x.ParticipantStatus == VideoBattleParticipantStatus.SignedUp).ToList())
                    {
                        participant.ParticipantStatus = participant.ParticipantStatus == VideoBattleParticipantStatus.SignedUp ? VideoBattleParticipantStatus.ChallengeCancelled : VideoBattleParticipantStatus.ChallengeDenied;
                        _videoBattleParticipantRepository.Update(participant);
                    }

                    //let's see if there are enough participants to open the battle (at least two)
                    if (participants.Count(x => x.ParticipantStatus == VideoBattleParticipantStatus.ChallengeAccepted) > 0)
                    {
                        //and do we have at least two videos for competition
                        var battleVideoCount = _videoBattleVideoRepository.Table.Count(x => x.VideoBattleId == battle.Id);
                        //depending on the number of videos, battle can be either open or closed or complete
                        if (battleVideoCount == 0)
                        {
                            battle.VideoBattleStatus = VideoBattleStatus.Closed;
                        }
                        else if (battleVideoCount > 1)
                        {
                            battle.VideoBattleStatus = VideoBattleStatus.Open;
                        }
                        else
                        {
                            //only one video has been uploaded and by default, he should be the winner? (I guess). BTW the battle is complete then.
                            battle.VideoBattleStatus = VideoBattleStatus.Complete;
                        }

                    }
                    else
                    {
                        //so nobody accepted the challenge...too bad...let's close the battle then
                        battle.VideoBattleStatus = VideoBattleStatus.Closed;
                    }
                }

                _videoBattleRepository.Update(battle);


            }

        }

        public override List<VideoBattle> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }
}