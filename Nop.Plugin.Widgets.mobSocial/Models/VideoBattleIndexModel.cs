using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.WebApi.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoBattleIndexModel : PageDisplayModel
    {
        public string SeName { get; set; }

        public VideoViewMode ViewMode { get; set; }
    }
}
