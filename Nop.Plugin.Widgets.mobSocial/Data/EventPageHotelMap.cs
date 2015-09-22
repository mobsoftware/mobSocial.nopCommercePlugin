using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class EventPageHotelMap : BaseMobEntityTypeConfiguration<EventPageHotel>
    {

        public EventPageHotelMap()
        {
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


           
            
        }

    }
}
