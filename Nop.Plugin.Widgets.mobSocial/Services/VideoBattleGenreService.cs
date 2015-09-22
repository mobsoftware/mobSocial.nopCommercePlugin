using System;
using System.Collections.Generic;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class VideoBattleGenreService : BaseEntityService<VideoBattleGenre>, IVideoBattleGenreService
    {
        private readonly IRepository<VideoBattleGenre> _videoBattleGenreRepository;
        private readonly IWorkContext _workContext;

        public VideoBattleGenreService(IMobRepository<VideoBattleGenre> videoBattleGenreRepository,                        
            IWorkContext workContext) :
            base(videoBattleGenreRepository)
        {
            _videoBattleGenreRepository = videoBattleGenreRepository;
            _workContext = workContext;
        }   
        public override List<VideoBattleGenre> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }
}
