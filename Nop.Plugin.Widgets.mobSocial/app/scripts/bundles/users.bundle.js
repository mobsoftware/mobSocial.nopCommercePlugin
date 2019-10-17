webpackJsonp([15,17],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(91);
	module.exports = __webpack_require__(92);


/***/ }),

/***/ 88:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("userService", ["globalApiEndPoint", "webClientService", "entityPropertyService", function (globalApiEndPoint, webClientService, entityPropertyService) {

	    var apiEndPoint = globalApiEndPoint + "/users";
	    // get
	    this.get = function (userGetModel, success, error) {
	        webClientService.get(apiEndPoint + "/get", userGetModel, success, error);
	    }

	    this.getById = function (id, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
	    }

	    this.getBasicInfoById = function (idOrUserName, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/basic", null, success, error);
	    }

	    this.getFriends = function(idOrUserName, options, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/friends", options, success, error);
	    }
	    this.getFollowers = function (idOrUserName, options, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/followers", options, success, error);
	    }
	    this.getFollowing = function (idOrUserName, options, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/following", options, success, error);
	    }
	    this.getPictures = function (idOrUserName, options, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/media/image", options, success, error);
	    }
	    this.getVideos = function (idOrUserName, options, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/media/video", options, success, error);
	    }
	    this.post = function(userEntityModel, success, error) {
	        webClientService.post(apiEndPoint + "/post", userEntityModel, success, error);
	    }

	    this.put = function (userEntityModel, success, error) {
	        webClientService.put(apiEndPoint + "/put", userEntityModel, success, error);
	    }

	    this.changePassword = function (passwordModel, success, error) {
	        webClientService.put(apiEndPoint + "/put/change-password", passwordModel, success, error);
	    }

	    this.delete = function (id, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
	    }

	    this.setPictureAs = function (uploadType, pictureId, userId, success, error) {
	        entityPropertyService.post({
	            propertyName: uploadType,
	            value: pictureId,
	            entityId: userId,
	            entityName: "user"
	        },
	            success,
	            error);
	    }

	}]);

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("roleService", ["globalApiEndPoint", "webClientService", "$http", function (globalApiEndPoint, webClientService, $http) {

	    var apiEndPoint = globalApiEndPoint + "/roles";
	    // get
	    this.get = function (success, error) {
	        webClientService.get(apiEndPoint + "/get", null, success, error);
	    }

	    this.getById = function (id, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
	    }

	    this.post = function(roleEntityModel, success, error) {
	        webClientService.post(apiEndPoint + "/post", roleEntityModel, success, error);
	    }

	}]);

/***/ }),

/***/ 90:
/***/ (function(module, exports) {

	window.mobSocial.lazy.controller("userController", [
	    "$scope", "userService", function ($scope, userService) {

	        $scope.get = function () {
	            userService.get($scope.requestModel,
	                function (response) {
	                    if (response.Success) {
	                        $scope.users = response.ResponseData.Users;
	                    }
	                },
	                function (response) {

	                });
	        }

	        $scope.init = function () {
	            $scope.requestModel = {
	                SearchText: "",
	                Page: 1,
	                Count: 15
	            };
	            //request data
	            $scope.get();
	        }();
	    }
	]);

/***/ }),

/***/ 91:
/***/ (function(module, exports) {

	window.mobSocial.lazy.controller("userEditController", [
	   "$scope", "userService", "$stateParams", "$state", "authProvider", "$rootScope", "roleService", function ($scope, userService, $stateParams, $state, authProvider, $rootScope, roleService) {

	       roleService.get(function (response) {
	            if (response.Success) {
	                var roles = response.ResponseData.Roles;
	                $scope.AvailableRoles = roles;
	            }
	            

	        });

	       $scope.get = function () {
	           var userId = $stateParams.id || $rootScope.CurrentUser.Id;
	           if (!userId || userId == 0) {
	               console.log($scope.$parent);
	               $rootScope.waitFromParent($scope,
	                   "CurrentUser",
	                   function(user) {
	                       $scope.user = user;
	                       alert("and so set");
	                   });
	               return;
	           }
	           userService.getById(userId,
	               function (response) {
	                   if (response.Success) {
	                       $scope.user = response.ResponseData.User;
	                   }
	               },
	               function (response) {

	               });
	       }

	       $scope.saveFull = function () {
	           userService.post($scope.user,
	               function (response) {
	                   if (response.Success) {
	                       $scope.user = response.ResponseData.User;
	                       if ($scope.user.Id == $rootScope.CurrentUser.Id) {
	                           authProvider.markLoggedIn($scope.user);
	                       }
	                   }
	               },
	               function (response) {

	               });
	       }

	       $scope.save = function () {
	           userService.put($scope.user,
	               function (response) {
	                   if (response.Success) {
	                       $scope.user = response.ResponseData.User;
	                       if ($scope.user.Id == $rootScope.CurrentUser.Id) {
	                           authProvider.markLoggedIn($scope.user);
	                       }
	                   }
	               },
	               function (response) {

	               });
	       }

	       $scope.changePassword = function () {
	           
	           if ($scope.user.Password != $scope.user.ConfirmPassword) {
	               alert("The passwords do not match");
	               return;
	           }
	           userService.changePassword({
	                   password: $scope.user.Password,
	                   confirmPassword: $scope.user.ConfirmPassword
	               },
	               function(response) {

	               },
	               function(resonse) {

	               });
	       }

	       $scope.delete = function () {
	           mobConfirm("Are you sure you wish to delete this user?",
	               function (result) {
	                   if (!result)
	                       return;
	                   userService.delete($scope.user.Id,
	                       function (response) {
	                           if (response.Success) {
	                               $state.go("layoutAdministration.users.list");
	                           }
	                       },
	                       function (response) {

	                       });
	               });
	       }

	       $scope.uploadProfilePictureSuccess = function (fileItem, data, status, headers) {
	           if (data.Success && data.ResponseData.Images.length > 0) {
	               $scope.user.ProfileImageId = data.ResponseData.Images[0].ImageId;
	               $scope.user.ProfileImageUrl = data.ResponseData.Images[0].ThumbnailUrl;
	           }
	       };

	       $scope.init = function () {
	           $scope.user = {

	           };
	           //request data
	           $scope.get();
	       };
	       $scope.init();
	   }
	]);

/***/ }),

/***/ 92:
/***/ (function(module, exports) {

	window.mobSocial.lazy.controller("userProfileController", [
	    "$scope", "$rootScope", "userService", "$stateParams", "$state", function ($scope, $rootScope, userService, $stateParams, $state) {
	        $scope.$state = $state;

	       
	        $scope.getBasicInfoByIdOrUserName = function (idOrUserName) {
	            userService.getBasicInfoById(idOrUserName,
	                function (response) {
	                    if (response.Success) {
	                        $scope.user = response.ResponseData.User;
	                    }
	                },
	                function (response) {

	                });
	        }

	        $scope.uploadCoverSuccess = function (fileItem, data, status, headers) {

	            if (data.Success && data.ResponseData.Images.length > 0) {
	                $scope.user.TemporaryCoverImageUrl = data.ResponseData.Images[0].ImageUrl;
	                $scope.user.TemporaryCoverId = data.ResponseData.Images[0].ImageId;
	                $scope.user.TemporaryCover = true;
	            }
	        };

	        $scope.uploadProfileImageSuccess = function (fileItem, data, status, headers) {

	            if (data.Success && data.ResponseData.Images.length > 0) {
	                $scope.user.TemporaryProfileImageUrl = data.ResponseData.Images[0].ImageUrl;
	                $scope.user.TemporaryProfileImageId = data.ResponseData.Images[0].ImageId;
	                $scope.user.TemporaryProfileImage = true;
	            }
	        };

	        $scope.setPictureAs = function (uploadType, pictureId, setOrReset) {
	            if (setOrReset) {
	                userService.setPictureAs(uploadType, pictureId, $scope.user.Id, function (data) {
	                    if (data.Success) {
	                        if (uploadType == "DefaultCoverId") {
	                            $scope.user.CoverImageUrl = $scope.user.TemporaryCoverImageUrl;
	                            $scope.user.TemporaryCoverId = 0;
	                            $scope.user.TemporaryCover = false;
	                            $scope.user.TemporaryCoverImageUrl = false;
	                        } else {
	                            $scope.user.ProfileImageUrl = $scope.user.TemporaryProfileImageUrl;
	                            $scope.user.TemporaryProfileImageId = 0;
	                            $scope.user.TemporaryProfileImage = false;
	                            $scope.user.TemporaryProfileImageUrl = false;
	                        }


	                    }
	                }, function (data) {

	                });
	            } else {
	                if (uploadType == "cover") {
	                    $scope.user.TemporaryCoverId = 0;
	                    $scope.user.TemporaryCover = false;
	                    $scope.user.TemporaryCoverImageUrl = false;
	                } else {
	                    $scope.user.TemporaryProfileImageId = 0;
	                    $scope.user.TemporaryProfileImage = false;
	                    $scope.user.TemporaryProfileImageUrl = false;
	                }

	            }
	        }
	       
	        $scope.init = function (id) {
	            $scope.tempUser = {
	                id: parseInt($stateParams.idOrUserName) || 0,
	                userName: $stateParams.idOrUserName
	            };

	            id = id || $scope.tempUser.id || $scope.tempUser.userName || $rootScope.CurrentUser.Id;
	            //request data
	            $scope.getBasicInfoByIdOrUserName(id);
	        };
	    }
	]);

/***/ })

});