app.service("conversationService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/conversation";
    this.postToUser = function (userId, replyText, success, error) {
        webClientService.post(apiEndPoint + "/post/" + userId, { replyText: replyText }, success, error);
    };

    this.get = function (userId, page, success, error) {
        webClientService.get(apiEndPoint + "/get", {userId: userId, page: page}, success, error);
    };

    this.getAll = function(success, error) {
        webClientService.get(apiEndPoint + "/get/all", null, success, error);
    }
}]);
