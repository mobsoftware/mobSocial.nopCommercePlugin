using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Media;
using Nop.Data;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Media;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class MobSocialPictureService : PictureService
    {
        private readonly MediaSettings _nopMediaSettings;

        public MobSocialPictureService(IRepository<Picture> pictureRepository,
            IRepository<ProductPicture> productPictureRepository, ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IDbContext dbContext, IEventPublisher eventPublisher, MediaSettings mediaSettings) :
                base(
                pictureRepository, productPictureRepository, settingService, webHelper, logger, dbContext,
                eventPublisher, mediaSettings)
        {
            _nopMediaSettings = mediaSettings;
        }

        //public override byte[] ValidatePicture(byte[] pictureBinary, string mimeType)
        //{
        //    private readonly MediaSettings _nopMediaSettings;

        //    public MobSocialPictureService(IRepository<Picture> pictureRepository, IRepository<ProductPicture> productPictureRepository, ISettingService settingService, IWebHelper webHelper, ILogger logger, IEventPublisher eventPublisher, MediaSettings mediaSettings) : 
        //        base(pictureRepository, 
        //        productPictureRepository, 
        //        settingService, 
        //        webHelper, 
        //        logger, 
        //        eventPublisher, 
        //        mediaSettings)
        //    {
        //        _nopMediaSettings = mediaSettings;
        //    }

        //    public PictureService(IRepository<Picture> pictureRepository,
        //        IRepository<ProductPicture> productPictureRepository,
        //        ISettingService settingService, 
        //        IWebHelper webHelper,
        //        ILogger logger,
        //        IDbContext dbContext,
        //        IEventPublisher eventPublisher,
        //        MediaSettings mediaSettings)
        //    {





        //}
    }
}