"use strict";

app.service("CustomerLikeService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/social";
    this.Like = function (type, id, success, error) {
        WebClientService.post(apiEndPoint + "/like/" + type + "/" + id, null, success, error);
    };

    this.Unlike = function (type, id, success, error) {
        WebClientService.post(apiEndPoint + "/unlike/" + type + "/" + id, null, success, error);
    };

}]);
