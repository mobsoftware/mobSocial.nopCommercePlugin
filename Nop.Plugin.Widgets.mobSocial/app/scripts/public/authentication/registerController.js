window.mobSocial.lazy.controller("registerController",[
    "$scope", "registerService", "$stateParams", function ($scope, registerService, $stateParams) {

        $scope.register = function() {
            registerService.register($scope.dataModel,
                function(response) {
                    if (response.Success) {
                        $scope.registered = true;
                    }
                },
                function(response) {

                });
        };

        $scope.activate = function() {
            $scope.dataModel = $scope.dataModel || {};
            registerService.activate($stateParams.code,
                $scope.dataModel.email,
                function(response) {
                    if (response.Success) {
                        $scope.activated = true;
                    }
                },
                function(response) {

                });
        };

        if ($stateParams.code) {
            $scope.activate();
        }

        $scope.init = function() {
            $scope.dataModel = {
                email: "",
                password: "",
                confirmPassword: "",
                firstName: "",
                lastName: "",
                agreement: false
            };
        }();
    }
]);