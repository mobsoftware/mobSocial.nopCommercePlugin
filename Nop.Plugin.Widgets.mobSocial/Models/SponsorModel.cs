using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class SponsorModel: BaseNopEntityModel
    {
        public SponsorModel()
        {
            Prizes = new List<VideoBattlePrizeModel>();    
        }

        public int SponsorPassId { get; set; }

        public int BattleId { get; set; }

        public BattleType BattleType { get; set; }

        public SponsorshipType SponsorshipType { get; set; }

        public IList<VideoBattlePrizeModel> Prizes { get; set; }
    }
}