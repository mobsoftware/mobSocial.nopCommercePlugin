using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class VideoBattle : BaseEntity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateUpdated { get; set; }

        public int ChallengerId { get; set; }

        public DateTime AcceptanceLastDate { get; set; }

        public VideoBattleType VideoBattleType { get; set; }

        public VideoBattleStatus VideoBattleStatus { get; set; }

        public VideoBattleVoteType VideoBattleVoteType { get; set; }
    }
}
