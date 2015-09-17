using System;
using System.Collections.Generic;
using Nop.Core;
using Nop.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class VideoGenreService : BaseService<VideoGenre, VideoGenre>, IVideoGenreService
    {
        private readonly IRepository<VideoGenre> _videoBattleVoteRepository;
        private readonly IWorkContext _workContext;

        public VideoGenreService(IRepository<VideoGenre> videoBattleVoteRepository,                        
            IWorkContext workContext) :
            base(videoBattleVoteRepository, workContext)
        {
            _videoBattleVoteRepository = videoBattleVoteRepository;
            _workContext = workContext;
        }


        public override List<VideoGenre> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }

        public override List<VideoGenre> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override VideoGenre GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public override Nop.Core.Domain.Media.Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
    }
}
