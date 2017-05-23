app.service("entityPropertyService", ["globalApiEndPoint", "WebClientService", "$http", function (globalApiEndPoint, webClientService, $http) {

    var apiEndPoint = globalApiEndPoint + "/entityproperty";
   
    this.post = function (entityPropertyModel, success, error) {
        webClientService.post(apiEndPoint + "/post", entityPropertyModel, success, error);
    }
}]);