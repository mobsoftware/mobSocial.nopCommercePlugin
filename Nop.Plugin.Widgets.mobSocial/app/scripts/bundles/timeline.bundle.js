webpackJsonp([14,17],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	module.exports = __webpack_require__(87);


/***/ }),

/***/ 86:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("timelineService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {

	    var apiEndPoint = globalApiEndPoint + "/timeline";

	    this.PostToTimeline = function (post, success, error) {
	        webClientService.post(apiEndPoint + "/post", post, success, error);
	    }

	    this.GetTimelinePosts = function (timelinePostsRequest, success,error) {
	        webClientService.get(apiEndPoint + "/get", timelinePostsRequest, success, error);
	    }

	    this.DeletePost = function(postId, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + postId, null, success, error);
	    }
	}]);

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

	"use strict";

	window.attachFunctionToTimelineScope = function (name, func) {
	    //to make things pluggable, we have created a function so that other plugin vendors can inject their functions to timeline without 
	    //having to modify timeline.js core file

	    var $scope = angular.element(".activity-list").scope();

	    //in this scope variable, set the function
	    $scope[name] = func;
	    return $scope;
	}

	window.mobSocial.lazy.controller("timelineController", [
	    '$scope', '$sce', 'timelineService', "$rootScope", "$stateParams", function ($scope, $sce, TimelineService, $rootScope, $stateParams) {


	        $scope.ClearPostFormExtraData = function () {
	            //clear data
	            $scope.PostData = {
	                Message: "",
	                PostTypeName: "status",
	                AdditionalAttributeValue: null,
	                InlineTags: []
	            };
	        }
	        $scope.ClearPostFormExtraData();

	        $scope.HandleMention = function(term) {
	            if (term == "")
	                return;
	            $rootScope.mentioHelper.userMention(term,
	                   function (result) {
	                       $scope.mentionedUsers = result;
	                   });
	        }

	        $scope.TagUser = function (obj) {
	            $scope.PostData.InlineTags = $scope.PostData.InlineTags || [];
	            $scope.PostData.InlineTags.push({
	                Id: obj.item.Id,
	                Name: obj.label
	            });
	            return "@" + obj.label;
	        };

	        $scope.PostToTimeline = function () {
	            if ($scope.PostData.Message == "" && $scope.PostData.AdditionalAttributeValue == "") {
	                //nothing to post, just return
	                return;
	            }
	            TimelineService.PostToTimeline($scope.PostData, function (response) {
	                $scope.TimelinePosts = $scope.TimelinePosts || [];
	                if (response.Success)
	                    $scope.TimelinePosts.unshift(response.Post); //prepend to existing list

	                $scope.ClearPostFormExtraData();

	            }, function () {
	                alert("Error occured while processing the request");
	            });
	        };

	        $scope.GetTimelinePosts = function () {
	            //next page
	            $scope.timelinePostsRequestModel.page++;

	            TimelineService.GetTimelinePosts($scope.timelinePostsRequestModel, function (response) {
	                if (response.length == 0) {
	                    $scope.NoMorePosts = true;
	                    return;
	                }
	                $scope.TimelinePosts = $scope.TimelinePosts || [];
	                //append to existing list
	                $scope.TimelinePosts = $scope.TimelinePosts.concat(response);
	            }, function () {
	                alert("An error occured while processing request");
	            });
	        }

	        $scope.DeletePost = function (postId) {
	            if (!confirm("Delete this post?")) {
	                return;
	            }
	            TimelineService.DeletePost(postId, function (response) {
	                if (response.Success) {
	                    for (var i = 0; i < $scope.TimelinePosts.length; i++) {
	                        var post = $scope.TimelinePosts[i];
	                        if (post.Id == postId) {
	                            $scope.TimelinePosts.splice(i, 1);
	                            break;
	                        }
	                    }
	                }
	            }, function (response) {
	                alert("An error occured while processing request");
	            });
	        }

	        //ctor
	        $scope.init = function () {
	            $scope.canPostToTimeline = $rootScope.CurrentUser.Id == $stateParams.idOrUserName;
	            var _init = function (userId) {
	                $scope.timelinePostsRequestModel = {
	                    page: 0,
	                    count: 15,
	                    customerId: userId
	                };
	                $scope.PostData = {
	                    Message: "",
	                    PostTypeName: "status",
	                    AdditionalAttributeValue: null
	                };

	                //the preview data for a post
	                $scope.PostPreview = {};

	                //request posts so far
	                $scope.GetTimelinePosts();

	                //functions to execute before selecting a post to render
	                //plugin vendors can write their own functions to be executed before showing the post.
	                //this will help to deserialize the additionalattributevalue to be displayed in the post display view
	                $scope.FilterFunction = [];
	            }

	            if ($stateParams.idOrUserName) {
	                _init($stateParams.idOrUserName);
	            } else {
	                $rootScope.waitFromParent($scope, "CurrentUser", { Id: 0 })
	                    .then(function (user) {
	                        _init(user.Id);
	                    });
	            }
	        
	        }();

	    }
	]);

/***/ })

});