using System;
using Nop.Core.Plugins;
using Nop.Services.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Tasks
{
    /// <summary>
    /// Sends product review notifications after a product has been delivered. 
    /// When a customer writes a product review, it increases the value of the site to the community and also provides another opportunity
    /// to get repeat business.
    /// </summary>
    public class ProductReviewNotificationTask : ITask
    {

        private readonly IPluginFinder _pluginFinder;

        public ProductReviewNotificationTask(IPluginFinder pluginFinder)
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

            plugin.SendProductReviewNotifications();
        }
    }
}

