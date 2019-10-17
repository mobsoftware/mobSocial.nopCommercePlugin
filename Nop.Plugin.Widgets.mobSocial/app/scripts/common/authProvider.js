window.mobSocial.factory('authProvider', ['$q', 'localStorageService', '$rootScope', 'webClientService', 'loggedInUserKey', 'userInfoKey', 'globalApiEndPoint', function ($q, localStorageService, $rootScope, webClientService, loggedInUserKey, userInfoKey, globalApiEndPoint) {
    
    var freshLoadComplete = false;
    return {
        markLoggedIn: function(user) {
            localStorageService.set(loggedInUserKey, true);
            localStorageService.set(userInfoKey, user);
            this.setLoggedInUser(user);
        },
        setLoggedInUser: function (user) {
            $rootScope.CurrentUser = user;
            $rootScope.UnreadNotificationCount = function () {
                if ($rootScope.CurrentUser || !$rootScope.CurrentUser.Notifications)
                    return 0;
                return $rootScope.CurrentUser.Notifications.reduce(function(total, n) {
                    if (n.EventName != "UserSentFriendRequest" && !n.IsRead)
                        total++;
                    return total;
                }, 0);
            };
            $rootScope.PendingFriendRequestsCount = function () {
                if ($rootScope.CurrentUser || !$rootScope.CurrentUser.Notifications)
                    return 0;
                return $rootScope.CurrentUser.Notifications.reduce(function (total, n) {
                    if (n.EventName == "UserSentFriendRequest") {
                        if (!n.FriendStatus && n.FriendStatus != 0)
                            n.FriendStatus = 2; //status to show accept or decline button
                        if (n.FriendStatus == 2)
                            total++;
                    }
                    return total;
                }, 0);
            };
        },
        getLoggedInUser: function () {
            var defer = $q.defer();
            var self = this;
            if (!freshLoadComplete) {
                //get user from server
                webClientService.get(globalApiEndPoint + "/users/get/me", null,
                    function (response) {
                        if (response.Success) {
                            self.markLoggedIn(response.ResponseData.User);
                            freshLoadComplete = true;
                            defer.resolve(response.ResponseData.User);
                        }
                    });
            } else {
                defer.resolve(localStorageService.get(userInfoKey));
            }
            return defer.promise;
        },
        isLoggedIn: function () {
            //Authentication logic here
            var defer = $q.defer();
            this.getLoggedInUser().then(function (user) {
                if (user != "") {
                    defer.resolve(user);
                }
                else {
                    return defer.reject('Not Authenticated');
                }
            });

            return defer.promise;
        },
        logout: function() {
            localStorageService.set(loggedInUserKey, false);
            localStorageService.set(userInfoKey, null);
        }
    };
}]);