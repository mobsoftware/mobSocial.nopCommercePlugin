using System.Collections.Generic;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IArtistPageAPIService
    {
        bool DoesRemoteArtistExist(string Name);

        string GetRemoteArtist(string Name);

        IList<string> GetRelatedArtists(string RemoteEntityId, int Count = 5);

        IList<string> SearchArtists(string Term, int Count = 15, int Page = 1);

        IList<string> GetArtistSongs(string ArtistName, int Count = 15, int Page = 1);

        string GetRemoteSong(string RemoteEntityId);

        IList<string> SearchSongs(string Term, string Artist = "", int Count = 15, int Page = 1);

        IList<string> GetSimilarSongs(string TrackId, int Count = 5);
    }
}
