app.controller("ArtistPageSearchCriteriaController", ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.term = '';
    $scope.searchDescriptions = false;
    $scope.count = 15;
    $scope.page = 1;
    $scope.$watchGroup(['term', 'searchDescription', 'count'], function () {
        //clear any timer on new change
        clearTimeout($scope.searchTimer);
        $scope.searchTimer = setTimeout(function () {
            $rootScope.$broadcast('ArtistPageSearch.SearchCriteriaChanged', {
                term: $scope.term,
                searchDescriptions: $scope.searchDescriptions,
                count: $scope.count,
                page: $scope.page
            });
        }, 300);
        
    });
}]);

app.controller("ArtistPageSearchController", ['$rootScope','$scope', '$http', function ($rootScope, $scope, $http) {

    $rootScope.$on("ArtistPageSearch.SearchCriteriaChanged", function (event, data) {
        if (data.term == '' || data.term.length < 3)
        {
            return;
        }
        var searchData = {
            term: data.term,
            searchDescriptions: data.searchDescriptions,
            count: data.count,
            page: data.page
        };
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