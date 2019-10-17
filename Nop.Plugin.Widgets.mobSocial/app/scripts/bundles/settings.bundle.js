webpackJsonp([9,17],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	module.exports = __webpack_require__(70);


/***/ }),

/***/ 69:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("settingService", ["globalApiEndPoint", "webClientService", "$http", function (globalApiEndPoint, webClientService, $http) {

	    var apiEndPoint = globalApiEndPoint + "/settings";
	    // get
	    this.get = function (settingType, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + settingType, null, success, error);
	    }

	    this._post = function (settingType, entityModel, success, error) {
	        webClientService.post(apiEndPoint + "/post/" + settingType, entityModel, success, error);
	    }
	    this.postGeneralSettings = function (entityModel, success, error) {
	        this._post("general", entityModel, success, error);
	    }
	    this.postMediaSettings = function (entityModel, success, error) {
	        this._post("media", entityModel, success, error);
	    }
	    this.postSecuritySettings = function (entityModel, success, error) {
	        this._post("security", entityModel, success, error);
	    }
	    this.postThirdPartySettings = function (entityModel, success, error) {
	        this._post("thirdparty", entityModel, success, error);
	    }
	    this.postUserSettings = function (entityModel, success, error) {
	        this._post("user", entityModel, success, error);
	    }
	    this.postPaymentSettings = function (entityModel, success, error) {
	        this._post("payment", entityModel, success, error);
	    }
	    this.postDateTimeSettings = function (entityModel, success, error) {
	        this._post("datetime", entityModel, success, error);
	    }
	    this.postBattleSettings = function (entityModel, success, error) {
	        this._post("battle", entityModel, success, error);
	    }
	    this.postUrlSettings = function (entityModel, success, error) {
	        this._post("url", entityModel, success, error);
	    }
	    this.delete = function (id, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
	    }
	}]);

/***/ }),

/***/ 70:
/***/ (function(module, exports) {

	window.mobSocial.lazy.controller("settingEditController",
	[
	    "$scope", "settingService", "$stateParams", "$state",
	    function ($scope, settingService, $stateParams, $state) {
	        var settingType = $stateParams.settingType;
	        var settingIndex = {
	            "general": "GeneralSettings",
	            "media": "MediaSettings",
	            "security": "SecuritySettings",
	            "user": "UserSettings",
	            "thirdparty": "ThirdPartySettings",
	            "battle": "BattleSettings",
	            "datetime": "DateTimeSettings",
	            "payment": "PaymentSettings",
	            "url": "UrlSettings"
	        };
	        if (settingIndex[settingType] == undefined) {
	            $state.go("layoutZero.404");
	            return;
	        }

	        $scope.get = function() {
	            settingService.get(settingType,
	                function(response) {
	                    if (response.Success) {
	                        $scope.setting = response.ResponseData[settingIndex[settingType]];
	                        
	                    }
	                },
	                function(response) {

	                });
	        };

	        $scope.save = function() {
	            var successHandler = function(response) {
	                if (response.Success) {
	                    
	                }
	            };
	            var errorHandler = function(response) {

	            };
	            switch(settingType) {
	                case "general":
	                    settingService.postGeneralSettings($scope.setting, successHandler, errorHandler);
	                    break;
	                case "media":
	                    settingService.postMediaSettings($scope.setting, successHandler, errorHandler);
	                    break;
	                case "thirdparty":
	                    settingService.postThirdPartySettings($scope.setting, successHandler, errorHandler);
	                    break;
	                case "security":
	                    settingService.postSecuritySettings($scope.setting, successHandler, errorHandler);
	                    break;
	                case "user":
	                    settingService.postUserSettings($scope.setting, successHandler, errorHandler);
	                    break;
	                case "datetime":
	                    settingService.postDateTimeSettings($scope.setting, successHandler, errorHandler);
	                    break;
	                case "payment":
	                    settingService.postPaymentSettings($scope.setting, successHandler, errorHandler);
	                    break;
	                case "battle":
	                    settingService.postBattleSettings($scope.setting, successHandler, errorHandler);
	                case "url":
	                    settingService.postUrlSettings($scope.setting, successHandler, errorHandler);
	                    break;
	            }
	        }

	        $scope.init = function () {
	            $scope.setting = {

	            };
	            //request data
	            $scope.get();
	        }();
	    }
	]);

/***/ })

});