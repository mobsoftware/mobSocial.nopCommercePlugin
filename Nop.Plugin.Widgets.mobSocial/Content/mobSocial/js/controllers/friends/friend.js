app.controller("FriendSearchController", [
    '$scope', 'FriendService', function($scope, FriendService) {

        $scope.init = function (FriendSearchModel) {
            $scope.FriendSearchModel = FriendSearchModel;
            $scope.FriendSearchModel.Page = 0;
            $scope.LoadNextPage();
        };

        $scope.People = null;
        $scope.SearchInProgress = false;
        $scope.LoadNextPage = function() {
            $scope.FriendSearchModel.Page++;
            $scope.SearchInProgress = true;
            FriendService.SearchPeople($scope.FriendSearchModel, function(response) {
                if (response.Success) {
                    $scope.People = response.People;
                } else {
                    alert(response.Message);
                }
                $scope.SearchInProgress = false;
            }, function(response) {
                $scope.SearchInProgress = false;
                alert("An error occured while performing the operation");
            });

        };

    }
]);

app.controller("FriendsController", [
    '$scope', 'FriendService', function ($scope, FriendService) {

        $scope.GetFriendRequests = function() {
            FriendService.GetFriendRequests(function (response) {
                if (response.Success) {
                    $scope.FriendRequests = response.People;
                } else {
                    alert(response.Message);
                }
            }, function () {

            });
        }

        $scope.GetCustomerFriends = function(customerFriendsRequestModel) {
            FriendService.GetCustomerFriends(customerFriendsRequestModel, function (response) {
                if (response.Success) {
                    $scope.CustomerFriends = response.Friends;
                }
            }, function() {
                alert(response.Message);
            });
        }
    }
]);