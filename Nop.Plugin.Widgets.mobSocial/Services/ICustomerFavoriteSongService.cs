using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface ICustomerFavoriteSongService : IBaseEntityService<CustomerFavoriteSong>
    {
        List<CustomerFavoriteSong> GetTop10(int CustomerId);

        void UpdateFavoriteSongOrder(int favoriteSongId, int displayOrder);

    }
}
