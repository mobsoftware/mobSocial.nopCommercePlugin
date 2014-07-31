

app.controller('EventPageController', ['$scope', '$http',  '$attrs', function ($scope, $http, $attrs) {
    if (!$attrs.model) throw new Error("No model for EventPageController");


    var model = JSON.parse($attrs.model);

    $scope.eventPageId = model.eventPageId;
    //$scope.eventPageAttendances = EventPageService.eventPageAttendances;
    $http({
        url: '/EventPage/GetAllAttendances',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config) {
        $scope.eventPageAttendances = data;
    }).error(function (data, status, headers, config){
        alert('error occured.');
    });



}]);


app.controller('EventPageButtonsController', ['$scope', '$http', '$attrs', function ($scope, $http, $attrs) {
        if (!$attrs.model) throw new Error("No model for EventPageController");
        var model = JSON.parse($attrs.model);

        $scope.eventPageId = model.eventPageId;

        var noneId = 0;
        var invitedId = 1;
        var goingId = 2;
        var maybeId = 3;
        var notGoingId = 4;

        $http({
            url: '/EventPage/GetCustomerAttendanceStatus',
            method: 'POST',
            data: { eventPageId: $scope.eventPageId },
        }).success(function (data, status, headers, config) {
            $scope.CustomerAttendanceStatusId = data.AttendanceStatusId;
            updateStatusText(data.AttendanceStatusId);
        }).error(function (data, status, headers, config) {
            alert('error occured.');
        });


        $scope.setGoing = function () {
            updateAttendanceStatus(goingId);
        }

        $scope.setMaybe = function () {
            updateAttendanceStatus(maybeId);
        }

        $scope.setNotGoing = function () {
            updateAttendanceStatus(notGoingId);
        }


        function updateAttendanceStatus(attendanceStatusId) {
            $http({
                url: '/EventPage/UpdateAttendanceStatus',
                method: 'POST',
                data: { eventPageId: $scope.eventPageId, attendanceStatusId: attendanceStatusId },
            }).success(function (data, status, headers, config) {
                $scope.CustomerAttendanceStatusId = data.AttendanceStatusId;
                updateStatusText(data.AttendanceStatusId);
                //EventPageService.eventPageAttendances = []
            }).error(function (data, status, headers, config) {
                alert('error occured.');
            });
        }

        function updateStatusText(attendanceStatusId) {
            if (attendanceStatusId == noneId) {
                $scope.CustomerAttendanceStatusText = "None";
            } else if (attendanceStatusId == invitedId) {
                $scope.CustomerAttendanceStatusText = "Invited";
            } else if (attendanceStatusId == goingId) {
                $scope.CustomerAttendanceStatusText = "Going";
            } else if (attendanceStatusId == maybeId) {
                $scope.CustomerAttendanceStatusText = "Maybe";
            } else if (attendanceStatusId == notGoingId) {
                $scope.CustomerAttendanceStatusText = "Not Going";
            }
        }


}]);




//app.service('EventPageService', function () {
//    return {
//        eventPageAttendances: []
//    };

//});