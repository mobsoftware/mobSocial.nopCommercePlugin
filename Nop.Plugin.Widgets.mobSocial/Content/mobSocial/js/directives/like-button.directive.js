app.directive("likeButton", ['$http', 'CustomerLikeService', function ($http, CustomerLikeService) {
    return{
        restrict: "E",
        templateUrl: "/CustomerLikeButton",
        replace:true,
        scope: {
            EntityId: "@entityid",
            EntityName: "@entityname",
            LikeStatus: "=likestatus",
            TotalLikes: "@totallikes"
        },
        link: function($scope, elem, attr) {
            $scope.Like = function () {
                CustomerLikeService.Like($scope.EntityName, $scope.EntityId, function (response) {
                    if (response.Success) {
                        $scope.LikeStatus = response.NewStatus;
                        $scope.TotalLikes++;
                    }
                    
                }, function() {

                });
            }

            $scope.Unlike = function () {
                CustomerLikeService.Unlike($scope.EntityName, $scope.EntityId, function (response) {
                    if (response.Success) {
                        $scope.LikeStatus = response.NewStatus;
                        $scope.TotalLikes--;
                    }
                }, function () {

                });
            }
        }

    }
}]);