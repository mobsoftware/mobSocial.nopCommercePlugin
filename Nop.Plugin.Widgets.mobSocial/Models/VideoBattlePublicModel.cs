using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoBattlePublicModel : BaseNopModel
    {
        public VideoBattlePublicModel()
        {
            Participants = new List<VideoParticipantPublicModel>();
        }

        public int Id { get; set; }

        public int TotalVotes { get; set; }

        public IList<VideoParticipantPublicModel> Participants { get; set; }

        public VideoBattleStatus VideoBattleStatus { get; set; }

        public bool IsEditable { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateUpdated { get; set; }

        public DateTime AcceptanceLastDate { get; set; }

        public DateTime VotingLastDate { get; set; }

        public int CurrentUserId { get; set; }
    }
}
