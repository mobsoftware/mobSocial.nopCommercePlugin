using System.Linq;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Logging;
using Nop.Services.Media;
using Nop.Services.Seo;
using Nop.Web.Framework.Kendoui;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class VideoBattleService : BaseService<VideoBattle, VideoBattlePicture>, IVideoBattleService
    {
        private readonly IRepository<VideoBattle> _videoBattleRepository;
        private readonly IRepository<VideoBattleParticipant> _videoBattleParticipantRepository;
        private readonly IRepository<VideoBattleGenre> _videoBattleGenreRepository;

        private readonly IWorkContext _workContext;

        private IUrlRecordService _urlRecordService;
        private readonly IPictureService _pictureService;

        public VideoBattleService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger,
            IRepository<VideoBattle> videoBattleRepository,
            IRepository<VideoBattlePicture> videoBattlePictureRepository,
            IRepository<VideoBattleParticipant> videoBattleParticpantRepository,
            IRepository<VideoBattleGenre> videoBattleGenreRepository,
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
        public System.Collections.Generic.IList<VideoBattle> GetAll(int? OwnerId, int? ParticipantId, int? VideoGenreId, Enums.VideoBattleStatus? BattleStatus, int Page = 1, int Count = 15)
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
            //return paginated result
            return battles.Skip((Page - 1) * Count).Take(Count).ToList();
        }
    }
}