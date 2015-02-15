using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Data
{

    public class BusinessPageMap : EntityTypeConfiguration<BusinessPage>
    {

        public BusinessPageMap()
        {
            ToTable("BusinessPage");

            //Map the primary key
            HasKey(m => m.Id);

            //Map the additional properties
            Property(m => m.Name);
            Property(m => m.LocationAddress1);
            Property(m => m.LocationAddress2);
            Property(m => m.LocationCity);
            Property(m => m.LocationState);
            Property(m => m.LocationZipPostalCode);
            Property(m => m.LocationCountry);
            Property(m => m.LocationPhone);
            Property(m => m.LocationWebsite);
            Property(m => m.LocationEmail);
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
