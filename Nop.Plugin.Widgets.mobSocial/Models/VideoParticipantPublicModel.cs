using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoParticipantPublicModel : BaseNopModel
    {
        public int Id { get; set; }

        public string VideoPath { get; set; }

        public string MimeType { get; set; }

        public string ParticipantName { get; set; }

        public int RatingCountLike { get; set; }

        public int RatingCountDislike { get; set; }

        public int AverageRating { get; set; }

        public int TotalVoters { get; set; }

        public bool CanEdit { get; set; }

        public VideoBattleParticipantStatus VideoBattleParticipantStatus { get; set; }

    }
}
