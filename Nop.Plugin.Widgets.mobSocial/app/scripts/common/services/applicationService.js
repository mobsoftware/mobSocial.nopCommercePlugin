window.mobSocial.lazy.service("applicationService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/applications";
    // get
    this.get = function (success, error) {
        webClientService.get(apiEndPoint + "/get/all", null, success, error);
    }

    this.getById = function (id, success, error) {
        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
    }

    this.post = function (applicationPostModel, success, error) {
        webClientService.post(apiEndPoint + "/post", applicationPostModel, success, error);
    }

    this.delete = function (id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    }

    this.regenerateSecret = function (id, success, error) {
        webClientService.put(apiEndPoint + "/put/secret/" + id, null, success, error);
    }

    this.getLogins = function(success, error) {
        webClientService.get(apiEndPoint + "/get/logins", null, success, error);
    }

    this.removeLogin = function(id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/login/" + id, null, success, error);
    }
}]);
