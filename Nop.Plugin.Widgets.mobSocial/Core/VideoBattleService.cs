using System.Linq;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Web.Framework.Kendoui;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class VideoBattleService : BaseService<VideoBattle, VideoBattle>, IVideoBattleService
    {
        private readonly IRepository<VideoBattle> _videoBattleRepository;
        private readonly IRepository<VideoBattleParticipant> _videoBattleParticipantRepository;
        private readonly IRepository<VideoBattleGenre> _videoBattleGenreRepository;

        private readonly IWorkContext _workContext;

        public VideoBattleService(IRepository<VideoBattle> videoBattleRepository,
            IRepository<VideoBattleParticipant> videoBattleParticipantRepository,
            IRepository<VideoBattleGenre> videoBattleGenreRepository,
            IWorkContext workContext) :
            base(videoBattleRepository, workContext)
        {
            _videoBattleRepository = videoBattleRepository;
            _videoBattleParticipantRepository = videoBattleParticipantRepository;
            _videoBattleGenreRepository = videoBattleGenreRepository;
            _workContext = workContext;
        }

        public override System.Collections.Generic.List<VideoBattle> GetAll(string term, int count)
        {
            throw new System.NotImplementedException();
        }

        public override System.Collections.Generic.List<VideoBattle> GetAllPictures(int entityId)
        {
            throw new System.NotImplementedException();
        }

        public override VideoBattle GetFirstEntityPicture(int entityId)
        {
            throw new System.NotImplementedException();
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            throw new System.NotImplementedException();
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