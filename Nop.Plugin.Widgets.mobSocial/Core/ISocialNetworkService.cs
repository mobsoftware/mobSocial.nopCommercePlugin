using System.Collections;
using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Controllers;

namespace Nop.Plugin.Widgets.MobSocial.Core
{
    /// <summary>
    /// Product service
    /// </summary>
    public interface IMobSocialService
    {
        void SendFriendRequest(int fromCustomerId, int toCustomerId);


        void ConfirmFriendRequest(int customerFriendId);

        List<CustomerFriend> GetRandomFriends(int customerId, int howMany);

        TeamPage GetTeam(int teamId);
        
        void InsertTeamPage(TeamPage teamPage);
        void InsertGroupPage(GroupPage groupPage);
       
        FriendStatus GetFriendRequestStatus(int currentCustomerId, int friendCustomerId);

        List<CustomerFriend> GetFriends(int customerId);
        List<CustomerFriend> GetFriends(int customerId, int index, int count);
        List<CustomerFriend> GetFriendRequests(int id);


        int GetFriendRequestCount(int currentCustomerId);

        void SendFriendRequestNotifications();

        void SendProductReviewNotifications();
    }

}
