window.mobSocial.lazy.controller("followController",
[
    "$scope", "userService", "$rootScope", function ($scope,userService, $rootScope) {

        $scope.options = {
            page: 1,
            count: 15
        };

        $scope.getFollowers = function (idOrUserName) {
            var _executeOperation = function(idOrUserName) {
                userService.getFollowers(idOrUserName,
                    $scope.options,
                    function(response) {
                        if (response.Success) {
                            $scope.followers = response.ResponseData.Users;
                            $scope.options.page++;
                        }
                    },
                    function(response) {

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

        $scope.getFollowing = function (idOrUserName) {
            var _executeOperation = function (idOrUserName) {
                userService.getFollowing(idOrUserName,
                    $scope.options,
                    function (response) {
                        if (response.Success) {
                            $scope.following = response.ResponseData.Users;
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