using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerFriendsRequestModel : BaseNopModel
    {
        public int CustomerId { get; set; }

        public int HowMany { get; set; }

        public int Page { get; set; }

        public bool Random { get; set; }
    }
}
