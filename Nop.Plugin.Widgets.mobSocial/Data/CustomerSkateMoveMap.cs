using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerSkateMoveMap : BaseMobEntityTypeConfiguration<CustomerSkateMove>
    {

        public CustomerSkateMoveMap()
        {
            //Map the additional properties
            Property(m => m.CustomerId);

            HasRequired(m => m.SkateMove);

            Property(m => m.CustomerSkateMoveProofUrl);
            Property(m => m.DateAdded).HasColumnType("datetime2");
            



        }

    }
}
