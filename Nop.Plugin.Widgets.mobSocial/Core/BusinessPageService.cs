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
using System.Collections.Generic;


namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public class BusinessPageService : BaseService<BusinessPage, BusinessPagePicture>, IBusinessPageService
    {
        private MediaSettings _nopMediaSettings;
        private IUrlRecordService _urlRecordService;
        private readonly IPictureService _pictureService;
        private IWorkContext _workContext;

        public BusinessPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IRepository<BusinessPage> entityRepository,
            IRepository<BusinessPagePicture> entityPictureRepository,
            MediaSettings mediaSettings,
            IUrlRecordService urlRecordService,
            IPictureService pictureService,
            IWorkContext workContext) : base(entityRepository, entityPictureRepository, workContext, urlRecordService)
        {
            _nopMediaSettings = mediaSettings;
            _urlRecordService = urlRecordService;
            _pictureService = pictureService;
            _workContext = workContext;
        }


        public override List<BusinessPage> GetAll(string term, int count)
        {
            // TODO: Later make a stored procedure.
            return Repository.Table
                .Where(x => x.Name.ToLower().Contains(term.ToLower()))
                .Take(count)
                .ToList();

        }

        public override List<BusinessPagePicture> GetAllPictures(int entityId)
        {
            return PictureRepository.Table
                .Where(x => x.BusinessPageId == entityId)
                .ToList();
        }

        public override BusinessPagePicture GetFirstEntityPicture(int entityId)
        {
            return PictureRepository.Table.FirstOrDefault(x => x.BusinessPageId == entityId);
                
        }

        public override Picture GetFirstPicture(int entityId)
        {
            var entityPicture = PictureRepository.Table.FirstOrDefault(x => x.BusinessPageId == entityId);
            var picture = (entityPicture != null) ? _pictureService.GetPictureById(entityPicture.PictureId) : null;
            return picture;
        }



        public List<BusinessPage> Search(string nameKeyword, int? stateProvinceId, int? countryId)
        {
            var searchQuery = Repository.Table;

            if(!string.IsNullOrEmpty(nameKeyword))
               searchQuery = searchQuery.Where(x => x.Name.ToLower().Contains(nameKeyword));

            if (stateProvinceId.HasValue)
                searchQuery = searchQuery.Where(x => x.StateProvinceId == stateProvinceId);

            if(countryId.HasValue)
                searchQuery = searchQuery.Where(x => x.CountryId == countryId);

            var searchResults = searchQuery.ToList();

            return searchResults;
        }

    }

}
