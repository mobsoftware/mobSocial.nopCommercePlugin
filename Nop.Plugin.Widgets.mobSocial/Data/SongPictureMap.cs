using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class SongPictureMap : EntityTypeConfiguration<SongPicture>
    {
        public SongPictureMap()
        {
            ToTable("SongPicture");

            //Map the primary key
            HasKey(m => m.Id);

            Property(m => m.PictureId);
            Property(m => m.DisplayOrder);
            Property(m => m.SongId);
            Property(m => m.DateCreated).HasColumnType("datetime2");
            Property(m => m.DateUpdated).HasColumnType("datetime2").IsOptional();
        }
       
            
    }
}
