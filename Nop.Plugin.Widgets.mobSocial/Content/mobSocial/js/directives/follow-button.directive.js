app.directive("followButton", ['$http', 'FollowService', '$compile', function ($http, FollowService, $compile) {
    return{
        restrict: "E",
        templateUrl: "/CustomerFollowButton",
        replace:true,
        scope: {
            EntityId: "@entityid",
            EntityName: "@entityname",
            FollowStatus: "=followstatus"
        },
        link: function($scope, elem, attr) {
            $scope.Follow = function () {
                FollowService.Follow($scope.EntityName, $scope.EntityId, function(response) {
                    $scope.FollowStatus = response.NewStatus;
                }, function() {

                });
            }

            $scope.Unfollow = function () {
                FollowService.Unfollow($scope.EntityName, $scope.EntityId, function (response) {
                    $scope.FollowStatus = response.NewStatus;
                }, function () {

                });
            }
        }

    }
}]);