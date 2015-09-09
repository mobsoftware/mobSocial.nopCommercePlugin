using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class VideoBattleParticipantService : BaseService<VideoBattleParticipant, VideoBattleParticipant>, IVideoBattleParticipantService
    {
        private readonly IRepository<VideoBattleParticipant> _videoBattleParticipantRepository;

        private readonly IWorkContext _workContext;

        public VideoBattleParticipantService(IRepository<VideoBattleParticipant> videoBattleParticipantRepository,                        
            IWorkContext workContext) :
            base(videoBattleParticipantRepository, workContext)
        {
            _videoBattleParticipantRepository = videoBattleParticipantRepository;
            _workContext = workContext;
        }       
      
        public VideoBattleParticipantStatus GetParticipationStatus(int BattleId, int ParticipantId)
        {
            var videoBattleParticipant = GetVideoBattleParticipant(BattleId, ParticipantId);
            if (videoBattleParticipant == null)
                return VideoBattleParticipantStatus.NotChallenged;

            return videoBattleParticipant.ParticipantStatus;
        }

        public VideoBattleParticipant GetVideoBattleParticipant(int BattleId, int ParticipantId)
        {
            var videoBattleParticipant = _videoBattleParticipantRepository.Table.FirstOrDefault(x => x.ParticipantId == ParticipantId && x.VideoBattleId == BattleId);
            return videoBattleParticipant;
        }


        public IList<VideoBattleParticipant> GetVideoBattleParticipants(int BattleId, VideoBattleParticipantStatus? ParticipantStatus)
        {
            if (ParticipantStatus.HasValue)
            {
                return _videoBattleParticipantRepository.Table.Where(x => x.VideoBattleId == BattleId && x.ParticipantStatus == ParticipantStatus.Value).OrderBy(x => x.ParticipantStatus).ToList();
            }
            return _videoBattleParticipantRepository.Table.Where(x => x.VideoBattleId == BattleId).OrderBy(x => x.ParticipantStatus).ToList();
        }



        public override List<VideoBattleParticipant> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }

        public override List<VideoBattleParticipant> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override VideoBattleParticipant GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
    }
}
