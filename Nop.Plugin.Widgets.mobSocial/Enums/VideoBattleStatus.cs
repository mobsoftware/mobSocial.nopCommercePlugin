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
        Closed = 2, //battle is closed. no result at all
        Complete = 3, //battle is complete and we have some result
        Locked = 4 //battle is locked so it's visible to public but videos are not. we are waiting for scheduler to do the honors
    }
}
