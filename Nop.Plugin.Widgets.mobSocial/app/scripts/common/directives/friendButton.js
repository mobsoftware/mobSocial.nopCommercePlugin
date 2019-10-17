window.mobSocial.lazy.directive("friendButton", ['$http', 'friendService', '$compile', function ($http, friendService, $compile) {
    return{
        restrict: "E",
        templateUrl: window.Configuration.pluginPath + "/app/pages/components/friendButton.html",
        replace:true,
        scope: {
            CustomerId: "=customerid",
            FriendStatus: "=friendstatus"
        },
        link: function($scope, elem, attr) {
            $scope.UpdateFriendship = function (type) {
               
                if (type == "add") {
                    friendService.AddFriend($scope.CustomerId, function (response) {
                        if (response.Success) {
                            $scope.FriendStatus = response.NewStatus;
                        } 
                    }, function () {

                    });
                }
                else if (type == "confirm") {
                    friendService.ConfirmFriend($scope.CustomerId, function (response) {
                        if (response.Success) {
                            $scope.FriendStatus = response.NewStatus;
                        } 
                    }, function () {

                    });
                }
                else if (type == "decline") {
                    friendService.DeclineFriend($scope.CustomerId, function (response) {
                        if (response.Success) {
                            $scope.FriendStatus = response.NewStatus;
                        }
                    }, function () {

                    });
                }
            }
        }

    }
}]);