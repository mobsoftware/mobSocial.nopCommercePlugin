using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class VideoBattleParticipant : BaseEntity
    {
        public int VideoBattleId { get; set; }

        public int ParticipantId { get; set; }

        public VideoBattleParticipantStatus ParticipantStatus { get; set; }

        public virtual VideoBattle VideoBattle { get; set; }


    }
}
