using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IArtistPageManagerService
    {
        void AddPageManager(ArtistPageManager Manager);

        void DeletePageManager(ArtistPageManager Manager);

        void DeletePageManager(int ArtistPageId, int CustomerId);

        bool IsPageManager(int ArtistPageId, int CustomerId);

        IList<ArtistPageManager> GetPageManagers(int ArtistPageId);

        IList<ArtistPage> GetPagesAsManager(int CustomerId);
    }
}
