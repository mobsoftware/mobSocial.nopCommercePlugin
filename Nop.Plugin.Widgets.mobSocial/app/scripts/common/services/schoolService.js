window.mobSocial.lazy.service("schoolService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/schools";
    this.post = function (schoolEntityModel, success, error) {
        webClientService.post(apiEndPoint + "/post", schoolEntityModel, success, error);
    };

    this.delete = function (id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    };

    this.get = function (id, success, error) {
        webClientService.get(apiEndPoint + "/get/"+ id, null, success, error);
    };

}]);
