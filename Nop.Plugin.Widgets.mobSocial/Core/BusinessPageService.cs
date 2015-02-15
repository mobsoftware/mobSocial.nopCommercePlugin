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
        private IWorkContext _workContext;

        public BusinessPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IRepository<BusinessPage> entityRepository,
            IRepository<BusinessPagePicture> entityPictureRepository,
            MediaSettings mediaSettings,
            IUrlRecordService urlRecordService,
            IWorkContext workContext) : base(entityRepository, entityPictureRepository, workContext, urlRecordService)
        {
            _nopMediaSettings = mediaSettings;
            _urlRecordService = urlRecordService;
            _workContext = workContext;
        }


        public override List<BusinessPage> GetAll(string term, int count)
        {
            // TODO: Later make a stored procedure.
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(term.ToLower()))
                .Take(count)
                .ToList();

        }

        public override List<BusinessPagePicture> GetAllPictures(int entityId)
        {
            return base.PictureRepository.Table
                .Where(x => x.BusinessPageId == entityId)
                .ToList();
        }

        public override BusinessPagePicture GetFirstPicture(int entityId)
        {
            return base.PictureRepository.Table
                .Where(x => x.BusinessPageId == entityId)
                .FirstOrDefault();
                
        }


    }

}
