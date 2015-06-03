using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface IArtistPageService : IBaseService<ArtistPage, ArtistPagePicture>
    {
        ArtistPage GetArtistPageByName(string Name);

        IList<ArtistPage> GetArtistPagesByPageOwner(int PageOwnerId, string SearchTerm = "", int Count = 15, int Page = 1, bool IncludeOrphan = false);
        IList<ArtistPage> GetArtistPagesByPageOwner(int PageOwnerId, out int TotalPages, string SearchTerm = "", int Count = 15, int Page = 1, bool IncludeOrphan = false);


        IList<ArtistPage> GetArtistPagesByRemoteEntityId(string[] RemoteEntityId);

        IList<ArtistPage> SearchArtists(string Term, int Count = 15, int Page = 1, bool SearchDescriptions = false);

        IList<ArtistPage> SearchArtists(string Term, out int TotalPages, int Count = 15, int Page = 1, bool SearchDescriptions = false);

    }
}
