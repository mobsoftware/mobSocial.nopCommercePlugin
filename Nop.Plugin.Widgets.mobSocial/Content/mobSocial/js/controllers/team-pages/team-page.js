app.controller("TeamPageController",
[
    "$scope", "TeamPageService", function($scope, TeamPageService) {

    }
]);

app.controller("TeamPageEditorController",
[
    "$scope", "TeamPageService", function ($scope, TeamPageService) {

        $scope.init = function (model) {
            if (model.Id > 0) {
                TeamPageService.Get(model.Id,
                    function(response) {
                        if (response.Success)
                            $scope.TeamPage = response;
                        else
                            alert(response.Message);

                    },
                    function(response) {
                        alert("An error occured while retriving team page");
                    });
            } else {
                $scope.TeamPage = {
                    Name: "",
                    Description: ""
                };
            }
        };

        $scope.$watch("createTeamPageForm.$valid", function (newVal) {
            $scope.FormValid = newVal;
        });

        $scope.processing = false;
        $scope.recordSaved = false;

        $scope.SaveTeamPage = function() {
            if ($scope.FormValid) {
                $scope.processing = true;
                TeamPageService.Insert($scope.TeamPage,
                    function(response) {
                        $scope.processing = false;
                        if (response.Success) {
                            $scope.recordSaved = true;
                            if (response.Url) {
                                window.location.href = response.Url;
                            } else {

                            }
                        } else {
                            alert(response.Message);
                        }
                    },
                    function (response) {
                        $scope.processing = true;
                        alert("An error occured while saving team page");
                    });
            }
        }
    }
]);