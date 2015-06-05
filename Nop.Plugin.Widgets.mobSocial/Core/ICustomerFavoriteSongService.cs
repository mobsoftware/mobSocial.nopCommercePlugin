using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface ICustomerFavoriteSongService : IBaseService<CustomerFavoriteSong, CustomerFavoriteSong>
    {
        List<CustomerFavoriteSong> GetTop10(int customerId);

        void UpdateFavoriteSongOrder(int favoriteSongId, int displayOrder);
    }
}
