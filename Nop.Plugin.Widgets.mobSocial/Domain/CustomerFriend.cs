using System;
using Nop.Core;

namespace Nop.Plugin.Widgets.MobSocial.Domain
{
    public class CustomerFriend : BaseEntity
    {
        public int FromCustomerId { get; set; }
        public int ToCustomerId { get; set; }
        public bool Confirmed { get; set; }
        public DateTime DateRequested { get; set; }
        public DateTime? DateConfirmed { get; set; }
        public int NotificationCount { get; set; }
        public DateTime? LastNotificationDate { get; set; }

    }


    public enum FriendStatus
    {
        FriendRequestSent,
        NeedsConfirmed,
        Friends,
        None
    }


}