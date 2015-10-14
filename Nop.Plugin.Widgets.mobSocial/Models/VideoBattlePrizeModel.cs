using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class VideoBattlePrizeModel : BaseNopEntityModel
    {
        public int Id { get; set; }

        public int VideoBattleId { get; set; }

        public int WinnerPosition { get; set; }

        public VideoBattlePrizeType PrizeType { get; set; }

        public string Description { get; set; }

        public decimal PrizePercentage { get; set; }

        public decimal PrizeAmount { get; set; }

        public int PrizeProductId { get; set; }

        public string PrizeOther { get; set; }

        public int WinnerId { get; set; }
    }
}
