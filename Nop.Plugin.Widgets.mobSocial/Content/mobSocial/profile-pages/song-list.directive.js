app
    .directive('songList', ['rootUrl', 'profileService', function (rootUrl, profileService) {
        return {
            restrict: 'E',
            scope:
            {
                customer: '=',
                songListName: '@'
            },
            link: function ($scope, element, attrs) {
                $scope.openAddFavoriteSongDialog = function () {
                    $('#addFavoriteSongDialog').dialog({
                        buttons: {
                            'Add': function () {

                                var url = './CustomerProfile/AddFavoriteSong';

                                var favoriteSong = {
                                    CustomerId: 1,
                                    TrackId: 1,
                                    Title: $('#addFavoriteSongDialog #selectedSong').val(),
                                    ArtistId: 1,
                                    ArtistName: 'testartistname',
                                    PreviewUrl: 'http://test'
                                };

                                profileService.AddFavoriteSong(favoriteSong);

                                $(this).dialog("close");

                            },
                            Cancel: function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                }
            },
            templateUrl: rootUrl + '/song-list.template.html'
        }
    }]);