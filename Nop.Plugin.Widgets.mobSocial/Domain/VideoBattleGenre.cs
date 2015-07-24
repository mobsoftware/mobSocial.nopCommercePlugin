using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class VideoBattleGenre : BaseEntity
    {
        public int VideoBattleId { get; set; }

        public int VideoGenreId { get; set; }

        public virtual VideoBattle VideoBattle { get; set; }

        public virtual VideoGenre VideoGenre { get; set; }
    }
}
