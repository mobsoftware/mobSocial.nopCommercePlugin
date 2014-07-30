var app = angular.module('EventPagesApp', []);

app.controller('EventPageController', function ($scope, $http, $attrs) {
    if (!$attrs.model) throw new Error("No model for EventPageController");


    var model = JSON.parse($attrs.model);

    $scope.eventPageId = model.eventPageId;
    $scope.eventPageAttendances = [];


    //todo: make angularjs eventpageservice to put http calls in
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