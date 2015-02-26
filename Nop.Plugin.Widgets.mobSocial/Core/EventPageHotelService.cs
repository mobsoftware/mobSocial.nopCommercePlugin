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
    public class EventPageHotelService : BaseService<EventPageHotel, EventPageHotel>,
        IEventPageHotelService
    {

        public EventPageHotelService(IRepository<EventPageHotel> repository,
            IWorkContext workContext) : base(repository, workContext)
        {
        }

        public List<EventPageHotel> GetAll(int eventPageId)
        {
            return base.Repository.Table
                .Where(x => x.EventPageId == eventPageId)
                .ToList();
        }

        public override List<EventPageHotel> GetAll(string term, int count)
        {
            // TODO: Later make a stored procedure.
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(term.ToLower()))
                .Take(count)
                .ToList();

        }




        public override List<EventPageHotel> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override EventPageHotel GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();

        }


        public override Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
    }

}
