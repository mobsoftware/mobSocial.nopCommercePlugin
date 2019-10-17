window.mobSocial.lazy.controller("mediaController",
[
    "$scope", "userService", "$rootScope", function ($scope, userService, $rootScope) {

        $scope.options = {
            page: 1,
            count: 15
        };

        $scope.getMedia = function (idOrUserName, type) {
            var _executeOperation = function (idOrUserName) {
                var methodName = type == "videos" ? "getVideos" : "getPictures";
                userService[methodName](idOrUserName,
                    $scope.options,
                    function (response) {
                        $scope.mediaItems = $scope.mediaItems || [];
                        if (response.Success) {
                            $scope.mediaItems = $scope.mediaItems.concat(response.ResponseData.Media);
                            //increment page count
                            $scope.options.page++;
                        }
                    },
                    function (response) {

                    });
            };
            if (idOrUserName)
                _executeOperation(idOrUserName);
            else {
                $rootScope.waitFromParent($scope, "user", null)
                    .then(function (user) {
                        if (user)
                            _executeOperation(user.Id);
                    });
            }

        }
    }
]);