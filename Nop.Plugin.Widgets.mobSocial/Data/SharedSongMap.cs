using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Data
{
    public class SharedSongMap : EntityTypeConfiguration<SharedSong>
    {
        public SharedSongMap()
        {
            ToTable(typeof(SharedSong).Name);

            HasKey(x => x.Id);
            Property(x => x.SenderId);
            Property(x => x.CustomerId);
            Property(x => x.Message);

            Property(x => x.SharedOn);
            Property(x => x.SongId);
        }
    }
}
