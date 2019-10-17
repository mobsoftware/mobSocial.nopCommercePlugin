window.mobSocial.lazy.service("emailAccountService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/emailaccounts";
    this.post = function (emailAccount, success, error) {
        webClientService.post(apiEndPoint + "/post", emailAccount, success, error);
    };

    this.put = function (emailAccount, success, error) {
        webClientService.put(apiEndPoint + "/put", emailAccount, success, error);
    };

    this.delete = function (id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    };

    this.getAll = function (emailAccountRequest, success, error) {
        webClientService.get(apiEndPoint + "/get", emailAccountRequest, success, error);
    };

    this.get = function (id, success, error) {
        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
    };

    this.postTestEmail = function (emailAccount, success, error) {
        webClientService.post(apiEndPoint + "/test-email/post", emailAccount, success, error);
    };

}]);
