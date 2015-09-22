using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class EventPageAttendanceMap : BaseMobEntityTypeConfiguration<EventPageAttendance>
    {

        public EventPageAttendanceMap()
        {
            //Map the additional properties
            Property(m => m.EventPageId);
            Property(m => m.CustomerId);
            Property(m => m.AttendanceStatusId);

            
        }

    }
}
