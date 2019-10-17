webpackJsonp([0,17],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("applicationService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/applications";
	    // get
	    this.get = function (success, error) {
	        webClientService.get(apiEndPoint + "/get/all", null, success, error);
	    }

	    this.getById = function (id, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
	    }

	    this.post = function (applicationPostModel, success, error) {
	        webClientService.post(apiEndPoint + "/post", applicationPostModel, success, error);
	    }

	    this.delete = function (id, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
	    }

	    this.regenerateSecret = function (id, success, error) {
	        webClientService.put(apiEndPoint + "/put/secret/" + id, null, success, error);
	    }

	    this.getLogins = function(success, error) {
	        webClientService.get(apiEndPoint + "/get/logins", null, success, error);
	    }

	    this.removeLogin = function(id, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/login/" + id, null, success, error);
	    }
	}]);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	window.mobSocial.lazy.controller("applicationController",
	    [
	        "$scope", "applicationService", '$state', function ($scope, applicationService, $state) {
	            $scope.availableApplicationTypes = [
	                {
	                    Id: "1",
	                    Text : "Native/Web"
	                },
	                {
	                    Id: "2",
	                    Text: "Javascript"
	                }
	            ];

	            $scope.getApplications = function() {
	                applicationService.get(function(res) {
	                    if (res.Success) {
	                        $scope.applications = res.ResponseData.Applications;
	                    }
	                });
	            }

	            $scope.getApplication = function () {
	                $scope.application = { Id : 0};
	                var id = $state.params.id;
	                if (!id || id == 0) {
	                    return;
	                }
	                applicationService.getById(id,
	                    function(res) {
	                        if (res.Success) {
	                            $scope.application = res.ResponseData.Application;
	                        }
	                    });
	            }

	            $scope.save = function() {
	                if ($scope.application == null)
	                    return;

	                applicationService.post($scope.application,
	                    function(res) {
	                        if (res.Success) {
	                            $scope.application = res.ResponseData.Application;
	                        }
	                    });
	            }

	            $scope.regenerateSecret = function() {
	                if ($scope.application == null || $scope.application.Id == 0)
	                    return;
	                applicationService.regenerateSecret($scope.application.Id,
	                    function (res) {
	                        if (res.Success) {
	                            $scope.application = res.ResponseData.Application;
	                        }
	                    });
	            }

	            $scope.delete = function () {
	                if ($scope.application == null)
	                    return;
	                if (!confirm("Are you sure you wish to delete this application?"))
	                    return;
	                applicationService.delete($scope.application.Id,
	                    function (res) {
	                        if (res.Success) {
	                            $state.go("layoutApplication.twoColumns.listApplications");
	                        }
	                    });
	            }

	            $scope.getLogins = function() {
	                applicationService.getLogins(function(res) {
	                    if (res.Success) {
	                        $scope.logins = res.ResponseData.Logins;
	                    }
	                });
	            }

	            $scope.removeLogin = function (id) {
	                if (!confirm("Are you sure you wish to revoke access for this application?"))
	                    return;
	                applicationService.removeLogin(id, function (res) {
	                    if (res.Success) {
	                        for (var i = 0; i < $scope.logins.length; i++) {
	                            if ($scope.logins[i].Id == id) {
	                                $scope.logins.splice(i, 1);
	                                break;
	                            }
	                        }
	                    }
	                });
	            }
	        }     
	    ]);

/***/ })
]);