window.mobSocial.factory('notificationHub', ['$q', 'Hub', '$rootScope', 'signalREndPoint', function ($q, Hub, $rootScope, signalREndPoint) {
    var hub = new Hub('notification',
    {
        rootPath: signalREndPoint,
        listeners: {
            'notify': function (notification) {
                $rootScope.CurrentUser.Notifications.push(notification);
                $rootScope.CurrentUser.UnreadNotificationCount++;
                $rootScope.$apply();
            },
            'notifyMultiple': function(notifications) {
                $rootScope.CurrentUser.Notifications = $rootScope.CurrentUser.Notifications.concat(notifications);
                $rootScope.CurrentUser.UnreadNotificationCount += notifications.length;
                $rootScope.$apply();
            }
        }
    });
    return this;
}]);