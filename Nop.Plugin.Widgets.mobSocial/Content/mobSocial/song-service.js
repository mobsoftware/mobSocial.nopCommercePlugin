app.factory('autoCompleteDataService', ['$http', function ($http) {
    return {
        getSource: function (request, response) {

            if (request == '' || request == null) {
                return;
            }

            var url = 'http://developer.echonest.com/api/v4/artist/suggest?api_key=DQFW7ZCMHBBLMLVFE&name=' + request.term + '&results=5';
            console.log(url);
            console.log(request.term);

            $http.get(url).
                    success(function (data, status, headers, config) {

                        var artistNames = [];

                        response($.map(data.response.artists, function (item) {
                            return {
                                label: item.name,
                                value: item.name
                            }
                        }));


                    }).
                        error(function (data, status, headers, config) {
                            alert('error happned');
                        });


        }
    }
}]);


/*

*/