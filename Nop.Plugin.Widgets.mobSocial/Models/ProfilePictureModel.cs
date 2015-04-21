using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class ProfilePictureModel : BaseNopModel
    {
        public bool CanEdit { get; set; }
        public bool AvatarEnabled { get; set; }
        public string AvatarUrl { get; set; }
        public string FullSizeAvatarUrl { get; set; }
    }
}