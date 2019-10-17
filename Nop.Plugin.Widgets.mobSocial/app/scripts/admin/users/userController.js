window.mobSocial.lazy.controller("userController", [
    "$scope", "userService", function ($scope, userService) {

        $scope.get = function () {
            userService.get($scope.requestModel,
                function (response) {
                    if (response.Success) {
                        $scope.users = response.ResponseData.Users;
                    }
                },
                function (response) {

                });
        }

        $scope.init = function () {
            $scope.requestModel = {
                SearchText: "",
                Page: 1,
                Count: 15
            };
            //request data
            $scope.get();
        }();
    }
]);