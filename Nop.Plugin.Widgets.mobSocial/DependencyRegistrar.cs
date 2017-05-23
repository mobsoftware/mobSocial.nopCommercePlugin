using Autofac;
using Mob.Core;
using Nop.Core.Infrastructure.DependencyManagement;
using Nop.Plugin.Widgets.MobSocial.Services;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class DependencyRegistrar : BaseMobDependencyRegistrar
    {
        public override string ContextName => "Nop.Plugin.Widgets.MobSocial";

        public override void Register(ContainerBuilder builder, Core.Infrastructure.ITypeFinder typeFinder, Core.Configuration.NopConfig config)
        {
            builder.RegisterType<TimelineWidgetLoaderService>().As<ITimelineWidgetLoaderService>().InstancePerRequest();
            base.Register(builder, typeFinder, config);
        }

        public int Order
        {
            get { return 0; }
        }
    }
}
