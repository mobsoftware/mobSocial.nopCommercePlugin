Website = {};


window['getRootUrl'] = function getRootUrl() {
    var defaultPorts = { "http:": 80, "https:": 443 };

    var port = '';

    // Add port if specified and not one of the default ports 
    if (window.location.port && window.location.port != defaultPorts[window.location.protocol])
        port = ":" + window.location.port;

    var rootUrl = window.location.protocol + "//" + window.location.hostname + port;

    return rootUrl;
};
Website.RootUrl = window.getRootUrl();


window['validateEmail'] = function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

window['isValidYouTubeUrl'] = function isValidYouTubeUrl(url) {
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return true;
        } else {
            return false;
        }
    }
};


function appRequires(dependencies) {
    app.requires = app.requires.concat(dependencies);
};

//ie fix
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}