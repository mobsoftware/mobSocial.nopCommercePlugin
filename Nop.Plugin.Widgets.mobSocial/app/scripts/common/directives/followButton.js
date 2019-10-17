window.mobSocial.lazy.directive("followButton", ['followService', function (followService) {
    return{
        restrict: "E",
        templateUrl: window.Configuration.pluginPath + "/app/pages/components/followButton.html",
        replace:true,
        scope: {
            EntityId: "@entityid",
            EntityName: "@entityname",
            CanFollow: "@canfollow",
            FollowStatus: "=followstatus"
        },
        link: function($scope, elem, attr) {
            $scope.Follow = function () {
                followService.Follow($scope.EntityName, $scope.EntityId, function(response) {
                    $scope.FollowStatus = response.NewStatus;
                }, function() {

                });
            }

            $scope.Unfollow = function () {
                followService.Unfollow($scope.EntityName, $scope.EntityId, function (response) {
                    $scope.FollowStatus = response.NewStatus;
                }, function () {

                });
            }
        }

    }
}]);