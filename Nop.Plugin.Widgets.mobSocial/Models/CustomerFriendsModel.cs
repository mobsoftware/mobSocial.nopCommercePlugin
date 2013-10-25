using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerFriendsModel : BaseNopModel
    {
        public string CustomerDisplayName { get; set; }

        public string ProfileUrl { get; set; }

        public string ProfileThumbnailUrl { get; set; }
    }
}