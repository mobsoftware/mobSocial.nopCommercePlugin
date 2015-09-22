using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
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
    public class BusinessPageService : BaseEntityWithPictureService<BusinessPage, BusinessPagePicture>, IBusinessPageService
    {
        private MediaSettings _nopMediaSettings;
        private IUrlRecordService _urlRecordService;
        private readonly IPictureService _pictureService;
        private IWorkContext _workContext;

        public BusinessPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IMobRepository<BusinessPage> entityRepository,
            IMobRepository<BusinessPagePicture> entityPictureRepository,
            MediaSettings mediaSettings,
            IUrlRecordService urlRecordService,
            IPictureService pictureService,
            IWorkContext workContext) : base(entityRepository, entityPictureRepository, pictureService, workContext, urlRecordService)
        {
            _nopMediaSettings = mediaSettings;
            _urlRecordService = urlRecordService;
            _pictureService = pictureService;
            _workContext = workContext;
        }

        public List<BusinessPage> Search(string nameKeyword, string city, int? stateProvinceId, int? countryId)
        {
            var searchQuery = Repository.Table;

            if(!string.IsNullOrEmpty(nameKeyword))
               searchQuery = searchQuery.Where(x => x.Name.ToLower().Contains(nameKeyword));

            if (!string.IsNullOrEmpty(city))
                searchQuery = searchQuery.Where(x => x.City.ToLower().Contains(city));

            if (stateProvinceId.HasValue)
                searchQuery = searchQuery.Where(x => x.StateProvinceId == stateProvinceId);

            if(countryId.HasValue)
                searchQuery = searchQuery.Where(x => x.CountryId == countryId);

            var searchResults = searchQuery.ToList();

            return searchResults;
        }

        public override List<BusinessPage> GetAll(string Term, int Count = 15, int Page = 1)
        {
            return Repository.Table
               .Where(x => x.Name.ToLower().Contains(Term.ToLower()))
               .Take(Count)
               .ToList();
        }
    }

}
