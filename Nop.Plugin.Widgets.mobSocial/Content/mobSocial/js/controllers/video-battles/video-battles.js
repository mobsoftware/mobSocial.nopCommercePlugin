"use strict";


//some generic functions before controllers
//TODO: MOVE THESE FUNCTIONS TO SEPARATE FILE
//parses json date
function parseJsonDate(value) {
    return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
}
//check if an element is in view area
function isScrolledIntoView(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

app.requires = app.requires.concat(["ngSanitize",
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster",
            "com.2fdevs.videogular.plugins.imaads", 'timer']);

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
	    $scope.recordSaved = false;
	    $scope.SaveVideoBattle = function () {
	        if ($scope.FormValid) {
                //check for dates
                if ($scope.VideoBattle.VotingLastDate < $scope.VideoBattle.AcceptanceLastDate) {
                    alert("Voting Last Date must be greater than Acceptance Last Date");
                    return;
                }
	            $scope.processing = true;

	            VideoBattleService.SaveVideoBattle($scope.VideoBattle,
					function (data) {
					    $scope.processing = false;
					    if (data.Success) {
					        $scope.recordSaved = true;
					        if (data.RedirectTo) {
					            window.location.href = data.RedirectTo;
					        } else {

					        }
					    } else {
					        alert(data.Message);
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

        //ie fix
	    if (!window.location.origin) {
	        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
	    }
	    //create a url based on the root 
	    var rootUrl = window.location.origin;

	    //config for video player
	    this.config = {
	        theme: rootUrl + "/Plugins/Widgets.mobSocial/Content/Libraries/videogular/theme/videogular.css",
	        preload: "metadata",
	        plugins: {
	            poster: "/Plugins/Widgets.mobSocial/Content/mobsocial/images/poweredby.jpg"
	        }
	    };
	    $scope.GlobalVotingStatus = false; //keeps track if user has voted for at least a video and then shows watched on all participants
	    $scope.IsVideoPlaying = false;
	    $scope.PlayingParticipant = null;

        //for rendering html for description
        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };

        //constructor...huh...yes
        $scope.init = function (model) {
            //initialize the battle
            $scope.VideoBattle = model;
            //currently visible page. initialize to zero
            $scope.VisiblePage = 0;
            //total count to be shown per page
            $scope.VisiblePerPage = 1;
            //the participants which are visible for current page
	        $scope.VisibleParticipants = [];

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
	            
	            //an extra object as well
	            participant.extras = {};
	            participant.adextras = false;
	        }//end of loop



	        //randomly select any participant to include extra data
	        //TODO: select participant using some algorithm

            //setup a timeout to check if the ajax request is complete for ad loading or not
            var doFallbackTimeout = 10; //seconds
	        var ajaxNotComplete = setInterval(function () {
	            if (window["mobads_video_inline"] == null) { //why not $window injection? TODO:
	                doFallbackTimeout -= 0.5; //half a second reduced in each iteration
                    if (doFallbackTimeout > 0) {
                        return;
                    }
	                //it's been 10 seconds and we don't have any ads yet, let's put a fallback
	                window["mobads_video_inline"] = { };
	            }
	           
                //clear now
	            clearInterval(ajaxNotComplete);

	            var randomPartIndex = Math.floor(Math.random() * ($scope.VideoBattle.Participants.length));
	            
	            if (randomPartIndex < $scope.VideoBattle.Participants.length) {
	                eval("$scope._video_inline_data = " + window["mobads_video_inline"]);
	                $scope.ExtraData = $scope._video_inline_data;
	                var participant = $scope.VideoBattle.Participants[randomPartIndex];
                    //assign temporarily to another variable because otherwise it'll start immediately
	                participant.adextras = $scope.ExtraData;
	               
	            }
	        }, 500);
	        
	        $scope.CheckVotingEligibility();

            //load the data initially
	        $scope.LoadNextPage();

            //also setup a scroller so that next page is loaded as soon as load more comes into view
            //jquery dependency
            jQuery(window).scroll(function() {
                if (isScrolledIntoView(".pagination-load-more")) {
                   
                    $scope.LoadNextPage();
                    $scope.$apply();
                }
            });
        };

        $scope.LoadNextPage = function () {
           
            //let's increase the page number
            $scope.VisiblePage++;
           
            var start = $scope.VisibleParticipants.length;
            var end = start + $scope.VisiblePerPage;

            if (start === $scope.VideoBattle.Participants.length) {
                //done with all the participants data
                return;
            }
            if (end > $scope.VideoBattle.Participants.length) {
                end = $scope.VideoBattle.Participants.length;
            }
            
            for (var i = start; i < end; i++) {
                $scope.VisibleParticipants.push($scope.VideoBattle.Participants[i]);
            }
           
        }

        //initialize api for interations
	    $scope.PlayerReady = function (participant, API) {
	        participant.API = API;
	    };

	    $scope.UpdateState = function (participant, state) {
	       
            //show the ad when the video is played
	        if (state === "play") {
	            
                if ($scope.IsVideoPlaying && participant !== $scope.PlayingParticipant) {
                    participant.API.stop();
                    alert("Another video is already playing.");
                    return;
                }
               if (participant.adextras && !participant.extras.network && !$scope.IsAdPlaying) {
                   participant.extras = participant.adextras;
                   $scope.IsAdPlaying = true;
               }
               
               $scope.IsVideoPlaying = true;
	           $scope.PlayingParticipant = participant;
	          
	        }
	        else if (state === "stop" && !$scope.IsAdPlaying) {
	          
	            $scope.IsVideoPlaying = false;
	            $scope.IsAdPlaying = false;
	        }

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
            //video played. stop now
	        $scope.IsAdPlaying = false;
	        $scope.IsVideoPlaying = false;
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
                                participant.TotalVoters++;
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
        $scope.InviteParticipants = function() {
            var participantIds = [];
            for (var i = 0; i < $scope.challengees.length; i++) {
                participantIds.push($scope.challengees[i].Id);
            }
            $scope.processing = true;
            VideoBattleService.InviteParticipants($scope.VideoBattle.Id,
                participantIds,
                function(data) { //success
                    $scope.processing = false;
                    $scope.invited = true;
                    //clear the challengees
                    $scope.challengees.splice(0, $scope.challengees.length);

                }, function() { //error
                    $scope.processing = false;
                    alert("Error occured");
                });
        };

        $scope.joinBattleProcessed = false;
        $scope.JoinBattle = function () {
            VideoBattleService.JoinBattle($scope.VideoBattle.Id,
             function (data) { //success
                 if (data.Success) {
                     $scope.joinBattleProcessed = true;

                 } else {
                     alert(data.Message);
                 }

             }, function () { //error
                 alert("Error occured");
             });
        };

        $scope.InviteVoters = function () {
            var participantIds = [];
            for (var i = 0; i < $scope.challengees.length; i++) {
                participantIds.push($scope.challengees[i].Id);
            }
            $scope.processing = true;
            VideoBattleService.InviteVoters($scope.VideoBattle.Id,
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
        };

	    $scope.processingAcceptOrDenyInvite = false;
	    $scope.inviteAccepted = false;
	    $scope.AcceptOrDenyInvite = function (VideoBattleId, ParticipantStatus, ParticipantId) {
            if (!confirm('Are you sure?')) {
                return;
            }
	        $scope.processingAcceptOrDenyInvite = true;
	        VideoBattleService.UpdateParticipantStatus(VideoBattleId, ParticipantStatus, ParticipantId,
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

app.controller("VideoBattlesPageController", ['$scope', 'VideoBattleService',
    function ($scope, VideoBattleService) {
        $scope.Page = 1;
        $scope.Count = 15;
        $scope.processing = false;

        $scope.GetVideoBattles = function (ViewType) {
            $scope.processing = true;
            $scope.VideoBattles = [];
            VideoBattleService.GetVideoBattles(ViewType, $scope.Page, $scope.Count,
                function(data) {
                    if (data.Success) {
                        $scope.VideoBattles = data.VideoBattles;
                        $scope.loaded = true;
                    }
                    $scope.processing = false;
                },
                function (data) {
                    $scope.processing = false;
                    alert("error occurred");
                });
        };
        $scope.GetVideoBattles('open'); //load default view

        $scope.EditVideoBattle = function(VideoBattleId) {
            window.location.href = "/VideoBattles/Editor/" + VideoBattleId;
        }

        $scope.DeleteVideoBattle = function (VideoBattleId) {
            if (!confirm("Are you sure you wish to delete this battle?")) {
                return;
            }

            VideoBattleService.DeleteVideoBattle(VideoBattleId, function(data) {
                if (data.Success) {
                    for (var i = 0; i < $scope.VideoBattles.length; i++) {
                        if ($scope.VideoBattles[i].Id === VideoBattleId) {
                            $scope.VideoBattles.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    alert(data.Message);
                }
            }, function(data) {
                alert("Error ocurred");
            });

        }

    }
]);