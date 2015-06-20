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
using Nop.Services.Seo;

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
            builder.Register<IDbContext>(c => RegisterIDbContext(c, dataSettings)).Named<IDbContext>(CONTEXT_NAME).InstancePerRequest();
            builder.Register(c => RegisterIDbContext(c, dataSettings)).InstancePerRequest();

            //Register services
            builder.RegisterType<MobSocialService>().As<IMobSocialService>();

            //Override the repository injection
            builder.RegisterType<EfRepository<GroupPage>>().As<IRepository<GroupPage>>()
                        .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                        .InstancePerRequest();

            builder.RegisterType<EfRepository<GroupPageMember>>().As<IRepository<GroupPageMember>>()
                        .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                        .InstancePerRequest();

            builder.RegisterType<EfRepository<SkateMove>>().As<IRepository<SkateMove>>()
                      .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                      .InstancePerRequest();

            builder.RegisterType<EfRepository<CustomerSkateMove>>().As<IRepository<CustomerSkateMove>>()
                      .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                      .InstancePerRequest();


            builder.RegisterType<EfRepository<CustomerFriend>>().As<IRepository<CustomerFriend>>()
                      .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                      .InstancePerRequest();

            builder.RegisterType<EfRepository<TeamPage>>().As<IRepository<TeamPage>>()
                     .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                     .InstancePerRequest();

            builder.RegisterType<EfRepository<CustomerAlbum>>().As<IRepository<CustomerAlbum>>()
                   .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                   .InstancePerRequest();

            builder.RegisterType<EfRepository<CustomerAlbumPicture>>().As<IRepository<CustomerAlbumPicture>>()
                   .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                   .InstancePerRequest();


            builder.RegisterType<EfRepository<CustomerVideoAlbum>>().As<IRepository<CustomerVideoAlbum>>()
                   .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                   .InstancePerRequest();

            builder.RegisterType<EfRepository<CustomerVideo>>().As<IRepository<CustomerVideo>>()
                   .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                   .InstancePerRequest();

            builder.RegisterType<EfRepository<CustomerVideoLike>>().As<IRepository<CustomerVideoLike>>()
                  .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                  .InstancePerRequest();

            builder.RegisterType<EfRepository<EventPage>>().As<IRepository<EventPage>>()
                .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                .InstancePerRequest();

            builder.RegisterType<EfRepository<EventPagePicture>>().As<IRepository<EventPagePicture>>()
                .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                .InstancePerRequest();

            builder.RegisterType<EfRepository<EventPageHotel>>().As<IRepository<EventPageHotel>>()
               .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
               .InstancePerRequest();

            builder.RegisterType<EfRepository<EventPageAttendance>>().As<IRepository<EventPageAttendance>>()
              .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
              .InstancePerRequest();

            builder.RegisterType<EfRepository<BusinessPage>>().As<IRepository<BusinessPage>>()
               .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
               .InstancePerRequest();

            builder.RegisterType<EfRepository<BusinessPagePicture>>().As<IRepository<BusinessPagePicture>>()
                .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
                .InstancePerRequest();

            builder.RegisterType<EfRepository<BusinessPageCoupon>>().As<IRepository<BusinessPageCoupon>>()
             .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
             .InstancePerRequest();

            builder.RegisterType<EfRepository<CustomerProfileView>>().As<IRepository<CustomerProfileView>>()
             .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
             .InstancePerRequest();

            builder.RegisterType<EfRepository<CustomerTimeline>>().As<IRepository<CustomerTimeline>>()
             .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
             .InstancePerRequest();

            builder.RegisterType<EfRepository<PictureTag>>().As<IRepository<PictureTag>>()
             .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
             .InstancePerRequest();

            builder.RegisterType<EfRepository<CustomerProfile>>().As<IRepository<CustomerProfile>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();

            builder.RegisterType<EfRepository<Notification>>().As<IRepository<Notification>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();

            builder.RegisterType<EfRepository<CustomerFavoriteSong>>().As<IRepository<CustomerFavoriteSong>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();
            builder.RegisterType<EfRepository<ArtistPage>>().As<IRepository<ArtistPage>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();

            builder.RegisterType<EfRepository<ArtistPageManager>>().As<IRepository<ArtistPageManager>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();

            builder.RegisterType<EfRepository<ArtistPagePicture>>().As<IRepository<ArtistPagePicture>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();

            builder.RegisterType<EfRepository<ArtistPagePayment>>().As<IRepository<ArtistPagePayment>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();


            builder.RegisterType<EfRepository<Song>>().As<IRepository<Song>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();

            builder.RegisterType<EfRepository<SongPicture>>().As<IRepository<SongPicture>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();

            builder.RegisterType<EfRepository<SharedSong>>().As<IRepository<SharedSong>>()
            .WithParameter(ResolvedParameter.ForNamed<IDbContext>(CONTEXT_NAME))
            .InstancePerRequest();

            // Service Injection
            builder.RegisterGeneric(typeof(BaseService<,>)).As(typeof(IBaseService<,>)).InstancePerLifetimeScope();
            builder.RegisterType<MobSocialPictureService>().As<IPictureService>().InstancePerRequest();
            builder.RegisterType<MobSocialMessageService>().As<IMobSocialMessageService>().InstancePerRequest();
            builder.RegisterType<CustomerAlbumPictureService>().As<ICustomerAlbumPictureService>().InstancePerRequest();
            builder.RegisterType<CustomerVideoAlbumService>().As<ICustomerVideoAlbumService>().InstancePerRequest();
            builder.RegisterType<EventPageService>().As<IEventPageService>().InstancePerRequest();
            builder.RegisterType<EventPageAttendanceService>().As<IEventPageAttendanceService>().InstancePerRequest();
            builder.RegisterType<EventPageHotelService>().As<IEventPageHotelService>().InstancePerRequest();
            builder.RegisterType<BusinessPageService>().As<IBusinessPageService>().InstancePerRequest();
            builder.RegisterType<BusinessPageCouponService>().As<IBusinessPageCouponService>().InstancePerRequest();
            builder.RegisterType<CustomerProfileViewService>().As<CustomerProfileViewService>().InstancePerRequest();
            builder.RegisterType<CustomerTimelineService>().As<CustomerTimelineService>().InstancePerRequest();
            builder.RegisterType<CustomerProfileService>().As<CustomerProfileService>().InstancePerRequest();
            builder.RegisterType<TeamPageService>().As<TeamPageService>().InstancePerRequest();
            builder.RegisterType<NotificationService>().As<INotificationService>().InstancePerRequest();
            //builder.RegisterType<CustomerFavoriteSongService>().As<ICustomerFavoriteSongService>().InstancePerRequest();
            builder.RegisterType<EchoNestMusicService>().As<IMusicService>().InstancePerRequest();
            builder.RegisterType<MusicApiCredentials>().As<IOAuthCredentials>().InstancePerRequest();
            builder.RegisterType<MusicApiUri>().As<IApiUri>().InstancePerRequest();
            builder.RegisterType<OAuthService>().As<IOAuthService>().InstancePerRequest();
            


            builder.RegisterType<ArtistPageService>().As<IArtistPageService>().InstancePerRequest();
            builder.RegisterType<ArtistPageAPIService>().As<IArtistPageAPIService>().InstancePerRequest();
            builder.RegisterType<ArtistPageManagerService>().As<IArtistPageManagerService>().InstancePerRequest();
            builder.RegisterType<SongService>().As<ISongService>().InstancePerRequest();
            builder.RegisterType<SharedSongService>().As<ISharedSongService>().InstancePerRequest();
            builder.RegisterType<ArtistPagePaymentService>().As<IArtistPagePaymentService>().InstancePerRequest();
            // Override any NopCommerce Services below:
            builder.RegisterType<MobSocial.Core.SitemapGenerator>().As<Nop.Services.Seo.ISitemapGenerator>().InstancePerLifetimeScope();


            
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
