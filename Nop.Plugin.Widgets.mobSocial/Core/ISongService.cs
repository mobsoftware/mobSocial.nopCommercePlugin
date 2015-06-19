using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface ISongService : IBaseService<Song, SongPicture>
    {
        IList<Song> SearchSongs(string Term, int Count = 15, int Page = 1, bool SearchDescriptions = false, bool SearchArtists = false, string ArtistName = "");

        IList<Song> SearchSongs(string Term, out int TotalPages, int Count = 15, int Page = 1, bool SearchDescriptions = false, bool SearchArtists = false, string ArtistName = "");

        Song GetSongByRemoteEntityId(string RemoteEntityId);

        Song GetSongByProductId(int ProductId);
    }
}
