using Autofac;
using Nop.Core.Infrastructure.DependencyManagement;
using Nop.Plugin.Widgets.MobSocial.Services;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class DependencyRegistrar : IDependencyRegistrar
    {

        public void Register(ContainerBuilder builder, Core.Infrastructure.ITypeFinder typeFinder, Core.Configuration.NopConfig config)
        {
            builder.RegisterType<TimelineWidgetLoaderService>().As<ITimelineWidgetLoaderService>().InstancePerRequest();
        }

        public int Order
        {
            get { return 0; }
        }
    }
}
