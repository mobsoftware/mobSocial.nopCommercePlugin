app.controller("RegistrationController",
[
    "$scope", "$sce", "RegistrationService", '$timeout', '$rootScope', 'customFieldService', 'mobSocialClientId',
    function ($scope, $sce, registrationService, $timeout, $rootScope, customFieldService, mobSocialClientId) {
        $scope.user = {};
        $scope.loadCustomFields = function() {
            customFieldService.getDisplayableFields("user",
                mobSocialClientId,
                function(response) {
                    if (response.Success) {
                        $scope.customFields = response.ResponseData.CustomFields;
                    }
                });
        }
        $scope.loadCustomFields();
        $scope.register = function() {
            //all the custom fields are passed as 'e' parameter dictionary
            $scope.user.e = {};
            $scope.user.ClientId = mobSocialClientId;
            for (var i = 0; i < $scope.customFields.length; i++) {
                var field = $scope.customFields[i];
                $scope.user.e[field.SystemName] = field.Value;
            }

            registrationService.register($scope.user,
                function(response) {
                    if (!response.Success) {
                        $scope.errorMessage = response.ErrorMessages['register'][0];
                    }
                    $scope.registrationSuccess = response.Success;
                });
        }
    }
]);