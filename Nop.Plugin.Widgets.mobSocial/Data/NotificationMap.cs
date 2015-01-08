using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class NotificationMap : EntityTypeConfiguration<Notification>
    {

        public NotificationMap()
        {
            ToTable("Notification");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.CustomerId);
            Property(m => m.ProductId);
            Property(m => m.Name);
            Property(m => m.CreatedOn);
            Property(m => m.LastSent);
            Property(m => m.Attempts);
            
            
            
            

        }

    }
}
