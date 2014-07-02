using System;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Media;
using System.Drawing;
using System.Linq;
using Nop.Services.Seo;
using Nop.Core.Domain.Seo;


namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class EventPageService : IEventPageService
    {
        private readonly IRepository<EventPage> _eventPageRepository;
        private MediaSettings _nopMediaSettings;
        private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;
        


        public EventPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IRepository<EventPage> eventPageRepository,
            MediaSettings mediaSettings,
            IUrlRecordService urlRecordService,
            IWorkContext workContext)
        {
            _eventPageRepository = eventPageRepository;
            _nopMediaSettings = mediaSettings;
            _urlRecordService = urlRecordService;
            _workContext = workContext;
        }

        public byte[] CreateThumbnailPicture(byte[] pictureBinary, int maxWidth, string mimeType)
        {
            using (var stream1 = new MemoryStream(pictureBinary))
            {
                using (var b = new Bitmap(stream1))
                {
                    var maxSize = maxWidth;
                    if (b.Width <= maxSize)
                        return pictureBinary;

                    var newSize = CalculateDimensions(b.Size, maxSize, ResizeType.Width);

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

        public void Insert(EventPage entity)
        {
            _eventPageRepository.Insert(entity);

            
            
            UrlRecord urlRecord = new UrlRecord() {
                EntityId = entity.Id,
                EntityName = "EntityPage",
                IsActive = true,
                LanguageId = _workContext.WorkingLanguage.Id,
                Slug = entity.GetSeName()
            };

            _urlRecordService.InsertUrlRecord(urlRecord);


        }

        public void Update(EventPage entity)
        {
            _eventPageRepository.Update(entity);
        }

        public void Delete(EventPage entity)
        {
            _eventPageRepository.Delete(entity);
        }

        public EventPage GetById(int id)
        {
            return _eventPageRepository.GetById(id);
        }


        /// <summary>
        /// Calculates picture dimensions whilst maintaining aspect
        /// </summary>
        /// <param name="originalSize">The original picture size</param>
        /// <param name="targetSize">The target picture size (longest side)</param>
        /// <param name="resizeType"></param>
        /// <returns></returns>
        protected virtual Size CalculateDimensions(Size originalSize, int targetSize, ResizeType resizeType)
        {
            var newSize = new Size();

            switch (resizeType)
            {
                case ResizeType.LongestSide:
                    if (originalSize.Height > originalSize.Width) // portrait 
                    {
                        newSize.Width = (int)(originalSize.Width * (float)(targetSize / (float)originalSize.Height));
                        newSize.Height = targetSize;
                    }
                    else // landscape or square
                    {
                        newSize.Height = (int)(originalSize.Height * (float)(targetSize / (float)originalSize.Width));
                        newSize.Width = targetSize;
                    }
                    break;
                case ResizeType.Width:
                    newSize.Height = (int)(originalSize.Height * (float)(targetSize / (float)originalSize.Width));
                    newSize.Width = targetSize;
                    break;
                case ResizeType.Height:
                    newSize.Width = (int)(originalSize.Width * (float)(targetSize / (float)originalSize.Height));
                    newSize.Height = targetSize;
                    break;
            }

            return newSize;
        }

        /// <summary>
        /// Returns the first ImageCodecInfo instance with the specified mime type.
        /// </summary>
        /// <param name="mimeType">Mime type</param>
        /// <returns>ImageCodecInfo</returns>
        protected virtual ImageCodecInfo GetImageCodecInfoFromMimeType(string mimeType)
        {
            var info = ImageCodecInfo.GetImageEncoders();
            foreach (var ici in info)
                if (ici.MimeType.Equals(mimeType, StringComparison.OrdinalIgnoreCase))
                    return ici;
            return null;
        }

        /// <summary>
        /// Returns the first ImageCodecInfo instance with the specified extension.
        /// </summary>
        /// <param name="fileExt">File extension</param>
        /// <returns>ImageCodecInfo</returns>
        protected virtual ImageCodecInfo GetImageCodecInfoFromExtension(string fileExt)
        {
            fileExt = fileExt.TrimStart(".".ToCharArray()).ToLower().Trim();
            switch (fileExt)
            {
                case "jpg":
                case "jpeg":
                    return GetImageCodecInfoFromMimeType("image/jpeg");
                case "png":
                    return GetImageCodecInfoFromMimeType("image/png");
                case "gif":
                    //use png codec for gif to preserve transparency
                    //return GetImageCodecInfoFromMimeType("image/gif");
                    return GetImageCodecInfoFromMimeType("image/png");
                default:
                    return GetImageCodecInfoFromMimeType("image/jpeg");
            }
        }




    }

}
