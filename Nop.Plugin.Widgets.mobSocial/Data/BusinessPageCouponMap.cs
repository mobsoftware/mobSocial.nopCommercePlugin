using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class BusinessPageCouponMap : BaseMobEntityTypeConfiguration<BusinessPageCoupon>
    {

        public BusinessPageCouponMap()
        {
            //Map the additional properties
            Property(m => m.BusinessPageId);
            Property(m => m.Name);
            Property(m => m.Title);
            Property(m => m.BriefDescription);
            Property(m => m.Disclaimer);
            Property(m => m.UsageCount);
            Property(m => m.DisplayOrder);

            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();

           
            
        }

    }
}
