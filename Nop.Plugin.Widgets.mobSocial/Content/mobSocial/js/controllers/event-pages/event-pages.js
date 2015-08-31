

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

    $rootScope.$on('updateInvited', function (event, data) {
        for (var i = 0; i < data.length; i++)
            $scope.InvitedCustomers.push(data[i]);
    });

    $http({
        url: '/EventPage/GetInvited',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config) {
        if (data != "") $scope.InvitedCustomers = data;
    }).error(function (data, status, headers, config) {
        alert('error occured.');
    });

    $http({
        url: '/EventPage/GetGoing',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config) {
        if (data != "") $scope.GoingCustomers = data;
    }).error(function (data, status, headers, config){
        alert('error occured.');
    });

    $http({
        url: '/EventPage/GetMaybe',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config) {
        if (data != "") $scope.MaybeCustomers = data;
    }).error(function (data, status, headers, config) {
        alert('error occured.');
    });

    $http({
        url: '/EventPage/GetNotGoing',
        method: 'POST',
        data: { eventPageId: $scope.eventPageId },
    }).success(function (data, status, headers, config) {
        if (data != "") $scope.NotGoingCustomers = data;
    }).error(function (data, status, headers, config) {
        alert('error occured.');
    });

    

    


}]);



app.controller('EventPageButtonsController', ['$rootScope', '$scope', '$http', '$attrs', '$filter', 'dialogService', function ($rootScope, $scope, $http, $attrs, $filter, dialogService) {
        if (!$attrs.model) throw new Error("No model for EventPageController");
        var model = JSON.parse($attrs.model);

        $scope.customerId = model.customerId;
        $scope.eventPageId = model.eventPageId;
        $scope.CustomerAttendanceStatusId = AttendanceStatusEnum.None;
        $scope.PreviousCustomerAttendanceStatusId = AttendanceStatusEnum.None;
        
        $scope.uninvitedFriends = [];
        $scope.busyGettingFriends = false;
        $scope.friendsLastCount = 0;
        $scope.invitingFriends = false;


        $scope.inviteFriendsDialog = function (elementId, minWidth) {
            $scope.getUninvitedFriends(true);
            var dialogButtons = {
                'Invite': function () { $scope.inviteFriends(); $(this).dialog("close"); },
                'Cancel': function () { $(this).dialog("close"); },
            }
            dialogService.open(elementId, minWidth, dialogButtons)
        }

        $scope.inviteFriends = function () {
            if ($scope.invitingFriends) return;
            $scope.invitingFriends = true;

            var invitedCustomerIds = [];
            for (var i = 0; i < $scope.uninvitedFriends.length; i++)
            {
                var customer = $scope.uninvitedFriends[i];
                if (customer.IsInvited == true)
                    invitedCustomerIds.push(customer.CustomerId);
            }

            $http({
                url: '/EventPage/InviteFriends',
                method: 'POST',
                data: { eventPageId: $scope.eventPageId, customerIds: invitedCustomerIds },
            }).success(function (data, status, headers, config) {

                if (data.redirect) {
                    document.location.href = data.redirect;
                    return;
                }

                $rootScope.$emit('updateInvited', data);
                $scope.invitingFriends = false;
            }).error(function (data, status, headers, config) {
                alert('error occured.');
                $scope.invitingFriends = false;
            });
        };

        $scope.updateInvitation = function (customer) {
            customer.IsInvited = !customer.IsInvited;
        };


        $scope.getUninvitedFriends = function (clearUninvitedFriends) {
            if ($scope.busyGettingFriends) return;
            $scope.busyGettingFriends = true;

            if (clearUninvitedFriends == true)
                $scope.uninvitedFriends = [];


            $http({
                url: '/EventPage/GetUninvitedFriends',
                method: 'POST',
                data: { eventPageId: $scope.eventPageId, index: $scope.friendsLastCount },
            }).success(function (data, status, headers, config) {

                if ($scope.uninvitedFriends.length == 0) {
                    $scope.uninvitedFriends = data;
                }
                else {
                    for (var i = 0; i < data.length; i++)
                        $scope.uninvitedFriends.push(data[i]);
                }
                $scope.friendsLastCount = $scope.uninvitedFriends.length;
                $scope.busyGettingFriends = false;
            }).error(function (data, status, headers, config) {
                alert('error occured.');
                $scope.busyGettingFriends = false;
            });
        };
        

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

                if (data.redirect) {
                    document.location.href = data.redirect;
                    return;
                }
                
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
