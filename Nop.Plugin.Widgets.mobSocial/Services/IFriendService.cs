using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IFriendService : IBaseEntityService<CustomerFriend>
    {
        CustomerFriend GetCustomerFriendship(int Customer1Id, int Customer2Id);

        CustomerFriend GetCustomerFriend(int FromCustomerId, int ToCustomerId);

        IList<CustomerFriend> GetCustomerFriendRequests(int CustomerId);

        IList<CustomerFriend> GetCustomerFriends(int CustomerId, int Count = 0, bool Random = false);
    }
}