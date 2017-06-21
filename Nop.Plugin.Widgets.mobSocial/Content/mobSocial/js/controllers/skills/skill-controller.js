
appRequires(["ngSanitize",
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster",
			"com.2fdevs.videogular.plugins.imaads", 'timer']);

app.controller("SkillController",
[
    "$scope", "$sce", "SkillService", "AutocompleteService", '$timeout', '$rootScope', function ($scope, $sce, SkillService, AutocompleteService, $timeout, $rootScope) {
        
        $scope.getUserSkills = function(userId) {
            SkillService.getUserSkills(userId,
                function(response) {
                    if (response.Success) {
                        $scope.skills = response.ResponseData.Skills;
                    }
                });
        }

        $scope.getSkill = function(id) {
            SkillService.getSkill(id,
               function (response) {
                   if (response.Success) {
                       $scope.skill = response.ResponseData.Skill;
                   }
               });
        }

        $scope.postSkill = function (skill) {
            if (skill.Id < 0)
                skill.Id = 0;
            var isOld = skill.Id > 0;
            skill.Media = null;
            SkillService.postSkill(skill,
               function (response) {
                   if (response.Success) {
                       skill = response.ResponseData.Skill;
                       $scope.skill = null;
                       if (!isOld) {
                           $scope.skills = $scope.skills || [];
                           $scope.skills.push(skill);
                       } else {
                           for (var i = 0; i < $scope.skills.length; i++) {
                               if ($scope.skills[i].UserSkillId == skill.UserSkillId) {
                                   $scope.skills[i] = skill;
                                   break;
                               }
                           }
                       }
                   } else {
                       alert(response.Message);
                   }
               }
            );
        }

        $scope.delete = function (id) {
            if (!confirm("Are you sure you wish to delete this skill?"))
                return;
            SkillService.delete(id,
               function (response) {
                   if (response.Success) {
                       if ($scope.skills && $scope.skill) {
                           for (var i = 0; i < $scope.skills.length; i++) {
                               if ($scope.skills[i].Id == $scope.skill.Id) {
                                   $scope.skills.splice(i, 1);
                               }
                           }
                       }
                   }
               });
        }

        $scope.deleteUserSkill = function (id) {
            if (!confirm("Are you sure you wish to delete this skill?"))
                return;
            SkillService.deleteUserSkill(id,
               function (response) {
                   if (response.Success) {
                       if ($scope.skills) {
                           for (var i = 0; i < $scope.skills.length; i++) {
                               if ($scope.skills[i].UserSkillId == id) {
                                   $scope.skills.splice(i, 1);
                                   $scope.cancelEdit();
                                   break;
                               }
                           }
                       }
                   }
               });
        }

        $scope.edit = function (skill) {
            $scope.$broadcast('angucomplete-alt:changeInput', 'skill-autocomplete', skill.SkillName);
            $scope.skill = skill;
            $rootScope.bodyScroll(false);
        }

        $scope.add = function () {
            $scope.skill = {};
            $rootScope.bodyScroll(false);
        }

        $scope.cancel = function () {
            $scope.skill = null;
            $rootScope.bodyScroll(true);
        }

        $scope.uploadSkillMediaSuccess = function (fileItem, data, status, headers) {

            if (data.Success) {
                $scope.skill.MediaId = $scope.skill.MediaId || [];
                if (data.ResponseData.Media) {
                    $scope.skill.MediaId.push(data.ResponseData.Media.Id);
                    $scope.skill.Media.push(data.ResponseData.Media);
                }
                if (data.ResponseData.Images) {
                    for (var i = 0; i < data.ResponseData.Images.length; i++) {
                        $scope.skill.MediaId.push(data.ResponseData.Images[i].Id);
                        $scope.skill.Media = $scope.skill.Media || [];
                        $scope.skill.Media.push(data.Images[i]);
                    }
                }
                if (data.ResponseData.Video) {
                    $scope.skill.MediaId.push(data.ResponseData.Video.Id);
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
                
                if (res.ResponseData.AutoComplete.Skills.length == 0) {
                    res.ResponseData.AutoComplete.Skills.push({
                        SkillName: userInputString
                    });
                }
                return res.ResponseData.AutoComplete.Skills;
            });
            return response;
        }

        $scope.selectSkill = function (callbackObject) {
            if (callbackObject) {
                $scope.skill.SkillName = callbackObject.originalObject.SkillName;
                $scope.skill.Id = callbackObject.originalObject.Id;
            }
        }

        var getUsersOptions = {
            nextPage: 0
        };

        $scope.getSkillBySlug = function (slug) {
            SkillService.getSkillBySlug(slug,
                function (response) {
                    if (response.Success) {
                        $scope.skillData = response.ResponseData.SkillData;
                        $scope.skill = $scope.skillData.Skill;
                        getUsersOptions.nextPage = 2;
                    }
                });

        }
        $scope.getUsers = function () {
            SkillService.getUsers($scope.skill.Id, {
                page: getUsersOptions.nextPage
            },
                function (response) {
                    if (response.Success) {
                        getUsersOptions.nextPage++;
                        if (response.ResponseData.UserSkills.length > 0)
                            $scope.skillData.UserSkills = $scope.skillData.UserSkills.concat(response.ResponseData.UserSkills);
                    }
                });
        }

        $scope.uploadCoverSuccess = function (fileItem, data, status, headers) {

            if (data.Success) {
                $scope.skill.TemporaryFeaturedImageUrl = data.ResponseData.Images[0].Url;
                $scope.skill.TemporaryFeaturedMediaId = data.ResponseData.Images[0].Id;
            }
        };

        $scope.setTemporaryPictureAsCover = function (set) {
            if (set) {
                SkillService.setFeaturedMedia($scope.skill.Id,
                    $scope.skill.TemporaryFeaturedMediaId,
                    function (response) {
                        if (response.Success) {
                            $scope.skillData.FeaturedMediaImageUrl = $scope.skill.TemporaryFeaturedImageUrl;
                            $scope.skill.TemporaryFeaturedImageUrl = null;
                            $scope.skill.TemporaryFeaturedMediaId = 0;
                        }
                    });
            } else {
                $scope.skill.TemporaryFeaturedImageUrl = null;
                $scope.skill.TemporaryFeaturedMediaId = 0;
            }
        }

        $scope.deleteUserSkillMedia = function (userSkillId, mediaId) {
            if (!confirm("Are you sure?"))
                return;
            SkillService.deleteUserSkillMedia(userSkillId,
                mediaId,
                function (response) {
                    if (response.Success) {
                        if ($scope.skill) {
                            for (var i = 0; i < $scope.skill.Media.length; i++) {
                                if ($scope.skill.Media[i].Id == mediaId)
                                    $scope.skill.Media.splice(i, 1);
                            }
                        }
                    }
                });
        }

        var getSkillOptions = {
            page: 0
        };
        $scope.totalSkillRecords = 0;
        $scope.getAllSkills = function() {
            getSkillOptions.page++;
            SkillService.getSkills(getSkillOptions,
                function(response) {
                    if (response.Success) {
                        if (response.ResponseData.Page == 1)
                            $scope.skills = response.ResponseData.Skills;
                        else {
                            $scope.skills = $scope.skills.concat(response.ResponseData.Skills);
                        }
                        $scope.totalSkillRecords = response.ResponseData.Total;
                    }
                });
        }

        $scope.onIcanDoThis = function (skill) {
            $scope.skillData.UserSkills.push(skill);
            $scope.skillData.HasSkill = true;
        }

        $scope.uploadSkillMediaSuccess = function (fileItem, data, status, headers) {
            if (data.Success) {
                var userSkillId = fileItem.formData[0].userSkillId;
                var mediaId = data.Images ? data.Images[0].Id : data.Video.Id;
                //send the media id and attach it with skill
                 SkillService.postSkillMedia({
                     MediaId: mediaId,
                     UserSkillId: userSkillId
                 }, function(response) {
                     if (response.Success) {
                         for (var i = 0; i < $scope.skillData.UserSkills.length; i++) {
                             if( $scope.skillData.UserSkills[i].UserSkillId != userSkillId)
                                 continue;

                             if (response.MediaType == 0) {
                                 $scope.skillData.UserSkills[i].TotalPictureCount++;
                             } else {
                                 $scope.skillData.UserSkills[i].TotalVideoCount++;
                             }
                         }
                        
                     }
                 });
            }
        }
    }
]);