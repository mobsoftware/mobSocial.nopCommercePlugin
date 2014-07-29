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
    public class EventPageAttendanceService : BaseService<EventPageAttendance, EventPageAttendance>
    {
        private readonly IRepository<EventPageHotel> _eventPageHotelRepository;
        private MediaSettings _nopMediaSettings;
        private IUrlRecordService _urlRecordService;
        private IWorkContext _workContext;



        public EventPageAttendanceService(IRepository<EventPageAttendance> entityRepository,
            IUrlRecordService urlRecordService,
            IWorkContext workContext) : base(entityRepository, workContext, urlRecordService)
        {

        }


        public List<EventPageAttendance> GetGoing()
        {
            return Repository.Table.Where(x => x.AttendanceStatusId == (int)AttendanceStatus.Going).ToList();
        }

        public List<EventPageAttendance> GetNotGoing()
        {
            return Repository.Table.Where(x => x.AttendanceStatusId == (int)AttendanceStatus.NotGoing).ToList();
        }

        public List<EventPageAttendance> GetInvited()
        {
            return Repository.Table.Where(x => x.AttendanceStatusId == (int)AttendanceStatus.Invited).ToList();
        }

        public List<EventPageAttendance> GetMaybies()
        {
            return Repository.Table.Where(x => x.AttendanceStatusId == (int)AttendanceStatus.Maybe).ToList();
        }

        public int GetInvitedCount()
        {
            return Repository.Table.Count(x => x.AttendanceStatusId == (int)AttendanceStatus.Invited);
        }

        public override List<EventPageAttendance> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override EventPageAttendance GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }

        public override List<EventPageAttendance> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }


    }





}
