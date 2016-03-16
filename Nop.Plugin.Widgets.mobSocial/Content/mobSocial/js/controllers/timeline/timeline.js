"use strict";

var attachFunctionToTimelineScope = function(name, func) {
    //to make things pluggable, we have created a function so that other plugin vendors can inject their functions to timeline without 
    //having to modify timeline.js core file

    //get the element scope, the id of timeline controller is mobSocialTimeline
    var $scope = angular.element(document.getElementById("mobSocialTimeline")).scope();

    //in this scope variable, set the function
    $scope[name] = func;
    return $scope;
}

appRequires(["ngSanitize",
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster",
			"com.2fdevs.videogular.plugins.imaads", 'timer']);

app.controller("TimelineController", [
    '$scope', '$sce', 'TimelineService', 'WebClientService', function ($scope, $sce, TimelineService, WebClientService) {

        //ctor
        $scope.init = function(timelinePostsRequestModel) {
            $scope.TimelinePostsRequestModel = timelinePostsRequestModel;
            $scope.PostData = {
                Message: "",
                PostTypeName: "status",
                AdditionalAttributeValue: null

            };
            $scope.TimelinePostsRequestModel.Page = 0; //so that first page is loaded on startup

            //the posts being shown
            $scope.TimelinePosts = [];

            //the preview data for a post
            $scope.PostPreview = {};

            //request posts so far
            $scope.GetTimelinePosts();

            //functions to execute before selecting a post to render
            //plugin vendors can write their own functions to be executed before showing the post.
            //this will help to deserialize the additionalattributevalue to be displayed in the post display view
            $scope.FilterFunction = [];
        };
        $scope.ClearPostFormExtraData = function () {
            $scope.PostData.AdditionalAttributeValue = null;
            $scope.PostData.PostTypeName = "status";
        }

        $scope.PostToTimeline = function () {
            if ($scope.PostData.Message == "" && $scope.PostData.AdditionalAttributeValue == "") {
                //nothing to post, just return
                return;
            }
            TimelineService.PostToTimeline($scope.PostData, function (response) {
                if (response.Success)
                    $scope.TimelinePosts.unshift(response.Post); //prepend to existing list
                //clear data
                $scope.PostData = {
                    Message: "",
                    PostTypeName: "status",
                    AdditionalAttributeValue: null

                };
            }, function() {
                alert("Error occured while processing the request");
            });
        };

        $scope.GetTimelinePosts = function() {
            //next page
            $scope.TimelinePostsRequestModel.Page++;
            
            TimelineService.GetTimelinePosts($scope.TimelinePostsRequestModel, function(response) {
                //prepend posts last to first
                for (var i = response.length - 1; i > -1; i--) {
                    $scope.TimelinePosts.unshift(response[i]);
                }
            }, function() {
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
            }, function(response) {
                alert("An error occured while processing request");
            });
        }
      
        
    }
]);