using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class ArtistPagePaymentMap : EntityTypeConfiguration<ArtistPagePayment>
    {
        public ArtistPagePaymentMap()
        {
            ToTable("ArtistPagePayment");

            Property(x => x.ArtistPageId);
            Property(x => x.PaymentType);
            Property(x => x.PaypalEmail).IsOptional();
            Property(x => x.BankName).IsOptional();
            Property(x => x.AccountNumber).IsOptional();
            Property(x => x.RoutingNumber).IsOptional();
            Property(x => x.PayableTo).IsOptional();
            Property(x => x.Address).IsOptional();
            Property(x => x.City).IsOptional();
            Property(x => x.Country).IsOptional();
            Property(x => x.PostalCode).IsOptional();
        }
    }
}
