using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerTimelineMap : EntityTypeConfiguration<CustomerTimeline>
    {

        public CustomerTimelineMap()
        {
            ToTable("CustomerTimeline");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.CustomerId);
            Property(m => m.StatusText);
            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2");


        }

    }
}
