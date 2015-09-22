using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class EventPageHotelService : BaseEntityService<EventPageHotel>,
        IEventPageHotelService
    {

        public EventPageHotelService(IMobRepository<EventPageHotel> repository,
            IWorkContext workContext) : base(repository)
        {
        }

        public List<EventPageHotel> GetAll(int eventPageId)
        {
            return base.Repository.Table
                .Where(x => x.EventPageId == eventPageId)
                .ToList();
        }

        public override List<EventPageHotel> GetAll(string Term, int Count = 15, int Page = 1)
        {
            // TODO: Later make a stored procedure.
            return base.Repository.Table
                .Where(x => x.Name.ToLower().Contains(Term.ToLower()))
                .Skip((Page - 1) * Count)
                .Take(Count)
                .ToList();
        }
    }

}
