using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoBattleQueryModel: BaseNopModel
    {
        public string ViewType { get; set; }

        public string SearchTerm { get; set; }

        public int CustomerId { get; set; }

        public BattlesSortBy? BattlesSortBy { get; set; }

        public SortOrder? SortOrder { get; set; }

        public int Page { get; set; }

        public int Count { get; set; }

    }
}
