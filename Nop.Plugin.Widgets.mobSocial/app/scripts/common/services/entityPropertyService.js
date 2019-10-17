window.mobSocial.service("entityPropertyService", ["globalApiEndPoint", "webClientService", "$http", function (globalApiEndPoint, webClientService, $http) {

    var apiEndPoint = globalApiEndPoint + "/entityproperties";
   
    this.post = function (entityPropertyModel, success, error) {
        webClientService.post(apiEndPoint + "/post", entityPropertyModel, success, error);
    }

    

}]);