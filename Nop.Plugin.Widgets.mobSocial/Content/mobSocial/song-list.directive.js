app
    .directive('songList', ['rootUrl', function (rootUrl) {
        return {
            restrict: 'E',
            scope:
            {
                customer: '=',
                songListName: '@'
            },
            link: function ($scope, element, attrs) {
                $scope.addFavoriteSong = function () {
                    $('#addFavoriteSongDialog').dialog();
                }
            },
            templateUrl: rootUrl + '/song-list.template.html'
        }
    }]);