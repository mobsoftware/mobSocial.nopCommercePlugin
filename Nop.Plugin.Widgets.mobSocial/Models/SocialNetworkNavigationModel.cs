

//todo put models in folders named after main view. for instance, this model goes in the 'Customer' folder 

using Nop.Web.Framework.Models;
using Nop.Web.Models.Customer;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public partial class SocialNetworkNavigationModel : BaseNopModel
    {
        public string FriendRequestsLinkText { get; set; }

        public SocialNetworkNavigationEnum SelectedTab { get; set; }

        public CustomerNavigationModel NavigationModel { get; set; }

        public string ProfileInformationLinkText { get; set; }
    }

    public enum SocialNetworkNavigationEnum
    {
        
        Avatar,
        FriendRequests,
        Games, // todo sooner
        Events, // todo #1 priority 
        ProfileInformation
    }
}