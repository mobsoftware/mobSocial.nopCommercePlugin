using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class EventPagePictureMap : BaseMobEntityTypeConfiguration<EventPagePicture>
    {

        public EventPagePictureMap()
        {
            Property(m => m.PictureId);
            Property(m => m.DisplayOrder);
            Property(m => m.EntityId).HasColumnName("EventPageId"); //backward compatibility
            
        }

    }
}
