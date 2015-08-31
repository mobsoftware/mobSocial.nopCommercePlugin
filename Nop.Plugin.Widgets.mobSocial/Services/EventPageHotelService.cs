using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
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
