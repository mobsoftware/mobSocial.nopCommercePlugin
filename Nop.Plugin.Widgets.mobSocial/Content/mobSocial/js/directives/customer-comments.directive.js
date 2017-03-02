app.directive("commentsBox", ['CustomerCommentsService', function (CustomerCommentsService) {
    return{
        restrict: "E",
        templateUrl: "/CustomerComments",
        replace:true,
        scope: {
            EntityName: "@entityname",
            EntityId: "@entityid",
            TotalComments: "@totalcomments"
        },
        link: function ($scope, elem, attr) {
            $scope.Comment = {
                CommentText: "",
                EntityName: $scope.EntityName,
                EntityId: $scope.EntityId
            };
            $scope.CommentRequest = {
                Page: 0,
                EntityName: $scope.EntityName,
                EntityId: $scope.EntityId,
                Count : $scope.SinglePageCommentCount
            }
            $scope.CommentList = [];
            $scope.Post = function () {
                $scope.Comment.EntityId = $scope.EntityId;//required if the entity is delay loaded
                CustomerCommentsService.Post($scope.Comment, function (response) {
                    if (response.Success) {
                        $scope.CommentList.push(response.Comment);
                        $scope.TotalComments++;
                        $scope.Comment.CommentText = "";
                    }
                }, function() {
                    alert("An error occured while performing operation");
                });
            }

            $scope.Get = function () {
                $scope.CommentRequest.Page++;
                $scope.CommentsLoading = true;
                $scope.CommentRequest.EntityId = $scope.EntityId;
                CustomerCommentsService.Get($scope.CommentRequest, function (response) {
                    $scope.CommentsLoading = false;
                    if (response.Success) {
                        if (response.Comments.length == 0) {
                            $scope.NoMoreComments = true;
                        }
                        $scope.CommentList = $scope.CommentList.concat(response.Comments);
                    }
                }, function () {
                    $scope.CommentsLoading = false;
                    alert("An error occured while performing operation");
                });
            }

            $scope.Delete = function (id) {
                if (!confirm("Are you sure you wish to delete this comment?")) {
                    return;
                }
                CustomerCommentsService.Delete(id, function(response) {
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
                }, function(response) {

                });
            }

          
        }

    }
}]);