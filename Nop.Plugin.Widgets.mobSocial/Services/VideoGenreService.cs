using System;
using System.Collections.Generic;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class VideoGenreService : BaseEntityService<VideoGenre>, IVideoGenreService
    {
        private readonly IMobRepository<VideoGenre> _videoBattleVoteRepository;
        private readonly IWorkContext _workContext;

        public VideoGenreService(IMobRepository<VideoGenre> videoBattleVoteRepository,                        
            IWorkContext workContext) :
            base(videoBattleVoteRepository)
        {
            _videoBattleVoteRepository = videoBattleVoteRepository;
            _workContext = workContext;
        }

        public override List<VideoGenre> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }
}
