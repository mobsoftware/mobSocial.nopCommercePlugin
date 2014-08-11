

app.controller('customerProfileController', ['$rootScope', '$scope', '$http', '$attrs', function ($rootScope, $scope, $http, $attrs) {
    if (!$attrs.model) throw new Error("No model for customerProfileController");

    var model = JSON.parse($attrs.model);

    $scope.customerId = model.id;
    $scope.customerProfile = null;

    $http({
        url: '/MobSocial/GetCustomerProfile',
        method: 'POST',
        data: { customerId: $scope.customerId },
    }).success(function (data, status, headers, config) {
        if (data != "") $scope.customerProfile = data;
    }).error(function (data, status, headers, config) {
        alert('error occured.');
    });


}]);

