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
    public class EventPageAttendanceService : BaseService<EventPageAttendance, EventPageAttendance>,
        IEventPageAttendanceService
    {
       

        public EventPageAttendanceService(IRepository<EventPageAttendance> entityRepository,
            IUrlRecordService urlRecordService,
            IWorkContext workContext) : base(entityRepository, workContext, urlRecordService)
        {

        }


        public List<EventPageAttendance> GetGoing(int start, int count)
        {
            return Repository.Table.Skip(start).Take(count)
                .Where(x => x.AttendanceStatusId == (int)AttendanceStatus.Going).ToList();
        }

        public List<EventPageAttendance> GetNotGoing(int start, int count)
        {
            return Repository.Table.Skip(start).Take(count)
                .Where(x => x.AttendanceStatusId == (int)AttendanceStatus.NotGoing).ToList();
        }

        public List<EventPageAttendance> GetInvited(int start, int count)
        {
            return Repository.Table.Skip(start).Take(count)
                .Where(x => x.AttendanceStatusId == (int)AttendanceStatus.Invited).ToList();
        }

        public List<EventPageAttendance> GetMaybies(int start, int count)
        {
            return Repository.Table.Skip(start).Take(count)
                .Where(x => x.AttendanceStatusId == (int)AttendanceStatus.Maybe).ToList();
        }

        public int GetInvitedCount()
        {
            return Repository.Table.Count(x => x.AttendanceStatusId == (int)AttendanceStatus.Invited);
        }

        public List<EventPageAttendance> GetAllAttendances(int eventPageId)
        {
            return Repository.Table.Where(x => x.EventPageId == eventPageId).ToList();
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
