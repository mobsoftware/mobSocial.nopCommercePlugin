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
			$scope.VideoBattle.VotingStartDate = parseJsonDate(model.VotingStartDate);
			$scope.VideoBattle.VotingEndDate = parseJsonDate(model.VotingEndDate);

		};


		$scope.$watch("createBattleForm.$valid", function (newVal) {
			$scope.FormValid = newVal;
		});

		$scope.processing = false;
		$scope.recordSaved = false;
		$scope.SaveVideoBattle = function () {
			if ($scope.FormValid) {
		        //a bug occurs if none of calendar is ever touched. In that case the dates contain string
		        //todo: find a solution to this problem
		        //quickfix:
		        $scope.VideoBattle.VotingEndDate = new Date($scope.VideoBattle.VotingEndDate);
		        $scope.VideoBattle.VotingStartDate = new Date($scope.VideoBattle.VotingStartDate);
				//check for dates
				if ($scope.VideoBattle.VotingEndDate < $scope.VideoBattle.VotingStartDate) {
					alert("Voting Last Date must be greater than Voting Start Date");
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

		$scope.NewPrize = function () {
			$scope.VideoBattle.Prizes.push({
				VideoBattleId: $scope.VideoBattle.Id,
				Id: 0,
				PrizeType: 1,
				PrizeAmount: 1000,
				PrizePercentage: 50
			});
			$scope.RefreshWinnerPositions();
		}

		$scope.RefreshWinnerPositions = function () {
			for (var i = 0; i < $scope.VideoBattle.Prizes.length; i++) {
				$scope.VideoBattle.Prizes[i].WinnerPosition = i + 1;
			}
		}

		$scope.SavePrize = function (prize) {
			VideoBattleService.SavePrize(prize, function (response) {
				if (response.Success) {
	                prize.Id = response.Id;
	                prize.Saved = true;
	            } else {
	                if (response.Message)
	                    alert(response.Message);
	            }
	            //success
	        }, function () {
	            //error
	            alert("An error occured while saving prize");
	        });
	    }
	    $scope.DeletePrize = function (prize) {

			var removed = true;
			if (prize.Id != 0) {
				if (!confirm("Are you sure you wish to remove this prize?")) {
					return;
				}
				//ajax
				VideoBattleService.DeletePrize(prize, function (response) {
					if (!response.Success) {
						removed = false;
						alert(response.Message);
					}
				}, function () {
					removed = false;
					alert("An error occured while removing prize");
				});
			}
			if (removed) {
				for (var i = 0; i < $scope.VideoBattle.Prizes.length; i++) {
					var p = $scope.VideoBattle.Prizes[i];
					if (p === prize) {
						$scope.VideoBattle.Prizes.splice(i, 1);
					}
				}
				$scope.RefreshWinnerPositions();
			}

		}
	}
]);


app.controller("VideoBattlePageController", [
	"$scope", "VideoBattleService", "PaymentService", "SponsorService", "$sce", "$interval", "$compile", function ($scope, VideoBattleService, PaymentService, SponsorService, $sce, $interval, $compile) {

		//TODO: Organize the VideoBattleController as it's too big 
		var controller = this;

		//ie fix
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		//create a url based on the root 
		var rootUrl = window.location.origin;
		var defaultPoster = rootUrl + "/Plugins/Widgets.mobSocial/Content/mobsocial/images/poweredby.jpg";
		//config for video player
		this.config = {
			theme: rootUrl + "/Plugins/Widgets.mobSocial/Content/Libraries/videogular/theme/videogular.css",
			preload: "metadata",
			plugins: {
				poster: defaultPoster
			}
		};


		//global api for theater mode because we have single player there.
		this.PlayerReady = function (API) {
			controller.API = API;

			//play first participant in case view mode is theater
			if ($scope.VideoBattle.ViewMode == 1) {
				$scope.PlayParticipant($scope.VideoBattle.Participants[0]);
			}

		}


		$scope.GlobalVotingStatus = false; //keeps track if user has voted for at least a video and then shows watched on all participants
		$scope.IsVideoPlaying = false;
		$scope.PlayingParticipant = null;

		$scope.PurchasePass = {};
		$scope.PurchasePass.CustomerPaymentRequest = {};


	    //variables to track payment progress
		$scope.PaymentProcessInfo = {
		    PaymentProgressChecker: null,
		    PaymentProcessComplete: false,
		    PaymentProcessCancelled: false,
		    PaymentProcessSuccess: false,
            Response: null
		};




	    //for rendering html for description
	    $scope.renderHtml = function (html_code) {
	        return $sce.trustAsHtml(html_code);
	    };

	    //autoplay by default
	    $scope.Autoplay = true;

	    //constructor...huh...yes
	    $scope.init = function (model) {

	        //initialize the battle
	        $scope.VideoBattle = model;
	        //cookie to store the videos already watched
	        $scope.CookieName = "watchedVideo[" + $scope.VideoBattle.Id + "][" + $scope.VideoBattle.LoggedInUserId + "]";
	        //currently visible page. initialize to zero
	        $scope.VisiblePage = 0;
	        //total count to be shown per page
	        $scope.VisiblePerPage = 10;
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
	            if (participant.ThumbnailPath == null || participant.ThumbnailPath === "") {
	                participant.ThumbnailPath = defaultPoster;
	            } else {
	                //make the url absolute for the thumbnail of video
	                participant.ThumbnailPath = participant.ThumbnailPath.replace("~", rootUrl);
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
	                window["mobads_video_inline"] = typeof get_video_ad != "undefined" ? get_video_ad() : false; //function defined dynamically. in Mobads public
	            }

	            //clear now
	            clearInterval(ajaxNotComplete);

	            var randomPartIndex = Math.floor(Math.random() * ($scope.VideoBattle.Participants.length));

	            if (randomPartIndex < $scope.VideoBattle.Participants.length) {
	                if (typeof window["mobads_video_inline"] == "object") {
	                    $scope._video_inline_data = window["mobads_video_inline"];
	                } else {
	                    eval("$scope._video_inline_data = " + window["mobads_video_inline"]);
	                }

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
	        jQuery(window).scroll(function () {
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
			else if (state === "pause" && participant.VideoWatched) {

				$scope.IsVideoPlaying = false;
				$scope.IsAdPlaying = false;
			}

		};

		$scope.WatchedVideo = function (participantId) {

			var nextParticipant = null; //to 

			//mark video as watched
			for (var i = 0; i < $scope.VideoBattle.Participants.length; i++) {
				var participant = $scope.VideoBattle.Participants[i];
				if (participant.Id === participantId) {
					$scope.SetVideoWatched(participant);

					if ($scope.VideoBattle.Participants.length - 1 > i) {
						nextParticipant = $scope.VideoBattle.Participants[i + 1];
					}
					break;
				}
			}
			$scope.CheckVotingEligibility();
			//video played. stop now
			$scope.IsAdPlaying = false;
			$scope.IsVideoPlaying = false;

			//if auto play is on then we'll play the next video in sequence
			if ($scope.Autoplay) {

				if (nextParticipant != null && !$scope.VideoBattleComplete) {

					//for theater mode we need to call the playparticipant method directly
					if ($scope.VideoBattle.ViewMode == 1)
						$scope.PlayParticipant(nextParticipant, true);
					else
						nextParticipant.API.play();
				}
			}
		};

		$scope.PlayParticipant = function (participant, playImmediately) {
			if ($scope.PlayingParticipant == participant || $scope.IsVideoPlaying)
				return;

			controller.API.clearMedia();

			//if the view mode is theater, let's set the first participant as playing participant
			$scope.PlayingParticipant = participant;
			//we use controller's api method for that
			controller.API.changeSource(participant.VideoSource);
			//due to some weird bug videogular doesn't update source and we'll have to manually update sources
			controller.API.sources = participant.VideoSource;

			window.controller = controller;

			if (playImmediately) {
				setTimeout(function () { controller.API.play() }, 500);

			}
		}

		$scope.CheckVotingEligibility = function () {
			$scope.VideoBattleComplete = true; //tracks if all the videos have been watched when voting is being done.
			for (var i = 0; i < $scope.VideoBattle.Participants.length; i++) {
				var participant = $scope.VideoBattle.Participants[i];
				if (participant.VideoBattleParticipantStatus === 20 || participant.VideoBattleParticipantStatus === 0)
					$scope.VideoBattleComplete = $scope.VideoBattleComplete && participant.VideoWatched;
			}

		}

		$scope.VoteBattle = function (VideoBattleId, ParticipantId, VoteValue, IsPaidVoting, Success, Error) {

			var completeVoting = function (PurchasePassOrderId) {
				VideoBattleService.VoteBattle(VideoBattleId, ParticipantId, VoteValue, PurchasePassOrderId,
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

			if (IsPaidVoting) {
				//let's watch the credit card number as user types it
			    $scope.$watch("PurchasePass.CustomerPaymentRequest.CardNumber", function (newVal) {
					$scope.PurchasePass.CustomerPaymentRequest.CardIssuerType = getCardType(newVal);
				});

                //save the participant to show on popup
			    for (var i = 0; i < $scope.VideoBattle.Participants.length; i++) {
			        var participant = $scope.VideoBattle.Participants[i];
			        if (participant.Id === ParticipantId) {
			            $scope.ProposedParticipant = participant;
			            break;
			        }
			    }
			    


	            $scope.PaymentProcessMessage = "You are voting for " + $scope.ProposedParticipant.ParticipantName;

	            //show popup form for payment
	            $scope.RequestPaymentPopupForm(VideoBattleId, 1 /*video battle type = 1*/, 1 /*Voter Pass = 1*/);

	            //now wait till payment is done
	            $scope.PaymentProcessInfo.PaymentProgressChecker = $interval(function () {
	                if (!$scope.PaymentProcessInfo.PaymentProcessComplete || $scope.PaymentProcessInfo.PaymentProcessCancelled) {
	                    return;//not done yet
	                }

	                if ($scope.PaymentProcessInfo.PaymentProcessSuccess) {
	                    $scope.PurchasePass.ShowPaymentPopup = false;
	                    //so now complete the voting because payment has been done
	                    completeVoting($scope.PaymentProcessInfo.Response.PassId);
	                }

	                $interval.cancel($scope.PaymentProcessInfo.PaymentProgressChecker);
	            }, 500);

	        } else {
	            completeVoting();
	        }

	    }

	    $scope.RequestPaymentPopupForm = function (BattleId, BattleType, PurchaseType) {
	        //payment needs to be done, show the payment popup
	        $scope.PurchasePass.ShowPaymentPopup = true;
	        $scope.PurchasePass.PurchaseType = PurchaseType;

	        var popuparea = "#payment-form-popup-area";
	        jQuery(popuparea).html("");
	        PaymentService.PaymentFormPopup(BattleId, BattleType, PurchaseType, function (response) {

	            jQuery(popuparea).html(response);
	            jQuery("body").addClass("payment-process-on");
	            $compile(jQuery(popuparea))($scope);

	        });
	    };
        //this method is called from payment/paymentform view
	    $scope.StartPaymentProcess = function (PassId) {

	        if (PassId) {
	            //because the customer already has a voter/sponsor pass, why not use it if he wants to...
	            //just fake the process of payment and everything else should work
	            $scope.PaymentProcessInfo.PaymentProcessComplete = true;
	            $scope.PaymentProcessInfo.PaymentProcessSuccess = true;
	            $scope.PaymentProcessInfo.Response = {
	                PassId: PassId
	            };
	            return;

	        }

	        //remove previous invalidation for card number
	        $scope.createPaymentForm.cardNumber.$setValidity("invalid_number", true);

	        if ($scope.PurchasePass.CustomerPaymentMethodId == 0 && !$scope.createPaymentForm.$valid)
	            return;

	        $scope.PaymentProcessInfo.PaymentProcessComplete = false;

	        if ($scope.PurchasePass.CustomerPaymentMethodId == 0) {
	            //it's a new card so let's validate first

	            if (!isValidCreditCard($scope.PurchasePass.CustomerPaymentRequest.CardNumber)) {
	                $scope.createPaymentForm.cardNumber.$setValidity("invalid_number", false);
	                return;
	            }

	        }

	        $scope.PurchasePass.BattleId = $scope.VideoBattle.Id;
	        $scope.PurchasePass.BattleType = 1;//video battle
	        $scope.PurchasePass.PurchasingInProgress = true;

	        //also we won't be sending the voter pass id information because user didn't opt to pay by that
	        $scope.PurchasePass.PassId = 0;
	        //let's submit form information to server
	        PaymentService.PurchasePurchasePass($scope.PurchasePass, function (response) {
	            //set response status
	            if (response.Success) {
	                $scope.PaymentProcessInfo.Response = response;
	            } else {
	                //some error occured while processing payment, let the user know that
	                $scope.PaymentProcessMessage = response.Message;
	                $scope.PurchasePass.PurchasingInProgress = false;
	            }
	            $scope.PaymentProcessInfo.PaymentProcessComplete = true;
	            $scope.PaymentProcessInfo.PaymentProcessSuccess = response.Success;
	            jQuery("body").removeClass("payment-process-on");

	        }, function () {
	            $scope.PaymentProcessInfo.PaymentProcessComplete = true;

	        });

	    }
	    //stop payment explicit
	    $scope.StopPaymentProcess = function () {
	        $scope.PaymentProcessInfo.PaymentProcessCancelled = true;
	        $scope.PurchasePass.ShowPaymentPopup = false;
	        jQuery("body").removeClass("payment-process-on");
	    }

	    $scope.BecomeSponsor = function (BattleId) {

            //let's watch the credit card number as user types it
            $scope.$watch("PurchasePass.CustomerPaymentRequest.CardNumber", function (newVal) {
                $scope.PurchasePass.CustomerPaymentRequest.CardIssuerType = getCardType(newVal);
            });


            $scope.PaymentProcessMessage = "Sponsor " + $scope.VideoBattle.Name;

            //show popup form for payment
            $scope.RequestPaymentPopupForm(BattleId, 1 /*video battle type = 1*/, 2 /*Sponsor Pass = 2*/);
            $scope.PaymentProcessInfo.PaymentProcessComplete = false;
	        $scope.PaymentProcessInfo.PaymentProcessCancelled = false;
            //now wait till payment is done
            $scope.PaymentProcessInfo.PaymentProgressChecker = $interval(function () {
                if (!$scope.PaymentProcessInfo.PaymentProcessComplete || $scope.PaymentProcessInfo.PaymentProcessCancelled) {
                    return;//not done yet
                }

                if ($scope.PaymentProcessInfo.PaymentProcessSuccess) {
                    
                    //so now complete the sponsorship process because payment has been done
                    SponsorService.SaveSponsor({
                        BattleId: BattleId,
                        BattleType: 1 /*video battle*/,
                        SponsorPassId: $scope.PaymentProcessInfo.Response.PassId
                    }, function(response) {
                        //success
                        $scope.PurchasePass.ShowPaymentPopup = false;
                        //refresh the window
                        window.location.reload();

                    }, function(response) {
                        //failure
                        alert("Failed to complete operation");
                        $scope.PurchasePass.ShowPaymentPopup = false;
                    });
                }

                $interval.cancel($scope.PaymentProcessInfo.PaymentProgressChecker);
            }, 500);
        };

	    $scope.processing = false;
	    $scope.searchAPI = function (userInputString, timeoutPromise) {
	        var response = VideoBattleService.searchAPI(userInputString, timeoutPromise);
	        response.success(function (res) {
	            if (res.length == 0 && validateEmail(userInputString)) {
                    //because the response is zero, let's see if it's an email, if it is, we can add it for direct email invitation
	                res.push({ DisplayName: userInputString, Id: userInputString, EmailInvite: true });
                }
	        });
	        return response;
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
	        var emails = [];
	        for (var i = 0; i < $scope.challengees.length; i++) {
	            if ($scope.challengees[i].EmailInvite)
	                emails.push($scope.challengees[i].Id);
                else
	                participantIds.push($scope.challengees[i].Id);
	        }
	        $scope.processing = true;
	        VideoBattleService.InviteParticipants($scope.VideoBattle.Id,
				participantIds,
                emails,
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
	        var emails = [];
	        for (var i = 0; i < $scope.challengees.length; i++) {
	            if ($scope.challengees[i].EmailInvite)
	                emails.push($scope.challengees[i].Id);
	            else
	                participantIds.push($scope.challengees[i].Id);
	        }
	        $scope.processing = true;
	        VideoBattleService.InviteVoters($scope.VideoBattle.Id,
				participantIds,
                emails,
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
			if (ParticipantStatus === 30 && !confirm('Are you sure?')) {
				//confirm only when it's a deny
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

	                participant.ThumbnailPath = data.ThumbnailPath.replace("~", rootUrl);
	                participant.VideoSource = [];
	                participant.VideoPath = data.VideoPath.replace("~", rootUrl);

	                participant.VideoSource.push(
                        { src: $sce.trustAsResourceUrl(data.VideoPath.replace("~", rootUrl)), type: data.MimeType }
                    );
	                

	                participant.API.changeSource(participant.VideoSource);
	                //due to some weird bug videogular doesn't update source and we'll have to manually update sources
	                participant.API.sources = participant.VideoSource;

	                break;
	            }
	        }
	    };

	    //marks a participant video watched and sends it to server
	    $scope.SetVideoWatched = function (participant) {
	        if (participant.VideoWatched) {
	            //we already have that video watched in our cookie, so no need to do anything
	            //user might have watched a video more than once
	            return;
	        }
	        //send the watched video information to server
	        VideoBattleService.MarkVideoWatched($scope.VideoBattle.Id, participant.Id, participant.VideoId, function () {
	            //success
	        }, function () {
	            //failure
	        });
	        participant.VideoWatched = true;
	    }

	    $scope.UploadCoverSuccess = function (fileItem, data, status, headers) {

	       if (data.Success && data.Images.length > 0) {
	           $scope.VideoBattle.TemporaryCoverImageUrl = data.Images[0].ImageUrl;
	           $scope.VideoBattle.TemporaryCoverId = data.Images[0].ImageId;
	           $scope.VideoBattle.TemporaryCover = true;
	       }
	    };

	    $scope.SetPictureAsCover = function (VideoBattleId, PictureId, setOrReset) {
            if (setOrReset) {
                VideoBattleService.SetPictureAsCover(VideoBattleId, PictureId, function(data) {
                    if (data.Success) {
                        $scope.VideoBattle.VideoBattleCoverImageUrl = $scope.VideoBattle.TemporaryCoverImageUrl;
                        $scope.VideoBattle.TemporaryCoverId = 0;
                        $scope.VideoBattle.TemporaryCover = false;
                        $scope.VideoBattle.TemporaryCoverImageUrl = false;

                    }
                }, function(data) {

                });
            } else {
                $scope.VideoBattle.TemporaryCoverId = 0;
                $scope.VideoBattle.TemporaryCover = false;
                $scope.VideoBattle.TemporaryCoverImageUrl = false;
            }
           

	    }

        $scope.ShowPrizeDetails = false;
        $scope.GetPrizeDetails = function(VideoBattleId) {
            VideoBattleService.GetPrizeDetails(VideoBattleId, function(data) {
                if (data.Success) {
                    $scope.ShowPrizeDetails = true;
                    $scope.Prizes = data.Prizes;
                } else {
                    alert(data.Message);
                }
            }, function(data) {
                alert("An error occured while performing operation");
            });
        }

        $scope.HidePrizeDetails = function() {
            $scope.ShowPrizeDetails = false;
        }
	}
]);

app.controller("VideoBattlesPageController", ['$scope', 'VideoBattleService',
	function ($scope, VideoBattleService) {

        $scope.init = function(Query) {
            $scope.GetVideoBattles(Query.ViewType, Query.SearchTerm); //load default view
        }

		$scope.Page = 1;
		$scope.Count = 15;
		$scope.processing = false;

		$scope.GetVideoBattles = function (ViewType, SearchTerm) {
			$scope.processing = true;
			$scope.VideoBattles = [];
			VideoBattleService.GetVideoBattles(ViewType, SearchTerm, 0, $scope.Page, $scope.Count,
				function (data) {
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
	  
		

		$scope.EditVideoBattle = function (VideoBattleId) {
			window.location.href = "/VideoBattles/Editor/" + VideoBattleId;
		}

		$scope.DeleteVideoBattle = function (VideoBattleId) {
			if (!confirm("Are you sure you wish to delete this battle?")) {
				return;
			}

			VideoBattleService.DeleteVideoBattle(VideoBattleId, function (data) {
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
			}, function (data) {
				alert("Error ocurred");
			});

		}

	}
]);