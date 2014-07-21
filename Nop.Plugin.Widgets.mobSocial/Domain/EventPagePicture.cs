using Nop.Core;
using Nop.Core.Domain.Media;
using Nop.Core.Domain.Seo;
using System;
using System.Collections.Generic;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class EventPagePicture : BaseEntity
    {
            public int ProductId { get; set; }
            public int PictureId { get; set; }
            public int DisplayOrder { get; set; }

            public virtual Picture Picture { get; set; }
            public virtual EventPage EventPage { get; set; }

            public DateTime DateCreated { get; set; }

            public DateTime DateUpdated { get; set; }
    }
}