using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class FriendPublicModel
    {
        public string DisplayName { get; set; }

        public string ProfileUrl { get; set; }

        public string PictureUrl { get; set; }

        public int Id { get; set; }

        public FriendStatus FriendStatus { get; set; }
    }
}
