using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Media;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class CustomerFavoriteSongService : BaseService<CustomerFavoriteSong, CustomerFavoriteSong>, ICustomerFavoriteSongService
    {
        private MediaSettings _nopMediaSettings;
        private IUrlRecordService _urlRecordService;
        private readonly IPictureService _pictureService;
        private IOAuthService _oAuthService;
        private IWorkContext _workContext;

        public CustomerFavoriteSongService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IRepository<CustomerFavoriteSong> entityRepository,
            IRepository<CustomerFavoriteSong> entityPictureRepository,
            MediaSettings mediaSettings,
            IUrlRecordService urlRecordService,
            IPictureService pictureService,
            IOAuthService oAuthService,
            IWorkContext workContext) : base(entityRepository, entityPictureRepository, workContext, urlRecordService)
        {
            _nopMediaSettings = mediaSettings;
            _urlRecordService = urlRecordService;
            _pictureService = pictureService;
            _workContext = workContext;
            _oAuthService = oAuthService;
        }


        public List<CustomerFavoriteSong> GetTop10(int customerId)
        {
            var top10FavoriteSongs = Repository.Table
                .Where(x => x.CustomerId == customerId)
                .OrderBy(x => x.DisplayOrder)
                .Take(10)
                .ToList();

            var oAuthBase = new OAuthBase();
            
            top10FavoriteSongs.ForEach(
                    x => oAuthBase.GetSignedUrl(x.PreviewUrl, 
                        _oAuthService.ConsumerKey, 
                        _oAuthService.ConsumerSecret));
            

            return top10FavoriteSongs;

        }

        /// <summary>
        /// Gets all pictures for the specified entity
        /// </summary>
        /// <returns></returns>
        public override List<CustomerFavoriteSong> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets the first entity picture for the specified entity from EntityPicture table
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public override CustomerFavoriteSong GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets the first picture for the specified entity
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public override Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public override List<CustomerFavoriteSong> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }


        public void UpdateFavoriteSongOrder(int favoriteSongId, int displayOrder)
        {
            throw new NotImplementedException();
        }
    }

}
