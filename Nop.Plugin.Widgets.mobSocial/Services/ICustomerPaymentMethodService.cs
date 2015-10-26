using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface ICustomerPaymentMethodService : IBaseEntityService<CustomerPaymentMethod>
    {
        IList<CustomerPaymentMethod> GetCustomerPaymentMethods(int CustomerId, bool VerifiedOnly = false);

        bool DoesCardNumberExist(string CardNumber);
    }
}
