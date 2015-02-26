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
            $scope.stateProvinceId = null;

            $scope.$watchGroup(['name', 'stateProvinceId'], function () {
                $rootScope.$broadcast('BusinessPageSearch.SearchCriteriaChanged', { name: $scope.name, stateProvinceId: $scope.stateProvinceId });
            });

        }
    ])

    .controller('BusinessPageSearchController', [
        '$rootScope', '$scope', '$http', '$attrs', '$filter', function ($rootScope, $scope, $http, $attrs, $filter) {

            $scope.results = [];

            $rootScope.$on('BusinessPageSearch.SearchCriteriaChanged', function (event, data) {

                var data = { nameKeyword: data.name, stateProvinceId: data.stateProvinceId };

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
