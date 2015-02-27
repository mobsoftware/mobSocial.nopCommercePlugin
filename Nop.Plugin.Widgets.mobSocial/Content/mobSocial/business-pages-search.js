app
    .controller('BusinessPageSearchCriteriaController', [
        '$rootScope', '$scope', '$http', '$attrs', '$filter', function ($rootScope, $scope, $http, $attrs, $filter) {

            // For testing
            //$scope.results = [
            //    {
            //        Title: "one",
            //        Url: "google.com",
            //        Subtitle: "test",
            //        ThumbnailUrl: ""
            //    }
            //];

            $scope.name = '';
            $scope.countries = [];
            $scope.states = [];
            $scope.stateProvinceId = null;
            $scope.countryId = null;


            $scope.$watch('countryId', function () {

                if ($scope.countryId === null) {
                    $scope.states = [];
                    return;
                }


                var data = { countryId: $scope.countryId };

                $http({
                    url: 'GetStateProvinces',
                    method: "POST",
                    data: data,
                }).success(function (data, status, headers, config) {
                    $scope.states = data;
                }).error(function (data, status, headers, config) {
                    alert('An error has occured retrieving state data.');
                });
            });


            $scope.$watchGroup(['name', 'stateProvinceId', 'countryId'], function () {
                $rootScope.$broadcast('BusinessPageSearch.SearchCriteriaChanged', {
                    name: $scope.name, stateProvinceId: $scope.stateProvinceId, countryId:
    $scope.countryId
                });
            });




            $http({
                url: 'GetAllCountries',
                method: "POST",
            }).success(function (data, status, headers, config) {
                $scope.countries = data;
            }).error(function (data, status, headers, config) {
                alert('An error has occured retrieving country data.');
            });

        }
    ])

    .controller('BusinessPageSearchController', [
        '$rootScope', '$scope', '$http', '$attrs', '$filter', function ($rootScope, $scope, $http, $attrs, $filter) {

            $scope.results = [];

            $rootScope.$on('BusinessPageSearch.SearchCriteriaChanged', function (event, data) {

                var data = { nameKeyword: data.name, stateProvinceId: data.stateProvinceId, countryId: data.countryId };

                $http({
                    url: 'Search',
                    method: "POST",
                    data: data,
                }).success(function (data, status, headers, config) {
                    $scope.results = data;
                }).error(function (data, status, headers, config) {
                    alert('An error has occured retrieving results.');
                });
            });

        }]);
