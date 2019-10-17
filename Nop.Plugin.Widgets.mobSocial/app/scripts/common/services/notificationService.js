window.mobSocial.service("notificationService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/notifications";

    this.put = function (ids, success, error) {
        webClientService.put(apiEndPoint + "/put", { notificationIds: ids}, success, error);
    };
    this.delete = function (id, success, error) {
        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
    };
}]);
