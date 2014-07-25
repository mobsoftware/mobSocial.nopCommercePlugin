using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class EventPageHotelMap : EntityTypeConfiguration<EventPageHotel>
    {

        public EventPageHotelMap()
        {
            ToTable("EventPageHotel");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.EventPageId);
            Property(m => m.Name);
            Property(m => m.Title);
            Property(m => m.Address1);
            Property(m => m.Address2);
            Property(m => m.City);
            Property(m => m.State);
            Property(m => m.ZipPostalCode);
            Property(m => m.PhoneNumber);
            Property(m => m.Country);
            Property(m => m.AdditionalInformation);
            Property(m => m.DisplayOrder);

            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();

           
            
        }

    }
}
