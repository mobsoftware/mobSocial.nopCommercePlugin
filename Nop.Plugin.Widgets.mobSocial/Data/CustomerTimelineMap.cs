using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerTimelineMap : BaseMobEntityTypeConfiguration<CustomerTimeline>
    {

        public CustomerTimelineMap()
        {
            //Map the additional properties
            Property(m => m.CustomerId);
            Property(m => m.StatusText);
            Property(m => m.PictureId).IsOptional();


        }

    }
}
