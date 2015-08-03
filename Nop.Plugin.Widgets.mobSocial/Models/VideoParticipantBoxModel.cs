using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoParticipantBoxModel : BaseNopModel
    {
        public VideoParticipantPublicModel VideoParticipant { get; set; }

        public VideoBattlePublicModel VideoBattle { get; set; }
    }
}
