window.mobSocial.lazy.directive("customField", ['customFieldService', '$window', 'customFieldProvider', "$timeout", "$compile", function (customFieldService, $window, customFieldProvider, $timeout, $compile) {
    return {
        restrict: "E",
        templateUrl: window.Configuration.pluginPath +  + "/app/pages/components/customField.html",
        replace: true,
        scope: {
            customField: "=customfield"
        },
        link: function ($scope, elem, attr) {
            $scope.fieldUId = Date.now();
            $scope.selectedValues = [];
            if ($scope.customField.Value)
                $scope.selectedValues = $scope.customField.Value.split("|");

            $scope.generateField = function() {
                $timeout(function() {
                    $scope.availableValues = customFieldProvider
                        .parseAvailableValues($scope.customField.FieldType, $scope.customField.AvailableValues);
                    if ($scope.customField.FieldType == "14") {
                        jQuery("#nestedDropdown_" + $scope.fieldUId)
                            .html($scope.makeDropdown($scope.availableValues));
                    };

                });
            }

            $scope.$watch("customField.AvailableValues",
               function () {
                   $timeout(function () {
                       $scope.generateField();
                   },
                       0);

               });

            $scope.makeDropdown = function (availableValues) {
                var container = jQuery("<div class='form-group row'></div>");
                var select = jQuery("<select class='form-control'></select>");
                var keys = Object.keys(availableValues);
                select.append("<option value='0'>Select</option>");
                keys.forEach(function (key) {
                    select.append("<option value='" + key + "'>" + key + "</option>");
                });
                select.change(function () {
                    var selectedValue = jQuery(this).val();
                    container.nextAll("div").remove();
                    if (typeof availableValues[selectedValue] == "object") {
                        container.after($scope.makeDropdown(availableValues[selectedValue]));
                    } else {
                        $scope.customField.Value = selectedValue;
                    }
                });
                container.append(select);
                return container;
            }

            $scope.handleCheckboxListChange = function(value) {
                $scope.selectedValues.push(value);
            }

            $scope.$watch("selectedValues",
                function () {
                    if ($scope.selectedValues) {
                        //distinct values
                        $scope.selectedValues.filter(function (value, index) { return $scope.selectedValues.indexOf(value) == index });
                        $scope.customField.Value = $scope.selectedValues.join("|");
                    }
                }, true);
        }

    }
}]);