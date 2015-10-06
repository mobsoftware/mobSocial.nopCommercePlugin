using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class WatchedVideoService: BaseEntityService<WatchedVideo>, IWatchedVideoService
    {
        private readonly IMobRepository<WatchedVideo> _repository;
 
        public WatchedVideoService(IMobRepository<WatchedVideo> repository) : base(repository)
        {
            _repository = repository;
        }

        public override List<WatchedVideo> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new System.NotImplementedException();
        }

        public bool IsVideoWatched(int CustomerId, int VideoId, VideoType VideoType)
        {
            return GetWatchedVideos(VideoId, CustomerId, VideoType).Any();
        }

        public WatchedVideo GetWatchedVideo(int CustomerId, int VideoId, VideoType VideoType)
        {
            var watchedVideos = GetWatchedVideos(VideoId, CustomerId, VideoType);
            return watchedVideos.FirstOrDefault();
        }

        public int GetViewCounts(int VideoId, VideoType VideoType)
        {
            return GetWatchedVideos(VideoId, null, VideoType).Count;
        }

        public IList<WatchedVideo> GetWatchedVideos(int? VideoId, int? CustomerId, VideoType? VideoType)
        {
            var query = _repository.Table;

            if (VideoId.HasValue)
            {
                query = query.Where(x => x.VideoId == VideoId);
            }

            if (CustomerId.HasValue)
            {
                query = query.Where(x => x.CustomerId == CustomerId);
            }

            if (VideoType.HasValue)
            {
                query = query.Where(x => x.VideoType == VideoType);
            }

            return query.ToList();
        }
    }
}