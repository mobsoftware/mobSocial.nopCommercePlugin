"use strict";

app.service("PaymentService", ["$http", function ($http) {
    this.PaymentFormPopup = function (BattleId, BattleType, PurchaseType, Success, Error) {
        $http.post("/Payment/PaymentFormPopup", {BattleId: BattleId, BattleType: BattleType, PurchaseType: PurchaseType})
       .success(Success)
       .error(Error);
    }

    this.PurchasePurchasePass = function (PurchasePass, Success, Error) {
        $http.post("/Payment/PurchasePass", PurchasePass)
       .success(Success)
       .error(Error);
    }
}]);
