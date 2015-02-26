using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{





    public class BusinessPageMap : EntityTypeConfiguration<BusinessPage>
    {

        public BusinessPageMap()
        {
            ToTable(typeof(BusinessPage).Name);

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.Name);
            Property(m => m.Address1);
            Property(m => m.Address2);
            Property(m => m.City);
            Property(m => m.StateProvinceId);
            Property(m => m.ZipPostalCode);
            Property(m => m.CountryId);
            Property(m => m.Phone);
            Property(m => m.Website);
            Property(m => m.Email);
            Property(m => m.StartDate);
            Property(m => m.EndDate);
            Property(m => m.Description);

            Property(m => m.MetaKeywords).HasMaxLength(400);
            Property(m => m.MetaDescription);

            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();

        }

    }
}
