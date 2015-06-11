using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class SongModel : BasePageModel
    {
        public SongModel()
        {

        }

        public string RemoteSourceName { get; set; }
        public string RemoteEntityId { get; set; }        

        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }
    }
}
