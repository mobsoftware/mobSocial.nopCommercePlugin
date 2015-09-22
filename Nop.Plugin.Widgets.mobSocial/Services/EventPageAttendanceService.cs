using System;
using System.Collections.Generic;
using System.Linq;
using Mob.Core.Data;
using Mob.Core.Services;
using Nop.Core;
using Nop.Core.Data;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Media;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Services.Customers;
using Nop.Services.Seo;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    public class EventPageAttendanceService : BaseEntityService<EventPageAttendance>,IEventPageAttendanceService
    {

        private readonly ICustomerService _cutomerService;
        private readonly IMobSocialMessageService _messageService;
        private readonly IMobRepository<CustomerFriend> _customerFriendRepository;
        private readonly IWorkContext _workContext;

        public EventPageAttendanceService(IMobRepository<EventPageAttendance> entityRepository,
            IUrlRecordService urlRecordService, ICustomerService customerService,
            IMobSocialMessageService messageService, IWorkContext workContext,
            IMobRepository<CustomerFriend> customerFriendRepository) : base(entityRepository)
        {
            _cutomerService = customerService;
            _messageService = messageService;
            _customerFriendRepository = customerFriendRepository;
            _workContext = workContext;
        }


        public List<EventPageAttendance> GetAllInvited(int eventPageId)
        {
            return Repository.Table
                .Where(x => x.EventPageId == eventPageId && x.AttendanceStatusId == (int)AttendanceStatus.Invited).ToList();
        }
        public List<EventPageAttendance> GetInvited(int start, int count)
        {
            return Repository.Table.Skip(start).Take(count)
                .Where(x => x.AttendanceStatusId == (int)AttendanceStatus.Invited).ToList();
        }


        public List<EventPageAttendance> GetAllGoing(int eventPageId)
        {
            return Repository.Table
                .Where(x => x.EventPageId == eventPageId && x.AttendanceStatusId == (int)AttendanceStatus.Going).ToList();
        }
        public List<EventPageAttendance> GetGoing(int start, int count)
        {
            return Repository.Table.Skip(start).Take(count)
                .Where(x => x.AttendanceStatusId == (int)AttendanceStatus.Going).ToList();
        }


        public List<EventPageAttendance> GetAllMaybies(int eventPageId)
        {
            return Repository.Table
                .Where(x => x.EventPageId == eventPageId && x.AttendanceStatusId == (int)AttendanceStatus.Maybe).ToList();
        }
        public List<EventPageAttendance> GetMaybies(int start, int count)
        {
            return Repository.Table.Skip(start).Take(count)
                .Where(x => x.AttendanceStatusId == (int)AttendanceStatus.Maybe).ToList();
        }


        public List<EventPageAttendance> GetAllNotGoing(int eventPageId)
        {
            return Repository.Table
                .Where(x => x.EventPageId == eventPageId && x.AttendanceStatusId == (int)AttendanceStatus.NotGoing).ToList();
        }
        public List<EventPageAttendance> GetNotGoing(int start, int count)
        {
            return Repository.Table.Skip(start).Take(count)
                .Where(x => x.AttendanceStatusId == (int)AttendanceStatus.NotGoing).ToList();
        }

        public List<CustomerFriend> GetUninvitedFriends(int eventPageId, int customerId, int index, int count)
        {

            var attendance = Repository.Table.Where(x=>x.EventPageId == eventPageId).Select(x=>x.CustomerId).ToList();
            var uninvitedFriends = _customerFriendRepository.Table
                .Where(x => x.Confirmed)
                .Where(x => x.ToCustomerId == customerId || x.FromCustomerId == customerId);

            // only univited friends
            if(attendance.Count > 0)
                uninvitedFriends = uninvitedFriends.Where(x => !attendance.Contains((x.FromCustomerId != customerId) ? x.FromCustomerId : x.ToCustomerId));

            var uninvitedFriendsList = uninvitedFriends
                    .OrderBy(x=>x.DateConfirmed)
                    .Skip(index).Take(count)
                    .ToList();

            return uninvitedFriendsList;


        }


        public List<Customer> InviteFriends(int eventPageId, int[] invitedCustomerIds)
        {

            var invitedCustomers = new List<Customer>();

            foreach (var customerId in invitedCustomerIds)
            {
                var eventPageAttendance = new EventPageAttendance()
                {
                    CustomerId = customerId,
                    EventPageId = eventPageId,
                    AttendanceStatusId = (int)AttendanceStatus.Invited,
                    DateCreated = DateTime.Now,
                    DateUpdated = DateTime.Now
                };

                Repository.Insert(eventPageAttendance);

                var customer = _cutomerService.GetCustomerById(customerId);
                invitedCustomers.Add(customer);
                _messageService.SendEventInvitationNotification(customer, _workContext.WorkingLanguage.Id, 0);

            }

            return invitedCustomers;

        }



       

       

        public EventPageAttendance GetCustomerAttendanceStatus(int customerId, int eventPageId)
        {
            return Repository.Table
                .FirstOrDefault(x => x.CustomerId == customerId && x.EventPageId == eventPageId);
        }

        public int GetInvitedCount()
        {
            return Repository.Table.Count(x => x.AttendanceStatusId == (int)AttendanceStatus.Invited);
        }

        public List<EventPageAttendance> GetAllAttendances(int eventPageId)
        {
            return base.Repository.Table.Where(x => x.EventPageId == eventPageId).ToList();
        }

        public override List<EventPageAttendance> GetAll(string Term, int Count = 15, int Page = 1)
        {
            throw new NotImplementedException();
        }
    }





}
