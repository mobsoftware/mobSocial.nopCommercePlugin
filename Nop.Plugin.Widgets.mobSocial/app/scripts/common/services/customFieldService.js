window.mobSocial.lazy.service("customFieldService", ["globalApiEndPoint", "webClientService", "$http", function (globalApiEndPoint, webClientService, $http) {

    var apiEndPoint = globalApiEndPoint + "/custom-fields";

    this.postSingle = function (entityName, customFieldModel, success, error) {
        webClientService.post(apiEndPoint + "/" + entityName + "/post/single", customFieldModel, success, error);
    }

    this.post = function (entityName, customFieldModels, success, error) {
        webClientService.post(apiEndPoint + "/" + entityName + "/post", customFieldModels, success, error);
    }

    this.delete = function (id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    }

    this.getAllFields = function(entityName, applicationId, success, error) {
        webClientService.get(apiEndPoint + "/" + entityName + "/get/all", {applicationId : applicationId}, success, error);
    }

    this.getDisplayableFields = function (entityName, applicationId, success, error) {
        webClientService.get(apiEndPoint + "/" + entityName + "/get/displayable", { applicationId: applicationId }, success, error);
    }
}]);