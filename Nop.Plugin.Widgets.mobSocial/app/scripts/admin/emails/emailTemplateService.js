window.mobSocial.lazy.service("emailTemplateService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/emailtemplates";
    this.post = function (emailTemplate, success, error) {
        webClientService.post(apiEndPoint + "/post", emailTemplate, success, error);
    };

    this.put = function (emailTemplate, success, error) {
        webClientService.put(apiEndPoint + "/put", emailTemplate, success, error);
    };

    this.delete = function (id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    };

    this.getAll = function (emailTemplateRequest, success, error) {
        webClientService.get(apiEndPoint + "/get", emailTemplateRequest, success, error);
    };

    this.get = function (id, success, error) {
        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
    };
}]);
