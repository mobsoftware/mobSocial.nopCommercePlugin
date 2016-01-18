"use strict";

app.service("CustomerProfileService", ["$http", function($http) {

    this.GetCustomerProfile = function (customerId, success, error) {
        $http.post("/CustomerProfile/GetCustomerProfile", { customerId: customerId })
          .success(success)
          .error(error);
    }

    this.SetPictureAs = function (uploadType, pictureId, Success, Error) {
        $http.post("/CustomerProfile/SetPictureAs", { uploadType: uploadType, pictureId: pictureId })
          .success(Success)
          .error(Error);
    }

}]);