"use strict";

app.service("CustomerProfileService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, webClientService) {
    var apiEndPoint = globalApiEndPoint + "/users";
    this.getById = function (id, success, error) {
        webClientService.get(apiEndPoint + "/get/" + id, null, success, error);
    }

    this.getBasicInfoById = function (idOrUserName, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/basic", null, success, error);
    }

    this.getFriends = function (idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/friends", options, success, error);
    }
    this.getFollowers = function (idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/followers", options, success, error);
    }
    this.getFollowing = function (idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/following", options, success, error);
    }
    this.getPictures = function (idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/media/image", options, success, error);
    }
    this.getVideos = function (idOrUserName, options, success, error) {
        webClientService.get(apiEndPoint + "/get/" + idOrUserName + "/media/video", options, success, error);
    }

    this.GetCustomerProfile = function (customerId, success, error) {
        $http.post("/CustomerProfile/GetCustomerProfile", { customerId: customerId })
          .success(success)
          .error(error);
    }

    this.SetPictureAs = function (uploadType, pictureId, success, error) {
        WebClientService.post(apiEndPoint + "/setpictureas", {uploadType: uploadType, pictureId: pictureId}, success, error);
    }

}]);