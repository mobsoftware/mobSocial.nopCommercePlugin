using System;
using System.Linq;
using Nop.Core;
using Nop.Core.Domain.Customers;
using Nop.Core.Plugins;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;
using Nop.Plugin.Widgets.MobSocial.Services;
using Nop.Services.Common;
using Nop.Services.Customers;
using Nop.Services.Helpers;
using Nop.Services.Tasks;

namespace Nop.Plugin.Widgets.MobSocial.Tasks
{
    public class ReminderNotificationsTask : ITask
    {
        private readonly IPluginFinder _pluginFinder;
        private readonly IMobSocialMessageService _mobSocialMessageService;
        private readonly IVideoBattleService _videoBattleService;
        private readonly IVideoBattleParticipantService _videoBattleParticipantService;
        private readonly IVideoBattleVideoService _videoBattleVideoService;
        private readonly IVideoBattleVoteService _videoBattleVoteService;
        private readonly ICustomerFollowService _customerFollowService;
        private readonly ICustomerService _customerService;
        private readonly IWorkContext _workContext;
        private readonly IStoreContext _storeContext;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly mobSocialSettings _mobSocialSettings;

        public ReminderNotificationsTask(IPluginFinder pluginFinder, IMobSocialMessageService mobSocialMessageService, IVideoBattleService videoBattleService, IVideoBattleVideoService videoBattleVideoService, IVideoBattleVoteService videoBattleVoteService, mobSocialSettings mobSocialSettings, IVideoBattleParticipantService videoBattleParticipantService, ICustomerService customerService, IWorkContext workContext, IStoreContext storeContext, ICustomerFollowService customerFollowService, IDateTimeHelper dateTimeHelper)
        {
            _pluginFinder = pluginFinder;
            _mobSocialMessageService = mobSocialMessageService;
            _videoBattleService = videoBattleService;
            _videoBattleVideoService = videoBattleVideoService;
            _videoBattleVoteService = videoBattleVoteService;
            _mobSocialSettings = mobSocialSettings;
            _videoBattleParticipantService = videoBattleParticipantService;
            _customerService = customerService;
            _workContext = workContext;
            _storeContext = storeContext;
            _customerFollowService = customerFollowService;
            _dateTimeHelper = dateTimeHelper;
        }


        public void Execute()
        {
            //is plugin installed?
            var pluginDescriptor = _pluginFinder.GetPluginDescriptorBySystemName("Widgets.mobSocial");
            if (pluginDescriptor == null)
                return;

            //plugin
            var plugin = pluginDescriptor.Instance() as mobSocialPlugin;
            if (plugin == null)
                return;

            //the task will send reminders to customers based on the timezone they are in, we don't want to send ill-timed emails
            //first get all the battles
            int notUsedTotalPages;
            var allBattles = _videoBattleService.GetAll(null, null, null, null, null, null, string.Empty, null, null,
                out notUsedTotalPages, 1, int.MaxValue);

            
            #region to participants who have not uploaded video, that means only battles with pending status and within settings' threshold

            var pendingBattles = allBattles.Where(x => x.VideoBattleStatus == VideoBattleStatus.Pending 
                && x.VotingStartDate.Subtract(DateTime.UtcNow).TotalDays <= _mobSocialSettings.VideoUploadReminderEmailThresholdDays);

            //TODO: Find a way to improve performance of this feature
            foreach (var battle in pendingBattles)
            {
                //participantVideos for this battle
                var participantVideos = _videoBattleVideoService.GetBattleVideos(battle.Id);

                //the ids of participants who have uploaded videos
                var participantIds = participantVideos.Select(x => x.ParticipantId);

                var battleParticipants = _videoBattleParticipantService.GetVideoBattleParticipants(battle.Id,
                    VideoBattleParticipantStatus.ChallengeAccepted);

                //the ids of participants who need to be reminded
                var requireReminderParticipantIds =
                    battleParticipants.Where(x => !participantIds.Contains(x.ParticipantId)).Select(x => x.ParticipantId).ToArray();

                //send reminders to them
                var participantCustomers = _customerService.GetCustomersByIds(requireReminderParticipantIds);

                foreach (var customer in participantCustomers)
                {
                    //get the current time in customer's timezone
                    var customerDateTime = _dateTimeHelper.ConvertToUserTime(DateTime.UtcNow, TimeZoneInfo.Utc,
                        _dateTimeHelper.GetCustomerTimeZone(customer));
                    
                    //make sure it's good time to send email, between 7:00 AM - 5:00 PM should be a good time right?
                    if (customerDateTime.Hour >= 7 && customerDateTime.Hour <= 17)
                    {
                        _mobSocialMessageService.SendXDaysToBattleStartNotificationToParticipant(customer, battle,
                        _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);
                    }
                    
                }

            }


            #endregion


            #region to the followers who are following the battle but haven't yet voted
            
            var openBattles = allBattles.Where(x => x.VideoBattleStatus == VideoBattleStatus.Open
                && x.VotingStartDate.Subtract(DateTime.UtcNow).TotalDays <= _mobSocialSettings.VideoUploadReminderEmailThresholdDays);
            //TODO: Find a way to improve performance of this feature
            foreach (var battle in openBattles)
            {
                //followers of this battle
                var followers = _customerFollowService.GetFollowers<VideoBattle>(battle.Id);

                //get the votes casted so far
                var votes = _videoBattleVoteService.GetVideoBattleVotes(battle.Id, null);
                //their customer ids
                var votesCustomerIds = votes.Select(x => x.ParticipantId);

                //and now the followers who haven't voted, need to be reminded//should not be a battle owner either
                var followersToRemindIds =
                    followers.Where(x => !votesCustomerIds.Contains(x.CustomerId) && x.CustomerId != battle.ChallengerId).Select(x => x.CustomerId).ToArray();

                //send reminders to them
                var followerCustomers = _customerService.GetCustomersByIds(followersToRemindIds);

                foreach (var customer in followerCustomers)
                {
                    //get the current time in customer's timezone
                    var customerDateTime = _dateTimeHelper.ConvertToUserTime(DateTime.UtcNow, TimeZoneInfo.Utc,
                        _dateTimeHelper.GetCustomerTimeZone(customer));

                    //make sure it's good time to send email, between 7:00 AM - 5:00 PM should be a good time right?
                    if (customerDateTime.Hour >= 7 && customerDateTime.Hour <= 17)
                    {
                        _mobSocialMessageService.SendXDaysToBattleEndNotificationToFollower(customer, battle,
                        _workContext.WorkingLanguage.Id, _storeContext.CurrentStore.Id);
                    }

                }
            }

            #endregion

            //TODO: Send a consolidated email which contains all the battles (to participate and to vote)
        }
    }
}