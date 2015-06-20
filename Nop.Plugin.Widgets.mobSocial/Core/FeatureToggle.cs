using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// For disabling partially implmented features on the main branch.
    /// Remove properties and associated if statements when feature is complete, or 
    /// make features configurable bassed on user roles
    /// </summary>
    /// <see cref="http://martinfowler.com/bliki/FeatureToggle.html"/>
    public static class FeatureToggle
    {
        public static bool MobLiveStreamEnabled { get { return false; } }
        public static bool FavoriteSongEnabled { get { return false; } }
        public static bool TimeLinePostsEnabled { get { return false; } }
    }
}
