using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class VideoBattleVideoService : BaseEntityService<VideoBattleVideo>, IVideoBattleVideoService
    {
        private readonly IMobRepository<VideoBattleVideo> _videoBattleVideoRepository;

        private readonly IWorkContext _workContext;

        public VideoBattleVideoService(IMobRepository<VideoBattleVideo> videoBattleVideoRepository,                        
            IWorkContext workContext) :
            base(videoBattleVideoRepository)
        {
            _videoBattleVideoRepository = videoBattleVideoRepository;
            _workContext = workContext;
        }       

        public VideoBattleVideo GetBattleVideo(int BattleId, int ParticipantId)
        {
            var battleVideo =
                _videoBattleVideoRepository.Table.FirstOrDefault(
                    x => x.VideoBattleId == BattleId && x.ParticipantId == ParticipantId);
            return battleVideo;
        }

        public IList<VideoBattleVideo> GetBattleVideos(int BattleId)
        {
            return _videoBattleVideoRepository.Table.Where(x => x.VideoBattleId == BattleId).ToList();
        }

        public override List<VideoBattleVideo> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }
}
