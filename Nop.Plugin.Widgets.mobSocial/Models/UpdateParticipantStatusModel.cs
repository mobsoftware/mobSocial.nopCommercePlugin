using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class UpdateParticipantStatusModel : BaseNopModel
    {
        public int BattleId { get; set; }

        public VideoBattleParticipantStatus VideoBattleParticipantStatus { get; set; }

        public int ParticipantId { get; set; }

        public string Remarks { get; set; }
    }
}
