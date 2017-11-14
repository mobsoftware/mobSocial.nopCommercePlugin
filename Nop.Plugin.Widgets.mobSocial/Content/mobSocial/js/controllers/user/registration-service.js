app.service("RegistrationService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/authentication";

    this.register = function (info, success, error) {
        WebClientService.post(apiEndPoint + "/register2", info, success, error);
    }
}]);
