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
    public class EventPageHotelService : IEventPageHotelService
    {
        private readonly IRepository<EventPageHotel> _eventPageHotelRepository;
        private MediaSettings _nopMediaSettings;
        private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;



        public EventPageHotelService(ISettingService settingService, IWebHelper webHelper,
            ILogger logger, IEventPublisher eventPublisher,
            IRepository<EventPageHotel> eventPageHotelRepository,
            MediaSettings mediaSettings,
            IUrlRecordService urlRecordService,
            IWorkContext workContext)
        {
            _eventPageHotelRepository = eventPageHotelRepository;
            _nopMediaSettings = mediaSettings;
            _urlRecordService = urlRecordService;
            _workContext = workContext;
        }

        public void Insert(EventPageHotel entity)
        {
            _eventPageHotelRepository.Insert(entity);
        }

        public void Update(EventPageHotel entity)
        {
            _eventPageHotelRepository.Update(entity);
        }

        public void Delete(EventPageHotel entity)
        {
            _eventPageHotelRepository.Delete(entity);
        }

        public EventPageHotel GetById(int id)
        {
            return _eventPageHotelRepository.GetById(id);
        }


        public List<EventPageHotel> GetAll()
        {
            return _eventPageHotelRepository.Table.ToList();

        }

        public List<EventPageHotel> GetAll(int eventPageId)
        {
            return _eventPageHotelRepository.Table
                .Where(x => x.EventPageId == eventPageId)
                .ToList();
        }

        public List<EventPageHotel> GetAll(string term, int count)
        {
            // TODO: Later make a stored procedure.
            return _eventPageHotelRepository.Table
                .Where(x => x.Name.ToLower().Contains(term.ToLower()))
                .Take(count)
                .ToList();

        }


        


    }

}
