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