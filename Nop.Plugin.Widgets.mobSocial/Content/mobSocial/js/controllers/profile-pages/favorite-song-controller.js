

app.controller('favoriteSongController', ['$rootScope', '$scope', '$http', '$attrs', 'autoCompleteDataService',
    function ($rootScope, $scope, $http, $attrs, autoCompleteDataService) {

        $scope.selectedFavoriteSong = null;


        $scope.songRender = function (item) {
            return {
                label: item.title,
                value: item.title,
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


