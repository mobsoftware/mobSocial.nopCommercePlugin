app
    .controller('BusinessPageSearchCriteriaController', [
        '$rootScope', '$scope', '$http', '$attrs', '$filter', function($rootScope, $scope, $http, $attrs, $filter) {

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
            $scope.city = '';
            $scope.country = null;
            $scope.stateProvince = null;

            $scope.countries = [];
            $scope.states = [];

            $scope.$watch('country', function() {

                if ($scope.country == null || $scope.country.Id == null) {
                    $scope.stateProvince = null;
                    $scope.states = [];
                    return;
                }

                var data = { countryId: $scope.country.Id };

                $http({
                    url: 'BusinessPage/GetStateProvinces',
                    method: "POST",
                    data: data,
                }).success(function(data, status, headers, config) {
                    var firstItem = { Id: null, Name: 'Select a State' };
                    data.unshift(firstItem);
                    $scope.states = data;
                }).error(function(data, status, headers, config) {
                    alert('An error has occured retrieving state data.');
                });

            });


            $scope.$watchGroup(['name', 'city', 'stateProvince', 'country'], function() {
                $rootScope.$broadcast('BusinessPageSearch.SearchCriteriaChanged', {
                    name: $scope.name,
                    city: $scope.city,
                    stateProvince: $scope.stateProvince,
                    country: $scope.country
                });
            });


            $http({
                url: 'BusinessPage/GetAllCountries',
                method: "POST"
            }).success(function(data, status, headers, config) {
                var firstItem = { Id: null, Name: 'Select a Country' };
                data.unshift(firstItem);
                $scope.countries = data;
            }).error(function(data, status, headers, config) {
                alert('An error has occured retrieving country data.');
            });

        }
    ])
    .controller('BusinessPageSearchController', [
        '$rootScope', '$scope', '$http', '$attrs', '$filter', function($rootScope, $scope, $http, $attrs, $filter) {

            $scope.results = [];

            $rootScope.$on('BusinessPageSearch.SearchCriteriaChanged', function(event, data) {

                var data = {
                    nameKeyword: data.name,
                    city: data.city,
                    stateProvinceId: (data.stateProvince == null) ? null : data.stateProvince.Id,
                    countryId: (data.country == null) ? null : data.country.Id
                };

                $http({
                    url: 'BusinessPageSearch',
                    method: "POST",
                    data: data,
                }).success(function(data, status, headers, config) {
                    $scope.results = data;
                }).error(function(data, status, headers, config) {
                    alert('An error has occured retrieving results.');
                });
            });

        }
    ]);
