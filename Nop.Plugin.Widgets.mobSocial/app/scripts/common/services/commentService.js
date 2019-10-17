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
