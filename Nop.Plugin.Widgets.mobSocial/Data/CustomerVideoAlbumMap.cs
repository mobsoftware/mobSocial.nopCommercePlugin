using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerVideoAlbumMap : BaseMobEntityTypeConfiguration<CustomerVideoAlbum>
    {

        public CustomerVideoAlbumMap()
        {
            //Map the additional properties
            Property(m => m.CustomerId);
            Property(m => m.Name);
            Property(m => m.DisplayOrder);
            Property(m => m.IsMainVideoAlbum);
           
            
        }

    }
}
