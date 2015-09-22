using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Domain;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class VideoBattleGenre : BaseMobEntity
    {
        public int VideoBattleId { get; set; }

        public int VideoGenreId { get; set; }

        public virtual VideoBattle VideoBattle { get; set; }

        public virtual VideoGenre VideoGenre { get; set; }
    }
}
