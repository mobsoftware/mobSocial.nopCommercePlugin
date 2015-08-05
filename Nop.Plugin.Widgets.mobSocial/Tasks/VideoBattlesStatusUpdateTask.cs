using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nop.Core.Plugins;
using Nop.Services.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Tasks
{
    public class VideoBattlesStatusUpdateTask : ITask
    {
        private readonly IPluginFinder _pluginFinder;

        public VideoBattlesStatusUpdateTask(IPluginFinder pluginFinder)
        {
            this._pluginFinder = pluginFinder;
        }

        /// <summary>
        /// Execute task
        /// </summary>
        public void Execute()
        {
            //is plugin installed?
            var pluginDescriptor = _pluginFinder.GetPluginDescriptorBySystemName("Widgets.mobSocial");
            if (pluginDescriptor == null)
                return;

            //plugin
            var plugin = pluginDescriptor.Instance() as mobSocialPlugin;
            if (plugin == null)
                return;

            plugin.SetScheduledVideoBattlesOpenOrClosed();
        }
    }
}
