using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class NotificationMap : BaseMobEntityTypeConfiguration<Notification>
    {

        public NotificationMap()
        {
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
