window.mobSocial.lazy.controller("customFieldController",
[
    "$scope", "customFieldService", "customFieldProvider", "$state", "arrayHelper", function ($scope, customFieldService, customFieldProvider, $state, arrayHelper) {

        $scope.entityData = {
            entityName: $state.params.type,
            applicationId: $state.params.id
        };

        $scope.getFieldTypeName = function (id) {
            return customFieldProvider.getFieldTypeName(id);
        }

        $scope.getCustomFields = function () {
            customFieldService.getAllFields($scope.entityData.entityName, $scope.entityData.applicationId,
                function (response) {
                    if (response.Success) {
                        $scope.customFields = response.ResponseData.CustomFields;
                    }
                },
                function () {

                });
        }

        $scope.edit = function (customField) {
            if (!customField)
                customField = {
                    IsEditable: true,
                    Required: true,
                    Visible: true,
                    ApplicationId : $state.params.id
                };

            $scope.customField = customField;
        }

        $scope.deleteField = function (customField) {
            if (!confirm("Are you sure you wish to delete this field?"))
                return;
            customFieldService.delete(customField.Id,
                function (response) {
                    if (response.Success) {
                        $scope.customFields = arrayHelper.deleteObject($scope.customFields, "Id", customField.Id);
                    }
                });
        }

        $scope.cancelEdit = function () {
            $scope.customField = null;
        }

        $scope.save = function() {
            $scope.cancelEdit();
            $scope.getCustomFields();
        }
    }
]);