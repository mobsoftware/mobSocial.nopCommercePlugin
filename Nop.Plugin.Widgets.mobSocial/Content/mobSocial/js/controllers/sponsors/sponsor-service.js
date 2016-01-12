app.service("SponsorService", [
    "$http", function ($http) {
        this.SaveSponsor = function (Sponsor, Success, Error) {

            $http.post("/Sponsor/SaveSponsor", Sponsor)
                .success(Success)
                .error(Error);
        };

        this.UpdateSponsor = function (Sponsor, Success, Error) {

            $http.post("/Sponsor/UpdateSponsor", Sponsor)
                .success(Success)
                .error(Error);
        };

        this.SaveSponsorData = function (SponsorData, Success, Error) {

            $http.post("/Sponsor/SaveSponsorData", SponsorData)
                .success(Success)
                .error(Error);
        };

        this.GetSponsors = function (SponsorRequest, Success, Error) {
            $http.post("/Sponsor/GetSponsors", SponsorRequest)
                .success(Success)
                .error(Error);
        }

        this.GetSponsorTransactions = function (SponsorCustomerId, BattleId, BattleType, Success, Error) {
            $http.post("/Sponsor/GetSponsorTransactions", {
                BattleId: BattleId,
                BattleType: BattleType,
                CustomerId: SponsorCustomerId
            })
               .success(Success)
               .error(Error);
        }

        this.SaveSponsorProductPrizes = function (Prizes, Success, Error) {
            $http.post("/Sponsor/SaveSponsorProductPrizes", Prizes)
               .success(Success)
               .error(Error);
        }

        this.ProductPrizesFormPopup = function (BattleId, BattleType, Success, Error) {
            $http.post("/Sponsor/ProductPrizesFormPopup", {BattleId: BattleId, BattleType: BattleType})
              .success(Success)
              .error(Error);
        }
    }
]);