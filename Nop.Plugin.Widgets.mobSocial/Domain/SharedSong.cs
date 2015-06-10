using Nop.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class SharedSong : BaseEntity
    {
        public int CustomerId { get; set; }
        public int SenderId { get; set; }
        public int SongId { get; set; }
        public string Message { get; set; }
        public DateTime SharedOn { get; set; }
        public virtual Song Song { get; set; }
       

    }
}
