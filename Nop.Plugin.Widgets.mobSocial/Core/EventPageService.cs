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
    public class EventPageService : BaseService<EventPage, EventPagePicture>
    {
        private MediaSettings _nopMediaSettings;
        private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;
        

        public EventPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IRepository<EventPage> eventPageRepository,
            IRepository<EventPagePicture> eventPagePictureRepository,
            MediaSettings mediaSettings,
            IUrlRecordService urlRecordService,
            IWorkContext workContext) : base(eventPageRepository, eventPagePictureRepository, workContext, urlRecordService)
        {
            _nopMediaSettings = mediaSettings;
            _urlRecordService = urlRecordService;
            _workContext = workContext;
        }

        public void InsertPicture(EventPage entity)
        {
            base.Repository.Insert(entity);

            UrlRecord urlRecord = new UrlRecord()
            {
                EntityId = entity.Id,
                EntityName = "EntityPage",
                IsActive = true,
                LanguageId = _workContext.WorkingLanguage.Id,
                Slug = entity.GetSeName()
            };

            _urlRecordService.InsertUrlRecord(urlRecord);


        }

        public override List<EventPage> GetAll(string term, int count)
        {
            // TODO: Later make a stored procedure.
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(term.ToLower()))
                .Take(count)
                .ToList();

        }



        public override List<EventPagePicture> GetAllPictures(int entityId)
        {
            return base.PictureRepository.Table
                .Where(x => x.EventPageId == entityId)
                .ToList();
        }

        public override EventPagePicture GetFirstPicture(int entityId)
        {
            return base.PictureRepository.Table
                .Where(x => x.EventPageId == entityId)
                .FirstOrDefault();
                
        }

    }

}
