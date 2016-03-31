app.directive("likeButton", ['$http', 'CustomerLikeService', function ($http, CustomerLikeService) {
    return{
        restrict: "E",
        templateUrl: "/CustomerLikeButton",
        replace:true,
        scope: {
            EntityId: "@entityid",
            EntityName: "@entityname",
            LikeStatus: "=likestatus"
        },
        link: function($scope, elem, attr) {
            $scope.Like = function () {
                CustomerLikeService.Like($scope.EntityName, $scope.EntityId, function (response) {
                    $scope.LikeStatus = response.NewStatus;
                }, function() {

                });
            }

            $scope.Unlike = function () {
                CustomerLikeService.Unlike($scope.EntityName, $scope.EntityId, function (response) {
                    $scope.LikeStatus = response.NewStatus;
                }, function () {

                });
            }
        }

    }
}]);