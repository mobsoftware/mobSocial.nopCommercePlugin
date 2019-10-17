window.mobSocial.lazy.service("registerService", [
    "webClientService", "$global", function(webClientService, $global) {
        this.register = function(registerRequest, success, error) {
            var registerUrl = $global.getApiUrl("/authentication/register");
            webClientService.post(registerUrl, registerRequest, success, error);
        };

        this.activate = function(code, email, success, error) {
            var activationUrl = $global.getApiUrl("/authentication/activate");
            webClientService.post(activationUrl, { activationCode: code, email: email }, success, error);
        };

    }
]);