app.service("mediaService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/media";
    this.get = function (id, success, error) {
        WebClientService.get(apiEndPoint + "/get/" + id, null, success, error);
    };
}]);
