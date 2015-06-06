using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
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


    }
}
