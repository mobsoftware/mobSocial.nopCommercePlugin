using System;
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
    public class EventPageService : BaseEntityWithPictureService<EventPage, EventPagePicture>, IEventPageService
    {
        private MediaSettings _nopMediaSettings;
        private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;
        
        public EventPageService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IMobRepository<EventPage> eventPageRepository,
            IMobRepository<EventPagePicture> eventPagePictureRepository,
            MediaSettings mediaSettings,
            IUrlRecordService urlRecordService,
            IWorkContext workContext,
            IPictureService pictureService) : base(eventPageRepository, eventPagePictureRepository, pictureService, workContext, urlRecordService)
        {
            _nopMediaSettings = mediaSettings;
            _urlRecordService = urlRecordService;
            _workContext = workContext;
        }

        public List<EventPage> GetAllUpcomingEvents()
        {
            return base.Repository.Table.Where(x => x.EndDate >= DateTime.Now || !x.EndDate.HasValue).ToList();
        }
        
        public override List<EventPage> GetAll(string Term, int Count = 15, int Page = 1)
        {
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(Term.ToLower()))
                .Take(Count)
                .ToList();
        }
    }

}
