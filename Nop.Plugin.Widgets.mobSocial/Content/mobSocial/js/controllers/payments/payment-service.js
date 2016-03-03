"use strict";

app.service("PaymentService", ["globalApiEndPoint", "WebClientService", function (globalApiEndPoint, WebClientService) {

    var apiEndPoint = globalApiEndPoint + "/payment";

    this.getPaymentForm = function (BattleId, BattleType, PurchaseType, success, error) {
        WebClientService.post("/Payment/PaymentFormPopup", { BattleId: BattleId, BattleType: BattleType, PurchaseType: PurchaseType }, success, error);
    }

    this.getAddressForm = function (BattleId, BattleType, PurchaseType, success, error) {
        WebClientService.post("/Payment/AddressFormPopup", { BattleId: BattleId, BattleType: BattleType, PurchaseType: PurchaseType }, success, error);
    }

    this.getAvailablePaymentMethods = function (BattleId, BattleType, PurchaseType, success, error) {
        WebClientService.get(apiEndPoint + "/getavailablepaymentmethods", { BattleId: BattleId, BattleType: BattleType, PurchaseType: PurchaseType }, success, error);
    };

    this.getAddressEntity = function (BattleId, BattleType, PurchaseType, success, error) {
        WebClientService.get(apiEndPoint + "/getaddressentity", { BattleId: BattleId, BattleType: BattleType, PurchaseType: PurchaseType }, success, error);
    };

    this.PurchasePurchasePass = function (PurchasePass, success, error) {
        WebClientService.post(apiEndPoint + "/purchasepass", PurchasePass, success, error);
    }
}]);
