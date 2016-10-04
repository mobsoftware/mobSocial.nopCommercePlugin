app.controller("InvitationController", [
    '$scope', 'InvitationService', function ($scope, InvitationService) {
        $scope.addToInvites = function () {
            if (!$scope.email)
                return;
            $scope.emails = $scope.emails || [];
            $scope.emails.push($scope.email);
            $scope.email = "";
        }

        $scope.removeFromInvites = function(email) {
            for(var i = 0; i < $scope.emails.length; i++)
                if ($scope.emails[i] == email) {
                    $scope.emails.splice(i, 1);
                    break;
                }
        }

        $scope.invite = function() {
            InvitationService.invite({ emailAddress: $scope.emails },
                function(response) {
                    if (response.Success) {
                        $scope.emails = [];
                        $scope.invited = true;
                    }
                });
        }
        
    }
]);