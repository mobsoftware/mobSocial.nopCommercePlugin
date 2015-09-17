using System.Collections.Generic;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Product service
    /// </summary>
    public interface ISkateMoveService
    {
        List<SkateMove> GetAll();

        List<CustomerSkateMove> GetCustomerSkateMoves(int customerId);

    }

}
