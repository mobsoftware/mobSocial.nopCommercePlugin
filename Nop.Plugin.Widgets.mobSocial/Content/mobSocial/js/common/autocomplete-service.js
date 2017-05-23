"use strict";

app.service("AutocompleteService", ["globalApiEndPoint", "$http", function (globalApiEndPoint, $http) {
    var apiEndPoint = globalApiEndPoint + "/autocomplete";
    this.autocomplete = function (type, search, timeoutPromise) {
        return $http.get(apiEndPoint + "/" + type + "/get", { params: { search: search } }, { timeout: timeoutPromise });
    };

}]);
