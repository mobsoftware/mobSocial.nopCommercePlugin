using System.Collections.Generic;
using Mob.Core.Services;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Domain;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public interface IEventPageAttendanceService : IBaseEntityService<EventPageAttendance>
    {
       
       List<EventPageAttendance> GetGoing(int start, int count);
       List<EventPageAttendance> GetNotGoing(int start, int count);
       List<EventPageAttendance> GetInvited(int start, int count);
       List<EventPageAttendance> GetMaybies(int start, int count);
       
       List<EventPageAttendance> GetAllAttendances(int eventPageId);
       List<EventPageAttendance> GetAllInvited(int eventPageId);
       List<EventPageAttendance> GetAllGoing(int eventPageId);
       List<EventPageAttendance> GetAllMaybies(int eventPageId);
       List<EventPageAttendance> GetAllNotGoing(int eventPageId);
       

       int GetInvitedCount();

       
       List<CustomerFriend> GetUninvitedFriends(int eventPageId, int customerId, int index, int count);
       List<Customer> InviteFriends(int eventPageId, int[] invitedCustomerIds);

       EventPageAttendance GetCustomerAttendanceStatus(int customerId, int eventPageId);

       


       
    }
}
