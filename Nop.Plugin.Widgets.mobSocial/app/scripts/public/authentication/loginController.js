window.mobSocial.controller("loginController",[
    "$scope", "loginService", "authProvider", "$location", function ($scope, loginService, authProvider, $location) {
       
        $scope.init = function() {
            $scope.dataModel = {
                Email: "",
                Password: "",
                Persist: false,
                ReturnUrl: $location.search().ReturnUrl
            };
        }();

        $scope.login = function() {
            loginService.login($scope.dataModel,
                function(response) {
                    if (response.Success) {
                        authProvider.markLoggedIn(response.ResponseData.User); //mark as logged in
                        if (response.ResponseData && response.ResponseData.ReturnUrl)
                            window.location.href = response.ResponseData.ReturnUrl;
                        else
                            window.location.href = "/";
                    }
                },
                function(response) {

                });
        }

        $scope.logout = function() {
            loginService.logout(function (response) {
                    if (response.Success) {
                        authProvider.logout(); //logout current user
                        window.location.href = "/";
                    }
                },
                function (response) {

                });
        }
    }
]);