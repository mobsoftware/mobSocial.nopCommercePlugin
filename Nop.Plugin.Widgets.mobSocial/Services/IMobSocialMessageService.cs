using System.Collections.Generic;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Customers;
using Nop.Plugin.Widgets.MobSocial.Domain;
using Nop.Plugin.Widgets.MobSocial.Enums;

namespace Nop.Plugin.Widgets.MobSocial.Services
{
    /// <summary>
    /// Social Network Message service. Used for sending social network notifications.
    /// </summary>
    public interface IMobSocialMessageService
    {
        int SendFriendRequestNotification(Customer customer, int friendRequestCount, int languageId, int storeId);

        int SendEventInvitationNotification(Customer customer, int languageId, int storeId);

        int SendPendingFriendRequestNotification(Customer customer, int friendRequestCount, int languageId, int storeId);

        int SendBirthdayNotification(Customer customer, int languageId, int storeId);

        int SendProductReviewNotification(Customer customer, List<Product> unreviewedProducts, int languageId, int storeId);

        int SendSomeoneSentYouASongNotification(Customer customer, int languageId, int storeId);

        int SendSomeoneChallengedYouForABattleNotification(Customer challenger, Customer challengee, VideoBattle videoBattle, int languageId, int storeId);

        int SendSomeoneChallengedYouForABattleNotification(Customer challenger, string challengeeEmail, string challengeeName, VideoBattle videoBattle, int languageId, int storeId);

        int SendVideoBattleCompleteNotification(Customer customer, VideoBattle videoBattle, NotificationRecipientType recipientType, int languageId, int storeId);

        int SendVotingReminderNotification(Customer sender, Customer receiver, VideoBattle videoBattle, int languageId, int storeId);

        int SendVotingReminderNotification(Customer sender, string receiverEmail, string receiverName, VideoBattle videoBattle, int languageId, int storeId);

        int SendVideoBattleSignupNotification(Customer challenger, Customer challengee, VideoBattle videoBattle, int languageId, int storeId);

        int SendVideoBattleJoinNotification(Customer challenger, Customer challengee, VideoBattle videoBattle, int languageId, int storeId);

        int SendVideoBattleSignupAcceptedNotification(Customer challenger, Customer challengee, VideoBattle videoBattle, int languageId, int storeId);

        int SendSponsorAppliedNotificationToBattleOwner(Customer owner, Customer sponsor, VideoBattle videoBattle, int languageId, int storeId);

        int SendSponsorshipStatusChangeNotification(Customer receiver, SponsorshipStatus sponsorshipStatus, VideoBattle videoBattle, int languageId, int storeId);

    }

}
