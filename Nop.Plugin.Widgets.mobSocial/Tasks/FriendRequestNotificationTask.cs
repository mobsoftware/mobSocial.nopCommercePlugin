using System;
using Nop.Core.Plugins;
using Nop.Services.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Tasks
{
    public class FriendRequestNotificationTask : ITask
    {

        private readonly IPluginFinder _pluginFinder;

        public FriendRequestNotificationTask(IPluginFinder pluginFinder)
        {
            this._pluginFinder = pluginFinder;
        }

        /// <summary>
        /// Execute task
        /// </summary>
        public void Execute()
        {
            //is plugin installed?
            var pluginDescriptor = _pluginFinder.GetPluginDescriptorBySystemName("mobSocial");
            if (pluginDescriptor == null)
                return;

            //plugin
            var plugin = pluginDescriptor.Instance() as mobSocialPlugin;
            if (plugin == null)
                return;

            plugin.SendFriendRequestNotifications();
        }
    }
}

