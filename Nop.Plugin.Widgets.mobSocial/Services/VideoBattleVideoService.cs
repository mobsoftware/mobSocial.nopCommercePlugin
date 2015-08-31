using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class VideoBattleVideoService : BaseService<VideoBattleVideo, VideoBattleVideo>, IVideoBattleVideoService
    {
        private readonly IRepository<VideoBattleVideo> _videoBattleVideoRepository;

        private readonly IWorkContext _workContext;

        public VideoBattleVideoService(IRepository<VideoBattleVideo> videoBattleVideoRepository,                        
            IWorkContext workContext) :
            base(videoBattleVideoRepository, workContext)
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

        public override List<VideoBattleVideo> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }

        public override List<VideoBattleVideo> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override VideoBattleVideo GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public IList<VideoBattleVideo> GetBattleVideos(int BattleId)
        {
            return _videoBattleVideoRepository.Table.Where(x => x.VideoBattleId == BattleId).ToList();
        }
    }
}
