window.mobSocial.lazy.directive("customFieldEditor", ['customFieldService', '$window', 'customFieldProvider', '$state', function (customFieldService, $window, customFieldProvider, $state) {
    return {
        restrict: "E",
        templateUrl: "/pages/components/customFieldEditor.html",
        replace: true,
        scope: {
            customField: "=customfield",
            entityName: "=entityname",
            oncancel: "&oncancel",
            onsave: "&onsave"
        },
        link: function ($scope, elem, attr) {
            $scope.fieldTypes = customFieldProvider.fieldTypes;
            if ($scope.customField.FieldType)
                $scope.customField.FieldType = $scope.customField.FieldType.toString();
            $scope.getFieldTypeName = function(id) {
                return customFieldProvider.getFieldTypeName(id);
            }

            $scope.save = function () {
                $scope.customField.applicationId = $state.params.id;
                customFieldService.postSingle($scope.entityName,
                    $scope.customField,
                    function(response) {
                        if (response.Success) {
                            $scope.customField = null;
                            if ($scope.onsave)
                                $scope.onsave();
                        }
                    });
            }

            $scope.cancel = function() {
                $window.location.reload();
            }
            if (!$scope.oncancel)
                $scope.oncancel = $scope.cancel;
        }

    }
}]);