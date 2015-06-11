app.controller("ArtistPageSearchCriteriaController", ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.term = '';
    $scope.searchDescriptions = false;
    $scope.count = 15;
    $scope.page = 1;
    $scope.searchTypes = [
        "Songs", "Artists"
    ];
    $scope.searchType = 'Songs';
    $scope.searchArtists = false;

    $scope.$watchGroup(['term', 'searchDescription', 'count', 'searchType', 'searchArtists', 'artistName'], function () {
        //clear any timer on new change
        clearTimeout($scope.searchTimer);
        $scope.searchTimer = setTimeout(function () {
            $rootScope.$broadcast('ArtistPageSearch.SearchCriteriaChanged', {
                term: $scope.term,
                searchDescriptions: $scope.searchDescriptions,
                count: $scope.count,
                page: $scope.page,
                searchArtists: $scope.searchArtists,
                searchType: $scope.searchType,
                artistName: $scope.artistName
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
        if (data.searchArtists && data.artistName.length < 3) {
            return;
        }
        $scope.searching = true;
        $scope.term = data.term;
        $scope.searchType = data.searchType;
        $scope.results = [];
        //clear any audio if it's playing
        if ($rootScope.audio) {
            $rootScope.audio.pause();
        }
        $http({
            url: data.searchType == 'Artists' ? 'ArtistSearch' : 'SongSearch',
            method: "POST",
            data: data,
        }).success(function (data, status, headers, config) {
            $scope.results = data;
            $scope.searching = false;

        }).error(function (data, status, headers, config) {
            alert('An error has occured retrieving results.');
            $scope.searching = false;
        });

    });
}]);