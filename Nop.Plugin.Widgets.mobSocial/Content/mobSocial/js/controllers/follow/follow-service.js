"use strict";

app.service("FollowService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/customerfollow";
    this.Follow = function (type, id, success, error) {
        WebClientService.post(apiEndPoint + "/follow/" + type + "/" + id, null, success, error);
    };

    this.Unfollow = function (type, id, success, error) {
        WebClientService.post(apiEndPoint + "/unfollow/" + type + "/" + id, null, success, error);
    };

}]);
