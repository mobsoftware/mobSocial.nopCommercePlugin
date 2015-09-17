using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface ICustomerFavoriteSongService : IBaseService<CustomerFavoriteSong, CustomerFavoriteSong>
    {
        List<CustomerFavoriteSong> GetTop10(int CustomerId);

        void UpdateFavoriteSongOrder(int favoriteSongId, int displayOrder);

    }
}
