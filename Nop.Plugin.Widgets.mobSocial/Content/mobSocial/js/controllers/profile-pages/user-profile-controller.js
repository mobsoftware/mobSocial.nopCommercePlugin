app.controller("userProfileController", [
    "$scope", "$rootScope", "userService", function ($scope, $rootScope, userService) {
       
        $scope.getBasicInfoByIdOrUserName = function (idOrUserName) {
            userService.getBasicInfoById(idOrUserName,
                function (response) {
                    if (response.Success) {
                        $scope.user = response.ResponseData.User;
                    }
                },
                function (response) {

                });
        }

        $scope.uploadCoverSuccess = function (fileItem, data, status, headers) {

            if (data.Success && data.ResponseData.Images.length > 0) {
                $scope.user.TemporaryCoverImageUrl = data.ResponseData.Images[0].ImageUrl;
                $scope.user.TemporaryCoverId = data.ResponseData.Images[0].ImageId;
                $scope.user.TemporaryCover = true;
            }
        };

        $scope.uploadProfileImageSuccess = function (fileItem, data, status, headers) {

            if (data.Success && data.ResponseData.Images.length > 0) {
                $scope.user.TemporaryProfileImageUrl = data.ResponseData.Images[0].ImageUrl;
                $scope.user.TemporaryProfileImageId = data.ResponseData.Images[0].ImageId;
                $scope.user.TemporaryProfileImage = true;
            }
        };

        $scope.setPictureAs = function (uploadType, pictureId, setOrReset) {
            if (setOrReset) {
                userService.setPictureAs(uploadType, pictureId, $scope.user.Id, function (data) {
                    if (data.Success) {
                        if (uploadType == "DefaultCoverId") {
                            $scope.user.CoverImageUrl = $scope.user.TemporaryCoverImageUrl;
                            $scope.user.TemporaryCoverId = 0;
                            $scope.user.TemporaryCover = false;
                            $scope.user.TemporaryCoverImageUrl = false;
                        } else {
                            $scope.user.ProfileImageUrl = $scope.user.TemporaryProfileImageUrl;
                            $scope.user.TemporaryProfileImageId = 0;
                            $scope.user.TemporaryProfileImage = false;
                            $scope.user.TemporaryProfileImageUrl = false;
                        }


                    }
                }, function (data) {

                });
            } else {
                if (uploadType == "cover") {
                    $scope.user.TemporaryCoverId = 0;
                    $scope.user.TemporaryCover = false;
                    $scope.user.TemporaryCoverImageUrl = false;
                } else {
                    $scope.user.TemporaryProfileImageId = 0;
                    $scope.user.TemporaryProfileImage = false;
                    $scope.user.TemporaryProfileImageUrl = false;
                }

            }
        }
       
        $scope.init = function (id) {
            $scope.getBasicInfoByIdOrUserName(id);
        };
    }
]);