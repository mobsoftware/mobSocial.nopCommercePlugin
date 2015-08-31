using System;
using System.Collections.Generic;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class VideoBattleGenreService : BaseService<VideoBattleGenre, VideoBattleGenre>, IVideoBattleGenreService
    {
        private readonly IRepository<VideoBattleGenre> _videoBattleGenreRepository;
        private readonly IWorkContext _workContext;

        public VideoBattleGenreService(IRepository<VideoBattleGenre> videoBattleGenreRepository,                        
            IWorkContext workContext) :
            base(videoBattleGenreRepository, workContext)
        {
            _videoBattleGenreRepository = videoBattleGenreRepository;
            _workContext = workContext;
        }    


        public override List<VideoBattleGenre> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }

        public override List<VideoBattleGenre> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override VideoBattleGenre GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
    }
}
