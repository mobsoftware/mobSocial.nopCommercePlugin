app.directive("friendButton", ['$http', 'FriendService', '$compile', function ($http, FriendService, $compile) {
    return{
        restrict: "E",
        templateUrl: "/Friends/FriendButton",
        replace:true,
        scope: {
            CustomerId: "=customerid",
            FriendStatus: "=friendstatus"
        },
        link: function($scope, elem, attr) {
            $scope.UpdateFriendship = function (type) {
               
                if (type == "add") {
                    FriendService.AddFriend($scope.CustomerId, function (response) {
                        if (response.Success) {
                            $scope.FriendStatus = response.NewStatus;
                        } else {
                            alert(response.Message);
                        }
                    }, function () {

                    });
                }
                else if (type == "confirm") {
                    FriendService.ConfirmFriend($scope.CustomerId, function (response) {
                        if (response.Success) {
                            $scope.FriendStatus = response.NewStatus;
                        } else {
                            alert(response.Message);
                        }
                    }, function () {

                    });
                }
                else if (type == "decline") {
                    if (!confirm("Are you sure you wish to cancel friendship?"))
                        return;
                    FriendService.DeclineFriend($scope.CustomerId, function (response) {
                        if (response.Success) {
                            $scope.FriendStatus = response.NewStatus;
                        } else {
                            alert(response.Message);
                        }
                    }, function () {

                    });
                }
            }
        }

    }
}]);