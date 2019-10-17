window.mobSocial.lazy.controller("friendController",
[
    "$scope", "userService", "$rootScope", function ($scope,userService, $rootScope) {

        $scope.options = {
            page: 1,
            count: 15
        };

        $scope.getFriends = function (idOrUserName) {
            var _executeOperation = function(idOrUserName) {
                userService.getFriends(idOrUserName,
                    $scope.options,
                    function(response) {
                        if (response.Success) {
                            $scope.friends = response.ResponseData.Users;
                            //increment page count
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
    }
]);