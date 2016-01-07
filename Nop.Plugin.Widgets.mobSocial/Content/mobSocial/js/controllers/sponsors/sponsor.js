"use strict";

app.controller("SponsorController", [
    "$scope", "SponsorService", function ($scope, SponsorService) {
        $scope.init = function(sponsorRequest) {
            $scope.SponsorRequest = sponsorRequest;
            //perform the first call
            $scope.GetSponsors(sponsorRequest.SponsorshipStatus);
        }
        $scope.Sponsors = [];
        $scope.GetSponsors = function (SponsorshipStatus) {
            $scope.SponsorRequest.SponsorshipStatus = SponsorshipStatus;
            $scope.SponsorsLoading = true;
            SponsorService.GetSponsors($scope.SponsorRequest, function (response) {
                if (response.Success) {
                    $scope.Sponsors[SponsorshipStatus] = response.Sponsors;
                    $scope.IsChallenger = response.IsChallenger;
                    $scope.IsSponsor = response.IsSponsor;
                    $scope.SponsorsLoading = false;
                }
                //success
            }, function(response) {
                //failure
                $scope.SponsorsLoading = false;
            });

            $scope.ActiveSponsor = null;
        }

        $scope.GetSponsorTransactions = function (Sponsor) {
            SponsorService.GetSponsorTransactions(Sponsor.CustomerId, $scope.SponsorRequest.BattleId, $scope.SponsorRequest.BattleType, function (response) {
                if (response.Success) {
                    Sponsor.SponsorTransactions = response.Orders;
                }
            }, function(response) {

            });
        }

        $scope.UpdateSponsor = function (Sponsor, SponsorshipStatus, ShowWarning) {
            if (ShowWarning) {
               if (!confirm("Are you sure you don't want this sponsorhip?")) {
                   return;
               }
            }
            var updateObj = {
                SponsorCustomerId: Sponsor.CustomerId,
                SponsorshipStatus: SponsorshipStatus,
                BattleId: $scope.SponsorRequest.BattleId,
                BattleType: $scope.SponsorRequest.BattleType
            };
            SponsorService.UpdateSponsor(updateObj, function() {
                Sponsor.SponsorshipStatus = SponsorshipStatus;
            }, function() {

            });
        }
        $scope.SaveSponsorData = function (SponsorData) {
            $scope.SponsorsLoading = true;
            SponsorService.SaveSponsorData(SponsorData, function (response) {
              if (response.Success) {
                  $scope.GetSponsors(SponsorData.SponsorshipStatus);
                  $scope.SponsorsLoading = false;
              }
            }, function () {
                $scope.SponsorsLoading = false;
            });
        };

        $scope.ActiveSponsor = null;
        $scope.BeforePictureUpload = function (Sponsor) {
            $scope.ActiveSponsor = Sponsor;
        }
        $scope.UploadPictureSuccess = function (fileItem, data, status, headers) {

            if (data.Success && data.Images.length > 0) {

                $scope.ActiveSponsor.SponsorData.TemporaryPictureUrl = $scope.ActiveSponsor.SponsorData.PictureUrl;
                $scope.ActiveSponsor.SponsorData.TemporaryPictureId = $scope.ActiveSponsor.SponsorData.PictureId;

                $scope.ActiveSponsor.SponsorData.PictureUrl = data.Images[0].ImageUrl;
                $scope.ActiveSponsor.SponsorData.PictureId = data.Images[0].ImageId;
              
               
            }
        };

        $scope.RevertImage = function(Sponsor) {
            Sponsor.SponsorData.PictureUrl = $scope.ActiveSponsor.SponsorData.TemporaryPictureUrl;
            Sponsor.SponsorData.PictureId = $scope.ActiveSponsor.SponsorData.TemporaryPictureId;
            Sponsor.SponsorData.TemporaryPictureId = 0;
        }

        $scope.SaveSponsorProductPrizes = function(Prizes) {
            $scope.SavingSponsorPrizes = true;
            SponsorService.SaveSponsorProductPrizes(Prizes, function (response) {
                if (response.Success) {
                    $scope.SavingSponsorPrizes = false;
                }
            }, function () {
                $scope.SavingSponsorPrizes = false;
            });
        }
    }
]);