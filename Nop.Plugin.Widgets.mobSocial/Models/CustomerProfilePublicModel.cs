using System;
using Nop.Web.Framework.Models;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerProfilePublicModel: BaseNopModel
    {
        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        public string ProfileUrl { get; set; }

        public string ProfileImageUrl { get; set; }

        public string CoverImageUrl { get; set; }

        public string SeName { get; set; }

        public int ViewCount { get; set; }

        public int FriendCount { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime LastUpdatedOn { get; set; }

        public FriendStatus FriendStatus { get; set; }

        public bool IsEditable { get; set; }

        public int FollowingStatus { get; set; }

        public int FollowerCount { get; set; }

        public ProfileIndexModel ProfileIndexModel { get; set; }
    }
}
