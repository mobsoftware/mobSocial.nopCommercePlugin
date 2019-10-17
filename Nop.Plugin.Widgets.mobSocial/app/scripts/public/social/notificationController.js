window.mobSocial.controller("notificationController",
[
    "$scope", "notificationService", "$rootScope", function ($scope, notificationService, $rootScope) {

        $scope.markNotificationsRead = function () {
            if ($rootScope.CurrentUser.UnreadNotificationCount == 0)
                return;
            notificationService.put([],
                function (response) {
                    if (response.Success) {
                        //mark all the notifications in the currentuser object to true and set unread count to zero
                        for (var i = 0; i < $rootScope.CurrentUser.Notifications.length; i++) {
                            $rootScope.CurrentUser.Notifications[i].IsRead = true;
                        }
                        $rootScope.CurrentUser.UnreadNotificationCount = 0;
                    }
                });
        }
    }
]);