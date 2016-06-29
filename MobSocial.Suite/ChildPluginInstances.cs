using Nop.Core;
using Nop.Core.Infrastructure;
using Nop.Core.Plugins;
using Nop.Plugin.WebApi.MobSocial;
using Nop.Plugin.WebApi.MobSocial.Data;
using Nop.Plugin.WebApi.MobSocial.Services;
using Nop.Plugin.Widgets.MobSocial;
using Nop.Services.Configuration;
using Nop.Services.Localization;
using Nop.Services.Messages;
using Nop.Services.Tasks;

namespace MobSocial.Suite
{
    public class ChildPluginInstances
    {
        /// <summary>
        /// Creates instances of plugins. Copied from PluginDescriptor.Instance method
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static T GetPluginInsance<T>() where T : class, IPlugin
        {
            object instance;
            var pluginType = typeof(T);
            if (!EngineContext.Current.ContainerManager.TryResolve(pluginType, null, out instance))
            {
                //not resolved
                instance = EngineContext.Current.ContainerManager.ResolveUnregistered(pluginType);
            }
            var typedInstance = instance as T;
            return typedInstance;
        }
    }
}