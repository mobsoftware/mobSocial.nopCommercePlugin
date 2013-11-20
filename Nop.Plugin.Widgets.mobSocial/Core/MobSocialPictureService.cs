using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Media;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Media;
using System.Drawing;


namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class MobSocialPictureService : PictureService
    {
        private readonly MediaSettings _nopMediaSettings;

        public MobSocialPictureService(IRepository<Picture> pictureRepository, IRepository<ProductPicture> productPictureRepository, ISettingService settingService, IWebHelper webHelper, ILogger logger, IEventPublisher eventPublisher, MediaSettings mediaSettings) : 
            base(pictureRepository, productPictureRepository, settingService, webHelper, logger, eventPublisher, mediaSettings)
        {
            _nopMediaSettings = mediaSettings;
        }

        protected override byte[] ValidatePicture(byte[] pictureBinary, string mimeType)
        {
            using (var stream1 = new MemoryStream(pictureBinary))
            {
                using (var b = new Bitmap(stream1))
                {
                    var maxSize = _nopMediaSettings.MaximumImageSize;
                    if (b.Width <= maxSize)
                        return pictureBinary;

                    var newSize = CalculateDimensions(b.Size, maxSize, ResizeTypes.LongestSide);

                    using (var newBitMap = new Bitmap(newSize.Width, newSize.Height))
                    {
                        using (var g = Graphics.FromImage(newBitMap))
                        {
                            g.SmoothingMode = SmoothingMode.HighQuality;
                            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            g.CompositingQuality = CompositingQuality.HighQuality;
                            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                            g.DrawImage(b, 0, 0, newSize.Width, newSize.Height);

                            using (var stream2 = new MemoryStream())
                            {
                                var ep = new EncoderParameters();
                                ep.Param[0] = new EncoderParameter(Encoder.Quality, _nopMediaSettings.DefaultImageQuality);
                                
                                ImageCodecInfo ici = GetImageCodecInfoFromMimeType(mimeType) ??
                                                     GetImageCodecInfoFromMimeType("image/jpeg");

                                newBitMap.Save(stream2, ici, ep);
                                return stream2.GetBuffer();
                            }
                        }
                    }
                }
            }
        }


       
        
    
    }
}
