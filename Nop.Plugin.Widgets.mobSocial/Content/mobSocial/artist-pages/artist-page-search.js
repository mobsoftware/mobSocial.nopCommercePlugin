app.controller("ArtistPageSearchCriteriaController", ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.term = '';
    $scope.searchDescriptions = false;
    $scope.count = 15;
    $scope.page = 1;
    $scope.searchTypes = [
        "Songs", "Artists"
    ];
    $scope.searchType = 'Songs';

    $scope.$watchGroup(['term', 'searchDescription', 'count', 'searchType'], function () {
        //clear any timer on new change
        clearTimeout($scope.searchTimer);
        $scope.searchTimer = setTimeout(function () {
            $rootScope.$broadcast('ArtistPageSearch.SearchCriteriaChanged', {
                term: $scope.term,
                searchDescriptions: $scope.searchDescriptions,
                count: $scope.count,
                page: $scope.page,
                searchType : $scope.searchType
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
        $scope.term = data.term;
        $scope.searchType = data.searchType;
        $scope.results = [];
        $http({
            url: data.searchType == 'Artists' ? 'ArtistSearch' : 'SongSearch',
            method: "POST",
            data: data,
        }).success(function (data, status, headers, config) {
            $scope.results = data;

        }).error(function (data, status, headers, config) {
            alert('An error has occured retrieving results.');
        });

    });
}]);