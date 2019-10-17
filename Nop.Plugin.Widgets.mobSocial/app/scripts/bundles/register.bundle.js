webpackJsonp([8,17],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	module.exports = __webpack_require__(68);


/***/ }),

/***/ 67:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("registerService", [
	    "webClientService", "$global", function(webClientService, $global) {
	        this.register = function(registerRequest, success, error) {
	            var registerUrl = $global.getApiUrl("/authentication/register");
	            webClientService.post(registerUrl, registerRequest, success, error);
	        };

	        this.activate = function(code, email, success, error) {
	            var activationUrl = $global.getApiUrl("/authentication/activate");
	            webClientService.post(activationUrl, { activationCode: code, email: email }, success, error);
	        };

	    }
	]);

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

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

/***/ })

});