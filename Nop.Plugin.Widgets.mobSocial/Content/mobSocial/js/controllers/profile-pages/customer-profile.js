

app.controller('customerProfileController', ['$rootScope', '$scope', '$http', '$attrs', 'VideoBattleService', function ($rootScope, $scope, $http, $attrs, VideoBattleService) {
    if (!$attrs.model) throw new Error("No model for customerProfileController");

    var model = JSON.parse($attrs.model);

    $scope.customerId = model.id;
    $scope.customerProfile = null;
    $scope.statusText = '';


    $http({
        url: '/CustomerProfile/GetCustomerProfile',
        method: 'POST',
        data: { customerId: $scope.customerId, rnd: new Date().getTime() },
    }).success(function (data, status, headers, config) {
        if (data != "") $scope.customerProfile = data;
    }).error(function (data, status, headers, config) {
        alert('error occured.');
    });



    $scope.postStatusToTimeline = function () {

        if ($scope.statusText == '' || $scope.statusText.trim() == '' || $scope.statusText == null)
            return; // todo: replace with a user friendly message but not an alert or popup. Those can be intrusive.

        $http({
            url: '/MobSocial/PostStatusToTimeline',
            method: 'POST',
            data: {
                customerId: $scope.customerId,
                statusText: $scope.statusText,
                rnd: new Date().getTime()
            },
        }).success(function (data, status, headers, config) {
            if (data != "") $scope.customerProfile = data;
        }).error(function (data, status, headers, config) {
            alert('error occured.');
        });

    };

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
        $scope.VideoBattles = [];
        var CustomerId = $scope.customerId;
        var ViewType = "user";
        VideoBattleService.GetVideoBattles(ViewType, null, CustomerId, null , null,
            function (data) {
                if (data.Success) {
                    $scope.VideoBattles = data.VideoBattles;
                    $scope.loaded = true;
                }
                $scope.processing = false;
            },
            function (data) {
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

