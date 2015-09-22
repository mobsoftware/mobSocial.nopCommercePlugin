using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class BusinessPagePictureMap : BaseMobEntityTypeConfiguration<BusinessPagePicture>
    {

        public BusinessPagePictureMap()
        {
            Property(m => m.PictureId);
            Property(m => m.DisplayOrder);
            Property(m => m.EntityId).HasColumnName("BusinessPageId"); //backward compatibility
            
            
        }

    }
}
