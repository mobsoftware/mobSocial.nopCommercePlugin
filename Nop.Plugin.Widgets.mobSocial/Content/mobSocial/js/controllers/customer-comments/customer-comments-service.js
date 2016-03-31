"use strict";

app.service("CustomerCommentsService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/comments";
    this.Post = function (commentPostModel, success, error) {
        WebClientService.post(apiEndPoint + "/post", commentPostModel, success, error);
    };

    this.Delete = function (id, success, error) {
        WebClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    };

    this.Get = function (commentRequestModel, success, error) {
        WebClientService.get(apiEndPoint + "/get", commentRequestModel, success, error);
    };

}]);
