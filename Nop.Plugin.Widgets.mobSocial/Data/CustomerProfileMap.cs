using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerProfileMap : BaseMobEntityTypeConfiguration<CustomerProfile>
    {

        public CustomerProfileMap()
        {
            //Map the additional properties
            Property(m => m.CustomerId);
            Property(m => m.AboutMe);
            Property(m => m.Website);


        }

    }
}
