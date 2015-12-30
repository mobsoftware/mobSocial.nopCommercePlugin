using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class FriendService : BaseEntityService<CustomerFriend>, IFriendService
    {
        public FriendService(IMobRepository<CustomerFriend> repository)
            : base(repository)
        {
        }

        public FriendService(IMobRepository<CustomerFriend> repository, IWorkContext workContext, IUrlRecordService urlRecordService)
            : base(repository, workContext, urlRecordService)
        {
        }

        public override List<CustomerFriend> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new System.NotImplementedException();
        }

        public CustomerFriend GetCustomerFriendship(int Customer1Id, int Customer2Id)
        {
            return Repository.Table.FirstOrDefault(x => (x.FromCustomerId == Customer1Id && x.ToCustomerId == Customer2Id) || (x.ToCustomerId == Customer1Id && x.FromCustomerId == Customer2Id));
        }


        public CustomerFriend GetCustomerFriend(int FromCustomerId, int ToCustomerId)
        {
            return
                Repository.Table.FirstOrDefault(x => (x.FromCustomerId == FromCustomerId && x.ToCustomerId == ToCustomerId));
        }


        public IList<CustomerFriend> GetCustomerFriendRequests(int CustomerId)
        {
            return Repository.Table.Where(x => !x.Confirmed && x.FromCustomerId == CustomerId).ToList();
        }

        public IList<CustomerFriend> GetCustomerFriends(int CustomerId, int Count = 0, bool Random = false)
        {
            var friends =
                Repository.Table.Where(
                    x => (x.FromCustomerId == CustomerId || x.ToCustomerId == CustomerId) && x.Confirmed);

            if (Random)
                friends = friends.OrderBy(x => Guid.NewGuid());

            if (Count > 0)
                friends = friends.Take(Count);
            return friends.ToList();
        }
    }
}