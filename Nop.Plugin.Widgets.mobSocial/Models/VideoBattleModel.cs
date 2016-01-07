using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoBattleModel : BaseNopEntityModel
    {
        public VideoBattleModel()
        {
            Prizes = new List<VideoBattlePrizeModel>();
        }

        [Required]
        public string Name { get; set; }

        [AllowHtml]
        public string Description { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateUpdated { get; set; }

        [Required]
        public int ChallengerId { get; set; }

        public DateTime VotingStartDate { get; set; }

        public DateTime VotingEndDate { get; set; }

        public VideoBattleType VideoBattleType { get; set; }

        public VideoBattleStatus VideoBattleStatus { get; set; }

        public VideoBattleVoteType VideoBattleVoteType { get; set; }

        public int MaximumParticipantCount { get; set; }

        public bool IsVotingPayable { get; set; }

        public decimal MinimumVotingCharge { get; set; }

        public bool CanVoterIncreaseVotingCharge { get; set; }

        public decimal ParticipantPercentagePerVote { get; set; }

        public IList<VideoBattlePrizeModel> Prizes { get; set; }

        public bool IsSponsorshipSupported { get; set; }

        public decimal MinimumSponsorshipAmount { get; set; }

        public SponsoredCashDistributionType SponsoredCashDistributionType { get; set; }
    }
}
