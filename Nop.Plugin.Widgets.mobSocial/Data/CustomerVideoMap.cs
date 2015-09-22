using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerVideoMap : BaseMobEntityTypeConfiguration<CustomerVideo>
    {

        public CustomerVideoMap()
        {
            //Map the additional properties
            Property(m => m.CustomerVideoAlbumId);
            Property(m => m.VideoUrl);
            Property(m => m.Caption);
            Property(m => m.DisplayOrder);
            Property(m => m.LikeCount);


        }

    }
}
