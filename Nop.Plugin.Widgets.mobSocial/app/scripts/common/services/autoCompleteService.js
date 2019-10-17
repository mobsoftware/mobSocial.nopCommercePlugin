window.mobSocial.service("autoCompleteService", [
    "webClientService", "$global", function (webClientService, $global) {
        this.get = function (csvTypes, searchText, success, error) {
            var url = $global.getApiUrl("/autocomplete/" + csvTypes + "/get");
            webClientService.get(url, { search: searchText, count: 10 }, success, error);
        }
    }
]);