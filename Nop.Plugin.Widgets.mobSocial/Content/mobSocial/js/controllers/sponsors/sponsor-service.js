app.service("SponsorService", ["globalApiEndPoint", "WebClientService", "$http", function (globalApiEndPoint, WebClientService, $http) {

    var apiEndPoint = globalApiEndPoint + "/sponsors";

    this.SaveSponsor = function (Sponsor, success, error) {
        WebClientService.post(apiEndPoint + "/savesponsor", Sponsor, success, error);
    };

    this.UpdateSponsor = function (Sponsor, success, error) {
        WebClientService.post(apiEndPoint + "/updatesponsor", Sponsor, success, error);
    };

    this.SaveSponsorData = function (SponsorData, success, error) {
        WebClientService.post(apiEndPoint + "/savesponsordata", SponsorData, success, error);
    };

    this.GetSponsors = function (sponsorRequest, success, error) {
        WebClientService.get(apiEndPoint + "/getsponsors", sponsorRequest, success, error);
    }

    this.GetSponsorTransactions = function (SponsorCustomerId, BattleId, BattleType, success, error) {
        WebClientService.get(apiEndPoint + "/getsponsortransactions", {
            BattleId: BattleId,
            BattleType: BattleType,
            CustomerId: SponsorCustomerId
        }, success, error);
    }

    this.SaveSponsorProductPrizes = function (Prizes, success, error) {
        WebClientService.post(apiEndPoint + "/savesponsorproductprizes", Prizes, success, error);
    }

    this.ProductPrizesFormPopup = function (BattleId, BattleType, success, error) {
        $http.post("/Sponsor/ProductPrizesFormPopup", { BattleId: BattleId, BattleType: BattleType })
          .success(success)
          .error(error);
    }
}
]);