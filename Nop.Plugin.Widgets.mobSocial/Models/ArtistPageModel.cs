using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Models
{
    public class ArtistPageModel : BasePageModel
    {
        public ArtistPageModel()
        {

        }

        public string RemoteSourceName { get; set; }
        public string RemoteEntityId { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string HomeTown { get; set; }
        public string ShortDescription { get; set; }

        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }
    }
}
