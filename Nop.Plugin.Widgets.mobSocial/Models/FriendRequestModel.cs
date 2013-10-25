using System.Collections.Generic;
using Nop.Web.Framework.Mvc;
using Nop.Web.Models.Customer;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class FriendRequestsModel : BaseNopModel
    {
        public FriendRequestsModel()
        {
            FriendRequests = new List<FriendRequestModel>();
        }

        public List<FriendRequestModel> FriendRequests { get; set; } 
        public CustomerNavigationModel NavigationModel { get; set; }
    }

    public class FriendRequestModel : BaseNopModel
    {

        public int FriendId { get; set; }
        public string CustomerDisplayName { get; set; }
        public string CustomerLocation { get; set; }

        public string ProfileUrl { get; set; }

        public string ProfileThumbnailUrl { get; set; }

    }

}