app.factory('autoCompleteDataService', ['$http', function ($http) {
    return {
        getSource: function (term) {

            if (term == '' || term == null) {
                return;
            }

            var url = '/Song/Search'
            var data = { Term: term };

            var getAutoCompleteData = $http.post(url, data)
                .success(function (data, status, headers, config) {
                    var items = { items: data };
                    return items;
                })
                .error(function (data, status, headers, config) {
                    alert('An error occurec retrieving songs');
                });

            return getAutoCompleteData;


        }
    }
}]);


/*

*/