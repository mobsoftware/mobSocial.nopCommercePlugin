

app
    .factory('profileService', ['$rootScope', '$scope', '$http', '$attrs', 'rootUrl',
        function ($rootScope, $scope, $http, $attrs) {

            $scope.AddFavoriteSong = function (favoriteSong) {
                var url = rootUrl + './CustomerProfile/AddFavoriteSong';
                $http.post(url, favoriteSong);
            };



        }]);


