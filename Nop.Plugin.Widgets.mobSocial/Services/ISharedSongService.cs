using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface ISharedSongService: IBaseService<SharedSong, SharedSong>
    {
        
        IList<SharedSong> GetSharedSongs(int CustomerId, int Count = 15, int Page = 1);

        IList<SharedSong> GetSharedSongs(int CustomerId, out int TotalPages, int Count = 15, int Page = 1);

        IList<SharedSong> GetReceivedSongs(int CustomerId, int Count = 15, int Page = 1);

        IList<SharedSong> GetReceivedSongs(int CustomerId, out int TotalPages , int Count = 15, int Page = 1);
    }
}
