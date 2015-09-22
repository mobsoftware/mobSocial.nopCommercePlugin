using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerVideoLikeMap : BaseMobEntityTypeConfiguration<CustomerVideoLike>
    {

        public CustomerVideoLikeMap()
        {
            //Map the additional properties
            Property(m => m.CustomerId);
            Property(m => m.CustomerVideoId);


        }

    }
}
