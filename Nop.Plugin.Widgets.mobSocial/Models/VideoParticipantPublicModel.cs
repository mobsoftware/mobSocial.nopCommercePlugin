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

        public int VideoId { get; set; }

        public DateTime LastUpdated { get; set; }

        public string VideoPath { get; set; }

        public string ThumbnailPath { get; set; }

        public string MimeType { get; set; }

        public string ParticipantName { get; set; }

        public string ParticipantUrl { get; set; }

        public string ParticipantProfileImageUrl { get; set; }

        public int RatingCountLike { get; set; }

        public int RatingCountDislike { get; set; }

        public decimal AverageRating { get; set; }

        public int TotalVoters { get; set; }

        public bool CanEdit { get; set; }

        public bool IsLeading { get; set; }

        public bool IsWinner { get; set; }

        public VideoBattleParticipantStatus VideoBattleParticipantStatus { get; set; }

        public string Remarks { get; set; }
        /// <summary>
        /// Has the logged in user voted for this participant
        /// </summary>
        public VideoBattleVotePublicModel CurrentUserVote { get; set; }

        /// <summary>
        /// Has the logged in user has watched the video of participant
        /// </summary>
        public bool VideoWatched { get; set; }

    }
}
