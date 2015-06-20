app.directive("buySongButton", ['$http', function ($http) {
    return {
        restrict: "A",
        scope: false,
        link: function (scope, elem, attr) {

            elem.bind("click", function () {
                if (attr.affiliateurl && attr.affiliateurl != '') {
                    window.open(attr.affiliateurl);
                }
                else {
                    AjaxCart.addproducttocart_catalog('/addproducttocart/catalog/' + attr.productid + '/1/1');
                }

            });
        }
    };
}]);