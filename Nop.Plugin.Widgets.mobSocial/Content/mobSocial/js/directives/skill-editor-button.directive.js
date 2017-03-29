app.directive("skillEditorButton", ['$http', 'SkillService', '$rootScope', "AutocompleteService", '$timeout', function ($http, SkillService, $rootScope, AutocompleteService, $timeout) {
    return {
        restrict: "E",
        templateUrl: "/SkillEditorButton",
        replace: true,
        scope: {
            skill: "=skill",
            buttonText: "@buttontext",
            onsave: "&onsave"
        },
        link: function ($scope, elem, attr) {

            $scope.skill = $scope.skill || {};
            $scope.edit = function () {
                $scope.editing = true;
                $timeout(function () {
                    $scope.$broadcast('angucomplete-alt:changeInput', 'skill-autocomplete', $scope.skill.SkillName);

                },
                    50);
                $rootScope.bodyScroll(false);
            }

            $scope.cancel = function () {
                $scope.editing = false;
                $rootScope.bodyScroll(true);
            }

            $scope.uploadSkillMediaSuccess = function (fileItem, data, status, headers) {

                if (data.Success) {
                    $scope.skill.MediaId = $scope.skill.MediaId || [];
                    if (data.Media) {
                        $scope.skill.MediaId.push(data.Media.Id);
                        $scope.skill.Media.push(data.Media);
                    }
                    if (data.Images) {
                        for (var i = 0; i < data.Images.length; i++) {
                            $scope.skill.MediaId.push(data.Images[i].Id);
                            $scope.skill.Media = $scope.skill.Media || [];
                            $scope.skill.Media.push(data.Images[i]);
                        }
                    }
                    if (data.Video) {
                        $scope.skill.MediaId.push(data.Video.Id);
                        $scope.skill.Media = $scope.skill.Media || [];
                        $scope.skill.Media.push(data.Video);
                    }
                }
            };


            $scope.cancelEdit = function () {
                $scope.skill = null;
                $scope.$broadcast('angucomplete-alt:clearInput', 'skill-autocomplete');
                $rootScope.bodyScroll(true);
            }

            $scope.autocompleteSkills = function (userInputString, timeoutPromise) {
                var response = AutocompleteService.autocomplete("skills", userInputString, timeoutPromise);
                response.success(function (res) {
                    if (res.AutoComplete.Skills.length == 0) {
                        res.AutoComplete.Skills.push({
                            SkillName: userInputString
                        });
                    }
                    return res.AutoComplete.Skills;
                });
                return response;
            }

            $scope.selectSkill = function (callbackObject) {
                if (callbackObject) {
                    $scope.skill.SkillName = callbackObject.originalObject.SkillName;
                    $scope.skill.Id = callbackObject.originalObject.Id;
                }
            }

            $scope.postSkill = function () {
                var skill = $scope.skill;
                SkillService.postSkill({
                    SkillName: skill.SkillName,
                    Description: skill.Description,
                    MediaId: skill.MediaId,
                    UserId: 0,
                    Id: skill.Id
                },
                    function (response) {
                        if (response.Success) {
                            $scope.cancel();
                            if ($scope.onsave) {
                                $timeout(function () {
                                    $scope.onsave({ skill: response.Skill });
                                },
                                    0);
                            }
                        }
                    }
                );
            }

        }

    }
}]);