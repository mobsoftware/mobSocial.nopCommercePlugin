"use strict";

app.service("PaymentService", ["$http", function ($http) {
    this.PaymentFormPopup = function (BattleId, BattleType, Success, Error) {
        $http.post("/Payment/PaymentFormPopup", {BattleId: BattleId, BattleType: BattleType})
       .success(Success)
       .error(Error);
    }

    this.PurchaseVoterPass = function (VoterPass, Success, Error) {
        $http.post("/Payment/PurchaseVoterPass", VoterPass)
       .success(Success)
       .error(Error);
    }
}]);
