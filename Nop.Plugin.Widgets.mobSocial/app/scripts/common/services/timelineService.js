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