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
    '$scope', '$sce', 'TimelineService', function ($scope, $sce, TimelineService) {

        //ctor
        $scope.init = function(timelinePostsRequestModel) {
            $scope.TimelinePostsRequestModel = timelinePostsRequestModel;
            $scope.PostData = {
                Message: "",
                PostTypeName: "status",
                AdditionalAttributeValue: ""

            };
            $scope.TimelinePostsRequestModel.Page = 0; //so that first page is loaded on startup

            //the posts being shown
            $scope.TimelinePosts = [];

            //the preview data for a post
            $scope.PostPreview = {};

            //request posts so far
            $scope.GetTimelinePosts();
        };

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
                    AdditionalAttributeValue: ""

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

            });
        }
        
    }
]);