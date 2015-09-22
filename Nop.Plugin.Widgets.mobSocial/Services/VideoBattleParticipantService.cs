using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class VideoBattleParticipantService : BaseEntityService<VideoBattleParticipant>, IVideoBattleParticipantService
    {
        private readonly IMobRepository<VideoBattleParticipant> _videoBattleParticipantRepository;

        private readonly IWorkContext _workContext;

        public VideoBattleParticipantService(IMobRepository<VideoBattleParticipant> videoBattleParticipantRepository,                        
            IWorkContext workContext) :
            base(videoBattleParticipantRepository)
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

        public override List<VideoBattleParticipant> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }
}
