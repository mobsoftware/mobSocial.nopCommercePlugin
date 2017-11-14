app.service("customFieldService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, webClientService) {

    var apiEndPoint = globalApiEndPoint + "/custom-fields";
   
    this.getDisplayableFields = function (entityName, applicationId, success, error) {
        webClientService.get(apiEndPoint + "/" + entityName + "/get/displayable", { applicationId: applicationId }, success, error);
    }
}]);