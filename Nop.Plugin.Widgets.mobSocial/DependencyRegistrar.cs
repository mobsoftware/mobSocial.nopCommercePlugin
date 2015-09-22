using Autofac;
using Autofac.Core;
using Autofac.Integration.Mvc;
using Mob.Core;
using Nop.Core.Data;
using Nop.Core.Infrastructure;
using Nop.Core.Infrastructure.DependencyManagement;
using Nop.Data;
using Nop.Plugin.Widgets.MobSocial.Data;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Services.Media;
using Nop.Services.Seo;
using SitemapGenerator = Nop.Plugin.Widgets.MobSocial.Services.SitemapGenerator;

namespace Nop.Plugin.Widgets.MobSocial
{
    public class DependencyRegistrar : BaseMobDependencyRegistrar
    {
        private const string CONTEXT_NAME = "nop_object_context_social_network";


        public override void Register(ContainerBuilder builder, ITypeFinder typeFinder)
        {
            //Load custom data settings
            var dataSettingsManager = new DataSettingsManager();
            DataSettings dataSettings = dataSettingsManager.LoadSettings();

            //Register custom object context
            builder.Register<IDbContext>(c => RegisterIDbContext(c, dataSettings)).Named<IDbContext>(CONTEXT_NAME).InstancePerRequest();
            builder.Register(c => RegisterIDbContext(c, dataSettings)).InstancePerRequest();

            //Register services
            builder.RegisterType<MobSocialService>().As<IMobSocialService>();
            builder.RegisterType<ArtistPageAPIService>().As<IArtistPageAPIService>();
            builder.RegisterType<ArtistPageManagerService>().As<IArtistPageManagerService>();
            builder.RegisterType<ArtistPagePaymentService>().As<IArtistPagePaymentService>();
     
            //builder.RegisterType<MobSocialPictureService>().As<IPictureService>().InstancePerRequest();
            builder.RegisterType<MobSocialMessageService>().As<IMobSocialMessageService>().InstancePerRequest();
            builder.RegisterType<CustomerAlbumPictureService>().As<ICustomerAlbumPictureService>().InstancePerRequest();
            builder.RegisterType<CustomerVideoAlbumService>().As<ICustomerVideoAlbumService>().InstancePerRequest();

            builder.RegisterType<CustomerProfileViewService>().As<CustomerProfileViewService>().InstancePerRequest();
            builder.RegisterType<CustomerTimelineService>().As<CustomerTimelineService>().InstancePerRequest();
            builder.RegisterType<CustomerProfileService>().As<CustomerProfileService>().InstancePerRequest();
            builder.RegisterType<EchoNestMusicService>().As<IMusicService>().InstancePerRequest();
            builder.RegisterType<MusicApiCredentials>().As<IOAuthCredentials>().InstancePerRequest();
            builder.RegisterType<MusicApiUri>().As<IApiUri>().InstancePerRequest();
            builder.RegisterType<OAuthService>().As<IOAuthService>().InstancePerRequest();
            


            // Override any NopCommerce Services below:
            builder.RegisterType<SitemapGenerator>().As<Nop.Services.Seo.ISitemapGenerator>().InstancePerLifetimeScope();

            //call the core registrar
            base.Register(builder, typeFinder);

            
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

        public override string ContextName
        {
            get { return CONTEXT_NAME; }
        }
    }
}
