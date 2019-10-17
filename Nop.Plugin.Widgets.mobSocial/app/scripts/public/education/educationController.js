window.mobSocial.lazy.controller("educationController",
[
    "$scope", "educationService", "schoolService", function($scope, educationService, schoolService) {

        $scope.getUserEducations = function(userId) {
            educationService.getUserEducations(userId,
                function(response) {
                    if (response.Success) {
                        $scope.educations = response.ResponseData.Educations;
                    }
                },
                function() {

                });
        }

        $scope.getEducation = function(id) {
            educationService.get(id,
                function(response) {
                    if (response.Success) {
                        $scope.education = response.ResponseData.Education;
                        $scope.school = $scope.education.School;
                        $scope.availableSchools = [
                            {
                                Text: $scope.school.Name,
                                Id: $scope.school.Id
                            }
                        ];
                    }
                },
                function() {

                });
        }

        $scope.post = function () {
            var method = $scope.education.Id ? "put" : "post";
            educationService[method]($scope.education,
                function(response) {
                    if (response.Success) {
                        $scope.educations = $scope.educations || [];
                        $scope.education = response.ResponseData.Education;
                        var found = false;
                        //update education in the list
                        for (var i = 0; i < $scope.educations.length; i++) {
                            var e = $scope.educations[i];
                            if (e.Id != $scope.education.Id)
                                continue;
                            $scope.educations[i] = $scope.education;
                            found = true;
                            break;
                        }

                        if (!found) {
                            $scope.educations.push($scope.education);
                        }

                        $scope.education = null;
                    }
                },
                function() {

                });
        }

        $scope.delete = function(id) {
            educationService.delete(id,
                function(response) {
                    if (response.Success) {
                        //delete education in the list
                        for (var i = 0; i < $scope.educations[i]; i++) {
                            var e = $scope.educations[i];
                            if (e.Id != $scope.education.Id)
                                continue;
                            $scope.educations.splice(i, 1);
                            break;
                        }
                    }
                },
                function() {

                });
        }

        $scope.add = function() {
            $scope.education = {};
        }
        $scope.cancel = function() {
            $scope.education = null;
        }

        $scope.postSchool = function(school) {
            schoolService.post(school,
                function(response) {
                    if (response.Success) {
                        $scope.school = response.ResponseData.School;
                        if ($scope.education) {
                            $scope.availableSchools.pop(); //add new option
                            $scope.availableSchools.push({
                                Text: $scope.school.Name,
                                Id: $scope.school.Id
                            });
                            $scope.education.SchoolId = $scope.school.Id;

                        }
                    }
                    $scope.schoolEditing = false;
                },
                function() {

                });
        }

        $scope.cancelSchoolEditing = function() {
            $scope.availableSchools = [];
            $scope.school = null;
        };

        $scope.init = function () {
            $scope.availableSchools = [];
            $scope.availableEducationTypes = [
                {
                    Id: 0,
                    Text: "School"
                },
                {
                    Id: 1,
                    Text: "College"
                },
                {
                    Id: 2,
                    Text: "Graduation"
                }
            ];
            $scope.getUserEducations();
        }();
    }
]);