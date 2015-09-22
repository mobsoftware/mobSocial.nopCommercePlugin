using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class GroupPageMap : BaseMobEntityTypeConfiguration<GroupPage>
    {

        public GroupPageMap()
        {
            //Map the additional properties
            Property(m => m.Description);

            Property(m => m.PayPalDonateUrl);

            HasMany(m => m.Members);

            HasOptional(m => m.Team);

            Property(m => m.DisplayOrder);

        }

    }
}
