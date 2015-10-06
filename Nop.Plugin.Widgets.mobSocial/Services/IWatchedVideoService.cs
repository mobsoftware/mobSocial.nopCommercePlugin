using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IWatchedVideoService : IBaseEntityService<WatchedVideo>
    {
        bool IsVideoWatched(int CustomerId, int VideoId, VideoType VideoType);

        WatchedVideo GetWatchedVideo(int CustomerId, int VideoId, VideoType VideoType);

        int GetViewCounts(int VideoId, VideoType VideoType);

        IList<WatchedVideo> GetWatchedVideos(int? VideoId, int? CustomerId, VideoType? VideoType);
    }
}