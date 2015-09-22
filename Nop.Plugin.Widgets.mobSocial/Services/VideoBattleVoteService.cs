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
    public class VideoBattleVoteService : BaseEntityService<VideoBattleVote>, IVideoBattleVoteService
    {
        private readonly IMobRepository<VideoBattleVote> _videoBattleVoteRepository;
        private readonly IWorkContext _workContext;

        public VideoBattleVoteService(IMobRepository<VideoBattleVote> videoBattleVoteRepository,                        
            IWorkContext workContext) :
            base(videoBattleVoteRepository)
        {
            _videoBattleVoteRepository = videoBattleVoteRepository;
            _workContext = workContext;
        }


        public IList<VideoBattleVote> GetVideoBattleVotes(int VideoBattleId, int? UserId)
        {
            if (UserId.HasValue)
            {
                return _videoBattleVoteRepository.Table.Where(x => x.VideoBattleId == VideoBattleId && x.UserId == UserId.Value).ToList();

            }
            return _videoBattleVoteRepository.Table.Where(x => x.VideoBattleId == VideoBattleId).ToList();
        }

        public override List<VideoBattleVote> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }
}
