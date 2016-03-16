app.service("TimelineService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {

    var apiEndPoint = globalApiEndPoint + "/timeline";

    this.PostToTimeline = function (post, success, error) {
        WebClientService.post(apiEndPoint + "/post", post, success, error);
    }

    this.GetTimelinePosts = function (timelinePostsRequest, success,error) {
        WebClientService.get(apiEndPoint + "/get", timelinePostsRequest, success, error);
    }

    this.DeletePost = function(postId, success, error) {
        WebClientService.delete(apiEndPoint + "/delete/" + postId, null, success, error);
    }
}]);