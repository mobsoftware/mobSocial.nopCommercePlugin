window.mobSocial.lazy.service("followService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/follow";
    this.Follow = function (type, id, success, error) {
        webClientService.post(apiEndPoint + "/follow/" + type + "/" + id, null, success, error);
    };

    this.Unfollow = function (type, id, success, error) {
        webClientService.post(apiEndPoint + "/unfollow/" + type + "/" + id, null, success, error);
    };

}]);
