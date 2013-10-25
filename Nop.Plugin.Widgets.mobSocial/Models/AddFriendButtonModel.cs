using Nop.Plugin.Widgets.MobSocial.Controllers;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class AddFriendButtonModel
    {
        public int CurrentCustomerId { get; set; }
        public int CustomerProfileId { get; set; }

        public bool ShowFriendsButton { get; set; }
        public bool ShowConfirmFriendButton { get; set; }
        public bool ShowFriendRequestSent { get; set; }
        public bool ShowAddFriendButton { get; set; }


    }
}