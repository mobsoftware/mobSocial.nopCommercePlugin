using Autofac;
using Autofac.Core;
using Autofac.Integration.Mvc;
using Nop.Core.Data;
using Nop.Core.Infrastructure;
using Nop.Core.Infrastructure.DependencyManagement;
using Nop.Data;
using Nop.Plugin.Widgets.MobSocial.Core;
using Nop.Plugin.Widgets.MobSocial.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Media;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class DependencyRegistrar : IDependencyRegistrar
    {
        private const string CONTEXT_NAME = "nop_object_context_social_network";


        public virtual void Register(ContainerBuilder builder, ITypeFinder typeFinder)
        {
            //Load custom data settings
            var dataSettingsManager = new DataSettingsManager();
            DataSettings dataSettings = dataSettingsManager.LoadSettings();

            //Register custom object context
            builder.Register<IDbContext>(c => RegisterIDbContext(c, dataSettings)).Named<IDbContext>(CONTEXT_NAME).InstancePerHttpRequest();
            builder.Register(c => RegisterIDbContext(c, dataSettings)).InstancePerHttpRequest();

            //Register services
            builder.RegisterType<MobSocialService>().As<IMobSocialService>();

            //Override the repository injection
            builder.RegisterType<EfRepository<GroupPage>>().As<IRepository<GroupPage>>()
                        .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                        .InstancePerHttpRequest();

            builder.RegisterType<EfRepository<GroupPageMember>>().As<IRepository<GroupPageMember>>()
                        .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                        .InstancePerHttpRequest();

            builder.RegisterType<EfRepository<SkateMove>>().As<IRepository<SkateMove>>()
                      .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                      .InstancePerHttpRequest();

            builder.RegisterType<EfRepository<CustomerSkateMove>>().As<IRepository<CustomerSkateMove>>()
                      .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                      .InstancePerHttpRequest();


            builder.RegisterType<EfRepository<CustomerFriend>>().As<IRepository<CustomerFriend>>()
                      .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                      .InstancePerHttpRequest();

            builder.RegisterType<EfRepository<TeamPage>>().As<IRepository<TeamPage>>()
                     .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                     .InstancePerHttpRequest();

            builder.RegisterType<MobSocialPictureService>().As<IPictureService>().InstancePerHttpRequest();
            builder.RegisterType<MobSocialMessageService>().As<IMobSocialMessageService>().InstancePerHttpRequest();


            
        }
        
        /// <summary>
        /// Registers the I db context.
        /// </summary>
        /// <param name="componentContext">The component context.</param>
        /// <param name="dataSettings">The data settings.</param>
        /// <returns></returns>
        private MobSocialObjectContext RegisterIDbContext(IComponentContext componentContext, DataSettings dataSettings)
        {
            string dataConnectionStrings;

            if (dataSettings != null && dataSettings.IsValid())
                dataConnectionStrings = dataSettings.DataConnectionString;
            else
                dataConnectionStrings = componentContext.Resolve<DataSettings>().DataConnectionString;

            return new MobSocialObjectContext(dataConnectionStrings);

        }


        public int Order
        {
            get { return 1; }
        }
    }
}
