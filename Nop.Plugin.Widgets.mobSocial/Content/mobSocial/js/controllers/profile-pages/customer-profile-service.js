"use strict";

app.service("CustomerProfileService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {
    var apiEndPoint = globalApiEndPoint + "/customerprofile";
    this.GetCustomerProfile = function (customerId, success, error) {
        $http.post("/CustomerProfile/GetCustomerProfile", { customerId: customerId })
          .success(success)
          .error(error);
    }

    this.SetPictureAs = function (uploadType, pictureId, success, error) {
        WebClientService.post(apiEndPoint + "/setpictureas/" + uploadType + "/" + pictureId, null, success, error);
    }

}]);