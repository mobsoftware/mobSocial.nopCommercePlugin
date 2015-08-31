using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Media;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class CustomerAlbumPictureService : ICustomerAlbumPictureService
    {
        private readonly IRepository<CustomerAlbum> _customerAlbumRepository;
        private readonly IRepository<CustomerAlbumPicture> _customerAlbumPictureRepository;
        private readonly MediaSettings _nopMediaSettings;


        public CustomerAlbumPictureService(ISettingService settingService, IWebHelper webHelper, ILogger logger, IEventPublisher eventPublisher, 
           IRepository<CustomerAlbum> customerAlbumRepository, IRepository<CustomerAlbumPicture> customerAlbumPictureRepository, MediaSettings mediaSettings)
        {
            _customerAlbumRepository = customerAlbumRepository;
            _customerAlbumPictureRepository = customerAlbumPictureRepository;
            _nopMediaSettings = mediaSettings;
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

        public void Insert(CustomerAlbumPicture customerAlbumPicture)
        {
            _customerAlbumPictureRepository.Insert(customerAlbumPicture);
        }

        public void Delete(CustomerAlbumPicture customerAlbumPicture)
        {
            _customerAlbumPictureRepository.Delete(customerAlbumPicture);
        }

        public CustomerAlbumPicture GetCustomerAlbumPictureById(int customerAlbumPictureId)
        {
            return _customerAlbumPictureRepository.GetById(customerAlbumPictureId);
        }

        public CustomerAlbum CreateCustomerMainAlbum(int customerId)
        {

            var mainAlbum = new CustomerAlbum()
            {
                CustomerId = customerId,
                Name = "CustomerMainAlbum",
                DisplayOrder = 1,
                IsMainAlbum = true,
                DateCreated = DateTime.Now
            };

            _customerAlbumRepository.Insert(mainAlbum);

            return GetCustomerAlbum(customerId);


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
       
        public CustomerAlbum GetCustomerAlbum(int customerId)
        {
            return _customerAlbumRepository.Table
                .FirstOrDefault(x => x.CustomerId == customerId && x.IsMainAlbum);
        }

        public CustomerAlbum GetCustomerAlbumById(int albumId)
        {
            return _customerAlbumRepository.Table
               .FirstOrDefault(x => x.Id == albumId);
        }
    
    }

}
