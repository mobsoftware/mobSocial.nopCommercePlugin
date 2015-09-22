using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class CustomerProfileService : BaseEntityService<CustomerProfile>
    {
        private readonly IMobRepository<CustomerFriend> _customerFriendRepository;

        public CustomerProfileService(IMobRepository<CustomerProfile> customerProfileRepository,
            IMobRepository<CustomerFriend> customerFriendRepository) 
            : base(customerProfileRepository)
        {
            _customerFriendRepository = customerFriendRepository;
        }

        public CustomerProfile GetByCustomerId(int customerId) {
            return base.Repository.Table.FirstOrDefault(x => x.CustomerId == customerId);
        }

        public int GetFriendCount(int customerId)
        {
            return _customerFriendRepository
                    .Table
                    .Count(x => (x.FromCustomerId == customerId || x.ToCustomerId == customerId) &&
                                 x.Confirmed);

        }

        public override List<CustomerProfile> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }

}
