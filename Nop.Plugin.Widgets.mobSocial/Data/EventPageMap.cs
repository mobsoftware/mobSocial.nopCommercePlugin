using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class EventPageMap : BaseMobEntityTypeConfiguration<EventPage>
    {

        public EventPageMap()
        {
            //Map the additional properties
            Property(m => m.Name);
            Property(m => m.LocationAddress1);
            Property(m => m.LocationAddress2);
            Property(m => m.LocationCity);
            Property(m => m.LocationState);
            Property(m => m.LocationZipPostalCode);
            Property(m => m.LocationCountry);
            Property(m => m.LocationPhone);
            Property(m => m.LocationWebsite);
            Property(m => m.LocationEmail);
            Property(m => m.StartDate);
            Property(m => m.EndDate);
            Property(m => m.Description);

            Property(m => m.MetaKeywords).HasMaxLength(400);
            Property(m => m.MetaDescription);


        }

    }
}
