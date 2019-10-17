window.mobSocial.lazy.service("educationService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/educations";
    this.post = function (educationEntityModel, success, error) {
        webClientService.post(apiEndPoint + "/post", educationEntityModel, success, error);
    };

    this.put = function (educationEntityModel, success, error) {
        webClientService.put(apiEndPoint + "/put", educationEntityModel, success, error);
    };
    this.delete = function (id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    };

    this.get = function (id, success, error) {
        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
    };

    this.getUserEducations = function (userId, success, error) {
        webClientService.get(apiEndPoint + "/get", { userId: userId}, success, error);
    };

}]);
