namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class FriendSearchModel
    {
        public string SearchTerm { get; set; }

        public bool ExcludeLoggedInUser { get; set; }

        public int Count { get; set; }

        public int Page { get; set; }

    }
}