

app.controller('EventPageController', ['$rootScope', '$scope', '$http', '$attrs', '$filter', function ($rootScope, $scope, $http, $attrs, $filter) {
    if (!$attrs.model) throw new Error("No model for EventPageController");


    var model = JSON.parse($attrs.model);

    $scope.eventPageId = model.eventPageId;
    $scope.eventPageAttendances = [];

    $scope.InvitedCustomers = [];
    $scope.GoingCustomers = [];
    $scope.MaybeCustomers = [];
    $scope.NotGoingCustomers = [];

    $rootScope.$on('attendanceUpdated', function (event, data) {


        

        if (data.PreviousCustomerAttendanceStatusId == AttendanceStatusEnum.Invited) {
            var old = $filter('filter')($scope.InvitedCustomers, { CustomerId: data.CustomerId });
            $scope.InvitedCustomers.splice(old, 1);
        } else if (data.PreviousCustomerAttendanceStatusId == AttendanceStatusEnum.Going) {
            var old = $filter('filter')($scope.GoingCustomers, { CustomerId: data.CustomerId });
            $scope.GoingCustomers.splice(old, 1);
        } else if (data.PreviousCustomerAttendanceStatusId == AttendanceStatusEnum.Maybe) {
            var old = $filter('filter')($scope.MaybeCustomers, { CustomerId: data.CustomerId });
            $scope.MaybeCustomers.splice(old, 1);
        } else if (data.PreviousCustomerAttendanceStatusId == AttendanceStatusEnum.NotGoing) {
            var old = $filter('filter')($scope.NotGoingCustomers, { CustomerId: data.CustomerId });
            $scope.NotGoingCustomers.splice(old, 1);
        }



        if (data.AttendanceStatusId == AttendanceStatusEnum.Invited) {
            $scope.InvitedCustomers.push(data);
        } else if (data.AttendanceStatusId == AttendanceStatusEnum.Going) {
            $scope.GoingCustomers.push(data);
        } else if (data.AttendanceStatusId == AttendanceStatusEnum.Maybe) {
            $scope.MaybeCustomers.push(data);
        } else if (data.AttendanceStatusId == AttendanceStatusEnum.NotGoing) {
            $scope.NotGoingCustomers.push(data);
        }



    });

    $http({
        url: '/EventPage/GetInvited',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config) {
        $scope.InvitedCustomers = data;
    }).error(function (data, status, headers, config) {
        alert('error occured.');
    });

    $http({
        url: '/EventPage/GetGoing',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config) {
        $scope.GoingCustomers = data;
    }).error(function (data, status, headers, config){
        alert('error occured.');
    });

    $http({
        url: '/EventPage/GetMaybe',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config) {
        $scope.MaybeCustomers = data;
    }).error(function (data, status, headers, config) {
        alert('error occured.');
    });

    $http({
        url: '/EventPage/GetNotGoing',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config) {
        $scope.NotGoingCustomers = data;
    }).error(function (data, status, headers, config) {
        alert('error occured.');
    });

    

    


}]);


app.controller('EventPageButtonsController', ['$rootScope', '$scope', '$http', '$attrs', function ($rootScope, $scope, $http, $attrs) {
        if (!$attrs.model) throw new Error("No model for EventPageController");
        var model = JSON.parse($attrs.model);

        $scope.eventPageId = model.eventPageId;
        $scope.CustomerAttendanceStatusId = AttendanceStatusEnum.None;
        $scope.PreviousCustomerAttendanceStatusId = AttendanceStatusEnum.None;
        

        $http({
            url: '/EventPage/GetCustomerAttendanceStatus',
            method: 'POST',
            data: { eventPageId: $scope.eventPageId },
        }).success(function (data, status, headers, config) {
            $scope.CustomerAttendanceStatusId = data.AttendanceStatusId;
            PreviousCustomerAttendanceStatusId = data.AttendanceStatusId;
            updateStatusText(data.AttendanceStatusId);
        }).error(function (data, status, headers, config) {
            alert('error occured.');
        });


        $scope.setGoing = function () {
            updateAttendanceStatus(AttendanceStatusEnum.Going);
        }

        $scope.setMaybe = function () {
            updateAttendanceStatus(AttendanceStatusEnum.Maybe);
        }

        $scope.setNotGoing = function () {
            updateAttendanceStatus(AttendanceStatusEnum.NotGoing);
        }

        function updateAttendanceStatus(attendanceStatusId) {
            $http({
                url: '/EventPage/UpdateAttendanceStatus',
                method: 'POST',
                data: { eventPageId: $scope.eventPageId, attendanceStatusId: attendanceStatusId },
            }).success(function (data, status, headers, config) {
                $scope.PreviousCustomerAttendanceStatusId = $scope.CustomerAttendanceStatusId;
                $scope.CustomerAttendanceStatusId = data.AttendanceStatusId;
                
                updateStatusText(data.AttendanceStatusId);
                data.PreviousCustomerAttendanceStatusId = $scope.PreviousCustomerAttendanceStatusId;
                $rootScope.$emit('attendanceUpdated', data);

            }).error(function (data, status, headers, config) {
                alert('error occured.');
            });
        }

        function updateStatusText(attendanceStatusId) {
            if (attendanceStatusId == AttendanceStatusEnum.None) {
                $scope.CustomerAttendanceStatusText = "None";
            } else if (attendanceStatusId == AttendanceStatusEnum.Invited) {
                $scope.CustomerAttendanceStatusText = "Invited";
            } else if (attendanceStatusId == AttendanceStatusEnum.Going) {
                $scope.CustomerAttendanceStatusText = "Going";
            } else if (attendanceStatusId == AttendanceStatusEnum.Maybe) {
                $scope.CustomerAttendanceStatusText = "Maybe";
            } else if (attendanceStatusId == AttendanceStatusEnum.NotGoing) {
                $scope.CustomerAttendanceStatusText = "Not Going";
            }
        }


}]);


var AttendanceStatusEnum =  {
        None : 0,
        Invited : 1,
        Going : 2,
        Maybe : 3,
        NotGoing : 4,
    };
