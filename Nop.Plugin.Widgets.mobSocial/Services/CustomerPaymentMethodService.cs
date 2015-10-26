using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class CustomerPaymentMethodService : BaseEntityService<CustomerPaymentMethod>, ICustomerPaymentMethodService
    {
       
        public CustomerPaymentMethodService(IMobRepository<CustomerPaymentMethod> repository) : base(repository)
        {
        }

        public override List<CustomerPaymentMethod> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new System.NotImplementedException();
        }

        public IList<CustomerPaymentMethod> GetCustomerPaymentMethods(int CustomerId, bool VerifiedOnly = false)
        {
            var query = Repository.Table.Where(x => x.CustomerId == CustomerId);
            if (VerifiedOnly)
            {
                query = query.Where(x => x.IsVerified);
            }

            return query.ToList();
        }

        public bool DoesCardNumberExist(string CardNumber)
        {
            return Repository.Table.Count(x => x.CardNumber == CardNumber) > 0;
        }
    }
}