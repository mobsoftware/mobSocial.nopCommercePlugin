window.mobSocial.lazy.service("mediaService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/media";
    this.get = function (id, success, error) {
        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
    };
}]);
