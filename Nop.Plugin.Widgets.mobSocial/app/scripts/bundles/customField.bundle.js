webpackJsonp([2,17],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	module.exports = __webpack_require__(9);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

	window.mobSocial.lazy.factory('customFieldProvider', ["arrayHelper", function (arrayHelper) {
	    return {
	        fieldTypes: [
	                 {
	                     Id: 1,
	                     Text: "Text"
	                 },
	                 {
	                     Id: 2,
	                     Text: "Text Area"
	                 },
	                 {
	                     Id: 3,
	                     Text: "Wyswyg"
	                 },
	                 {
	                     Id: 4,
	                     Text: "Number"
	                 },
	                 {
	                     Id: 5,
	                     Text: "Email"
	                 },
	                 {
	                     Id: 6,
	                     Text: "Password"
	                 },
	                 {
	                     Id: 7,
	                     Text: "CheckBox"
	                 },
	                 {
	                     Id: 8,
	                     Text: "CheckBox List"
	                 },
	                 {
	                     Id: 9,
	                     Text: "DateTime"
	                 },
	                 {
	                     Id: 10,
	                     Text: "Radio Buttons"
	                 },
	                 {
	                     Id: 11,
	                     Text: "Color Selector"
	                 },
	                 {
	                     Id: 12,
	                     Text: "Captcha"
	                 },
	                 {
	                     Id: 13,
	                     Text: "Dropdown"
	                 },
	                 {
	                     Id: 14,
	                     Text: "Linked Dropdowns"
	                 },
	                 {
	                     Id: 15,
	                     Text: "Image Upload"
	                 },
	                 {
	                     Id: 16,
	                     Text: "File Upload"
	                 }
	        ],

	        getFieldTypeName: function(id) {
	            for (var i = 0; i < this.fieldTypes.length; i++) {
	                if (this.fieldTypes[i].Id == id)
	                    return this.fieldTypes[i].Text;
	            }
	            return "";
	        },
	        parseAvailableValues: function (fieldId, availableValues) {
	            fieldId = parseInt(fieldId);
	            if ([8, 10, 13, 14].indexOf(fieldId) == -1)
	                return availableValues;
	            availableValues = availableValues || "";
	            var lines = availableValues.split("\n");
	            if (fieldId != 14) {
	                //multiline separation for simple lists
	                return arrayHelper.distinct(lines);
	            } else {
	                //a multi-level dropdown
	                var levelingCharacter = "-";
	                var targetObject = this._parseChildTree(lines, levelingCharacter);
	                return targetObject;
	            }
	        },
	        _parseChildTree: function(valueLines, levelingCharacter) {
	            var parents = [];
	            var values = [];
	            var lineIndex = 0;
	            var level = 1;
	            var targetObject = {};
	            var activeParent = targetObject;
	            while (true) {
	               
	                var levelString = Array(level).join(levelingCharacter);
	                var line = valueLines[lineIndex];
	                var indexOf = line.indexOf(levelString);
	                if (indexOf == 0) {
	                    var value = line.substr(levelString.length);
	                    activeParent[value] = {};//empty child for now
	                     //matched
	                    parents.push(activeParent);
	                    values.push(value);
	                    activeParent = activeParent[value];
	                    lineIndex++;
	                    level++;
	                }
	                else if (indexOf == -1) {
	                    activeParent = parents.pop();
	                    level--;
	                    var poppedValue = values.pop();
	                    if (Object.keys(activeParent[poppedValue]).length == 0)
	                        activeParent[poppedValue] = poppedValue;
	                }


	                if (lineIndex == valueLines.length) {
	                    activeParent = parents.pop();
	                    var poppedValue = values.pop();
	                    activeParent[poppedValue] = poppedValue;
	                    break;
	                }
	            }
	            return targetObject;
	        }

	    };
	}]);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("customFieldService", ["globalApiEndPoint", "webClientService", "$http", function (globalApiEndPoint, webClientService, $http) {

	    var apiEndPoint = globalApiEndPoint + "/custom-fields";

	    this.postSingle = function (entityName, customFieldModel, success, error) {
	        webClientService.post(apiEndPoint + "/" + entityName + "/post/single", customFieldModel, success, error);
	    }

	    this.post = function (entityName, customFieldModels, success, error) {
	        webClientService.post(apiEndPoint + "/" + entityName + "/post", customFieldModels, success, error);
	    }

	    this.delete = function (id, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
	    }

	    this.getAllFields = function(entityName, applicationId, success, error) {
	        webClientService.get(apiEndPoint + "/" + entityName + "/get/all", {applicationId : applicationId}, success, error);
	    }

	    this.getDisplayableFields = function (entityName, applicationId, success, error) {
	        webClientService.get(apiEndPoint + "/" + entityName + "/get/displayable", { applicationId: applicationId }, success, error);
	    }
	}]);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

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

/***/ }),
/* 9 */
/***/ (function(module, exports) {

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

/***/ })
]);