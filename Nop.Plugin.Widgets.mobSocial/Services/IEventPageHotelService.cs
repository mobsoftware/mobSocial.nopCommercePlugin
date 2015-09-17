using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Product service
    /// </summary>
    public interface IEventPageHotelService : IBaseService<EventPageHotel, EventPageHotel>
    {
        List<EventPageHotel> GetAll(int eventPageId);
    }

}
