using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Customers;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class CustomerFollowService : BaseEntityService<CustomerFollow>, ICustomerFollowService
    {
        public CustomerFollowService(IMobRepository<CustomerFollow> repository) : base(repository)
        {
        }

        public override List<CustomerFollow> GetAll(string Term, int Count = 15, int Page = 1)
        {
            return Repository.Table.ToList();
        }

        public CustomerFollow GetCustomerFollow<T>(int customerId, int entityId) where T : IFollowSupported
        {
            return
                Repository.Table.FirstOrDefault(
                    x => x.FollowingEntityId == entityId && x.CustomerId == customerId && x.FollowingEntityName == typeof(T).Name);
        }

        public IList<CustomerFollow> GetCustomerFollows<T>(int customerId) where T : IFollowSupported
        {
            return
                Repository.Table.Where(x => x.CustomerId == customerId && x.FollowingEntityName == typeof(T).Name)
                    .ToList();
        }

       
        public void Insert<T>(int customerId, int entityId) where T : IFollowSupported
        {
            //insert only if required
            if (
                !Repository.Table.Any(
                    x =>
                        x.FollowingEntityId == entityId && x.CustomerId == customerId &&
                        x.FollowingEntityName == typeof (T).Name))
            {
                var customerFollow = new CustomerFollow() {
                    CustomerId = customerId,
                    FollowingEntityId = entityId,
                    FollowingEntityName = typeof(T).Name,
                    DateCreated = DateTime.UtcNow,
                    DateUpdated = DateTime.UtcNow
                };
                Repository.Insert(customerFollow);
            }
            
        }

        public void Delete<T>(int customerId, int entityId) where T : IFollowSupported
        {
            var customerFollow = GetCustomerFollow<T>(customerId, entityId);
            if(customerFollow != null)
                Repository.Delete(customerFollow);
        }

        public int GetFollowerCount<T>(int entityId) where T : IFollowSupported
        {
            return
                Repository.Table.Count(x => x.FollowingEntityId == entityId && x.FollowingEntityName == typeof (T).Name);
        }

        public IList<CustomerFollow> GetFollowers<T>(int entityId) where T : IFollowSupported
        {
            return
                Repository.Table.Where(x => x.FollowingEntityId == entityId && x.FollowingEntityName == typeof (T).Name)
                    .ToList();
        }
    }
}