using System.Collections;
using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Music service for searching artists, tracks, and getting track previews
    /// </summary>
    public interface IMusicService
    {
        string GetTrackPreviewUrl(int trackId);

        // just place holders that can be refactored later
        string GetTrackAffiliateUrl(int trackId);
        object SearchSongs(string term);

    }

}
