using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoBattlePublicModel : BaseNopModel
    {
        public VideoBattlePublicModel()
        {
            Participants = new List<VideoParticipantPublicModel>();
            Prizes = new List<VideoBattlePrizeModel>();
            Sponsors = new List<SponsorPublicModel>();
        }

        public int Id { get; set; }

        public int TotalVotes { get; set; }

        public IList<VideoParticipantPublicModel> Participants { get; set; }

        public VideoBattleStatus VideoBattleStatus { get; set; }

        public VideoBattleType VideoBattleType { get; set; }

        public VideoBattleVoteType VideoBattleVoteType { get; set; }

        public bool IsEditable { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateUpdated { get; set; }

        public DateTime VotingStartDate { get; set; }

        public DateTime VotingEndDate { get; set; }

        public int RemainingSeconds { get; set; }

        public string ChallengerName { get; set; }

        public string ChallengerUrl { get; set; }

        public string ChallengerProfileImageUrl { get; set; }

        public string VideoBattleUrl { get; set; }

        public string SeName { get; set; }

        public bool IsParticipant { get; set; }

        public int MaximumParticipantCount { get; set; }

        public bool IsUserLoggedIn { get; set; }

        public int LoggedInUserId { get; set; }

        public VideoViewMode ViewMode { get; set; }

        public bool IsVotingPayable { get; set; }

        public decimal MinimumVotingCharge { get; set; }

        public bool CanVoterIncreaseVotingCharge { get; set; }

        public IList<VideoBattlePrizeModel> Prizes { get; set; }

        public string ConsolidatedPrizesDisplay { get; set; }

        public string VideoBattleFeaturedImageUrl { get; set; }

        public string VideoBattleCoverImageUrl { get; set; }

        public bool IsSponsorshipSupported { get; set; }

        public decimal MinimumSponsorshipAmount { get; set; }

        public bool IsSponsor { get; set; }

        public IList<SponsorPublicModel> Sponsors { get; set; }

        public SponsorPublicModel CurrentSponsor { get; set; }
    }
}
