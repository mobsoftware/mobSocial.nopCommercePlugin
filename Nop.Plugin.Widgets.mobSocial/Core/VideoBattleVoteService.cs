using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class VideoBattleVoteService : BaseService<VideoBattleVote, VideoBattleVote>, IVideoBattleVoteService
    {
        private readonly IRepository<VideoBattleVote> _videoBattleVoteRepository;
        private readonly IWorkContext _workContext;

        public VideoBattleVoteService(IRepository<VideoBattleVote> videoBattleVoteRepository,                        
            IWorkContext workContext) :
            base(videoBattleVoteRepository, workContext)
        {
            _videoBattleVoteRepository = videoBattleVoteRepository;
            _workContext = workContext;
        }


        public override List<VideoBattleVote> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }

        public override List<VideoBattleVote> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override VideoBattleVote GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public IList<VideoBattleVote> GetVideoBattleVotes(int VideoBattleId, int? UserId)
        {
            if (UserId.HasValue)
            {
                return _videoBattleVoteRepository.Table.Where(x => x.VideoBattleId == VideoBattleId && x.UserId == UserId.Value).ToList();

            }
            return _videoBattleVoteRepository.Table.Where(x => x.VideoBattleId == VideoBattleId).ToList();
        }
    }
}
