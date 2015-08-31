using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface ISongService : IBaseService<Song, SongPicture>
    {
        IList<Song> SearchSongs(string Term, int Count = 15, int Page = 1, bool SearchDescriptions = false, bool SearchArtists = false, string ArtistName = "", bool PublishedOnly = true);

        IList<Song> SearchSongs(string Term, out int TotalPages, int Count = 15, int Page = 1, bool SearchDescriptions = false, bool SearchArtists = false, string ArtistName = "", bool PublishedOnly = true);

        Song GetSongByRemoteEntityId(string RemoteEntityId);

        Song GetSongByProductId(int ProductId);
    }
}
