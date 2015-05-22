using Nop.Plugin.Widgets.MobSocial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    public interface ICustomerFavoriteSongService
    {
        List<CustomerFavoriteSong> GetTop10(int customerId);
    }
}
