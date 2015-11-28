using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoBattleQueryModel: BaseNopModel
    {
        public string ViewType { get; set; }

        public string SearchTerm { get; set; }

    }
}
