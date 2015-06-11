
app
    .controller('favoriteSongController', ['$rootScope', '$scope', '$http', '$attrs', 'autoCompleteDataService',
    function ($rootScope, $scope, $http, $attrs, autoCompleteDataService) {

        $scope.selectedFavoriteSong = null;

        $scope.songRenderItemUi = function (ul, item) {
            var t = item.item.Name;
            //html encode
            t = htmlEncode(t);
            return $("<li></li>")
                .data("item.autocomplete", item.item)
                .append('<img src="' + item.item.ImageUrl + '" style="width:50px;vertical-align:middle;" /><span class="title">' + t + '</span>')
                .appendTo(ul);

        };

        $scope.songRender = function (item) {
            return {
                label: item.Name,
                value: item.Name,
                item: item
            }
        };

        $scope.httpSupplierService = function (request, response) {
            return autoCompleteDataService.getSource(request, response);
        };

        $scope.songSelect = function (val) {
            $scope.$parent.ngModel = val;
            $scope.selectedFavoriteSong = val;
        };


    }]);


