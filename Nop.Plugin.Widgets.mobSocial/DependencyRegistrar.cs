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
            builder.RegisterType<NotifyService>().As<INotifyService>().InstancePerLifetimeScope();

            ////data context
            //this.RegisterPluginDataContext<MobSocialObjectContext>(builder, "nop_object_context_mobsocial");

            ////override required repository with our custom context
            //builder.RegisterType<EfRepository<MobSocialUser>>()
            //    .As<IRepository<MobSocialUser>>()
            //    .WithParameter(ResolvedParameter.ForNamed<IDbContext>("nop_object_context_mobsocial"))
            //    .InstancePerLifetimeScope();
        }

        public int Order
        {
            get { return 0; }
        }
    }
}
