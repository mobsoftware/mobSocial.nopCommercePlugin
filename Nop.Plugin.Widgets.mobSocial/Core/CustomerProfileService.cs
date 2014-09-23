using System;
using System.Collections.Generic;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Configuration;
using Nop.Services.Events;
using Nop.Services.Logging;
using Nop.Services.Media;
using System.Drawing;
using System.Linq;


namespace Nop.Plugin.Widgets.MobSocial.Core
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

        public override CustomerProfile GetFirstPicture(int entityId)
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





    }

}
