webpackJsonp([7,17],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	module.exports = __webpack_require__(66);


/***/ }),

/***/ 63:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("mediaService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/media";
	    this.get = function (id, success, error) {
	        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
	    };
	}]);


/***/ }),

/***/ 64:
/***/ (function(module, exports) {

	window.mobSocial.lazy.controller("mediaController",
	[
	    "$scope", "userService", "$rootScope", function ($scope, userService, $rootScope) {

	        $scope.options = {
	            page: 1,
	            count: 15
	        };

	        $scope.getMedia = function (idOrUserName, type) {
	            var _executeOperation = function (idOrUserName) {
	                var methodName = type == "videos" ? "getVideos" : "getPictures";
	                userService[methodName](idOrUserName,
	                    $scope.options,
	                    function (response) {
	                        $scope.mediaItems = $scope.mediaItems || [];
	                        if (response.Success) {
	                            $scope.mediaItems = $scope.mediaItems.concat(response.ResponseData.Media);
	                            //increment page count
	                            $scope.options.page++;
	                        }
	                    },
	                    function (response) {

	                    });
	            };
	            if (idOrUserName)
	                _executeOperation(idOrUserName);
	            else {
	                $rootScope.waitFromParent($scope, "user", null)
	                    .then(function (user) {
	                        if (user)
	                            _executeOperation(user.Id);
	                    });
	            }

	        }
	    }
	]);

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

	window.mobSocial.lazy.directive("mediaButton", [function () {
	    return {
	        restrict: "A",
	        scope: {
	            "target": "@target",
	            "media": "=media"
	        },
	        link: function (scope, elem, attr) {
	            elem.bind("click", function () {
	                var modalScope = angular.element(scope.target).scope();
	                if (!scope.media.FullyLoaded) {
	                    modalScope.reloadMedia(scope.media.Id);
	                } 
	                jQuery(scope.target).modal();
	            });
	        }
	    }
	}]);

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

	window.mobSocial.lazy.directive("mediaModal", ["mediaService", "$rootScope", "$timeout" , function (mediaService, $rootScope, $timeout) {
	    return {
	        restrict: "E",
	        templateUrl: window.Configuration.pluginPath +  "/app/pages/components/mediaModal.html",
	        replace: true,
	        scope: false,
	        link: function(scope, elem, attr) {
	            scope.prevMedia = function() {
	                scope.reloadMedia(scope.media.PreviousMediaId);
	            }

	            scope.nextMedia = function() {
	                scope.reloadMedia(scope.media.NextMediaId);
	            }

	            scope.reloadMedia = function(id) {
	                mediaService.get(id,
	                       function (response) {
	                           if (response.Success) {
	                               $timeout(function() {
	                                   scope.media = response.ResponseData.Media;
	                                   if(scope.media.MediaType == 1 && scope.$API)//video
	                                       $rootScope.updatedVideoSource(scope.$API, scope.media.Url, scope.media.MimeType);
	                                   },
	                                   0);

	                           }
	                           
	                       },
	                       function (response) {

	                       });
	            }

	            scope.videoPlayerReady = function ($API) {
	                scope.$API = $API;
	                $rootScope.updatedVideoSource(scope.$API, scope.media.Url, scope.media.MimeType);
	            }

	        }
	    }
	}]);

/***/ })

});