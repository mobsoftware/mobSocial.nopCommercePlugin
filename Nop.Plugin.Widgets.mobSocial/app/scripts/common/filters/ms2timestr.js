window.mobSocial.filter('ms2timestr', function () {
    //Returns duration from milliseconds in hh:mm:ss format.
    return function (millseconds) {
        var seconds = Math.floor(millseconds / 1000);
        var h = 3600;
        var m = 60;
        var hours = Math.floor(seconds / h);
        var minutes = Math.floor((seconds % h) / m);
        var scnds = Math.floor((seconds % m));
        var timeStr = '';
        if (scnds < 10) scnds = "0" + scnds;
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        timeStr = hours + ":" + minutes + ":" + scnds;
        return timeStr;
    }
});