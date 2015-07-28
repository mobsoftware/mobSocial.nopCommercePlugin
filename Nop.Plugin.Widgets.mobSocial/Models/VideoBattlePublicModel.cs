using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoBattlePublicModel : BaseNopModel
    {
        public VideoBattlePublicModel()
        {
            Challengee = new List<VideoParticipantPublicModel>();
        }

        public int TotalVotes { get; set; }

        public VideoParticipantPublicModel Challenger { get; set; }

        public IList<VideoParticipantPublicModel> Challengee { get; set; }

        public bool IsEditable { get; set; }
    }
}
