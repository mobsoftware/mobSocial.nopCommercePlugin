window.mobSocial.lazy.service("roleService", ["globalApiEndPoint", "webClientService", "$http", function (globalApiEndPoint, webClientService, $http) {

    var apiEndPoint = globalApiEndPoint + "/roles";
    // get
    this.get = function (success, error) {
        webClientService.get(apiEndPoint + "/get", null, success, error);
    }

    this.getById = function (id, success, error) {
        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
    }

    this.post = function(roleEntityModel, success, error) {
        webClientService.post(apiEndPoint + "/post", roleEntityModel, success, error);
    }

}]);