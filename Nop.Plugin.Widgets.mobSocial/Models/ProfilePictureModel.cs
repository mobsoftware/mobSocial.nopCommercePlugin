using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class ProfilePictureModel : BaseNopModel
    {

        public bool AvatarEnabled { get; set; }
        public string AvatarUrl { get; set; }
        

    }
}