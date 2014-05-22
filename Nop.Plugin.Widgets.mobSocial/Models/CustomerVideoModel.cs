using System;
using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Web.Framework.Mvc;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class CustomerVideoModel : BaseNopModel
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Caption { get; set; }

        public int LikeCount { get; set; }

        public bool AlreadyLiked { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

    }
}