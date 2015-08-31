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

        public MobSocialPictureService(IRepository<Picture> pictureRepository, IRepository<ProductPicture> productPictureRepository, ISettingService settingService, IWebHelper webHelper, ILogger logger, IDbContext dbContext, IEventPublisher eventPublisher, MediaSettings mediaSettings) : 
            base(pictureRepository, productPictureRepository, settingService, webHelper, logger,dbContext, eventPublisher, mediaSettings)
        {
            _nopMediaSettings = mediaSettings;
        }

        //public override byte[] ValidatePicture(byte[] pictureBinary, string mimeType)
        //{
        //    using (var stream1 = new MemoryStream(pictureBinary))
        //    {
        //        using (var b = new Bitmap(stream1))
        //        {
        //            var maxSize = _nopMediaSettings.MaximumImageSize;
        //            if (b.Width <= maxSize)
        //                return pictureBinary;

        //            var newSize = CalculateDimensions(b.Size, maxSize, ResizeType.LongestSide);

        //            using (var newBitMap = new Bitmap(newSize.Width, newSize.Height))
        //            {
        //                using (var g = Graphics.FromImage(newBitMap))
        //                {
        //                    g.SmoothingMode = SmoothingMode.HighQuality;
        //                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
        //                    g.CompositingQuality = CompositingQuality.HighQuality;
        //                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
        //                    g.DrawImage(b, 0, 0, newSize.Width, newSize.Height);

        //                    using (var stream2 = new MemoryStream())
        //                    {
        //                        var ep = new EncoderParameters();
        //                        ep.Param[0] = new EncoderParameter(Encoder.Quality, _nopMediaSettings.DefaultImageQuality);
                                
        //                        ImageCodecInfo ici = GetImageCodecInfoFromMimeType(mimeType) ??
        //                                             GetImageCodecInfoFromMimeType("image/jpeg");

        //                        newBitMap.Save(stream2, ici, ep);
        //                        return stream2.GetBuffer();
        //                    }
        //                }
        //            }
        //        }
        //    }
        //}

        //protected byte[] CreateThumbnailPicture(byte[] pictureBinary, int maxWidth, string mimeType)
        //{
        //    using (var stream1 = new MemoryStream(pictureBinary))
        //    {
        //        using (var b = new Bitmap(stream1))
        //        {
        //            var maxSize = _nopMediaSettings.MaximumImageSize;
        //            if (b.Width <= maxSize)
        //                return pictureBinary;

        //            var newSize = CalculateDimensions(b.Size, maxSize, ResizeType.Width);

        //            using (var newBitMap = new Bitmap(newSize.Width, newSize.Height))
        //            {
        //                using (var g = Graphics.FromImage(newBitMap))
        //                {
        //                    g.SmoothingMode = SmoothingMode.HighQuality;
        //                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
        //                    g.CompositingQuality = CompositingQuality.HighQuality;
        //                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
        //                    g.DrawImage(b, 0, 0, newSize.Width, newSize.Height);

        //                    using (var stream2 = new MemoryStream())
        //                    {
        //                        var ep = new EncoderParameters();
        //                        ep.Param[0] = new EncoderParameter(Encoder.Quality, _nopMediaSettings.DefaultImageQuality);

        //                        ImageCodecInfo ici = GetImageCodecInfoFromMimeType(mimeType) ??
        //                                             GetImageCodecInfoFromMimeType("image/jpeg");

        //                        newBitMap.Save(stream2, ici, ep);
        //                        return stream2.GetBuffer();
        //                    }
        //                }
        //            }
        //        }
            
            
        //    }
        //}

        ///// <summary>
        ///// Returns the first ImageCodecInfo instance with the specified mime type.
        ///// </summary>
        ///// <param name="mimeType">Mime type</param>
        ///// <returns>ImageCodecInfo</returns>
        //protected virtual ImageCodecInfo GetImageCodecInfoFromMimeType(string mimeType)
        //{
        //    var info = ImageCodecInfo.GetImageEncoders();
        //    foreach (var ici in info)
        //        if (ici.MimeType.Equals(mimeType, StringComparison.OrdinalIgnoreCase))
        //            return ici;
        //    return null;
        //}

        ///// <summary>
        ///// Returns the first ImageCodecInfo instance with the specified extension.
        ///// </summary>
        ///// <param name="fileExt">File extension</param>
        ///// <returns>ImageCodecInfo</returns>
        //protected virtual ImageCodecInfo GetImageCodecInfoFromExtension(string fileExt)
        //{
        //    fileExt = fileExt.TrimStart(".".ToCharArray()).ToLower().Trim();
        //    switch (fileExt)
        //    {
        //        case "jpg":
        //        case "jpeg":
        //            return GetImageCodecInfoFromMimeType("image/jpeg");
        //        case "png":
        //            return GetImageCodecInfoFromMimeType("image/png");
        //        case "gif":
        //            //use png codec for gif to preserve transparency
        //            //return GetImageCodecInfoFromMimeType("image/gif");
        //            return GetImageCodecInfoFromMimeType("image/png");
        //        default:
        //            return GetImageCodecInfoFromMimeType("image/jpeg");
        //    }
        //}


       
        
    
    }
}
