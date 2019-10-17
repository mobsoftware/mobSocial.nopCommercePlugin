window.mobSocial.lazy.directive("likeButton", ['likeService', function (likeService) {
    return{
        restrict: "E",
        templateUrl: window.Configuration.pluginPath + "/app/pages/components/likeButton.html",
        replace:true,
        scope: {
            EntityId: "@entityid",
            EntityName: "@entityname",
            LikeStatus: "=likestatus",
            TotalLikes: "@totallikes"
        },
        link: function($scope, elem, attr) {
            $scope.Like = function () {
                likeService.Like($scope.EntityName, $scope.EntityId, function (response) {
                    if (response.Success) {
                        $scope.LikeStatus = response.NewStatus;
                        $scope.TotalLikes++;
                    }
                    
                }, function() {

                });
            }

            $scope.Unlike = function () {
                likeService.Unlike($scope.EntityName, $scope.EntityId, function (response) {
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