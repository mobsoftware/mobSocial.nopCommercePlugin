using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class EventPageService : BaseService<EventPage, EventPagePicture>, IEventPageService
    {
        private MediaSettings _nopMediaSettings;
        private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;
        
        protected IRepository<EventPagePicture> PictureRepository {get;set;}

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

        public override EventPagePicture GetFirstEntityPicture(int entityId)
        {
            return base.PictureRepository.Table.FirstOrDefault(x => x.EventPageId == entityId);
                
        }
        
        public List<EventPage> GetAllUpcomingEvents()
        {
            return base.Repository.Table.Where(x => x.EndDate >= DateTime.Now || !x.EndDate.HasValue).ToList();
        }


        public override Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
    }

}
