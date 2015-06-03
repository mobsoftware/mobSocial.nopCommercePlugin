using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
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
