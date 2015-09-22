using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class PictureTagMap : BaseMobEntityTypeConfiguration<PictureTag>
    {

        public PictureTagMap()
        {
            //Map the additional properties
            Property(m => m.PictureId);
            Property(m => m.PositionX);
            Property(m => m.PositionY);
            Property(m => m.CustomerId);
            Property(m => m.TaggedByCustomerId);
    

        }

    }
}
