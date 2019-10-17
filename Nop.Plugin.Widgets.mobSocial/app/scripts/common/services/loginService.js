window.mobSocial.service("loginService", [
    "webClientService", "$global", function (webClientService, $global) {
       this.login = function (loginRequest, success, error) {
            var loginUrl = $global.getApiUrl("/authentication/login");
            webClientService.post(loginUrl, loginRequest, success, error);
       }

       this.logout = function(success, error) {
           var logoutUrl = $global.getApiUrl("/authentication/logout");
           webClientService.post(logoutUrl, null, success, error);
       }
    }
]);