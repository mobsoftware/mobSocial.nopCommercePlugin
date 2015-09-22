using System.Data.Entity.ModelConfiguration;
using Mob.Core.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class CustomerFriendMap : BaseMobEntityTypeConfiguration<CustomerFriend>
    {

        public CustomerFriendMap()
        {
            //Map the additional properties
            Property(m => m.FromCustomerId);

            Property(m => m.ToCustomerId);
            Property(m => m.Confirmed);
            Property(m => m.DateRequested).HasColumnType("datetime2");
            Property(m => m.DateConfirmed).HasColumnType("datetime2").IsOptional();

            Property(m => m.NotificationCount);
            Property(m => m.LastNotificationDate).HasColumnType("datetime2").IsOptional();

        }

    }
}
