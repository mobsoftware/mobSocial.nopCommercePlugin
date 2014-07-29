using Nop.Core;
using Nop.Core.Domain.Seo;
using System;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class EventPageAttendance : BaseEntity
    {

        public int EventPageId { get; set; }
        public int CustomerId { get; set; }
        public int AttendanceStatusId { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

        public virtual EventPage EventPage { get; set; }

    }
}