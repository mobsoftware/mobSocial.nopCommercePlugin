using System;
using System.ComponentModel.DataAnnotations;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class SponsorDataModel : BaseNopModel
    {
        public int Id { get; set; }
        public int BattleId { get; set; }

        public BattleType BattleType { get; set; }

        public int SponsorCustomerId { get; set; }

        public int PictureId { get; set; }

        public string PictureUrl { get; set; }

        public int DisplayOrder { get; set; }

        public string TargetUrl { get; set; }

        [Required]
        public string DisplayName { get; set; }

        
    }
}