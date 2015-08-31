using System;
using System.Collections.Generic;
using System.Linq;
using Nop.Core.Data;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class CustomerProfileService : BaseService<CustomerProfile, CustomerProfile>
    {
        private readonly IRepository<CustomerFriend> _customerFriendRepository;

        public CustomerProfileService(IRepository<CustomerProfile> customerProfileRepository, 
            IRepository<CustomerFriend> customerFriendRepository) 
            : base(customerProfileRepository)
        {
            _customerFriendRepository = customerFriendRepository;
        }

        public override List<CustomerProfile> GetAll(string term, int count)
        {
            throw new NotImplementedException();
        }
        

        public override List<CustomerProfile> GetAllPictures(int entityId)
        {
            throw new NotImplementedException();
        }

        public override CustomerProfile GetFirstEntityPicture(int entityId)
        {
            throw new NotImplementedException();
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

        public override Picture GetFirstPicture(int entityId)
        {
            throw new NotImplementedException();
        }
    }

}
