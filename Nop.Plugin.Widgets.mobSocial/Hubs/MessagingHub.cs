using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Hubs
{
    public class MessagingHub : Hub
    {
        public void Send(string message)
        {
            Clients.All.onMessageReceived(message);
        }
    }
}
