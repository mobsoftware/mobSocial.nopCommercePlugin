using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class FriendSearchModel : BaseNopModel
    {
        public string SearchTerm { get; set; }

        public bool ExcludeLoggedInUser { get; set; }

        public int Page { get; set; }

        public int Count { get; set; }
    }
}