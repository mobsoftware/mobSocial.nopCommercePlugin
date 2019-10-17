window.mobSocial.factory('dateProvider', function () {
    return {
        _tryParseDate: function (input, format) {
            if (!Date.parse(input))
                return input;
            return format ? moment(input).format(format) : new Date(input);
        },
        parseJsonDateValues: function (json, format) {
            for (var key in json) {
                if (json.hasOwnProperty(key)) {
                    if (typeof json[key] === "string") {
                        json[key] = this._tryParseDate(json[key], format);
                    }
                    else if (typeof json[key] === "object")
                        json[key] = this.parseJsonDateValues(json[key], format);
                }
            }
            return json;
        }
    };
});