var app = angular.module('mobSocialApp', []);

app.controller('EventPageController', function ($scope, $http, $attrs) {
    if (!$attrs.model) throw new Error("No model for EventPageController");


    var model = JSON.parse($attrs.model);

    $scope.eventPageId = model.eventPageId;
    $scope.eventPageAttendances = [];

    $http({
        url: '/EventPage/GetAllAttendances',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config){
        $scope.eventPageAttendances = data;
    }).error(function (data, status, headers, config){
            alert('error occured.');
    });



});


app.controller('EventPageButtonsController', function ($scope, $http, $attrs) {
    $scope.setGoing = function () {
        alert('set going');
    }
});