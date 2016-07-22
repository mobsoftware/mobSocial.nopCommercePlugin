using Nop.Core.Infrastructure;
using Nop.Core.Plugins;

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