using Nop.Core;
using Nop.Core.Domain.Seo;
using System;
using Mob.Core.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class EventPageAttendance : BaseMobEntity
    {

        public int EventPageId { get; set; }
        public int CustomerId { get; set; }
        public int AttendanceStatusId { get; set; }


        public virtual EventPage EventPage { get; set; }

    }
}