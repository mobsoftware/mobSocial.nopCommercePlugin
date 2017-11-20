namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoBattleQueryModel
    {
        public string SearchTerm { get; set; }

        public string ViewType { get; set; }

        public string SortOrder { get; set; }

        public string BattlesSortBy { get; set; }

        public int Count { get; set; }

        public int Page { get; set; }
    }
}