using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Enums
{
    public enum VideoBattleStatus
    {
        Pending = 0, //battle is pending. videos have not been uploaded or verified by admin
        Open = 1, //battle is open
        Closed = 2, //battle is closed. no body can join
        Complete = 3 //battle is complete and we have some result
    }
}
