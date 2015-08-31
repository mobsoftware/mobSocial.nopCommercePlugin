using System;
using System.Linq;
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
    public class VideoBattleService : BaseService<VideoBattle, VideoBattlePicture>, IVideoBattleService
    {
        private readonly IRepository<VideoBattle> _videoBattleRepository;
        private readonly IRepository<VideoBattleParticipant> _videoBattleParticipantRepository;
        private readonly IRepository<VideoBattleGenre> _videoBattleGenreRepository;
        private readonly IRepository<VideoBattleVideo> _videoBattleVideoRepository;

        private readonly IWorkContext _workContext;

        private IUrlRecordService _urlRecordService;
        private readonly IPictureService _pictureService;

        public VideoBattleService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger,
            IRepository<VideoBattle> videoBattleRepository,
            IRepository<VideoBattlePicture> videoBattlePictureRepository,
            IRepository<VideoBattleParticipant> videoBattleParticpantRepository,
            IRepository<VideoBattleGenre> videoBattleGenreRepository,
            IRepository<VideoBattleVideo> videoBattleVideoRepository,
            IUrlRecordService urlRecordService,
            IWorkContext workContext,
            IPictureService pictureService)
            : base(videoBattleRepository, videoBattlePictureRepository, workContext, urlRecordService)
        {
            _urlRecordService = urlRecordService;
            _workContext = workContext;
            _pictureService = pictureService;
            _videoBattleRepository = videoBattleRepository;
            _videoBattleParticipantRepository = videoBattleParticpantRepository;
            _videoBattleGenreRepository = videoBattleGenreRepository;
            _videoBattleVideoRepository = videoBattleVideoRepository;
        }


        public override System.Collections.Generic.List<VideoBattle> GetAll(string term, int count)
        {
            throw new System.NotImplementedException();
        }

        public override System.Collections.Generic.List<VideoBattlePicture> GetAllPictures(int entityId)
        {
            return base.PictureRepository.Table.Where(x => x.VideoBattleId == entityId).ToList();
        }

        public override VideoBattlePicture GetFirstEntityPicture(int entityId)
        {
            return base.PictureRepository.Table.FirstOrDefault(x => x.VideoBattleId == entityId);
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            var entityPicture = PictureRepository.Table.FirstOrDefault(x => x.VideoBattleId == entityId);
            var picture = (entityPicture != null) ? _pictureService.GetPictureById(entityPicture.PictureId) : null;
            return picture;
        }
        /// <summary>
        /// A multipurpose method for getting the video battles
        /// </summary>
        public System.Collections.Generic.IList<VideoBattle> GetAll(int? OwnerId, int? ParticipantId, int? VideoGenreId, Enums.VideoBattleStatus? BattleStatus, out int TotalPages, int Page = 1, int Count = 15)
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
            TotalPages = int.Parse(Math.Ceiling((decimal)battles.Count() / Count).ToString());
            //return paginated result
            return battles.OrderByDescending(x => x.DateUpdated).Skip((Page - 1) * Count).Take(Count).ToList();
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
                        (x.AcceptanceLastDate <= now || x.VotingLastDate <= now) &&
                        (x.VideoBattleStatus == VideoBattleStatus.Pending ||
                         x.VideoBattleStatus == VideoBattleStatus.Locked)).ToList();

            foreach (var battle in videoBattles)
            {
                //do we need to open or complete the battle?
                if (battle.VotingLastDate <= now)
                {
                    //lets complete the battle as it's more than voting last date
                    battle.VideoBattleStatus = VideoBattleStatus.Complete;
                }
                else if (battle.AcceptanceLastDate <= now)
                {
                    //get participants of this battle
                    var participants = _videoBattleParticipantRepository.Table.Where(x => x.VideoBattleId == battle.Id);

                    //all the participants who have not accepted will now be changed to denied
                    foreach (var participant in participants.Where(x => x.ParticipantStatus == VideoBattleParticipantStatus.Challenged || x.ParticipantStatus == VideoBattleParticipantStatus.SignedUp))
                    {
                        participant.ParticipantStatus = participant.ParticipantStatus == VideoBattleParticipantStatus.SignedUp ? VideoBattleParticipantStatus.ChallengeCancelled : VideoBattleParticipantStatus.ChallengeDenied;
                        _videoBattleParticipantRepository.Update(participant);
                    }

                    //let's see if there are enough participants to open the battle (at least two)
                    if (participants.Count(x => x.ParticipantStatus == VideoBattleParticipantStatus.ChallengeAccepted) > 1)
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
    }
}