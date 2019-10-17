window.mobSocial.lazy.controller("installController",
[
    "$scope", "installService", "$state", function ($scope, installService, $state) {
        var wizardOrder = ['welcome', 'license', 'configuration', 'information', 'review-configuration', 'finish'];
        $scope.activeStep = wizardOrder[0];
        $scope.stepIndex = 0;
        $scope.installRequest = {
            isConnectionString: false
        };
        $scope.stepUp = function () {
            $scope.stepIndex++;
            $scope.activeStep = wizardOrder[$scope.stepIndex];
        }
        $scope.stepDown = function () {
            $scope.stepIndex--;
            $scope.activeStep = wizardOrder[$scope.stepIndex];
        }
        $scope.validDatabaseConfiguration = false;
        $scope.testConnectionDone = false;
        $scope.testConnection = function (proceedToNextStep) {
            if ($scope.validDatabaseConfiguration) {
                if (proceedToNextStep) {
                    $scope.stepUp();
                }
                return;
            }
            installService.testConnection($scope.installRequest,
                function (response) {
                    $scope.testConnectionDone = true;
                    if (response.Success) {
                        $scope.validDatabaseConfiguration = true;
                        if (proceedToNextStep) {
                            $scope.stepUp();
                        }
                    }
                });
        }

        $scope.install = function () {
            //do we need a confirm password for installation?
            $scope.installRequest.ConfirmPassword = $scope.installRequest.Password;
            installService.install($scope.installRequest,
                function (response) {
                    if (response.Success) {
                        $scope.stepUp();
                    } else {
                        if (response.Message)
                            alert(response.Message);
                        else
                            alert("An error occured while performing the installation");
                    }
                });
        }

        
        $scope.$watch("installRequest",
            function(newValue, oldValue) {
                //so something has changed, it's necessary to revalidate
                $scope.validDatabaseConfiguration = false;
                $scope.testConnectionDone = false;
            });
    }
]);