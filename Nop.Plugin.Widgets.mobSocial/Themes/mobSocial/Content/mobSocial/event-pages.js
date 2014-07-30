var app = angular.module('EventPagesApp', []);

app.controller('EventPageController', function ($scope, $attrs) {
    if (!$attrs.model) throw new Error("No model for EventPageController");


    var model = JSON.parse($attrs.model);

    $scope.eventPageId = model.eventPageId;
    $scope.eventPageAttendances = [];

    $.ajax({
        type: 'post',
        url: '/EventPage/GetAllAttendances',
        data: { eventPageId: $scope.eventPageId },
        success: function (data) {
            $scope.eventPageAttendances = data;
        },
        error: function (data) {
            alert('error occured.');
        }
    });



});