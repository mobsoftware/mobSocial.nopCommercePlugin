window.mobSocial.lazy.service("installService", [
    "webClientService", "$global", function (webClientService, $global) {
        this.install = function (installRequest, success, error) {
            var url = $global.getApiUrl("/install");
            webClientService.post(url, installRequest, success, error);
        }

        this.testConnection = function(installRequest, success, error) {
            var url = $global.getApiUrl("/install/test-connection");
            webClientService.post(url, installRequest, success, error);
        }
    }
]);