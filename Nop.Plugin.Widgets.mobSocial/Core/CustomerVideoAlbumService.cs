using System;
using System.Collections.Generic;
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


namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class CustomerVideoAlbumService : ICustomerVideoAlbumService
    {
        private readonly IRepository<CustomerVideoAlbum> _customerVideoAlbumRepository;
        private readonly IRepository<CustomerVideo> _customerVideoRepository;
        private readonly MediaSettings _nopMediaSettings;
        private readonly IRepository<CustomerVideoLike> _customerVideoLikeRepository;


        public CustomerVideoAlbumService(ISettingService settingService, IWebHelper webHelper, ILogger logger, IEventPublisher eventPublisher, 
           IRepository<CustomerVideoAlbum> customerVideoAlbumRepository, IRepository<CustomerVideo> customerVideoRepository, MediaSettings mediaSettings,
           IRepository<CustomerVideoLike> customerVideoLikeRepository)
        {
            _customerVideoAlbumRepository = customerVideoAlbumRepository;
            _customerVideoRepository = customerVideoRepository;
            _nopMediaSettings = mediaSettings;
            _customerVideoLikeRepository = customerVideoLikeRepository;
        }

       
        public void Insert(CustomerVideo customerVideo)
        {
            _customerVideoRepository.Insert(customerVideo);
        }

        public void Delete(CustomerVideo customerVideo)
        {
            _customerVideoRepository.Delete(customerVideo);
        }

        public CustomerVideo GetCustomerVideoById(int customerVideoId)
        {
            return _customerVideoRepository.GetById(customerVideoId);
        }

        public CustomerVideoAlbum CreateCustomerMainVideoAlbum(int customerId)
        {

            var mainAlbum = new CustomerVideoAlbum()
            {
                CustomerId = customerId,
                Name = "CustomerMainVideoAlbum",
                DisplayOrder = 1,
                IsMainVideoAlbum = true,
                DateCreated = DateTime.Now
            };

            _customerVideoAlbumRepository.Insert(mainAlbum);

            return GetCustomerMainVideoAlbum(customerId);


        }

        public void Update(CustomerVideo video)
        {
            _customerVideoRepository.Update(video);
        }

        /// <summary>
        /// Adds a like to the specified customer's video
        /// </summary>
        /// <param name="customerVideoId">Id of Customer's Video Liked</param>
        /// <param name="customerId">Customer who liked the video</param>
        public void AddVideoLike(int customerVideoId, int customerId)
        {
            
            var videoLike = new CustomerVideoLike()
                {
                    CustomerId = customerId,
                    CustomerVideoId = customerVideoId,
                    DateCreated = DateTime.Now
                };

            _customerVideoLikeRepository.Insert(videoLike);


            var video = GetCustomerVideoById(customerVideoId);
            video.LikeCount++;
            _customerVideoRepository.Update(video);


        }

        public bool VideoAlreadyLiked(int customerVideoId, int customerId)
        {
            return _customerVideoLikeRepository.Table
                .Any(x => x.CustomerVideoId == customerVideoId && x.CustomerId == customerId);
        }


        /// <summary>
        /// Deletes the customer's video and removes all video likes
        /// </summary>
        /// <param name="customerVideoId">Id of Customer Video to delete</param>
        public void DeleteCustomerVideo(int customerVideoId)
        {
            var video = _customerVideoRepository.GetById(customerVideoId);

            var videoLikes = _customerVideoLikeRepository.Table.Where(x => x.CustomerVideoId == customerVideoId).ToList();


            foreach (var videoLike in videoLikes)
            {
                _customerVideoLikeRepository.Delete(videoLike);
            }

            _customerVideoRepository.Delete(video);

        }

        public CustomerVideo GetFeaturedVideos()
        {
           var featuredVideoId =  _customerVideoLikeRepository.Table
                                        .GroupBy(
                                            like => new { CustomerVideoId = like.CustomerVideoId, Month = like.DateCreated.Month, Year = like.DateCreated.Year, })
                                        .Where(g => g.Key.Month == DateTime.Now.Month && g.Key.Year == DateTime.Now.Year)
                                        .Select(g => new
                                            {
                                                MonthLikeCount = g.Count(), 
                                                CustomerVideoId = g.FirstOrDefault().CustomerVideoId
                                            })
                                         .OrderByDescending(x=>x.MonthLikeCount)
                                         .FirstOrDefault();

            if (featuredVideoId == null) // try for this year
            {
                featuredVideoId = _customerVideoLikeRepository.Table
                                        .GroupBy(
                                            like => new { CustomerVideoId = like.CustomerVideoId, Year = like.DateCreated.Year })
                                        .Where(g => g.Key.Year == DateTime.Now.Year)
                                        .Select(g => new
                                        {
                                            MonthLikeCount = g.Count(),
                                            CustomerVideoId = g.FirstOrDefault().CustomerVideoId
                                        })
                                         .OrderByDescending(x => x.MonthLikeCount)
                                         .FirstOrDefault();
     
            }

            if (featuredVideoId == null) // try most liked video ever
            {
                featuredVideoId = _customerVideoLikeRepository.Table
                                        .GroupBy(
                                            like => new { CustomerVideoId = like.CustomerVideoId })
                                        .Select(g => new
                                        {
                                            MonthLikeCount = g.Count(),
                                            CustomerVideoId = g.FirstOrDefault().CustomerVideoId
                                        })
                                         .OrderByDescending(x => x.MonthLikeCount)
                                         .FirstOrDefault();

            }



           var featuredVideo = _customerVideoRepository.GetById(featuredVideoId.CustomerVideoId);


            return featuredVideo;









        }


        public CustomerVideoAlbum GetCustomerMainVideoAlbum(int customerId)
        {
            return _customerVideoAlbumRepository.Table
                .FirstOrDefault(x => x.CustomerId == customerId && x.IsMainVideoAlbum);
        }

        public CustomerVideoAlbum GetCustomerVideoAlbumById(int albumId)
        {
            return _customerVideoAlbumRepository.Table
               .FirstOrDefault(x => x.Id == albumId);
        }
    
    }

}
