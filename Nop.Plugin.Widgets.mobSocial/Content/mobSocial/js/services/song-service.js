app.factory('autoCompleteDataService', ['$http', function ($http) {
    return {
        getSource: function (term) {

            if (term == '' || term == null) {
                return;
            }

            var url = 'http://developer.echonest.com/api/v4/song/search?api_key=DQFW7ZCMHBBLMLVFE&format=json&results=5&title=' + term;

            var getAutoCompleteData = $http.get(url).then(function (data) {

                var items =
                     $.map(data.data.response.songs, function (item) {
                         return item;
                     });

                var results = { items: items };

                return results;
            });

            return getAutoCompleteData;


        }
    }
}]);


/*

*/