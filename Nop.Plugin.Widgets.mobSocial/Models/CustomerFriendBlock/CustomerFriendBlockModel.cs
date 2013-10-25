using System.Collections.Generic;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models.CustomerFriendBlock
{
    public class CustomerFriendBlockModel : BaseNopModel
    {
        
        public string ProfileUrl { get; set; }
        public string ProfileThumbnailPictureUrl { get; set; }
        public string CustomerFullName { get; set; }

        public List<CustomerFriendModel> Friends { get; set; }
       

    }
}