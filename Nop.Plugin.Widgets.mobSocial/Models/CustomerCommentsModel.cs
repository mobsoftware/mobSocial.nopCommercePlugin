using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerCommentsModel : BaseNopModel
    {
        public bool CanPost { get; set; }

        public string CustomerName { get; set; }

        public string CustomerProfileUrl { get; set; }

        public string CustomerProfileImageUrl { get; set; }

        public bool PreloadComments { get; set; }

        public int SinglePageCommentCount { get; set; }
    }
}
