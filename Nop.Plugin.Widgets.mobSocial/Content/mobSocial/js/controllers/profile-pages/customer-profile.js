

app.controller('customerProfileController', ['$rootScope', '$scope', 'CustomerProfileService', 'VideoBattleService', '$http', function ($rootScope, $scope, CustomerProfileService, VideoBattleService, $http) {


    $scope.Profile = null;

    $scope.init = function (id) {
        CustomerProfileService.getBasicInfoById(id,
            function(response) {
                if (response.Success) {
                    $scope.Profile = response.ResponseData.User;
                }
            });
        
    }

    $scope.UploadCoverSuccess = function (fileItem, data, status, headers) {

        if (data.Success && data.Images.length > 0) {
            $scope.Profile.TemporaryCoverImageUrl = data.ResponseData.Images[0].Url;
            $scope.Profile.TemporaryCoverId = data.ResponseData.Images[0].Id;
            $scope.Profile.TemporaryCover = true;
        }
    };

    $scope.UploadProfileImageSuccess = function (fileItem, data, status, headers) {

        if (data.Success && data.Images.length > 0) {
            $scope.Profile.TemporaryProfileImageUrl = data.ResponseData.Images[0].Url;
            $scope.Profile.TemporaryProfileImageId = data.ResponseData.Images[0].Id;
            $scope.Profile.TemporaryProfileImage = true;
        }
    };

    $scope.SetPictureAs = function (uploadType, pictureId, setOrReset) {
        if (setOrReset) {
            CustomerProfileService.SetPictureAs(uploadType, pictureId, function (data) {
                if (data.Success) {
                    if (uploadType == "cover") {
                        $scope.Profile.CoverImageUrl = $scope.Profile.TemporaryCoverImageUrl;
                        $scope.Profile.TemporaryCoverId = 0;
                        $scope.Profile.TemporaryCover = false;
                        $scope.Profile.TemporaryCoverImageUrl = false;
                    } else {
                        $scope.Profile.ProfileImageUrl = $scope.Profile.TemporaryProfileImageUrl;
                        $scope.Profile.TemporaryProfileImageId = 0;
                        $scope.Profile.TemporaryProfileImage = false;
                        $scope.Profile.TemporaryProfileImageUrl = false;
                    }


                }
            }, function (data) {

            });
        } else {
            if (uploadType == "cover") {
                $scope.Profile.TemporaryCoverId = 0;
                $scope.Profile.TemporaryCover = false;
                $scope.Profile.TemporaryCoverImageUrl = false;
            } else {
                $scope.Profile.TemporaryProfileImageId = 0;
                $scope.Profile.TemporaryProfileImage = false;
                $scope.Profile.TemporaryProfileImageUrl = false;
            }

        }
        
    }


    

    $scope.updateCustomerProfile = function () {

        $http({
            url: '/CustomerProfile/SaveCustomerProfile',
            method: 'POST',
            data: $scope.customerProfile,
        }).success(function (data, status, headers, config) {
            // make a success message appear
        }).error(function (data, status, headers, config) {
            alert('error occured.');
        });

    };

    $scope.editProfilePicture = function () {
        alert('new way to edit profile picture!');
    };

    $scope.GetVideoBattles = function () {
        $scope.processing = true;
        $scope.VideoBattles = null;
        var CustomerId = $scope.customerId;
        var ViewType = "user";
        VideoBattleService.GetVideoBattles({ ViewType: ViewType, CustomerId: CustomerId },
            function(data) {
                if (data.Success) {
                    $scope.VideoBattles = data.VideoBattles;
                    $scope.loaded = true;
                }
                $scope.processing = false;
            },
            function(data) {
                $scope.processing = false;
                alert("error occurred");
            });
    };

}]);





function sendRequestViaMultiFriendSelector() {
    FB.ui({
        method: 'apprequests',
        message: 'You\'ve been invited to join SkateMob.com',
        title: "Select friends to invite ",
        cookie: true,
        status: true,
        xfbml: true
    }, requestCallback);
}

function requestCallback(response) {
    // handle requests after invite is sent
    // response.request_ids = ids of selected facebook users
}

