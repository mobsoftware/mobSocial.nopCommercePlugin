webpackJsonp([12,17],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(74);
	__webpack_require__(75);
	__webpack_require__(76);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	module.exports = __webpack_require__(83);


/***/ }),

/***/ 74:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("commentService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/comments";
	    this.Post = function (commentPostModel, success, error) {
	        webClientService.post(apiEndPoint + "/post", commentPostModel, success, error);
	    };

	    this.Delete = function (id, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
	    };

	    this.Get = function (commentRequestModel, success, error) {
	        webClientService.get(apiEndPoint + "/get", commentRequestModel, success, error);
	    };

	}]);


/***/ }),

/***/ 75:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("followService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/follow";
	    this.Follow = function (type, id, success, error) {
	        webClientService.post(apiEndPoint + "/follow/" + type + "/" + id, null, success, error);
	    };

	    this.Unfollow = function (type, id, success, error) {
	        webClientService.post(apiEndPoint + "/unfollow/" + type + "/" + id, null, success, error);
	    };

	}]);


/***/ }),

/***/ 76:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("likeService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/like";
	    this.Like = function (type, id, success, error) {
	        webClientService.post(apiEndPoint + "/like/" + type + "/" + id, null, success, error);
	    };

	    this.Unlike = function (type, id, success, error) {
	        webClientService.post(apiEndPoint + "/unlike/" + type + "/" + id, null, success, error);
	    };

	}]);


/***/ }),

/***/ 77:
/***/ (function(module, exports) {

	window.mobSocial.lazy.service("friendService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/friends";
	    this.SearchPeople = function (FriendSearchModel, success, error) {

	        webClientService.get(apiEndPoint + "/searchpeople", FriendSearchModel, success, error);
	    };

	    this.AddFriend = function (FriendId, success, error) {
	        webClientService.post(apiEndPoint + "/addfriend/" + FriendId, null, success, error);
	    };


	    this.ConfirmFriend = function (FriendId, success, error) {
	        webClientService.post(apiEndPoint + "/confirmfriend/" + FriendId, null, success, error);
	    };

	    this.DeclineFriend = function (FriendId, success, error) {
	        webClientService.post(apiEndPoint + "/declinefriend/" + FriendId, null, success, error);
	    };

	    this.GetFriendRequests = function (success, error) {
	        webClientService.get(apiEndPoint + "/getfriendrequests", null, success, error);
	    };

	    this.GetCustomerFriends = function (customerFriendsRequestModel, success, error) {
	        webClientService.get(apiEndPoint + "/getcustomerfriends", customerFriendsRequestModel, success, error);
	    };

	    this.GetOnlineFriends = function (onlineFriendsRequestModel, success, error) {
	        webClientService.get(apiEndPoint + "/online/get", onlineFriendsRequestModel, success, error);
	    };
	}]);


/***/ }),

/***/ 78:
/***/ (function(module, exports) {

	window.mobSocial.lazy.directive("commentsBox", ['commentService', '$rootScope', function (commentService, $rootScope) {
	    return {
	        restrict: "E",
	        templateUrl: window.Configuration.pluginPath + "/app/pages/components/commentsBox.html",
	        replace: true,
	        scope: {
	            EntityName: "@entityname",
	            EntityId: "@entityid",
	            TotalComments: "@totalcomments"
	        },
	        link: function ($scope, elem, attr) {


	            $scope.CurrentUser = $rootScope.CurrentUser;

	            $scope.HandleMention = function (term) {
	                if (term == "")
	                    return;
	                $rootScope.mentioHelper.userMention(term,
	                       function (result) {
	                           $scope.mentionedUsers = result;
	                       });
	            }

	            $scope.TagUser = function (item) {
	                $scope.Comment.InlineTags = $scope.Comment.InlineTags || [];
	                $scope.Comment.InlineTags.push({
	                    Id: item.item.Id,
	                    Name: item.label
	                });
	                return "@" + item.label;
	            };

	            $scope.SmartAreaConfig = $rootScope.smartConfig($scope.TagUser, "post_comment").user;

	            $scope.Post = function () {

	                commentService.Post($scope.Comment, function (response) {
	                    if (response.Success) {
	                        $scope.CommentList.push(response.Comment);
	                        $scope.TotalComments++;
	                        $scope.Comment.CommentText = "";
	                        $scope.commmentsVisible = true;
	                    }
	                }, function () {
	                    alert("An error occured while performing operation");
	                });
	            }

	            $scope.Get = function () {
	                $scope.CommentRequest.Page++;
	                $scope.CommentsLoading = true;
	                commentService.Get($scope.CommentRequest,
	                    function (response) {
	                        $scope.CommentsLoading = false;
	                        if (response.Success) {
	                            if (response.Comments.length == 0) {
	                                $scope.NoMoreComments = true;
	                            }
	                            $scope.CommentList = $scope.CommentList.concat(response.Comments);
	                        }
	                    },
	                    function () {
	                        $scope.CommentsLoading = false;
	                        alert("An error occured while performing operation");
	                    });
	            }

	            $scope.Delete = function (id) {
	                if (!confirm("Are you sure you wish to delete this comment?")) {
	                    return;
	                }
	                commentService.Delete(id, function (response) {
	                    //if the operation succeeds, we'll need to remove the appropriate comment from the list
	                    if (response.Success) {
	                        for (var i = 0; i < $scope.CommentList.length; i++) {
	                            var comment = $scope.CommentList[i];
	                            if (comment.Id == id) {
	                                $scope.CommentList.splice(i, 1);
	                                $scope.TotalComments--;
	                                break;
	                            }
	                        }
	                    }
	                }, function (response) {

	                });
	            }

	            $scope.reset = function () {
	                $scope.Comment = {
	                    CommentText: "",
	                    EntityName: $scope.EntityName,
	                    EntityId: $scope.EntityId,
	                    InlineTags: []
	                };
	                $scope.commmentsVisible = false;
	                $scope.CommentRequest = {
	                    Page: 0,
	                    EntityName: $scope.EntityName,
	                    EntityId: $scope.EntityId,
	                    Count: $scope.SinglePageCommentCount
	                }
	                $scope.CommentList = [];
	                
	            };

	            $scope.toggleComments = function () {
	                if ($scope.CommentRequest.Page == 0) {
	                    $scope.Get();
	                    $scope.commmentsVisible = false;
	                }
	                $scope.commmentsVisible = !$scope.commmentsVisible;
	            }

	            $scope.$watch("EntityId",
	               function () {
	                   $scope.reset();
	               });
	        }

	    }
	}]);

/***/ }),

/***/ 79:
/***/ (function(module, exports) {

	window.mobSocial.lazy.directive("followButton", ['followService', function (followService) {
	    return{
	        restrict: "E",
	        templateUrl: window.Configuration.pluginPath + "/app/pages/components/followButton.html",
	        replace:true,
	        scope: {
	            EntityId: "@entityid",
	            EntityName: "@entityname",
	            CanFollow: "@canfollow",
	            FollowStatus: "=followstatus"
	        },
	        link: function($scope, elem, attr) {
	            $scope.Follow = function () {
	                followService.Follow($scope.EntityName, $scope.EntityId, function(response) {
	                    $scope.FollowStatus = response.NewStatus;
	                }, function() {

	                });
	            }

	            $scope.Unfollow = function () {
	                followService.Unfollow($scope.EntityName, $scope.EntityId, function (response) {
	                    $scope.FollowStatus = response.NewStatus;
	                }, function () {

	                });
	            }
	        }

	    }
	}]);

/***/ }),

/***/ 80:
/***/ (function(module, exports) {

	window.mobSocial.lazy.directive("likeButton", ['likeService', function (likeService) {
	    return{
	        restrict: "E",
	        templateUrl: window.Configuration.pluginPath + "/app/pages/components/likeButton.html",
	        replace:true,
	        scope: {
	            EntityId: "@entityid",
	            EntityName: "@entityname",
	            LikeStatus: "=likestatus",
	            TotalLikes: "@totallikes"
	        },
	        link: function($scope, elem, attr) {
	            $scope.Like = function () {
	                likeService.Like($scope.EntityName, $scope.EntityId, function (response) {
	                    if (response.Success) {
	                        $scope.LikeStatus = response.NewStatus;
	                        $scope.TotalLikes++;
	                    }
	                    
	                }, function() {

	                });
	            }

	            $scope.Unlike = function () {
	                likeService.Unlike($scope.EntityName, $scope.EntityId, function (response) {
	                    if (response.Success) {
	                        $scope.LikeStatus = response.NewStatus;
	                        $scope.TotalLikes--;
	                    }
	                }, function () {

	                });
	            }
	        }

	    }
	}]);

/***/ }),

/***/ 81:
/***/ (function(module, exports) {

	window.mobSocial.lazy.directive("friendButton", ['$http', 'friendService', '$compile', function ($http, friendService, $compile) {
	    return{
	        restrict: "E",
	        templateUrl: window.Configuration.pluginPath + "/app/pages/components/friendButton.html",
	        replace:true,
	        scope: {
	            CustomerId: "=customerid",
	            FriendStatus: "=friendstatus"
	        },
	        link: function($scope, elem, attr) {
	            $scope.UpdateFriendship = function (type) {
	               
	                if (type == "add") {
	                    friendService.AddFriend($scope.CustomerId, function (response) {
	                        if (response.Success) {
	                            $scope.FriendStatus = response.NewStatus;
	                        } 
	                    }, function () {

	                    });
	                }
	                else if (type == "confirm") {
	                    friendService.ConfirmFriend($scope.CustomerId, function (response) {
	                        if (response.Success) {
	                            $scope.FriendStatus = response.NewStatus;
	                        } 
	                    }, function () {

	                    });
	                }
	                else if (type == "decline") {
	                    friendService.DeclineFriend($scope.CustomerId, function (response) {
	                        if (response.Success) {
	                            $scope.FriendStatus = response.NewStatus;
	                        }
	                    }, function () {

	                    });
	                }
	            }
	        }

	    }
	}]);

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

	window.mobSocial.lazy.controller("followController",
	[
	    "$scope", "userService", "$rootScope", function ($scope,userService, $rootScope) {

	        $scope.options = {
	            page: 1,
	            count: 15
	        };

	        $scope.getFollowers = function (idOrUserName) {
	            var _executeOperation = function(idOrUserName) {
	                userService.getFollowers(idOrUserName,
	                    $scope.options,
	                    function(response) {
	                        if (response.Success) {
	                            $scope.followers = response.ResponseData.Users;
	                            $scope.options.page++;
	                        }
	                    },
	                    function(response) {

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

	        $scope.getFollowing = function (idOrUserName) {
	            var _executeOperation = function (idOrUserName) {
	                userService.getFollowing(idOrUserName,
	                    $scope.options,
	                    function (response) {
	                        if (response.Success) {
	                            $scope.following = response.ResponseData.Users;
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

/***/ 83:
/***/ (function(module, exports) {

	window.mobSocial.lazy.controller("friendController",
	[
	    "$scope", "userService", "$rootScope", function ($scope,userService, $rootScope) {

	        $scope.options = {
	            page: 1,
	            count: 15
	        };

	        $scope.getFriends = function (idOrUserName) {
	            var _executeOperation = function(idOrUserName) {
	                userService.getFriends(idOrUserName,
	                    $scope.options,
	                    function(response) {
	                        if (response.Success) {
	                            $scope.friends = response.ResponseData.Users;
	                            //increment page count
	                            $scope.options.page++;
	                        }
	                    },
	                    function(response) {

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

/***/ })

});