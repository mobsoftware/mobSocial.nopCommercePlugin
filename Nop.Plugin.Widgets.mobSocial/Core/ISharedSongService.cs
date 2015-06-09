using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface ISharedSongService: IBaseService<SharedSong, SharedSong>
    {
        
        IList<SharedSong> GetSharedSongs(int CustomerId, int Count = 15, int Page = 1);

        IList<SharedSong> GetSharedSongs(int CustomerId, out int TotalPages, int Count = 15, int Page = 1);

        IList<SharedSong> GetReceivedSongs(int CustomerId, int Count = 15, int Page = 1);

        IList<SharedSong> GetReceivedSongs(int CustomerId, out int TotalPages , int Count = 15, int Page = 1);
    }
}
