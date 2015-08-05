"use strict";
function parseJsonDate(value) {
    return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
}
app.requires = app.requires.concat(["ngSanitize",
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster", 'timer']);

app.controller("VideoBattleEditorController", [
	"$scope", "VideoBattleService", function ($scope, VideoBattleService) {

	    //ctor ;)
	    $scope.init = function (model) {
	        $scope.VideoBattle = model;

	        //date time handling for json date
	        $scope.VideoBattle.DateCreated = parseJsonDate(model.DateCreated);
	        $scope.VideoBattle.DateUpdated = parseJsonDate(model.DateUpdated);
	        $scope.VideoBattle.AcceptanceLastDate = parseJsonDate(model.AcceptanceLastDate);
	        $scope.VideoBattle.VotingLastDate = parseJsonDate(model.VotingLastDate);


	    };


	    $scope.$watch("createBattleForm.$valid", function (newVal) {
	        $scope.FormValid = newVal;
	    });

	    $scope.processing = false;
	    $scope.saved = false;
	    $scope.SaveVideoBattle = function () {
	        if ($scope.FormValid) {

	            $scope.processing = true;

	            VideoBattleService.SaveVideoBattle($scope.VideoBattle,
					function (data) {
					    $scope.processing = false;
					    if (data.Success) {
					        $scope.saved = true;
					        if (data.RedirectTo) {
					            window.location.href = data.RedirectTo;
					        } else {

					        }
					    }
					},
					function (data) {
					    alert("Operation failed.");
					});
	        }
	    }
	}
]);


app.controller("VideoBattlePageController", [
	"$scope", "VideoBattleService", "$sce", function ($scope, VideoBattleService, $sce) {

	    //create a url based on the root 
	    var rootUrl = window.location.origin;

	    //config for video player
	    this.config = {
	        theme: rootUrl + "/Plugins/Widgets.mobSocial/Content/videogular/theme/videogular.css",
	        preload: "metadata",
	        plugins: {
	            poster: "http://www.videogular.com/assets/images/videogular.png"
	        }
	    };
	    $scope.GlobalVotingStatus = false; //keeps track if user has voted for at least a video and then shows watched on all participants

	    $scope.init = function (model) {
	        $scope.VideoBattle = model;

	        //setup sources for each video
	        for (var i = 0; i < $scope.VideoBattle.Participants.length; i++) {
	            var participant = $scope.VideoBattle.Participants[i];
	            participant.VideoSource = [];
	            if (participant.VideoPath !== null) {

	                participant.VideoSource.push(
                        { src: $sce.trustAsResourceUrl(participant.VideoPath.replace("~", rootUrl)), type: participant.MimeType }
                    );
	            }
	            if (participant.CurrentUserVote != null) {
	                participant.VideoWatched = true;
	                $scope.GlobalVotingStatus = true;
	            }
	        }
	        $scope.CheckVotingEligibility();
	    };

	    $scope.WatchedVideo = function (participantId) {

	        //mark video as watched
	        for (var i = 0; i < $scope.VideoBattle.Participants.length; i++) {
	            var participant = $scope.VideoBattle.Participants[i];
	            if (participant.Id === participantId) {
	                participant.VideoWatched = true;
	                break;
	            }
	        }
	        $scope.CheckVotingEligibility();

	    };
        
	    $scope.CheckVotingEligibility = function () {
	        $scope.VideoBattleComplete = true; //tracks if all the videos have been watched when voting is being done.
	        for (var i = 0; i < $scope.VideoBattle.Participants.length; i++) {
	            var participant = $scope.VideoBattle.Participants[i];
	            if (participant.VideoBattleParticipantStatus === 20 || participant.VideoBattleParticipantStatus === 0)
	                $scope.VideoBattleComplete = $scope.VideoBattleComplete && participant.VideoWatched;
	        }

	    }

	    $scope.VoteBattle = function (VideoBattleId, ParticipantId, VoteValue, Success, Error) {
	        VideoBattleService.VoteBattle(VideoBattleId,
	            ParticipantId,
	            VoteValue,
                function (data) {
                    if (data.Success) {
                        for (var i = 0; i < $scope.VideoBattle.Participants.length; i++) {
                            var participant = $scope.VideoBattle.Participants[i];
                            if (participant.Id === ParticipantId) {
                                participant.CurrentUserVote = true;
                                $scope.Voted = true;
                            } 
                        }
                    } else {
                        alert(data.Message);
                    }
                },
                function () {
                    alert("Operation failed");
                });
	    }

	    $scope.processing = false;
	    $scope.searchAPI = function (userInputString, timeoutPromise) {
	        return VideoBattleService.searchAPI(userInputString, timeoutPromise);
	    }
	    $scope.challengees = [];
	    $scope.CustomerSelected = function (callbackObject) {
	        $scope.challengees.push(callbackObject.originalObject);
	        $scope.$broadcast('angucomplete-alt:clearInput', 'customer-autocomplete');
	    }

	    $scope.RemoveChallengee = function (Id) {
	        //remove the manager from the array
	        for (var i = 0; i < $scope.challengees.length; i++) {
	            var mgr = $scope.challengees[i];
	            if (mgr.Id === Id) {
	                $scope.challengees.splice(i, 1);
	                break;
	            }
	        }
	    }

	    $scope.invited = false;
	    $scope.InviteParticipants = function () {
	        var participantIds = [];
	        for (var i = 0; i < $scope.challengees.length; i++) {
	            participantIds.push($scope.challengees[i].Id);
	        }
	        $scope.processing = true;
	        VideoBattleService.InviteParticipants($scope.VideoBattle.Id,
				participantIds,
				function (data) { //success
				    $scope.processing = false;
				    $scope.invited = true;
				    //clear the challengees
				    $scope.challengees.splice(0, $scope.challengees.length);

				}, function () { //error
				    $scope.processing = false;
				    alert("Error occured");
				});
	    }
	    $scope.processingAcceptOrDenyInvite = false;
	    $scope.inviteAccepted = false;
	    $scope.AcceptOrDenyInvite = function (VideoBattleId, ParticipantStatus) {
	        $scope.processingAcceptOrDenyInvite = true;
	        VideoBattleService.UpdateParticipantStatus(VideoBattleId, ParticipantStatus,
				function (data) {
				    if (data.Success) {
				        $scope.processingAcceptOrDenyInvite = false;

				        for (var i = 0; i < $scope.VideoBattle.Participants.length; i++) {
				            var participant = $scope.VideoBattle.Participants[i];
				            if (participant.Id === data.ParticipantId) {
				                $scope.VideoBattle.Participants[i].VideoBattleParticipantStatus = data.ParticipantStatus;
				                break;
				            }
				        }

				    }
				},
				function (data) {
				    $scope.processingAcceptOrDenyInvite = false;
				    alert("error occurred");
				});
	    };

	    $scope.UploadSuccess = function (fileItem, data, status, headers) {
	        //let's show the video as soon as uploaded
	        for (var i = 0; i < $scope.VideoBattle.Participants.length; i++) {
	            var participant = $scope.VideoBattle.Participants[i];
	            if (participant.Id === data.ParticipantId) {

	                participant.VideoSource = [];
	                participant.VideoSource.push(
                       { src: $sce.trustAsResourceUrl(data.VideoPath.replace("~", rootUrl)), type: data.MimeType }
                    );
	                break;
	            }
	        }
	    };

	}
]);