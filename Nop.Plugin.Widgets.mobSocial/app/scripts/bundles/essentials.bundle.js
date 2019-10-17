webpackJsonp([5,17],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(17);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);
	module.exports = __webpack_require__(60);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.10.6
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	;(function (global, factory) {
	    /*typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :*/
	    global.moment = factory()
	}(window, function () { 'use strict';

	    var hookCallback;

	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }

	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }

	    function isArray(input) {
	        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	    }

	    function isObject(input) {
	        return Object.prototype.toString.call(input) === '[object Object]';
	    }

	    function isObjectEmpty(obj) {
	        var k;
	        for (k in obj) {
	            // even if its not own property I'd still call it non-empty
	            return false;
	        }
	        return true;
	    }

	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }

	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }

	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }

	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }

	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }

	        return a;
	    }

	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false,
	            parsedDateParts : [],
	            meridiem        : null
	        };
	    }

	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }

	    var some;
	    if (Array.prototype.some) {
	        some = Array.prototype.some;
	    } else {
	        some = function (fun) {
	            var t = Object(this);
	            var len = t.length >>> 0;

	            for (var i = 0; i < len; i++) {
	                if (i in t && fun.call(this, t[i], i, t)) {
	                    return true;
	                }
	            }

	            return false;
	        };
	    }

	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            var parsedParts = some.call(flags.parsedDateParts, function (i) {
	                return i != null;
	            });
	            m._isValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated &&
	                (!flags.meridiem || (flags.meridiem && parsedParts));

	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }

	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }

	        return m;
	    }

	    function isUndefined(input) {
	        return input === void 0;
	    }

	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    var momentProperties = utils_hooks__hooks.momentProperties = [];

	    function copyConfig(to, from) {
	        var i, prop, val;

	        if (!isUndefined(from._isAMomentObject)) {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (!isUndefined(from._i)) {
	            to._i = from._i;
	        }
	        if (!isUndefined(from._f)) {
	            to._f = from._f;
	        }
	        if (!isUndefined(from._l)) {
	            to._l = from._l;
	        }
	        if (!isUndefined(from._strict)) {
	            to._strict = from._strict;
	        }
	        if (!isUndefined(from._tzm)) {
	            to._tzm = from._tzm;
	        }
	        if (!isUndefined(from._isUTC)) {
	            to._isUTC = from._isUTC;
	        }
	        if (!isUndefined(from._offset)) {
	            to._offset = from._offset;
	        }
	        if (!isUndefined(from._pf)) {
	            to._pf = getParsingFlags(from);
	        }
	        if (!isUndefined(from._locale)) {
	            to._locale = from._locale;
	        }

	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (!isUndefined(val)) {
	                    to[prop] = val;
	                }
	            }
	        }

	        return to;
	    }

	    var updateInProgress = false;

	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }

	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }

	    function absFloor (number) {
	        if (number < 0) {
	            // -0 -> 0
	            return Math.ceil(number) || 0;
	        } else {
	            return Math.floor(number);
	        }
	    }

	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;

	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }

	        return value;
	    }

	    // compare two arrays, return the number of differences
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }

	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
	                (typeof console !==  'undefined') && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }

	    function deprecate(msg, fn) {
	        var firstTime = true;

	        return extend(function () {
	            if (utils_hooks__hooks.deprecationHandler != null) {
	                utils_hooks__hooks.deprecationHandler(null, msg);
	            }
	            if (firstTime) {
	                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	        if (utils_hooks__hooks.deprecationHandler != null) {
	            utils_hooks__hooks.deprecationHandler(name, msg);
	        }
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }

	    utils_hooks__hooks.suppressDeprecationWarnings = false;
	    utils_hooks__hooks.deprecationHandler = null;

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }

	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (isFunction(prop)) {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        this._config = config;
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }

	    function mergeConfigs(parentConfig, childConfig) {
	        var res = extend({}, parentConfig), prop;
	        for (prop in childConfig) {
	            if (hasOwnProp(childConfig, prop)) {
	                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                    res[prop] = {};
	                    extend(res[prop], parentConfig[prop]);
	                    extend(res[prop], childConfig[prop]);
	                } else if (childConfig[prop] != null) {
	                    res[prop] = childConfig[prop];
	                } else {
	                    delete res[prop];
	                }
	            }
	        }
	        for (prop in parentConfig) {
	            if (hasOwnProp(parentConfig, prop) &&
	                    !hasOwnProp(childConfig, prop) &&
	                    isObject(parentConfig[prop])) {
	                // make sure changes to properties don't modify parent config
	                res[prop] = extend({}, res[prop]);
	            }
	        }
	        return res;
	    }

	    function Locale(config) {
	        if (config != null) {
	            this.set(config);
	        }
	    }

	    var keys;

	    if (Object.keys) {
	        keys = Object.keys;
	    } else {
	        keys = function (obj) {
	            var i, res = [];
	            for (i in obj) {
	                if (hasOwnProp(obj, i)) {
	                    res.push(i);
	                }
	            }
	            return res;
	        };
	    }

	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };

	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key] || this._calendar['sameElse'];
	        return isFunction(output) ? output.call(mom, now) : output;
	    }

	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };

	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];

	        if (format || !formatUpper) {
	            return format;
	        }

	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });

	        return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate () {
	        return this._invalidDate;
	    }

	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;

	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }

	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };

	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (isFunction(output)) ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }

	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }

	    var aliases = {};

	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;

	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }

	        return normalizedInput;
	    }

	    var priorities = {};

	    function addUnitPriority(unit, priority) {
	        priorities[unit] = priority;
	    }

	    function getPrioritizedUnits(unitsObj) {
	        var units = [];
	        for (var u in unitsObj) {
	            units.push({unit: u, priority: priorities[u]});
	        }
	        units.sort(function (a, b) {
	            return a.priority - b.priority;
	        });
	        return units;
	    }

	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }

	    function get_set__get (mom, unit) {
	        return mom.isValid() ?
	            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	    }

	    function get_set__set (mom, unit, value) {
	        if (mom.isValid()) {
	            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	    }

	    // MOMENTS

	    function stringGet (units) {
	        units = normalizeUnits(units);
	        if (isFunction(this[units])) {
	            return this[units]();
	        }
	        return this;
	    }


	    function stringSet (units, value) {
	        if (typeof units === 'object') {
	            units = normalizeObjectUnits(units);
	            var prioritized = getPrioritizedUnits(units);
	            for (var i = 0; i < prioritized.length; i++) {
	                this[prioritized[i].unit](units[prioritized[i].unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (isFunction(this[units])) {
	                return this[units](value);
	            }
	        }
	        return this;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

	    var formatFunctions = {};

	    var formatTokenFunctions = {};

	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }

	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;

	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }

	        return function (mom) {
	            var output = '', i;
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }

	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }

	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

	        return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	        var i = 5;

	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }

	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }

	        return format;
	    }

	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

	    // any word (or two) characters or numbers including two/three word month in arabic.
	    // includes scottish gaelic two word and hyphenated months
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


	    var regexes = {};

	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }

	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }

	        return regexes[token](config._strict, config._locale);
	    }

	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }));
	    }

	    function regexEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }

	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }

	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	    var WEEK = 7;
	    var WEEKDAY = 8;

	    var indexOf;

	    if (Array.prototype.indexOf) {
	        indexOf = Array.prototype.indexOf;
	    } else {
	        indexOf = function (o) {
	            // I know
	            var i;
	            for (i = 0; i < this.length; ++i) {
	                if (this[i] === o) {
	                    return i;
	                }
	            }
	            return -1;
	        };
	    }

	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }

	    // FORMATTING

	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });

	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });

	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });

	    // ALIASES

	    addUnitAlias('month', 'M');

	    // PRIORITY

	    addUnitPriority('month', 8);

	    // PARSING

	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  function (isStrict, locale) {
	        return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	        return locale.monthsRegex(isStrict);
	    });

	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });

	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });

	    // LOCALES

	    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m, format) {
	        return isArray(this._months) ? this._months[m.month()] :
	            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m, format) {
	        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    function units_month__handleStrictParse(monthName, format, strict) {
	        var i, ii, mom, llc = monthName.toLocaleLowerCase();
	        if (!this._monthsParse) {
	            // this is not used
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	            for (i = 0; i < 12; ++i) {
	                mom = create_utc__createUTC([2000, i]);
	                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;

	        if (this._monthsParseExact) {
	            return units_month__handleStrictParse.call(this, monthName, format, strict);
	        }

	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }

	        // TODO: add sorting
	        // Sorting makes sure if one month (or abbr) is a prefix of another
	        // see sorting in computeMonthsParse
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function setMonth (mom, value) {
	        var dayOfMonth;

	        if (!mom.isValid()) {
	            // No op
	            return mom;
	        }

	        if (typeof value === 'string') {
	            if (/^\d+$/.test(value)) {
	                value = toInt(value);
	            } else {
	                value = mom.localeData().monthsParse(value);
	                // TODO: Another silent failure?
	                if (typeof value !== 'number') {
	                    return mom;
	                }
	            }
	        }

	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }

	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }

	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }

	    var defaultMonthsShortRegex = matchWord;
	    function monthsShortRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsShortStrictRegex;
	            } else {
	                return this._monthsShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsShortRegex')) {
	                this._monthsShortRegex = defaultMonthsShortRegex;
	            }
	            return this._monthsShortStrictRegex && isStrict ?
	                this._monthsShortStrictRegex : this._monthsShortRegex;
	        }
	    }

	    var defaultMonthsRegex = matchWord;
	    function monthsRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsStrictRegex;
	            } else {
	                return this._monthsRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                this._monthsRegex = defaultMonthsRegex;
	            }
	            return this._monthsStrictRegex && isStrict ?
	                this._monthsStrictRegex : this._monthsRegex;
	        }
	    }

	    function computeMonthsParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom;
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            shortPieces.push(this.monthsShort(mom, ''));
	            longPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.monthsShort(mom, ''));
	        }
	        // Sorting makes sure if one month (or abbr) is a prefix of another it
	        // will match the longer piece.
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 12; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	        }
	        for (i = 0; i < 24; i++) {
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._monthsShortRegex = this._monthsRegex;
	        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    }

	    // FORMATTING

	    addFormatToken('Y', 0, 0, function () {
	        var y = this.year();
	        return y <= 9999 ? '' + y : '+' + y;
	    });

	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });

	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	    // ALIASES

	    addUnitAlias('year', 'y');

	    // PRIORITIES

	    addUnitPriority('year', 1);

	    // PARSING

	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);

	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	        array[YEAR] = parseInt(input, 10);
	    });

	    // HELPERS

	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }

	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }

	    // HOOKS

	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };

	    // MOMENTS

	    var getSetYear = makeGetSet('FullYear', true);

	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }

	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);

	        //the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	            date.setFullYear(y);
	        }
	        return date;
	    }

	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));

	        //the Date.UTC function remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }

	    // start-of-first-week - start-of-year
	    function firstWeekOffset(year, dow, doy) {
	        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	            fwd = 7 + dow - doy,
	            // first-week day local weekday -- which local weekday is fwd
	            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

	        return -fwdlw + fwd - 1;
	    }

	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	        var localWeekday = (7 + weekday - dow) % 7,
	            weekOffset = firstWeekOffset(year, dow, doy),
	            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	            resYear, resDayOfYear;

	        if (dayOfYear <= 0) {
	            resYear = year - 1;
	            resDayOfYear = daysInYear(resYear) + dayOfYear;
	        } else if (dayOfYear > daysInYear(year)) {
	            resYear = year + 1;
	            resDayOfYear = dayOfYear - daysInYear(year);
	        } else {
	            resYear = year;
	            resDayOfYear = dayOfYear;
	        }

	        return {
	            year: resYear,
	            dayOfYear: resDayOfYear
	        };
	    }

	    function weekOfYear(mom, dow, doy) {
	        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	            resWeek, resYear;

	        if (week < 1) {
	            resYear = mom.year() - 1;
	            resWeek = week + weeksInYear(resYear, dow, doy);
	        } else if (week > weeksInYear(mom.year(), dow, doy)) {
	            resWeek = week - weeksInYear(mom.year(), dow, doy);
	            resYear = mom.year() + 1;
	        } else {
	            resYear = mom.year();
	            resWeek = week;
	        }

	        return {
	            week: resWeek,
	            year: resYear
	        };
	    }

	    function weeksInYear(year, dow, doy) {
	        var weekOffset = firstWeekOffset(year, dow, doy),
	            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    }

	    // FORMATTING

	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	    // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');

	    // PRIORITIES

	    addUnitPriority('week', 5);
	    addUnitPriority('isoWeek', 5);

	    // PARSING

	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);

	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });

	    // HELPERS

	    // LOCALES

	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };

	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }

	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }

	    // MOMENTS

	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    // FORMATTING

	    addFormatToken('d', 0, 'do', 'day');

	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });

	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });

	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });

	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');

	    // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');

	    // PRIORITY
	    addUnitPriority('day', 11);
	    addUnitPriority('weekday', 11);
	    addUnitPriority('isoWeekday', 11);

	    // PARSING

	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   function (isStrict, locale) {
	        return locale.weekdaysMinRegex(isStrict);
	    });
	    addRegexToken('ddd',   function (isStrict, locale) {
	        return locale.weekdaysShortRegex(isStrict);
	    });
	    addRegexToken('dddd',   function (isStrict, locale) {
	        return locale.weekdaysRegex(isStrict);
	    });

	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	        var weekday = config._locale.weekdaysParse(input, token, config._strict);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });

	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });

	    // HELPERS

	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }

	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }

	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }

	        return null;
	    }

	    function parseIsoWeekday(input, locale) {
	        if (typeof input === 'string') {
	            return locale.weekdaysParse(input) % 7 || 7;
	        }
	        return isNaN(input) ? null : input;
	    }

	    // LOCALES

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m, format) {
	        return isArray(this._weekdays) ? this._weekdays[m.day()] :
	            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	    }

	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return this._weekdaysShort[m.day()];
	    }

	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return this._weekdaysMin[m.day()];
	    }

	    function day_of_week__handleStrictParse(weekdayName, format, strict) {
	        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._minWeekdaysParse = [];

	            for (i = 0; i < 7; ++i) {
	                mom = create_utc__createUTC([2000, 1]).day(i);
	                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeWeekdaysParse (weekdayName, format, strict) {
	        var i, mom, regex;

	        if (this._weekdaysParseExact) {
	            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
	        }

	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._minWeekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._fullWeekdaysParse = [];
	        }

	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already

	            mom = create_utc__createUTC([2000, 1]).day(i);
	            if (strict && !this._fullWeekdaysParse[i]) {
	                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	            }
	            if (!this._weekdaysParse[i]) {
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function getSetDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }

	    function getSetLocaleDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }

	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.

	        if (input != null) {
	            var weekday = parseIsoWeekday(input, this.localeData());
	            return this.day(this.day() % 7 ? weekday : weekday - 7);
	        } else {
	            return this.day() || 7;
	        }
	    }

	    var defaultWeekdaysRegex = matchWord;
	    function weekdaysRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysStrictRegex;
	            } else {
	                return this._weekdaysRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                this._weekdaysRegex = defaultWeekdaysRegex;
	            }
	            return this._weekdaysStrictRegex && isStrict ?
	                this._weekdaysStrictRegex : this._weekdaysRegex;
	        }
	    }

	    var defaultWeekdaysShortRegex = matchWord;
	    function weekdaysShortRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysShortStrictRegex;
	            } else {
	                return this._weekdaysShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	            }
	            return this._weekdaysShortStrictRegex && isStrict ?
	                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	        }
	    }

	    var defaultWeekdaysMinRegex = matchWord;
	    function weekdaysMinRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysMinStrictRegex;
	            } else {
	                return this._weekdaysMinRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	            }
	            return this._weekdaysMinStrictRegex && isStrict ?
	                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	        }
	    }


	    function computeWeekdaysParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom, minp, shortp, longp;
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, 1]).day(i);
	            minp = this.weekdaysMin(mom, '');
	            shortp = this.weekdaysShort(mom, '');
	            longp = this.weekdays(mom, '');
	            minPieces.push(minp);
	            shortPieces.push(shortp);
	            longPieces.push(longp);
	            mixedPieces.push(minp);
	            mixedPieces.push(shortp);
	            mixedPieces.push(longp);
	        }
	        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	        // will match the longer piece.
	        minPieces.sort(cmpLenRev);
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 7; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._weekdaysShortRegex = this._weekdaysRegex;
	        this._weekdaysMinRegex = this._weekdaysRegex;

	        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	    }

	    // FORMATTING

	    function hFormat() {
	        return this.hours() % 12 || 12;
	    }

	    function kFormat() {
	        return this.hours() || 24;
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);
	    addFormatToken('k', ['kk', 2], 0, kFormat);

	    addFormatToken('hmm', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('hmmss', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    addFormatToken('Hmm', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('Hmmss', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }

	    meridiem('a', true);
	    meridiem('A', false);

	    // ALIASES

	    addUnitAlias('hour', 'h');

	    // PRIORITY
	    addUnitPriority('hour', 13);

	    // PARSING

	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }

	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);

	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);

	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	    });

	    // LOCALES

	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }


	    // MOMENTS

	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);

	    var baseConfig = {
	        calendar: defaultCalendar,
	        longDateFormat: defaultLongDateFormat,
	        invalidDate: defaultInvalidDate,
	        ordinal: defaultOrdinal,
	        ordinalParse: defaultOrdinalParse,
	        relativeTime: defaultRelativeTime,

	        months: defaultLocaleMonths,
	        monthsShort: defaultLocaleMonthsShort,

	        week: defaultLocaleWeek,

	        weekdays: defaultLocaleWeekdays,
	        weekdaysMin: defaultLocaleWeekdaysMin,
	        weekdaysShort: defaultLocaleWeekdaysShort,

	        meridiemParse: defaultLocaleMeridiemParse
	    };

	    // internal storage for locale config files
	    var locales = {};
	    var globalLocale;

	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }

	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;

	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }

	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && (typeof module !== 'undefined') &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                __webpack_require__(19)("./" + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }

	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (isUndefined(values)) {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }

	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }

	        return globalLocale._abbr;
	    }

	    function defineLocale (name, config) {
	        if (config !== null) {
	            var parentConfig = baseConfig;
	            config.abbr = name;
	            if (locales[name] != null) {
	                deprecateSimple('defineLocaleOverride',
	                        'use moment.updateLocale(localeName, config) to change ' +
	                        'an existing locale. moment.defineLocale(localeName, ' +
	                        'config) should only be used for creating a new locale ' +
	                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
	                parentConfig = locales[name]._config;
	            } else if (config.parentLocale != null) {
	                if (locales[config.parentLocale] != null) {
	                    parentConfig = locales[config.parentLocale]._config;
	                } else {
	                    // treat as if there is no base config
	                    deprecateSimple('parentLocaleUndefined',
	                            'specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/');
	                }
	            }
	            locales[name] = new Locale(mergeConfigs(parentConfig, config));

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);

	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }

	    function updateLocale(name, config) {
	        if (config != null) {
	            var locale, parentConfig = baseConfig;
	            // MERGE
	            if (locales[name] != null) {
	                parentConfig = locales[name]._config;
	            }
	            config = mergeConfigs(parentConfig, config);
	            locale = new Locale(config);
	            locale.parentLocale = locales[name];
	            locales[name] = locale;

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	        } else {
	            // pass null for config to unupdate, useful for tests
	            if (locales[name] != null) {
	                if (locales[name].parentLocale != null) {
	                    locales[name] = locales[name].parentLocale;
	                } else if (locales[name] != null) {
	                    delete locales[name];
	                }
	            }
	        }
	        return locales[name];
	    }

	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;

	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }

	        if (!key) {
	            return globalLocale;
	        }

	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }

	        return chooseLocale(key);
	    }

	    function locale_locales__listLocales() {
	        return keys(locales);
	    }

	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;

	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;

	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	                overflow = WEEK;
	            }
	            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	                overflow = WEEKDAY;
	            }

	            getParsingFlags(m).overflow = overflow;
	        }

	        return m;
	    }

	    // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

	    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	        ['YYYY-DDD', /\d{4}-\d{3}/],
	        ['YYYY-MM', /\d{4}-\d\d/, false],
	        ['YYYYYYMMDD', /[+-]\d{10}/],
	        ['YYYYMMDD', /\d{8}/],
	        // YYYYMM is NOT allowed by the standard
	        ['GGGG[W]WWE', /\d{4}W\d{3}/],
	        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	        ['YYYYDDD', /\d{7}/]
	    ];

	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	        ['HH:mm', /\d\d:\d\d/],
	        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	        ['HHmmss', /\d\d\d\d\d\d/],
	        ['HHmm', /\d\d\d\d/],
	        ['HH', /\d\d/]
	    ];

	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	            allowTime, dateFormat, timeFormat, tzFormat;

	        if (match) {
	            getParsingFlags(config).iso = true;

	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(match[1])) {
	                    dateFormat = isoDates[i][0];
	                    allowTime = isoDates[i][2] !== false;
	                    break;
	                }
	            }
	            if (dateFormat == null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[3]) {
	                for (i = 0, l = isoTimes.length; i < l; i++) {
	                    if (isoTimes[i][1].exec(match[3])) {
	                        // match[2] should be 'T' or space
	                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                        break;
	                    }
	                }
	                if (timeFormat == null) {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            if (!allowTime && timeFormat != null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[4]) {
	                if (tzRegex.exec(match[4])) {
	                    tzFormat = 'Z';
	                } else {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }

	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);

	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }

	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );

	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }

	    function currentDateArray(config) {
	        // hooks is actually the exported moment object
	        var nowValue = new Date(utils_hooks__hooks.now());
	        if (config._useUTC) {
	            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	        }
	        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    }

	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;

	        if (config._d) {
	            return;
	        }

	        currentDate = currentDateArray(config);

	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }

	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }

	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }

	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }

	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }

	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }

	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }

	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }

	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;

	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	            if (weekday < 1 || weekday > 7) {
	                weekdayOverflow = true;
	            }
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;

	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);

	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < 0 || weekday > 6) {
	                    weekdayOverflow = true;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	                if (w.e < 0 || w.e > 6) {
	                    weekdayOverflow = true;
	                }
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	            getParsingFlags(config)._overflowWeeks = true;
	        } else if (weekdayOverflow != null) {
	            getParsingFlags(config)._overflowWeekday = true;
	        } else {
	            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	            config._a[YEAR] = temp.year;
	            config._dayOfYear = temp.dayOfYear;
	        }
	    }

	    // constant that refers to the ISO standard
	    utils_hooks__hooks.ISO_8601 = function () {};

	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }

	        config._a = [];
	        getParsingFlags(config).empty = true;

	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;

	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            // console.log('token', token, 'parsedInput', parsedInput,
	            //         'regex', getParseRegexForToken(token, config));
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }

	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }

	        // clear _12h flag if hour is <= 12
	        if (config._a[HOUR] <= 12 &&
	            getParsingFlags(config).bigHour === true &&
	            config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }

	        getParsingFlags(config).parsedDateParts = config._a.slice(0);
	        getParsingFlags(config).meridiem = config._meridiem;
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

	        configFromArray(config);
	        checkOverflow(config);
	    }


	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;

	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }

	    // date from string and array of format strings
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,

	            scoreToBeat,
	            i,
	            currentScore;

	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }

	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);

	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }

	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;

	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	            getParsingFlags(tempConfig).score = currentScore;

	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }

	        extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }

	        var i = normalizeObjectUnits(config._i);
	        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	            return obj && parseInt(obj, 10);
	        });

	        configFromArray(config);
	    }

	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }

	        return res;
	    }

	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || locale_locales__getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else if (format) {
	            configFromStringAndFormat(config);
	        }  else {
	            configFromInput(config);
	        }

	        if (!valid__isValid(config)) {
	            config._d = null;
	        }

	        return config;
	    }

	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date(utils_hooks__hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(input.valueOf());
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};

	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }

	        if ((isObject(input) && isObjectEmpty(input)) ||
	                (isArray(input) && input.length === 0)) {
	            input = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;

	        return createFromConfig(c);
	    }

	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate(
	        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other < this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );

	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other > this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );

	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }

	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isBefore', args);
	    }

	    function max () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isAfter', args);
	    }

	    var now = function () {
	        return Date.now ? Date.now() : +(new Date());
	    };

	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;

	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;

	        this._data = {};

	        this._locale = locale_locales__getLocale();

	        this._bubble();
	    }

	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }

	    // FORMATTING

	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }

	    offset('Z', ':');
	    offset('ZZ', '');

	    // PARSING

	    addRegexToken('Z',  matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(matchShortOffset, input);
	    });

	    // HELPERS

	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(matcher, string) {
	        var matches = ((string || '').match(matcher) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return parts[0] === '+' ? minutes : -minutes;
	    }

	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(res._d.valueOf() + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }

	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }

	    // HOOKS

	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};

	    // MOMENTS

	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(matchShortOffset, input);
	            } else if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }

	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }

	            this.utcOffset(input, keepLocalTime);

	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }

	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;

	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }

	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            this.utcOffset(offsetFromString(matchOffset, this._i));
	        }
	        return this;
	    }

	    function hasAlignedHourOffset (input) {
	        if (!this.isValid()) {
	            return false;
	        }
	        input = input ? local__createLocal(input).utcOffset() : 0;

	        return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }

	    function isDaylightSavingTimeShifted () {
	        if (!isUndefined(this._isDSTShifted)) {
	            return this._isDSTShifted;
	        }

	        var c = {};

	        copyConfig(c, this);
	        c = prepareConfig(c);

	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }

	        return this._isDSTShifted;
	    }

	    function isLocal () {
	        return this.isValid() ? !this._isUTC : false;
	    }

	    function isUtcOffset () {
	        return this.isValid() ? this._isUTC : false;
	    }

	    function isUtc () {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }

	    // ASP.NET json date format regex
	    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    // and further modified to allow for strings containing both week and day
	    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;

	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])        * sign,
	                h  : toInt(match[HOUR])        * sign,
	                m  : toInt(match[MINUTE])      * sign,
	                s  : toInt(match[SECOND])      * sign,
	                ms : toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                w : parseIso(match[4], sign),
	                d : parseIso(match[5], sign),
	                h : parseIso(match[6], sign),
	                m : parseIso(match[7], sign),
	                s : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }

	        ret = new Duration(duration);

	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }

	        return ret;
	    }

	    create__createDuration.fn = Duration.prototype;

	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};

	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }

	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

	        return res;
	    }

	    function momentsDifference(base, other) {
	        var res;
	        if (!(base.isValid() && other.isValid())) {
	            return {milliseconds: 0, months: 0};
	        }

	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }

	        return res;
	    }

	    function absRound (number) {
	        if (number < 0) {
	            return Math.round(-1 * number) * -1;
	        } else {
	            return Math.round(number);
	        }
	    }

	    // TODO: remove 'name' arg after deprecation is removed
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
	                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
	                tmp = val; val = period; period = tmp;
	            }

	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }

	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = absRound(duration._days),
	            months = absRound(duration._months);

	        if (!mom.isValid()) {
	            // No op
	            return;
	        }

	        updateOffset = updateOffset == null ? true : updateOffset;

	        if (milliseconds) {
	            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }

	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');

	    function getCalendarFormat(myMoment, now) {
	        var diff = myMoment.diff(now, 'days', true);
	        return diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';
	    }

	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            format = utils_hooks__hooks.calendarFormat(this, sod) || 'sameElse';

	        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

	        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
	    }

	    function clone () {
	        return new Moment(this);
	    }

	    function isAfter (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() > localInput.valueOf();
	        } else {
	            return localInput.valueOf() < this.clone().startOf(units).valueOf();
	        }
	    }

	    function isBefore (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() < localInput.valueOf();
	        } else {
	            return this.clone().endOf(units).valueOf() < localInput.valueOf();
	        }
	    }

	    function isBetween (from, to, units, inclusivity) {
	        inclusivity = inclusivity || '()';
	        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	    }

	    function isSame (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input),
	            inputMs;
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() === localInput.valueOf();
	        } else {
	            inputMs = localInput.valueOf();
	            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	        }
	    }

	    function isSameOrAfter (input, units) {
	        return this.isSame(input, units) || this.isAfter(input,units);
	    }

	    function isSameOrBefore (input, units) {
	        return this.isSame(input, units) || this.isBefore(input,units);
	    }

	    function diff (input, units, asFloat) {
	        var that,
	            zoneDelta,
	            delta, output;

	        if (!this.isValid()) {
	            return NaN;
	        }

	        that = cloneWithOffset(input, this);

	        if (!that.isValid()) {
	            return NaN;
	        }

	        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

	        units = normalizeUnits(units);

	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }

	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;

	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }

	        //check for negative zero, return zero if negative zero
	        return -(wholeMonthDiff + adjust) || 0;
	    }

	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if (isFunction(Date.prototype.toISOString)) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }

	    function format (inputString) {
	        if (!inputString) {
	            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
	        }
	        var output = formatMoment(this, inputString);
	        return this.localeData().postformat(output);
	    }

	    function from (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }

	    function to (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }

	    // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.
	    function locale (key) {
	        var newLocaleData;

	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }

	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );

	    function localeData () {
	        return this._locale;
	    }

	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	            case 'year':
	                this.month(0);
	                /* falls through */
	            case 'quarter':
	            case 'month':
	                this.date(1);
	                /* falls through */
	            case 'week':
	            case 'isoWeek':
	            case 'day':
	            case 'date':
	                this.hours(0);
	                /* falls through */
	            case 'hour':
	                this.minutes(0);
	                /* falls through */
	            case 'minute':
	                this.seconds(0);
	                /* falls through */
	            case 'second':
	                this.milliseconds(0);
	        }

	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }

	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }

	        return this;
	    }

	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }

	        // 'date' is an alias for 'day', so it should be considered as such.
	        if (units === 'date') {
	            units = 'day';
	        }

	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }

	    function to_type__valueOf () {
	        return this._d.valueOf() - ((this._offset || 0) * 60000);
	    }

	    function unix () {
	        return Math.floor(this.valueOf() / 1000);
	    }

	    function toDate () {
	        return new Date(this.valueOf());
	    }

	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }

	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }

	    function toJSON () {
	        // new Date(NaN).toJSON() === null
	        return this.isValid() ? this.toISOString() : null;
	    }

	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }

	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }

	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }

	    function creationData() {
	        return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict
	        };
	    }

	    // FORMATTING

	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });

	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	    // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');

	    // PRIORITY

	    addUnitPriority('weekYear', 1);
	    addUnitPriority('isoWeekYear', 1);


	    // PARSING

	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);

	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });

	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // MOMENTS

	    function getSetWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input,
	                this.week(),
	                this.weekday(),
	                this.localeData()._week.dow,
	                this.localeData()._week.doy);
	    }

	    function getSetISOWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input, this.isoWeek(), this.isoWeekday(), 1, 4);
	    }

	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }

	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	        var weeksTarget;
	        if (input == null) {
	            return weekOfYear(this, dow, doy).year;
	        } else {
	            weeksTarget = weeksInYear(input, dow, doy);
	            if (week > weeksTarget) {
	                week = weeksTarget;
	            }
	            return setWeekAll.call(this, input, week, weekday, dow, doy);
	        }
	    }

	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

	        this.year(date.getUTCFullYear());
	        this.month(date.getUTCMonth());
	        this.date(date.getUTCDate());
	        return this;
	    }

	    // FORMATTING

	    addFormatToken('Q', 0, 'Qo', 'quarter');

	    // ALIASES

	    addUnitAlias('quarter', 'Q');

	    // PRIORITY

	    addUnitPriority('quarter', 7);

	    // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });

	    // MOMENTS

	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }

	    // FORMATTING

	    addFormatToken('D', ['DD', 2], 'Do', 'date');

	    // ALIASES

	    addUnitAlias('date', 'D');

	    // PRIOROITY
	    addUnitPriority('date', 9);

	    // PARSING

	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });

	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });

	    // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true);

	    // FORMATTING

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	    // ALIASES

	    addUnitAlias('dayOfYear', 'DDD');

	    // PRIORITY
	    addUnitPriority('dayOfYear', 4);

	    // PARSING

	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });

	    // HELPERS

	    // MOMENTS

	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }

	    // FORMATTING

	    addFormatToken('m', ['mm', 2], 0, 'minute');

	    // ALIASES

	    addUnitAlias('minute', 'm');

	    // PRIORITY

	    addUnitPriority('minute', 14);

	    // PARSING

	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);

	    // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false);

	    // FORMATTING

	    addFormatToken('s', ['ss', 2], 0, 'second');

	    // ALIASES

	    addUnitAlias('second', 's');

	    // PRIORITY

	    addUnitPriority('second', 15);

	    // PARSING

	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);

	    // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false);

	    // FORMATTING

	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });

	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });

	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });


	    // ALIASES

	    addUnitAlias('millisecond', 'ms');

	    // PRIORITY

	    addUnitPriority('millisecond', 16);

	    // PARSING

	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);

	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS

	    var getSetMillisecond = makeGetSet('Milliseconds', false);

	    // FORMATTING

	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');

	    // MOMENTS

	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var momentPrototype__proto = Moment.prototype;

	    momentPrototype__proto.add               = add_subtract__add;
	    momentPrototype__proto.calendar          = moment_calendar__calendar;
	    momentPrototype__proto.clone             = clone;
	    momentPrototype__proto.diff              = diff;
	    momentPrototype__proto.endOf             = endOf;
	    momentPrototype__proto.format            = format;
	    momentPrototype__proto.from              = from;
	    momentPrototype__proto.fromNow           = fromNow;
	    momentPrototype__proto.to                = to;
	    momentPrototype__proto.toNow             = toNow;
	    momentPrototype__proto.get               = stringGet;
	    momentPrototype__proto.invalidAt         = invalidAt;
	    momentPrototype__proto.isAfter           = isAfter;
	    momentPrototype__proto.isBefore          = isBefore;
	    momentPrototype__proto.isBetween         = isBetween;
	    momentPrototype__proto.isSame            = isSame;
	    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
	    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
	    momentPrototype__proto.isValid           = moment_valid__isValid;
	    momentPrototype__proto.lang              = lang;
	    momentPrototype__proto.locale            = locale;
	    momentPrototype__proto.localeData        = localeData;
	    momentPrototype__proto.max               = prototypeMax;
	    momentPrototype__proto.min               = prototypeMin;
	    momentPrototype__proto.parsingFlags      = parsingFlags;
	    momentPrototype__proto.set               = stringSet;
	    momentPrototype__proto.startOf           = startOf;
	    momentPrototype__proto.subtract          = add_subtract__subtract;
	    momentPrototype__proto.toArray           = toArray;
	    momentPrototype__proto.toObject          = toObject;
	    momentPrototype__proto.toDate            = toDate;
	    momentPrototype__proto.toISOString       = moment_format__toISOString;
	    momentPrototype__proto.toJSON            = toJSON;
	    momentPrototype__proto.toString          = toString;
	    momentPrototype__proto.unix              = unix;
	    momentPrototype__proto.valueOf           = to_type__valueOf;
	    momentPrototype__proto.creationData      = creationData;

	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;

	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;

	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;

	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;

	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
	    momentPrototype__proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

	    var momentPrototype = momentPrototype__proto;

	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }

	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }

	    function preParsePostFormat (string) {
	        return string;
	    }

	    var prototype__proto = Locale.prototype;

	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;

	    // Month
	    prototype__proto.months            =        localeMonths;
	    prototype__proto.monthsShort       =        localeMonthsShort;
	    prototype__proto.monthsParse       =        localeMonthsParse;
	    prototype__proto.monthsRegex       = monthsRegex;
	    prototype__proto.monthsShortRegex  = monthsShortRegex;

	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

	    prototype__proto.weekdaysRegex       =        weekdaysRegex;
	    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
	    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto.meridiem = localeMeridiem;

	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }

	    function listMonthsImpl (format, index, field) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';

	        if (index != null) {
	            return lists__get(format, index, field, 'month');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 12; i++) {
	            out[i] = lists__get(format, i, field, 'month');
	        }
	        return out;
	    }

	    // ()
	    // (5)
	    // (fmt, 5)
	    // (fmt)
	    // (true)
	    // (true, 5)
	    // (true, fmt, 5)
	    // (true, fmt)
	    function listWeekdaysImpl (localeSorted, format, index, field) {
	        if (typeof localeSorted === 'boolean') {
	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        } else {
	            format = localeSorted;
	            index = format;
	            localeSorted = false;

	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        }

	        var locale = locale_locales__getLocale(),
	            shift = localeSorted ? locale._week.dow : 0;

	        if (index != null) {
	            return lists__get(format, (index + shift) % 7, field, 'day');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 7; i++) {
	            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
	        }
	        return out;
	    }

	    function lists__listMonths (format, index) {
	        return listMonthsImpl(format, index, 'months');
	    }

	    function lists__listMonthsShort (format, index) {
	        return listMonthsImpl(format, index, 'monthsShort');
	    }

	    function lists__listWeekdays (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	    }

	    function lists__listWeekdaysShort (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	    }

	    function lists__listWeekdaysMin (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	    }

	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

	    var mathAbs = Math.abs;

	    function duration_abs__abs () {
	        var data           = this._data;

	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);

	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);

	        return this;
	    }

	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);

	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;

	        return duration._bubble();
	    }

	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }

	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }

	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }

	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;

	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }

	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;

	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;

	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;

	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;

	        days += absFloor(hours / 24);

	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        data.days   = days;
	        data.months = months;
	        data.years  = years;

	        return this;
	    }

	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }

	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }

	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;

	        units = normalizeUnits(units);

	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }

	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }

	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }

	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');

	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }

	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }

	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');

	    function weeks () {
	        return absFloor(this.days() / 7);
	    }

	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };

	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));

	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes <= 1           && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   <= 1           && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    <= 1           && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  <= 1           && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   <= 1           && ['y']           || ['yy', years];

	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }

	    // This function allows you to set the rounding function for relative time strings
	    function duration_humanize__getSetRelativeTimeRounding (roundingFunction) {
	        if (roundingFunction === undefined) {
	            return round;
	        }
	        if (typeof(roundingFunction) === 'function') {
	            round = roundingFunction;
	            return true;
	        }
	        return false;
	    }

	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }

	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }

	    var iso_string__abs = Math.abs;

	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;

	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;

	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;


	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();

	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }

	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }

	    var duration_prototype__proto = Duration.prototype;

	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;

	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;

	    // Side effect imports

	    // FORMATTING

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');

	    // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });

	    // Side effect imports


	    utils_hooks__hooks.version = '2.14.1';

	    setHookCallback(local__createLocal);

	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.now                   = now;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.updateLocale          = updateLocale;
	    utils_hooks__hooks.locales               = locale_locales__listLocales;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeRounding = duration_humanize__getSetRelativeTimeRounding;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	    utils_hooks__hooks.calendarFormat        = getCalendarFormat;
	    utils_hooks__hooks.prototype             = momentPrototype;

	    var _moment = utils_hooks__hooks;

	    return _moment;

	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./placeholder": 20,
		"./placeholder.js": 20
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 19;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	//this file exists so webpack doesn't give locale error

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	/*
	 AngularJS v1.2.25
	 (c) 2010-2014 Google, Inc. http://angularjs.org
	 License: MIT
	*/
	(function (W, X, t) {
	    'use strict'; function D(b) { return function () { var a = arguments[0], c, a = "[" + (b ? b + ":" : "") + a + "] http://errors.angularjs.org/1.2.25/" + (b ? b + "/" : "") + a; for (c = 1; c < arguments.length; c++) a = a + (1 == c ? "?" : "&") + "p" + (c - 1) + "=" + encodeURIComponent("function" == typeof arguments[c] ? arguments[c].toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof arguments[c] ? "undefined" : "string" != typeof arguments[c] ? JSON.stringify(arguments[c]) : arguments[c]); return Error(a) } } function Pa(b) {
	        if (null == b || Ga(b)) return !1;
	        var a = b.length; return 1 === b.nodeType && a ? !0 : A(b) || I(b) || 0 === a || "number" === typeof a && 0 < a && a - 1 in b
	    } function r(b, a, c) { var d; if (b) if (P(b)) for (d in b) "prototype" == d || ("length" == d || "name" == d || b.hasOwnProperty && !b.hasOwnProperty(d)) || a.call(c, b[d], d); else if (I(b) || Pa(b)) for (d = 0; d < b.length; d++) a.call(c, b[d], d); else if (b.forEach && b.forEach !== r) b.forEach(a, c); else for (d in b) b.hasOwnProperty(d) && a.call(c, b[d], d); return b } function Zb(b) { var a = [], c; for (c in b) b.hasOwnProperty(c) && a.push(c); return a.sort() } function Tc(b,
	    a, c) { for (var d = Zb(b), e = 0; e < d.length; e++) a.call(c, b[d[e]], d[e]); return d } function $b(b) { return function (a, c) { b(c, a) } } function hb() { for (var b = ma.length, a; b;) { b--; a = ma[b].charCodeAt(0); if (57 == a) return ma[b] = "A", ma.join(""); if (90 == a) ma[b] = "0"; else return ma[b] = String.fromCharCode(a + 1), ma.join("") } ma.unshift("0"); return ma.join("") } function ac(b, a) { a ? b.$$hashKey = a : delete b.$$hashKey } function J(b) { var a = b.$$hashKey; r(arguments, function (a) { a !== b && r(a, function (a, c) { b[c] = a }) }); ac(b, a); return b } function U(b) {
	        return parseInt(b,
	        10)
	    } function bc(b, a) { return J(new (J(function () { }, { prototype: b })), a) } function F() { } function Qa(b) { return b } function ba(b) { return function () { return b } } function y(b) { return "undefined" === typeof b } function z(b) { return "undefined" !== typeof b } function T(b) { return null != b && "object" === typeof b } function A(b) { return "string" === typeof b } function ib(b) { return "number" === typeof b } function ta(b) { return "[object Date]" === za.call(b) } function P(b) { return "function" === typeof b } function jb(b) { return "[object RegExp]" === za.call(b) }
	    function Ga(b) { return b && b.document && b.location && b.alert && b.setInterval } function Uc(b) { return !(!b || !(b.nodeName || b.prop && b.attr && b.find)) } function Vc(b, a, c) { var d = []; r(b, function (b, f, g) { d.push(a.call(c, b, f, g)) }); return d } function Ra(b, a) { if (b.indexOf) return b.indexOf(a); for (var c = 0; c < b.length; c++) if (a === b[c]) return c; return -1 } function Sa(b, a) { var c = Ra(b, a); 0 <= c && b.splice(c, 1); return a } function Ha(b, a, c, d) {
	        if (Ga(b) || b && b.$evalAsync && b.$watch) throw Ta("cpws"); if (a) {
	            if (b === a) throw Ta("cpi"); c = c || [];
	            d = d || []; if (T(b)) { var e = Ra(c, b); if (-1 !== e) return d[e]; c.push(b); d.push(a) } if (I(b)) for (var f = a.length = 0; f < b.length; f++) e = Ha(b[f], null, c, d), T(b[f]) && (c.push(b[f]), d.push(e)), a.push(e); else { var g = a.$$hashKey; I(a) ? a.length = 0 : r(a, function (b, c) { delete a[c] }); for (f in b) e = Ha(b[f], null, c, d), T(b[f]) && (c.push(b[f]), d.push(e)), a[f] = e; ac(a, g) }
	        } else if (a = b) I(b) ? a = Ha(b, [], c, d) : ta(b) ? a = new Date(b.getTime()) : jb(b) ? (a = RegExp(b.source, b.toString().match(/[^\/]*$/)[0]), a.lastIndex = b.lastIndex) : T(b) && (a = Ha(b, {}, c, d));
	        return a
	    } function ha(b, a) { if (I(b)) { a = a || []; for (var c = 0; c < b.length; c++) a[c] = b[c] } else if (T(b)) for (c in a = a || {}, b) !kb.call(b, c) || "$" === c.charAt(0) && "$" === c.charAt(1) || (a[c] = b[c]); return a || b } function Aa(b, a) {
	        if (b === a) return !0; if (null === b || null === a) return !1; if (b !== b && a !== a) return !0; var c = typeof b, d; if (c == typeof a && "object" == c) if (I(b)) { if (!I(a)) return !1; if ((c = b.length) == a.length) { for (d = 0; d < c; d++) if (!Aa(b[d], a[d])) return !1; return !0 } } else {
	            if (ta(b)) return ta(a) ? isNaN(b.getTime()) && isNaN(a.getTime()) || b.getTime() ===
	            a.getTime() : !1; if (jb(b) && jb(a)) return b.toString() == a.toString(); if (b && b.$evalAsync && b.$watch || a && a.$evalAsync && a.$watch || Ga(b) || Ga(a) || I(a)) return !1; c = {}; for (d in b) if ("$" !== d.charAt(0) && !P(b[d])) { if (!Aa(b[d], a[d])) return !1; c[d] = !0 } for (d in a) if (!c.hasOwnProperty(d) && "$" !== d.charAt(0) && a[d] !== t && !P(a[d])) return !1; return !0
	        } return !1
	    } function Bb(b, a) {
	        var c = 2 < arguments.length ? Ba.call(arguments, 2) : []; return !P(a) || a instanceof RegExp ? a : c.length ? function () {
	            return arguments.length ? a.apply(b, c.concat(Ba.call(arguments,
	            0))) : a.apply(b, c)
	        } : function () { return arguments.length ? a.apply(b, arguments) : a.call(b) }
	    } function Wc(b, a) { var c = a; "string" === typeof b && "$" === b.charAt(0) ? c = t : Ga(a) ? c = "$WINDOW" : a && X === a ? c = "$DOCUMENT" : a && (a.$evalAsync && a.$watch) && (c = "$SCOPE"); return c } function na(b, a) { return "undefined" === typeof b ? t : JSON.stringify(b, Wc, a ? "  " : null) } function cc(b) { return A(b) ? JSON.parse(b) : b } function Ua(b) {
	        "function" === typeof b ? b = !0 : b && 0 !== b.length ? (b = M("" + b), b = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)) : b = !1;
	        return b
	    } function ia(b) { b = v(b).clone(); try { b.empty() } catch (a) { } var c = v("<div>").append(b).html(); try { return 3 === b[0].nodeType ? M(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) { return "<" + M(b) }) } catch (d) { return M(c) } } function dc(b) { try { return decodeURIComponent(b) } catch (a) { } } function ec(b) { var a = {}, c, d; r((b || "").split("&"), function (b) { b && (c = b.replace(/\+/g, "%20").split("="), d = dc(c[0]), z(d) && (b = z(c[1]) ? dc(c[1]) : !0, kb.call(a, d) ? I(a[d]) ? a[d].push(b) : a[d] = [a[d], b] : a[d] = b)) }); return a } function Cb(b) {
	        var a =
	        []; r(b, function (b, d) { I(b) ? r(b, function (b) { a.push(Ca(d, !0) + (!0 === b ? "" : "=" + Ca(b, !0))) }) : a.push(Ca(d, !0) + (!0 === b ? "" : "=" + Ca(b, !0))) }); return a.length ? a.join("&") : ""
	    } function lb(b) { return Ca(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+") } function Ca(b, a) { return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, a ? "%20" : "+") } function Xc(b, a) {
	        function c(a) { a && d.push(a) } var d = [b], e, f, g = ["ng:app", "ng-app", "x-ng-app",
	        "data-ng-app"], k = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/; r(g, function (a) { g[a] = !0; c(X.getElementById(a)); a = a.replace(":", "\\:"); b.querySelectorAll && (r(b.querySelectorAll("." + a), c), r(b.querySelectorAll("." + a + "\\:"), c), r(b.querySelectorAll("[" + a + "]"), c)) }); r(d, function (a) { if (!e) { var b = k.exec(" " + a.className + " "); b ? (e = a, f = (b[2] || "").replace(/\s+/g, ",")) : r(a.attributes, function (b) { !e && g[b.name] && (e = a, f = b.value) }) } }); e && a(e, f ? [f] : [])
	    } function fc(b, a) {
	        var c = function () {
	            b = v(b); if (b.injector()) {
	                var c = b[0] === X ?
	                "document" : ia(b); throw Ta("btstrpd", c.replace(/</, "&lt;").replace(/>/, "&gt;"));
	            } a = a || []; a.unshift(["$provide", function (a) { a.value("$rootElement", b) }]); a.unshift("ng"); c = gc(a); c.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function (a, b, c, d, e) { a.$apply(function () { b.data("$injector", d); c(b)(a) }) }]); return c
	        }, d = /^NG_DEFER_BOOTSTRAP!/; if (W && !d.test(W.name)) return c(); W.name = W.name.replace(d, ""); Va.resumeBootstrap = function (b) { r(b, function (b) { a.push(b) }); c() }
	    } function mb(b, a) {
	        a =
	        a || "_"; return b.replace(Yc, function (b, d) { return (d ? a : "") + b.toLowerCase() })
	    } function Db(b, a, c) { if (!b) throw Ta("areq", a || "?", c || "required"); return b } function Wa(b, a, c) { c && I(b) && (b = b[b.length - 1]); Db(P(b), a, "not a function, got " + (b && "object" === typeof b ? b.constructor.name || "Object" : typeof b)); return b } function Da(b, a) { if ("hasOwnProperty" === b) throw Ta("badname", a); } function hc(b, a, c) { if (!a) return b; a = a.split("."); for (var d, e = b, f = a.length, g = 0; g < f; g++) d = a[g], b && (b = (e = b)[d]); return !c && P(b) ? Bb(e, b) : b } function Eb(b) {
	        var a =
	        b[0]; b = b[b.length - 1]; if (a === b) return v(a); var c = [a]; do { a = a.nextSibling; if (!a) break; c.push(a) } while (a !== b); return v(c)
	    } function Zc(b) {
	        var a = D("$injector"), c = D("ng"); b = b.angular || (b.angular = {}); b.$$minErr = b.$$minErr || D; return b.module || (b.module = function () {
	            var b = {}; return function (e, f, g) {
	                if ("hasOwnProperty" === e) throw c("badname", "module"); f && b.hasOwnProperty(e) && (b[e] = null); return b[e] || (b[e] = function () {
	                    function b(a, d, e) { return function () { c[e || "push"]([a, d, arguments]); return n } } if (!f) throw a("nomod",
	                    e); var c = [], d = [], l = b("$injector", "invoke"), n = { _invokeQueue: c, _runBlocks: d, requires: f, name: e, provider: b("$provide", "provider"), factory: b("$provide", "factory"), service: b("$provide", "service"), value: b("$provide", "value"), constant: b("$provide", "constant", "unshift"), animation: b("$animateProvider", "register"), filter: b("$filterProvider", "register"), controller: b("$controllerProvider", "register"), directive: b("$compileProvider", "directive"), config: l, run: function (a) { d.push(a); return this } }; g && l(g); return n
	                }())
	            }
	        }())
	    }
	    function $c(b) {
	        J(b, { bootstrap: fc, copy: Ha, extend: J, equals: Aa, element: v, forEach: r, injector: gc, noop: F, bind: Bb, toJson: na, fromJson: cc, identity: Qa, isUndefined: y, isDefined: z, isString: A, isFunction: P, isObject: T, isNumber: ib, isElement: Uc, isArray: I, version: ad, isDate: ta, lowercase: M, uppercase: Ia, callbacks: { counter: 0 }, $$minErr: D, $$csp: Xa }); Ya = Zc(W); try { Ya("ngLocale") } catch (a) { Ya("ngLocale", []).provider("$locale", bd) } Ya("ng", ["ngLocale"], ["$provide", function (a) {
	            a.provider({ $$sanitizeUri: cd }); a.provider("$compile",
	            ic).directive({ a: dd, input: jc, textarea: jc, form: ed, script: fd, select: gd, style: hd, option: id, ngBind: jd, ngBindHtml: kd, ngBindTemplate: ld, ngClass: md, ngClassEven: nd, ngClassOdd: od, ngCloak: pd, ngController: qd, ngForm: rd, ngHide: sd, ngIf: td, ngInclude: ud, ngInit: vd, ngNonBindable: wd, ngPluralize: xd, ngRepeat: yd, ngShow: zd, ngStyle: Ad, ngSwitch: Bd, ngSwitchWhen: Cd, ngSwitchDefault: Dd, ngOptions: Ed, ngTransclude: Fd, ngModel: Gd, ngList: Hd, ngChange: Id, required: kc, ngRequired: kc, ngValue: Jd }).directive({ ngInclude: Kd }).directive(Fb).directive(lc);
	            a.provider({ $anchorScroll: Ld, $animate: Md, $browser: Nd, $cacheFactory: Od, $controller: Pd, $document: Qd, $exceptionHandler: Rd, $filter: mc, $interpolate: Sd, $interval: Td, $http: Ud, $httpBackend: Vd, $location: Wd, $log: Xd, $parse: Yd, $rootScope: Zd, $q: $d, $sce: ae, $sceDelegate: be, $sniffer: ce, $templateCache: de, $timeout: ee, $window: fe, $$rAF: ge, $$asyncCallback: he })
	        }])
	    } function Za(b) { return b.replace(ie, function (a, b, d, e) { return e ? d.toUpperCase() : d }).replace(je, "Moz$1") } function Gb(b, a, c, d) {
	        function e(b) {
	            var e = c && b ? [this.filter(b)] :
	            [this], m = a, h, l, n, p, q, s; if (!d || null != b) for (; e.length;) for (h = e.shift(), l = 0, n = h.length; l < n; l++) for (p = v(h[l]), m ? p.triggerHandler("$destroy") : m = !m, q = 0, p = (s = p.children()).length; q < p; q++) e.push(Ea(s[q])); return f.apply(this, arguments)
	        } var f = Ea.fn[b], f = f.$original || f; e.$original = f; Ea.fn[b] = e
	    } function S(b) {
	        if (b instanceof S) return b; A(b) && (b = aa(b)); if (!(this instanceof S)) { if (A(b) && "<" != b.charAt(0)) throw Hb("nosel"); return new S(b) } if (A(b)) {
	            var a = b; b = X; var c; if (c = ke.exec(a)) b = [b.createElement(c[1])]; else {
	                var d =
	                b, e; b = d.createDocumentFragment(); c = []; if (Ib.test(a)) { d = b.appendChild(d.createElement("div")); e = (le.exec(a) || ["", ""])[1].toLowerCase(); e = ea[e] || ea._default; d.innerHTML = "<div>&#160;</div>" + e[1] + a.replace(me, "<$1></$2>") + e[2]; d.removeChild(d.firstChild); for (a = e[0]; a--;) d = d.lastChild; a = 0; for (e = d.childNodes.length; a < e; ++a) c.push(d.childNodes[a]); d = b.firstChild; d.textContent = "" } else c.push(d.createTextNode(a)); b.textContent = ""; b.innerHTML = ""; b = c
	            } Jb(this, b); v(X.createDocumentFragment()).append(this)
	        } else Jb(this,
	        b)
	    } function Kb(b) { return b.cloneNode(!0) } function Ja(b) { Lb(b); var a = 0; for (b = b.childNodes || []; a < b.length; a++) Ja(b[a]) } function nc(b, a, c, d) { if (z(d)) throw Hb("offargs"); var e = oa(b, "events"); oa(b, "handle") && (y(a) ? r(e, function (a, c) { $a(b, c, a); delete e[c] }) : r(a.split(" "), function (a) { y(c) ? ($a(b, a, e[a]), delete e[a]) : Sa(e[a] || [], c) })) } function Lb(b, a) { var c = b.ng339, d = ab[c]; d && (a ? delete ab[c].data[a] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), nc(b)), delete ab[c], b.ng339 = t)) } function oa(b, a, c) {
	        var d =
	        b.ng339, d = ab[d || -1]; if (z(c)) d || (b.ng339 = d = ++ne, d = ab[d] = {}), d[a] = c; else return d && d[a]
	    } function Mb(b, a, c) { var d = oa(b, "data"), e = z(c), f = !e && z(a), g = f && !T(a); d || g || oa(b, "data", d = {}); if (e) d[a] = c; else if (f) { if (g) return d && d[a]; J(d, a) } else return d } function Nb(b, a) { return b.getAttribute ? -1 < (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") : !1 } function nb(b, a) {
	        a && b.setAttribute && r(a.split(" "), function (a) {
	            b.setAttribute("class", aa((" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g,
	            " ").replace(" " + aa(a) + " ", " ")))
	        })
	    } function ob(b, a) { if (a && b.setAttribute) { var c = (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " "); r(a.split(" "), function (a) { a = aa(a); -1 === c.indexOf(" " + a + " ") && (c += a + " ") }); b.setAttribute("class", aa(c)) } } function Jb(b, a) { if (a) { a = a.nodeName || !z(a.length) || Ga(a) ? [a] : a; for (var c = 0; c < a.length; c++) b.push(a[c]) } } function oc(b, a) { return pb(b, "$" + (a || "ngController") + "Controller") } function pb(b, a, c) {
	        9 == b.nodeType && (b = b.documentElement); for (a = I(a) ? a : [a]; b;) {
	            for (var d =
	            0, e = a.length; d < e; d++) if ((c = v.data(b, a[d])) !== t) return c; b = b.parentNode || 11 === b.nodeType && b.host
	        }
	    } function pc(b) { for (var a = 0, c = b.childNodes; a < c.length; a++) Ja(c[a]); for (; b.firstChild;) b.removeChild(b.firstChild) } function qc(b, a) { var c = qb[a.toLowerCase()]; return c && rc[b.nodeName] && c } function oe(b, a) {
	        var c = function (c, e) {
	            c.preventDefault || (c.preventDefault = function () { c.returnValue = !1 }); c.stopPropagation || (c.stopPropagation = function () { c.cancelBubble = !0 }); c.target || (c.target = c.srcElement || X); if (y(c.defaultPrevented)) {
	                var f =
	                c.preventDefault; c.preventDefault = function () { c.defaultPrevented = !0; f.call(c) }; c.defaultPrevented = !1
	            } c.isDefaultPrevented = function () { return c.defaultPrevented || !1 === c.returnValue }; var g = ha(a[e || c.type] || []); r(g, function (a) { a.call(b, c) }); 8 >= Q ? (c.preventDefault = null, c.stopPropagation = null, c.isDefaultPrevented = null) : (delete c.preventDefault, delete c.stopPropagation, delete c.isDefaultPrevented)
	        }; c.elem = b; return c
	    } function Ka(b, a) {
	        var c = typeof b, d; "function" == c || "object" == c && null !== b ? "function" == typeof (d =
	        b.$$hashKey) ? d = b.$$hashKey() : d === t && (d = b.$$hashKey = (a || hb)()) : d = b; return c + ":" + d
	    } function bb(b, a) { if (a) { var c = 0; this.nextUid = function () { return ++c } } r(b, this.put, this) } function sc(b) { var a, c; "function" === typeof b ? (a = b.$inject) || (a = [], b.length && (c = b.toString().replace(pe, ""), c = c.match(qe), r(c[1].split(re), function (b) { b.replace(se, function (b, c, d) { a.push(d) }) })), b.$inject = a) : I(b) ? (c = b.length - 1, Wa(b[c], "fn"), a = b.slice(0, c)) : Wa(b, "fn", !0); return a } function gc(b) {
	        function a(a) {
	            return function (b, c) {
	                if (T(b)) r(b,
	                $b(a)); else return a(b, c)
	            }
	        } function c(a, b) { Da(a, "service"); if (P(b) || I(b)) b = n.instantiate(b); if (!b.$get) throw cb("pget", a); return l[a + k] = b } function d(a, b) { return c(a, { $get: b }) } function e(a) {
	            var b = [], c, d, f, k; r(a, function (a) {
	                if (!h.get(a)) {
	                    h.put(a, !0); try { if (A(a)) for (c = Ya(a), b = b.concat(e(c.requires)).concat(c._runBlocks), d = c._invokeQueue, f = 0, k = d.length; f < k; f++) { var g = d[f], m = n.get(g[0]); m[g[1]].apply(m, g[2]) } else P(a) ? b.push(n.invoke(a)) : I(a) ? b.push(n.invoke(a)) : Wa(a, "module") } catch (l) {
	                        throw I(a) && (a =
	                        a[a.length - 1]), l.message && (l.stack && -1 == l.stack.indexOf(l.message)) && (l = l.message + "\n" + l.stack), cb("modulerr", a, l.stack || l.message || l);
	                    }
	                }
	            }); return b
	        } function f(a, b) {
	            function c(d) { if (a.hasOwnProperty(d)) { if (a[d] === g) throw cb("cdep", d + " <- " + m.join(" <- ")); return a[d] } try { return m.unshift(d), a[d] = g, a[d] = b(d) } catch (e) { throw a[d] === g && delete a[d], e; } finally { m.shift() } } function d(a, b, e) {
	                var f = [], k = sc(a), g, m, h; m = 0; for (g = k.length; m < g; m++) {
	                    h = k[m]; if ("string" !== typeof h) throw cb("itkn", h); f.push(e && e.hasOwnProperty(h) ?
	                    e[h] : c(h))
	                } I(a) && (a = a[g]); return a.apply(b, f)
	            } return { invoke: d, instantiate: function (a, b) { var c = function () { }, e; c.prototype = (I(a) ? a[a.length - 1] : a).prototype; c = new c; e = d(a, c, b); return T(e) || P(e) ? e : c }, get: c, annotate: sc, has: function (b) { return l.hasOwnProperty(b + k) || a.hasOwnProperty(b) } }
	        } var g = {}, k = "Provider", m = [], h = new bb([], !0), l = {
	            $provide: {
	                provider: a(c), factory: a(d), service: a(function (a, b) { return d(a, ["$injector", function (a) { return a.instantiate(b) }]) }), value: a(function (a, b) { return d(a, ba(b)) }), constant: a(function (a,
	                b) { Da(a, "constant"); l[a] = b; p[a] = b }), decorator: function (a, b) { var c = n.get(a + k), d = c.$get; c.$get = function () { var a = q.invoke(d, c); return q.invoke(b, null, { $delegate: a }) } }
	            }
	        }, n = l.$injector = f(l, function () { throw cb("unpr", m.join(" <- ")); }), p = {}, q = p.$injector = f(p, function (a) { a = n.get(a + k); return q.invoke(a.$get, a) }); r(e(b), function (a) { q.invoke(a || F) }); return q
	    } function Ld() {
	        var b = !0; this.disableAutoScrolling = function () { b = !1 }; this.$get = ["$window", "$location", "$rootScope", function (a, c, d) {
	            function e(a) {
	                var b = null;
	                r(a, function (a) { b || "a" !== M(a.nodeName) || (b = a) }); return b
	            } function f() { var b = c.hash(), d; b ? (d = g.getElementById(b)) ? d.scrollIntoView() : (d = e(g.getElementsByName(b))) ? d.scrollIntoView() : "top" === b && a.scrollTo(0, 0) : a.scrollTo(0, 0) } var g = a.document; b && d.$watch(function () { return c.hash() }, function () { d.$evalAsync(f) }); return f
	        }]
	    } function he() { this.$get = ["$$rAF", "$timeout", function (b, a) { return b.supported ? function (a) { return b(a) } : function (b) { return a(b, 0, !1) } }] } function te(b, a, c, d) {
	        function e(a) {
	            try {
	                a.apply(null,
	                Ba.call(arguments, 1))
	            } finally { if (s--, 0 === s) for (; E.length;) try { E.pop()() } catch (b) { c.error(b) } }
	        } function f(a, b) { (function fa() { r(u, function (a) { a() }); B = b(fa, a) })() } function g() { w = null; N != k.url() && (N = k.url(), r(ca, function (a) { a(k.url()) })) } var k = this, m = a[0], h = b.location, l = b.history, n = b.setTimeout, p = b.clearTimeout, q = {}; k.isMock = !1; var s = 0, E = []; k.$$completeOutstandingRequest = e; k.$$incOutstandingRequestCount = function () { s++ }; k.notifyWhenNoOutstandingRequests = function (a) { r(u, function (a) { a() }); 0 === s ? a() : E.push(a) };
	        var u = [], B; k.addPollFn = function (a) { y(B) && f(100, n); u.push(a); return a }; var N = h.href, R = a.find("base"), w = null; k.url = function (a, c) { h !== b.location && (h = b.location); l !== b.history && (l = b.history); if (a) { if (N != a) return N = a, d.history ? c ? l.replaceState(null, "", a) : (l.pushState(null, "", a), R.attr("href", R.attr("href"))) : (w = a, c ? h.replace(a) : h.href = a), k } else return w || h.href.replace(/%27/g, "'") }; var ca = [], K = !1; k.onUrlChange = function (a) {
	            if (!K) {
	                if (d.history) v(b).on("popstate", g); if (d.hashchange) v(b).on("hashchange", g);
	                else k.addPollFn(g); K = !0
	            } ca.push(a); return a
	        }; k.$$checkUrlChange = g; k.baseHref = function () { var a = R.attr("href"); return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "" }; var O = {}, da = "", C = k.baseHref(); k.cookies = function (a, b) {
	            var d, e, f, k; if (a) b === t ? m.cookie = escape(a) + "=;path=" + C + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : A(b) && (d = (m.cookie = escape(a) + "=" + escape(b) + ";path=" + C).length + 1, 4096 < d && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!")); else {
	                if (m.cookie !==
	                da) for (da = m.cookie, d = da.split("; "), O = {}, f = 0; f < d.length; f++) e = d[f], k = e.indexOf("="), 0 < k && (a = unescape(e.substring(0, k)), O[a] === t && (O[a] = unescape(e.substring(k + 1)))); return O
	            }
	        }; k.defer = function (a, b) { var c; s++; c = n(function () { delete q[c]; e(a) }, b || 0); q[c] = !0; return c }; k.defer.cancel = function (a) { return q[a] ? (delete q[a], p(a), e(F), !0) : !1 }
	    } function Nd() { this.$get = ["$window", "$log", "$sniffer", "$document", function (b, a, c, d) { return new te(b, d, a, c) }] } function Od() {
	        this.$get = function () {
	            function b(b, d) {
	                function e(a) {
	                    a !=
	                    n && (p ? p == a && (p = a.n) : p = a, f(a.n, a.p), f(a, n), n = a, n.n = null)
	                } function f(a, b) { a != b && (a && (a.p = b), b && (b.n = a)) } if (b in a) throw D("$cacheFactory")("iid", b); var g = 0, k = J({}, d, { id: b }), m = {}, h = d && d.capacity || Number.MAX_VALUE, l = {}, n = null, p = null; return a[b] = {
	                    put: function (a, b) { if (h < Number.MAX_VALUE) { var c = l[a] || (l[a] = { key: a }); e(c) } if (!y(b)) return a in m || g++, m[a] = b, g > h && this.remove(p.key), b }, get: function (a) { if (h < Number.MAX_VALUE) { var b = l[a]; if (!b) return; e(b) } return m[a] }, remove: function (a) {
	                        if (h < Number.MAX_VALUE) {
	                            var b =
	                            l[a]; if (!b) return; b == n && (n = b.p); b == p && (p = b.n); f(b.n, b.p); delete l[a]
	                        } delete m[a]; g--
	                    }, removeAll: function () { m = {}; g = 0; l = {}; n = p = null }, destroy: function () { l = k = m = null; delete a[b] }, info: function () { return J({}, k, { size: g }) }
	                }
	            } var a = {}; b.info = function () { var b = {}; r(a, function (a, e) { b[e] = a.info() }); return b }; b.get = function (b) { return a[b] }; return b
	        }
	    } function de() { this.$get = ["$cacheFactory", function (b) { return b("templates") }] } function ic(b, a) {
	        var c = {}, d = "Directive", e = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/, f = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/,
	        g = /^(on[a-z]+|formaction)$/; this.directive = function m(a, e) {
	            Da(a, "directive"); A(a) ? (Db(e, "directiveFactory"), c.hasOwnProperty(a) || (c[a] = [], b.factory(a + d, ["$injector", "$exceptionHandler", function (b, d) { var e = []; r(c[a], function (c, f) { try { var g = b.invoke(c); P(g) ? g = { compile: ba(g) } : !g.compile && g.link && (g.compile = ba(g.link)); g.priority = g.priority || 0; g.index = f; g.name = g.name || a; g.require = g.require || g.controller && g.name; g.restrict = g.restrict || "A"; e.push(g) } catch (m) { d(m) } }); return e }])), c[a].push(e)) : r(a, $b(m));
	            return this
	        }; this.aHrefSanitizationWhitelist = function (b) { return z(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist() }; this.imgSrcSanitizationWhitelist = function (b) { return z(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist() }; this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function (a, b, l, n, p, q, s, E, u, B, N, R) {
	            function w(a, b, c, d, e) {
	                a instanceof
	                v || (a = v(a)); r(a, function (b, c) { 3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = v(b).wrap("<span></span>").parent()[0]) }); var f = K(a, b, a, c, d, e); ca(a, "ng-scope"); return function (b, c, d, e) { Db(b, "scope"); var g = c ? La.clone.call(a) : a; r(d, function (a, b) { g.data("$" + b + "Controller", a) }); d = 0; for (var m = g.length; d < m; d++) { var h = g[d].nodeType; 1 !== h && 9 !== h || g.eq(d).data("$scope", b) } c && c(g, b); f && f(b, g, g, e); return g }
	            } function ca(a, b) { try { a.addClass(b) } catch (c) { } } function K(a, b, c, d, e, f) {
	                function g(a, c, d, e) {
	                    var f, h, l, q, n,
	                    p, s; f = c.length; var L = Array(f); for (q = 0; q < f; q++) L[q] = c[q]; p = q = 0; for (n = m.length; q < n; p++) h = L[p], c = m[q++], f = m[q++], c ? (c.scope ? (l = a.$new(), v.data(h, "$scope", l)) : l = a, s = c.transcludeOnThisElement ? O(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? O(a, b) : null, c(f, l, h, d, s)) : f && f(a, h.childNodes, t, e)
	                } for (var m = [], h, l, q, n, p = 0; p < a.length; p++) h = new Ob, l = da(a[p], [], h, 0 === p ? d : t, e), (f = l.length ? H(l, a[p], h, b, c, null, [], [], f) : null) && f.scope && ca(h.$$element, "ng-scope"), h = f && f.terminal || !(q = a[p].childNodes) || !q.length ?
	                null : K(q, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b), m.push(f, h), n = n || f || h, f = null; return n ? g : null
	            } function O(a, b, c) { return function (d, e, f) { var g = !1; d || (d = a.$new(), g = d.$$transcluded = !0); e = b(d, e, f, c); if (g) e.on("$destroy", function () { d.$destroy() }); return e } } function da(a, b, c, d, g) {
	                var m = c.$attr, h; switch (a.nodeType) {
	                    case 1: fa(b, pa(Ma(a).toLowerCase()), "E", d, g); for (var l, q, n, p = a.attributes, s = 0, E = p && p.length; s < E; s++) {
	                        var B = !1, N = !1; l = p[s]; if (!Q || 8 <= Q || l.specified) {
	                            h = l.name; q =
	                            aa(l.value); l = pa(h); if (n = U.test(l)) h = mb(l.substr(6), "-"); var u = l.replace(/(Start|End)$/, ""); l === u + "Start" && (B = h, N = h.substr(0, h.length - 5) + "end", h = h.substr(0, h.length - 6)); l = pa(h.toLowerCase()); m[l] = h; if (n || !c.hasOwnProperty(l)) c[l] = q, qc(a, l) && (c[l] = !0); S(a, b, q, l); fa(b, l, "A", d, g, B, N)
	                        }
	                    } a = a.className; if (A(a) && "" !== a) for (; h = f.exec(a) ;) l = pa(h[2]), fa(b, l, "C", d, g) && (c[l] = aa(h[3])), a = a.substr(h.index + h[0].length); break; case 3: M(b, a.nodeValue); break; case 8: try {
	                        if (h = e.exec(a.nodeValue)) l = pa(h[1]), fa(b, l, "M",
	                        d, g) && (c[l] = aa(h[2]))
	                    } catch (w) { }
	                } b.sort(y); return b
	            } function C(a, b, c) { var d = [], e = 0; if (b && a.hasAttribute && a.hasAttribute(b)) { do { if (!a) throw ja("uterdir", b, c); 1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--); d.push(a); a = a.nextSibling } while (0 < e) } else d.push(a); return v(d) } function x(a, b, c) { return function (d, e, f, g, h) { e = C(e[0], b, c); return a(d, e, f, g, h) } } function H(a, c, d, e, f, g, m, n, p) {
	                function E(a, b, c, d) {
	                    if (a) {
	                        c && (a = x(a, c, d)); a.require = G.require; a.directiveName = D; if (K === G || G.$$isolateScope) a =
	                        tc(a, { isolateScope: !0 }); m.push(a)
	                    } if (b) { c && (b = x(b, c, d)); b.require = G.require; b.directiveName = D; if (K === G || G.$$isolateScope) b = tc(b, { isolateScope: !0 }); n.push(b) }
	                } function B(a, b, c, d) { var e, f = "data", g = !1; if (A(b)) { for (; "^" == (e = b.charAt(0)) || "?" == e;) b = b.substr(1), "^" == e && (f = "inheritedData"), g = g || "?" == e; e = null; d && "data" === f && (e = d[b]); e = e || c[f]("$" + b + "Controller"); if (!e && !g) throw ja("ctreq", b, a); } else I(b) && (e = [], r(b, function (b) { e.push(B(a, b, c, d)) })); return e } function N(a, e, f, g, p) {
	                    function E(a, b) {
	                        var c; 2 > arguments.length &&
	                        (b = a, a = t); M && (c = da); return p(a, b, c)
	                    } var u, L, w, O, x, C, da = {}, rb; u = c === f ? d : ha(d, new Ob(v(f), d.$attr)); L = u.$$element; if (K) {
	                        var Na = /^\s*([@=&])(\??)\s*(\w*)\s*$/; C = e.$new(!0); !H || H !== K && H !== K.$$originalDirective ? L.data("$isolateScopeNoTemplate", C) : L.data("$isolateScope", C); ca(L, "ng-isolate-scope"); r(K.scope, function (a, c) {
	                            var d = a.match(Na) || [], f = d[3] || c, g = "?" == d[2], d = d[1], m, l, n, p; C.$$isolateBindings[c] = d + f; switch (d) {
	                                case "@": u.$observe(f, function (a) { C[c] = a }); u.$$observers[f].$$scope = e; u[f] && (C[c] = b(u[f])(e));
	                                    break; case "=": if (g && !u[f]) break; l = q(u[f]); p = l.literal ? Aa : function (a, b) { return a === b || a !== a && b !== b }; n = l.assign || function () { m = C[c] = l(e); throw ja("nonassign", u[f], K.name); }; m = C[c] = l(e); C.$watch(function () { var a = l(e); p(a, C[c]) || (p(a, m) ? n(e, a = C[c]) : C[c] = a); return m = a }, null, l.literal); break; case "&": l = q(u[f]); C[c] = function (a) { return l(e, a) }; break; default: throw ja("iscp", K.name, c, a);
	                            }
	                        })
	                    } rb = p && E; R && r(R, function (a) {
	                        var b = { $scope: a === K || a.$$isolateScope ? C : e, $element: L, $attrs: u, $transclude: rb }, c; x = a.controller;
	                        "@" == x && (x = u[a.name]); c = s(x, b); da[a.name] = c; M || L.data("$" + a.name + "Controller", c); a.controllerAs && (b.$scope[a.controllerAs] = c)
	                    }); g = 0; for (w = m.length; g < w; g++) try { O = m[g], O(O.isolateScope ? C : e, L, u, O.require && B(O.directiveName, O.require, L, da), rb) } catch (G) { l(G, ia(L)) } g = e; K && (K.template || null === K.templateUrl) && (g = C); a && a(g, f.childNodes, t, p); for (g = n.length - 1; 0 <= g; g--) try { O = n[g], O(O.isolateScope ? C : e, L, u, O.require && B(O.directiveName, O.require, L, da), rb) } catch (z) { l(z, ia(L)) }
	                } p = p || {}; for (var u = -Number.MAX_VALUE,
	                O, R = p.controllerDirectives, K = p.newIsolateScopeDirective, H = p.templateDirective, fa = p.nonTlbTranscludeDirective, y = !1, J = !1, M = p.hasElementTranscludeDirective, Z = d.$$element = v(c), G, D, V, S = e, Q, Fa = 0, qa = a.length; Fa < qa; Fa++) {
	                    G = a[Fa]; var U = G.$$start, Y = G.$$end; U && (Z = C(c, U, Y)); V = t; if (u > G.priority) break; if (V = G.scope) O = O || G, G.templateUrl || (db("new/isolated scope", K, G, Z), T(V) && (K = G)); D = G.name; !G.templateUrl && G.controller && (V = G.controller, R = R || {}, db("'" + D + "' controller", R[D], G, Z), R[D] = G); if (V = G.transclude) y = !0, G.$$tlb ||
	                    (db("transclusion", fa, G, Z), fa = G), "element" == V ? (M = !0, u = G.priority, V = Z, Z = d.$$element = v(X.createComment(" " + D + ": " + d[D] + " ")), c = Z[0], Na(f, Ba.call(V, 0), c), S = w(V, e, u, g && g.name, { nonTlbTranscludeDirective: fa })) : (V = v(Kb(c)).contents(), Z.empty(), S = w(V, e)); if (G.template) if (J = !0, db("template", H, G, Z), H = G, V = P(G.template) ? G.template(Z, d) : G.template, V = W(V), G.replace) {
	                        g = G; V = Ib.test(V) ? v(aa(V)) : []; c = V[0]; if (1 != V.length || 1 !== c.nodeType) throw ja("tplrt", D, ""); Na(f, Z, c); qa = { $attr: {} }; V = da(c, [], qa); var $ = a.splice(Fa +
	                        1, a.length - (Fa + 1)); K && z(V); a = a.concat(V).concat($); F(d, qa); qa = a.length
	                    } else Z.html(V); if (G.templateUrl) J = !0, db("template", H, G, Z), H = G, G.replace && (g = G), N = ue(a.splice(Fa, a.length - Fa), Z, d, f, y && S, m, n, { controllerDirectives: R, newIsolateScopeDirective: K, templateDirective: H, nonTlbTranscludeDirective: fa }), qa = a.length; else if (G.compile) try { Q = G.compile(Z, d, S), P(Q) ? E(null, Q, U, Y) : Q && E(Q.pre, Q.post, U, Y) } catch (ve) { l(ve, ia(Z)) } G.terminal && (N.terminal = !0, u = Math.max(u, G.priority))
	                } N.scope = O && !0 === O.scope; N.transcludeOnThisElement =
	                y; N.templateOnThisElement = J; N.transclude = S; p.hasElementTranscludeDirective = M; return N
	            } function z(a) { for (var b = 0, c = a.length; b < c; b++) a[b] = bc(a[b], { $$isolateScope: !0 }) } function fa(b, e, f, g, h, q, n) { if (e === h) return null; h = null; if (c.hasOwnProperty(e)) { var p; e = a.get(e + d); for (var s = 0, u = e.length; s < u; s++) try { p = e[s], (g === t || g > p.priority) && -1 != p.restrict.indexOf(f) && (q && (p = bc(p, { $$start: q, $$end: n })), b.push(p), h = p) } catch (E) { l(E) } } return h } function F(a, b) {
	                var c = b.$attr, d = a.$attr, e = a.$$element; r(a, function (d, e) {
	                    "$" !=
	                    e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
	                }); r(b, function (b, f) { "class" == f ? (ca(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f]) })
	            } function ue(a, b, c, d, e, f, g, h) {
	                var m = [], l, q, s = b[0], u = a.shift(), E = J({}, u, { templateUrl: null, transclude: null, replace: null, $$originalDirective: u }), N = P(u.templateUrl) ? u.templateUrl(b, c) : u.templateUrl;
	                b.empty(); n.get(B.getTrustedResourceUrl(N), { cache: p }).success(function (n) {
	                    var p, B; n = W(n); if (u.replace) { n = Ib.test(n) ? v(aa(n)) : []; p = n[0]; if (1 != n.length || 1 !== p.nodeType) throw ja("tplrt", u.name, N); n = { $attr: {} }; Na(d, b, p); var w = da(p, [], n); T(u.scope) && z(w); a = w.concat(a); F(c, n) } else p = s, b.html(n); a.unshift(E); l = H(a, p, c, e, b, u, f, g, h); r(d, function (a, c) { a == p && (d[c] = b[0]) }); for (q = K(b[0].childNodes, e) ; m.length;) {
	                        n = m.shift(); B = m.shift(); var R = m.shift(), x = m.shift(), w = b[0]; if (B !== s) {
	                            var C = B.className; h.hasElementTranscludeDirective &&
	                            u.replace || (w = Kb(p)); Na(R, v(B), w); ca(v(w), C)
	                        } B = l.transcludeOnThisElement ? O(n, l.transclude, x) : x; l(q, n, w, d, B)
	                    } m = null
	                }).error(function (a, b, c, d) { throw ja("tpload", d.url); }); return function (a, b, c, d, e) { a = e; m ? (m.push(b), m.push(c), m.push(d), m.push(a)) : (l.transcludeOnThisElement && (a = O(b, l.transclude, e)), l(q, b, c, d, a)) }
	            } function y(a, b) { var c = b.priority - a.priority; return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index } function db(a, b, c, d) { if (b) throw ja("multidir", b.name, c.name, a, ia(d)); } function M(a,
	            c) { var d = b(c, !0); d && a.push({ priority: 0, compile: function (a) { var b = a.parent().length; b && ca(a.parent(), "ng-binding"); return function (a, c) { var e = c.parent(), f = e.data("$binding") || []; f.push(d); e.data("$binding", f); b || ca(e, "ng-binding"); a.$watch(d, function (a) { c[0].nodeValue = a }) } } }) } function D(a, b) { if ("srcdoc" == b) return B.HTML; var c = Ma(a); if ("xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b)) return B.RESOURCE_URL } function S(a, c, d, e) {
	                var f = b(d, !0); if (f) {
	                    if ("multiple" === e && "SELECT" ===
	                    Ma(a)) throw ja("selmulti", ia(a)); c.push({ priority: 100, compile: function () { return { pre: function (c, d, m) { d = m.$$observers || (m.$$observers = {}); if (g.test(e)) throw ja("nodomevents"); if (f = b(m[e], !0, D(a, e))) m[e] = f(c), (d[e] || (d[e] = [])).$$inter = !0, (m.$$observers && m.$$observers[e].$$scope || c).$watch(f, function (a, b) { "class" === e && a != b ? m.$updateClass(a, b) : m.$set(e, a) }) } } } })
	                }
	            } function Na(a, b, c) {
	                var d = b[0], e = b.length, f = d.parentNode, g, m; if (a) for (g = 0, m = a.length; g < m; g++) if (a[g] == d) {
	                    a[g++] = c; m = g + e - 1; for (var h = a.length; g <
	                    h; g++, m++) m < h ? a[g] = a[m] : delete a[g]; a.length -= e - 1; break
	                } f && f.replaceChild(c, d); a = X.createDocumentFragment(); a.appendChild(d); c[v.expando] = d[v.expando]; d = 1; for (e = b.length; d < e; d++) f = b[d], v(f).remove(), a.appendChild(f), delete b[d]; b[0] = c; b.length = 1
	            } function tc(a, b) { return J(function () { return a.apply(null, arguments) }, a, b) } var Ob = function (a, b) { this.$$element = a; this.$attr = b || {} }; Ob.prototype = {
	                $normalize: pa, $addClass: function (a) { a && 0 < a.length && N.addClass(this.$$element, a) }, $removeClass: function (a) {
	                    a && 0 <
	                    a.length && N.removeClass(this.$$element, a)
	                }, $updateClass: function (a, b) { var c = uc(a, b), d = uc(b, a); 0 === c.length ? N.removeClass(this.$$element, d) : 0 === d.length ? N.addClass(this.$$element, c) : N.setClass(this.$$element, c, d) }, $set: function (a, b, c, d) {
	                    var e = qc(this.$$element[0], a); e && (this.$$element.prop(a, b), d = e); this[a] = b; d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = mb(a, "-")); e = Ma(this.$$element); if ("A" === e && "href" === a || "IMG" === e && "src" === a) this[a] = b = R(b, "src" === a); !1 !== c && (null === b || b === t ? this.$$element.removeAttr(d) :
	                    this.$$element.attr(d, b)); (c = this.$$observers) && r(c[a], function (a) { try { a(b) } catch (c) { l(c) } })
	                }, $observe: function (a, b) { var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []); e.push(b); E.$evalAsync(function () { e.$$inter || b(c[a]) }); return b }
	            }; var qa = b.startSymbol(), Z = b.endSymbol(), W = "{{" == qa || "}}" == Z ? Qa : function (a) { return a.replace(/\{\{/g, qa).replace(/}}/g, Z) }, U = /^ngAttr[A-Z]/; return w
	        }]
	    } function pa(b) { return Za(b.replace(we, "")) } function uc(b, a) {
	        var c = "", d = b.split(/\s+/), e = a.split(/\s+/), f =
	        0; a: for (; f < d.length; f++) { for (var g = d[f], k = 0; k < e.length; k++) if (g == e[k]) continue a; c += (0 < c.length ? " " : "") + g } return c
	    } function Pd() {
	        var b = {}, a = /^(\S+)(\s+as\s+(\w+))?$/; this.register = function (a, d) { Da(a, "controller"); T(a) ? J(b, a) : b[a] = d }; this.$get = ["$injector", "$window", function (c, d) {
	            return function (e, f) {
	                var g, k, m; A(e) && (g = e.match(a), k = g[1], m = g[3], e = b.hasOwnProperty(k) ? b[k] : hc(f.$scope, k, !0) || hc(d, k, !0), Wa(e, k, !0)); g = c.instantiate(e, f); if (m) {
	                    if (!f || "object" !== typeof f.$scope) throw D("$controller")("noscp",
	                    k || e.name, m); f.$scope[m] = g
	                } return g
	            }
	        }]
	    } function Qd() { this.$get = ["$window", function (b) { return v(b.document) }] } function Rd() { this.$get = ["$log", function (b) { return function (a, c) { b.error.apply(b, arguments) } }] } function vc(b) { var a = {}, c, d, e; if (!b) return a; r(b.split("\n"), function (b) { e = b.indexOf(":"); c = M(aa(b.substr(0, e))); d = aa(b.substr(e + 1)); c && (a[c] = a[c] ? a[c] + ", " + d : d) }); return a } function wc(b) { var a = T(b) ? b : t; return function (c) { a || (a = vc(b)); return c ? a[M(c)] || null : a } } function xc(b, a, c) {
	        if (P(c)) return c(b,
	        a); r(c, function (c) { b = c(b, a) }); return b
	    } function Ud() {
	        var b = /^\s*(\[|\{[^\{])/, a = /[\}\]]\s*$/, c = /^\)\]\}',?\n/, d = { "Content-Type": "application/json;charset=utf-8" }, e = this.defaults = {
	            transformResponse: [function (d) { A(d) && (d = d.replace(c, ""), b.test(d) && a.test(d) && (d = cc(d))); return d }], transformRequest: [function (a) { return T(a) && "[object File]" !== za.call(a) && "[object Blob]" !== za.call(a) ? na(a) : a }], headers: { common: { Accept: "application/json, text/plain, */*" }, post: ha(d), put: ha(d), patch: ha(d) }, xsrfCookieName: "XSRF-TOKEN",
	            xsrfHeaderName: "X-XSRF-TOKEN"
	        }, f = this.interceptors = [], g = this.responseInterceptors = []; this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function (a, b, c, d, n, p) {
	            function q(a) {
	                function b(a) { var d = J({}, a, { data: xc(a.data, a.headers, c.transformResponse) }); return 200 <= a.status && 300 > a.status ? d : n.reject(d) } var c = { method: "get", transformRequest: e.transformRequest, transformResponse: e.transformResponse }, d = function (a) {
	                    var b = e.headers, c = J({}, a.headers), d, f, b = J({}, b.common, b[M(a.method)]);
	                    a: for (d in b) { a = M(d); for (f in c) if (M(f) === a) continue a; c[d] = b[d] } (function (a) { var b; r(a, function (c, d) { P(c) && (b = c(), null != b ? a[d] = b : delete a[d]) }) })(c); return c
	                }(a); J(c, a); c.headers = d; c.method = Ia(c.method); var f = [function (a) { d = a.headers; var c = xc(a.data, wc(d), a.transformRequest); y(c) && r(d, function (a, b) { "content-type" === M(b) && delete d[b] }); y(a.withCredentials) && !y(e.withCredentials) && (a.withCredentials = e.withCredentials); return s(a, c, d).then(b, b) }, t], g = n.when(c); for (r(B, function (a) {
	                (a.request || a.requestError) &&
	                f.unshift(a.request, a.requestError); (a.response || a.responseError) && f.push(a.response, a.responseError)
	                }) ; f.length;) { a = f.shift(); var m = f.shift(), g = g.then(a, m) } g.success = function (a) { g.then(function (b) { a(b.data, b.status, b.headers, c) }); return g }; g.error = function (a) { g.then(null, function (b) { a(b.data, b.status, b.headers, c) }); return g }; return g
	            } function s(c, f, g) {
	                function h(a, b, c, e) { x && (200 <= a && 300 > a ? x.put(v, [a, b, vc(c), e]) : x.remove(v)); p(b, a, c, e); d.$$phase || d.$apply() } function p(a, b, d, e) {
	                    b = Math.max(b, 0); (200 <=
	                    b && 300 > b ? B.resolve : B.reject)({ data: a, status: b, headers: wc(d), config: c, statusText: e })
	                } function s() { var a = Ra(q.pendingRequests, c); -1 !== a && q.pendingRequests.splice(a, 1) } var B = n.defer(), r = B.promise, x, H, v = E(c.url, c.params); q.pendingRequests.push(c); r.then(s, s); !c.cache && !e.cache || (!1 === c.cache || "GET" !== c.method && "JSONP" !== c.method) || (x = T(c.cache) ? c.cache : T(e.cache) ? e.cache : u); if (x) if (H = x.get(v), z(H)) { if (H && P(H.then)) return H.then(s, s), H; I(H) ? p(H[1], H[0], ha(H[2]), H[3]) : p(H, 200, {}, "OK") } else x.put(v, r); y(H) &&
	                ((H = Pb(c.url) ? b.cookies()[c.xsrfCookieName || e.xsrfCookieName] : t) && (g[c.xsrfHeaderName || e.xsrfHeaderName] = H), a(c.method, v, f, h, g, c.timeout, c.withCredentials, c.responseType)); return r
	            } function E(a, b) { if (!b) return a; var c = []; Tc(b, function (a, b) { null === a || y(a) || (I(a) || (a = [a]), r(a, function (a) { T(a) && (a = ta(a) ? a.toISOString() : na(a)); c.push(Ca(b) + "=" + Ca(a)) })) }); 0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")); return a } var u = c("$http"), B = []; r(f, function (a) { B.unshift(A(a) ? p.get(a) : p.invoke(a)) }); r(g,
	            function (a, b) { var c = A(a) ? p.get(a) : p.invoke(a); B.splice(b, 0, { response: function (a) { return c(n.when(a)) }, responseError: function (a) { return c(n.reject(a)) } }) }); q.pendingRequests = []; (function (a) { r(arguments, function (a) { q[a] = function (b, c) { return q(J(c || {}, { method: a, url: b })) } }) })("get", "delete", "head", "jsonp"); (function (a) { r(arguments, function (a) { q[a] = function (b, c, d) { return q(J(d || {}, { method: a, url: b, data: c })) } }) })("post", "put"); q.defaults = e; return q
	        }]
	    } function xe(b) {
	        if (8 >= Q && (!b.match(/^(get|post|head|put|delete|options)$/i) ||
	        !W.XMLHttpRequest)) return new W.ActiveXObject("Microsoft.XMLHTTP"); if (W.XMLHttpRequest) return new W.XMLHttpRequest; throw D("$httpBackend")("noxhr");
	    } function Vd() { this.$get = ["$browser", "$window", "$document", function (b, a, c) { return ye(b, xe, b.defer, a.angular.callbacks, c[0]) }] } function ye(b, a, c, d, e) {
	        function f(a, b, c) {
	            var f = e.createElement("script"), g = null; f.type = "text/javascript"; f.src = a; f.async = !0; g = function (a) {
	                $a(f, "load", g); $a(f, "error", g); e.body.removeChild(f); f = null; var k = -1, s = "unknown"; a && ("load" !==
	                a.type || d[b].called || (a = { type: "error" }), s = a.type, k = "error" === a.type ? 404 : 200); c && c(k, s)
	            }; sb(f, "load", g); sb(f, "error", g); 8 >= Q && (f.onreadystatechange = function () { A(f.readyState) && /loaded|complete/.test(f.readyState) && (f.onreadystatechange = null, g({ type: "load" })) }); e.body.appendChild(f); return g
	        } var g = -1; return function (e, m, h, l, n, p, q, s) {
	            function E() { B = g; R && R(); w && w.abort() } function u(a, d, e, f, g) { K && c.cancel(K); R = w = null; 0 === d && (d = e ? 200 : "file" == ua(m).protocol ? 404 : 0); a(1223 === d ? 204 : d, e, f, g || ""); b.$$completeOutstandingRequest(F) }
	            var B; b.$$incOutstandingRequestCount(); m = m || b.url(); if ("jsonp" == M(e)) { var N = "_" + (d.counter++).toString(36); d[N] = function (a) { d[N].data = a; d[N].called = !0 }; var R = f(m.replace("JSON_CALLBACK", "angular.callbacks." + N), N, function (a, b) { u(l, a, d[N].data, "", b); d[N] = F }) } else {
	                var w = a(e); w.open(e, m, !0); r(n, function (a, b) { z(a) && w.setRequestHeader(b, a) }); w.onreadystatechange = function () {
	                    if (w && 4 == w.readyState) {
	                        var a = null, b = null, c = ""; B !== g && (a = w.getAllResponseHeaders(), b = "response" in w ? w.response : w.responseText); B === g &&
	                        10 > Q || (c = w.statusText); u(l, B || w.status, b, a, c)
	                    }
	                }; q && (w.withCredentials = !0); if (s) try { w.responseType = s } catch (ca) { if ("json" !== s) throw ca; } w.send(h || null)
	            } if (0 < p) var K = c(E, p); else p && P(p.then) && p.then(E)
	        }
	    } function Sd() {
	        var b = "{{", a = "}}"; this.startSymbol = function (a) { return a ? (b = a, this) : b }; this.endSymbol = function (b) { return b ? (a = b, this) : a }; this.$get = ["$parse", "$exceptionHandler", "$sce", function (c, d, e) {
	            function f(f, h, l) {
	                for (var n, p, q = 0, s = [], E = f.length, u = !1, B = []; q < E;) -1 != (n = f.indexOf(b, q)) && -1 != (p = f.indexOf(a,
	                n + g)) ? (q != n && s.push(f.substring(q, n)), s.push(q = c(u = f.substring(n + g, p))), q.exp = u, q = p + k, u = !0) : (q != E && s.push(f.substring(q)), q = E); (E = s.length) || (s.push(""), E = 1); if (l && 1 < s.length) throw yc("noconcat", f); if (!h || u) return B.length = E, q = function (a) {
	                    try { for (var b = 0, c = E, g; b < c; b++) { if ("function" == typeof (g = s[b])) if (g = g(a), g = l ? e.getTrusted(l, g) : e.valueOf(g), null == g) g = ""; else switch (typeof g) { case "string": break; case "number": g = "" + g; break; default: g = na(g) } B[b] = g } return B.join("") } catch (k) {
	                        a = yc("interr", f, k.toString()),
	                        d(a)
	                    }
	                }, q.exp = f, q.parts = s, q
	            } var g = b.length, k = a.length; f.startSymbol = function () { return b }; f.endSymbol = function () { return a }; return f
	        }]
	    } function Td() {
	        this.$get = ["$rootScope", "$window", "$q", function (b, a, c) {
	            function d(d, g, k, m) { var h = a.setInterval, l = a.clearInterval, n = c.defer(), p = n.promise, q = 0, s = z(m) && !m; k = z(k) ? k : 0; p.then(null, null, d); p.$$intervalId = h(function () { n.notify(q++); 0 < k && q >= k && (n.resolve(q), l(p.$$intervalId), delete e[p.$$intervalId]); s || b.$apply() }, g); e[p.$$intervalId] = n; return p } var e = {}; d.cancel =
	            function (b) { return b && b.$$intervalId in e ? (e[b.$$intervalId].reject("canceled"), a.clearInterval(b.$$intervalId), delete e[b.$$intervalId], !0) : !1 }; return d
	        }]
	    } function bd() {
	        this.$get = function () {
	            return {
	                id: "en-us", NUMBER_FORMATS: { DECIMAL_SEP: ".", GROUP_SEP: ",", PATTERNS: [{ minInt: 1, minFrac: 0, maxFrac: 3, posPre: "", posSuf: "", negPre: "-", negSuf: "", gSize: 3, lgSize: 3 }, { minInt: 1, minFrac: 2, maxFrac: 2, posPre: "\u00a4", posSuf: "", negPre: "(\u00a4", negSuf: ")", gSize: 3, lgSize: 3 }], CURRENCY_SYM: "$" }, DATETIME_FORMATS: {
	                    MONTH: "January February March April May June July August September October November December".split(" "),
	                    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "), AMPMS: ["AM", "PM"], medium: "MMM d, y h:mm:ss a", "short": "M/d/yy h:mm a", fullDate: "EEEE, MMMM d, y", longDate: "MMMM d, y", mediumDate: "MMM d, y", shortDate: "M/d/yy", mediumTime: "h:mm:ss a", shortTime: "h:mm a"
	                }, pluralCat: function (b) { return 1 === b ? "one" : "other" }
	            }
	        }
	    } function Qb(b) {
	        b = b.split("/"); for (var a = b.length; a--;) b[a] =
	        lb(b[a]); return b.join("/")
	    } function zc(b, a, c) { b = ua(b, c); a.$$protocol = b.protocol; a.$$host = b.hostname; a.$$port = U(b.port) || ze[b.protocol] || null } function Ac(b, a, c) { var d = "/" !== b.charAt(0); d && (b = "/" + b); b = ua(b, c); a.$$path = decodeURIComponent(d && "/" === b.pathname.charAt(0) ? b.pathname.substring(1) : b.pathname); a.$$search = ec(b.search); a.$$hash = decodeURIComponent(b.hash); a.$$path && "/" != a.$$path.charAt(0) && (a.$$path = "/" + a.$$path) } function ra(b, a) { if (0 === a.indexOf(b)) return a.substr(b.length) } function eb(b) {
	        var a =
	        b.indexOf("#"); return -1 == a ? b : b.substr(0, a)
	    } function Rb(b) { return b.substr(0, eb(b).lastIndexOf("/") + 1) } function Bc(b, a) {
	        this.$$html5 = !0; a = a || ""; var c = Rb(b); zc(b, this, b); this.$$parse = function (a) { var e = ra(c, a); if (!A(e)) throw Sb("ipthprfx", a, c); Ac(e, this, b); this.$$path || (this.$$path = "/"); this.$$compose() }; this.$$compose = function () { var a = Cb(this.$$search), b = this.$$hash ? "#" + lb(this.$$hash) : ""; this.$$url = Qb(this.$$path) + (a ? "?" + a : "") + b; this.$$absUrl = c + this.$$url.substr(1) }; this.$$rewrite = function (d) {
	            var e;
	            if ((e = ra(b, d)) !== t) return d = e, (e = ra(a, e)) !== t ? c + (ra("/", e) || e) : b + d; if ((e = ra(c, d)) !== t) return c + e; if (c == d + "/") return c
	        }
	    } function Tb(b, a) {
	        var c = Rb(b); zc(b, this, b); this.$$parse = function (d) { var e = ra(b, d) || ra(c, d), e = "#" == e.charAt(0) ? ra(a, e) : this.$$html5 ? e : ""; if (!A(e)) throw Sb("ihshprfx", d, a); Ac(e, this, b); d = this.$$path; var f = /^\/[A-Z]:(\/.*)/; 0 === e.indexOf(b) && (e = e.replace(b, "")); f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d); this.$$path = d; this.$$compose() }; this.$$compose = function () {
	            var c = Cb(this.$$search), e = this.$$hash ?
	            "#" + lb(this.$$hash) : ""; this.$$url = Qb(this.$$path) + (c ? "?" + c : "") + e; this.$$absUrl = b + (this.$$url ? a + this.$$url : "")
	        }; this.$$rewrite = function (a) { if (eb(b) == eb(a)) return a }
	    } function Ub(b, a) { this.$$html5 = !0; Tb.apply(this, arguments); var c = Rb(b); this.$$rewrite = function (d) { var e; if (b == eb(d)) return d; if (e = ra(c, d)) return b + a + e; if (c === d + "/") return c }; this.$$compose = function () { var c = Cb(this.$$search), e = this.$$hash ? "#" + lb(this.$$hash) : ""; this.$$url = Qb(this.$$path) + (c ? "?" + c : "") + e; this.$$absUrl = b + a + this.$$url } } function tb(b) { return function () { return this[b] } }
	    function Cc(b, a) { return function (c) { if (y(c)) return this[b]; this[b] = a(c); this.$$compose(); return this } } function Wd() {
	        var b = "", a = !1; this.hashPrefix = function (a) { return z(a) ? (b = a, this) : b }; this.html5Mode = function (b) { return z(b) ? (a = b, this) : a }; this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function (c, d, e, f) {
	            function g(a) { c.$broadcast("$locationChangeSuccess", k.absUrl(), a) } var k, m, h = d.baseHref(), l = d.url(), n; a ? (n = l.substring(0, l.indexOf("/", l.indexOf("//") + 2)) + (h || "/"), m = e.history ? Bc : Ub) : (n =
	            eb(l), m = Tb); k = new m(n, "#" + b); k.$$parse(k.$$rewrite(l)); var p = /^\s*(javascript|mailto):/i; f.on("click", function (a) {
	                if (!a.ctrlKey && !a.metaKey && 2 != a.which) {
	                    for (var e = v(a.target) ; "a" !== M(e[0].nodeName) ;) if (e[0] === f[0] || !(e = e.parent())[0]) return; var g = e.prop("href"); T(g) && "[object SVGAnimatedString]" === g.toString() && (g = ua(g.animVal).href); if (!p.test(g)) {
	                        if (m === Ub) {
	                            var h = e.attr("href") || e.attr("xlink:href"); if (h && 0 > h.indexOf("://")) if (g = "#" + b, "/" == h[0]) g = n + g + h; else if ("#" == h[0]) g = n + g + (k.path() || "/") + h;
	                            else { var l = k.path().split("/"), h = h.split("/"); 2 !== l.length || l[1] || (l.length = 1); for (var q = 0; q < h.length; q++) "." != h[q] && (".." == h[q] ? l.pop() : h[q].length && l.push(h[q])); g = n + g + l.join("/") }
	                        } l = k.$$rewrite(g); g && (!e.attr("target") && l && !a.isDefaultPrevented()) && (a.preventDefault(), l != d.url() && (k.$$parse(l), c.$apply(), W.angular["ff-684208-preventDefault"] = !0))
	                    }
	                }
	            }); k.absUrl() != l && d.url(k.absUrl(), !0); d.onUrlChange(function (a) {
	                k.absUrl() != a && (c.$evalAsync(function () {
	                    var b = k.absUrl(); k.$$parse(a); c.$broadcast("$locationChangeStart",
	                    a, b).defaultPrevented ? (k.$$parse(b), d.url(b)) : g(b)
	                }), c.$$phase || c.$digest())
	            }); var q = 0; c.$watch(function () { var a = d.url(), b = k.$$replace; q && a == k.absUrl() || (q++, c.$evalAsync(function () { c.$broadcast("$locationChangeStart", k.absUrl(), a).defaultPrevented ? k.$$parse(a) : (d.url(k.absUrl(), b), g(a)) })); k.$$replace = !1; return q }); return k
	        }]
	    } function Xd() {
	        var b = !0, a = this; this.debugEnabled = function (a) { return z(a) ? (b = a, this) : b }; this.$get = ["$window", function (c) {
	            function d(a) {
	                a instanceof Error && (a.stack ? a = a.message &&
	                -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)); return a
	            } function e(a) { var b = c.console || {}, e = b[a] || b.log || F; a = !1; try { a = !!e.apply } catch (m) { } return a ? function () { var a = []; r(arguments, function (b) { a.push(d(b)) }); return e.apply(b, a) } : function (a, b) { e(a, null == b ? "" : b) } } return { log: e("log"), info: e("info"), warn: e("warn"), error: e("error"), debug: function () { var c = e("debug"); return function () { b && c.apply(a, arguments) } }() }
	        }]
	    } function ka(b,
	    a) { if ("__defineGetter__" === b || "__defineSetter__" === b || "__lookupGetter__" === b || "__lookupSetter__" === b || "__proto__" === b) throw la("isecfld", a); return b } function va(b, a) { if (b) { if (b.constructor === b) throw la("isecfn", a); if (b.document && b.location && b.alert && b.setInterval) throw la("isecwindow", a); if (b.children && (b.nodeName || b.prop && b.attr && b.find)) throw la("isecdom", a); if (b === Object) throw la("isecobj", a); } return b } function ub(b, a, c, d, e) {
	        va(b, d); e = e || {}; a = a.split("."); for (var f, g = 0; 1 < a.length; g++) {
	            f = ka(a.shift(),
	            d); var k = va(b[f], d); k || (k = {}, b[f] = k); b = k; b.then && e.unwrapPromises && (wa(d), "$$v" in b || function (a) { a.then(function (b) { a.$$v = b }) }(b), b.$$v === t && (b.$$v = {}), b = b.$$v)
	        } f = ka(a.shift(), d); va(b[f], d); return b[f] = c
	    } function Dc(b, a, c, d, e, f, g) {
	        ka(b, f); ka(a, f); ka(c, f); ka(d, f); ka(e, f); return g.unwrapPromises ? function (g, m) {
	            var h = m && m.hasOwnProperty(b) ? m : g, l; if (null == h) return h; (h = h[b]) && h.then && (wa(f), "$$v" in h || (l = h, l.$$v = t, l.then(function (a) { l.$$v = a })), h = h.$$v); if (!a) return h; if (null == h) return t; (h = h[a]) && h.then &&
	            (wa(f), "$$v" in h || (l = h, l.$$v = t, l.then(function (a) { l.$$v = a })), h = h.$$v); if (!c) return h; if (null == h) return t; (h = h[c]) && h.then && (wa(f), "$$v" in h || (l = h, l.$$v = t, l.then(function (a) { l.$$v = a })), h = h.$$v); if (!d) return h; if (null == h) return t; (h = h[d]) && h.then && (wa(f), "$$v" in h || (l = h, l.$$v = t, l.then(function (a) { l.$$v = a })), h = h.$$v); if (!e) return h; if (null == h) return t; (h = h[e]) && h.then && (wa(f), "$$v" in h || (l = h, l.$$v = t, l.then(function (a) { l.$$v = a })), h = h.$$v); return h
	        } : function (f, g) {
	            var h = g && g.hasOwnProperty(b) ? g : f; if (null ==
	            h) return h; h = h[b]; if (!a) return h; if (null == h) return t; h = h[a]; if (!c) return h; if (null == h) return t; h = h[c]; if (!d) return h; if (null == h) return t; h = h[d]; return e ? null == h ? t : h = h[e] : h
	        }
	    } function Ec(b, a, c) {
	        if (Vb.hasOwnProperty(b)) return Vb[b]; var d = b.split("."), e = d.length, f; if (a.csp) f = 6 > e ? Dc(d[0], d[1], d[2], d[3], d[4], c, a) : function (b, f) { var g = 0, k; do k = Dc(d[g++], d[g++], d[g++], d[g++], d[g++], c, a)(b, f), f = t, b = k; while (g < e); return k }; else {
	            var g = "var p;\n"; r(d, function (b, d) {
	                ka(b, c); g += "if(s == null) return undefined;\ns=" +
	                (d ? "s" : '((k&&k.hasOwnProperty("' + b + '"))?k:s)') + '["' + b + '"];\n' + (a.unwrapPromises ? 'if (s && s.then) {\n pw("' + c.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
	            }); var g = g + "return s;", k = new Function("s", "k", "pw", g); k.toString = ba(g); f = a.unwrapPromises ? function (a, b) { return k(a, b, wa) } : k
	        } "hasOwnProperty" !== b && (Vb[b] = f); return f
	    } function Yd() {
	        var b = {}, a = { csp: !1, unwrapPromises: !1, logPromiseWarnings: !0 }; this.unwrapPromises =
	        function (b) { return z(b) ? (a.unwrapPromises = !!b, this) : a.unwrapPromises }; this.logPromiseWarnings = function (b) { return z(b) ? (a.logPromiseWarnings = b, this) : a.logPromiseWarnings }; this.$get = ["$filter", "$sniffer", "$log", function (c, d, e) {
	            a.csp = d.csp; wa = function (b) { a.logPromiseWarnings && !Fc.hasOwnProperty(b) && (Fc[b] = !0, e.warn("[$parse] Promise found in the expression `" + b + "`. Automatic unwrapping of promises in Angular expressions is deprecated.")) }; return function (d) {
	                var e; switch (typeof d) {
	                    case "string": if (b.hasOwnProperty(d)) return b[d];
	                        e = new Wb(a); e = (new fb(e, c, a)).parse(d); "hasOwnProperty" !== d && (b[d] = e); return e; case "function": return d; default: return F
	                }
	            }
	        }]
	    } function $d() { this.$get = ["$rootScope", "$exceptionHandler", function (b, a) { return Ae(function (a) { b.$evalAsync(a) }, a) }] } function Ae(b, a) {
	        function c(a) { return a } function d(a) { return g(a) } var e = function () {
	            var g = [], h, l; return l = {
	                resolve: function (a) { if (g) { var c = g; g = t; h = f(a); c.length && b(function () { for (var a, b = 0, d = c.length; b < d; b++) a = c[b], h.then(a[0], a[1], a[2]) }) } }, reject: function (a) { l.resolve(k(a)) },
	                notify: function (a) { if (g) { var c = g; g.length && b(function () { for (var b, d = 0, e = c.length; d < e; d++) b = c[d], b[2](a) }) } }, promise: {
	                    then: function (b, f, k) { var l = e(), E = function (d) { try { l.resolve((P(b) ? b : c)(d)) } catch (e) { l.reject(e), a(e) } }, u = function (b) { try { l.resolve((P(f) ? f : d)(b)) } catch (c) { l.reject(c), a(c) } }, B = function (b) { try { l.notify((P(k) ? k : c)(b)) } catch (d) { a(d) } }; g ? g.push([E, u, B]) : h.then(E, u, B); return l.promise }, "catch": function (a) { return this.then(null, a) }, "finally": function (a) {
	                        function b(a, c) {
	                            var d = e(); c ? d.resolve(a) :
	                            d.reject(a); return d.promise
	                        } function d(e, f) { var g = null; try { g = (a || c)() } catch (k) { return b(k, !1) } return g && P(g.then) ? g.then(function () { return b(e, f) }, function (a) { return b(a, !1) }) : b(e, f) } return this.then(function (a) { return d(a, !0) }, function (a) { return d(a, !1) })
	                    }
	                }
	            }
	        }, f = function (a) { return a && P(a.then) ? a : { then: function (c) { var d = e(); b(function () { d.resolve(c(a)) }); return d.promise } } }, g = function (a) { var b = e(); b.reject(a); return b.promise }, k = function (c) {
	            return {
	                then: function (f, g) {
	                    var k = e(); b(function () {
	                        try {
	                            k.resolve((P(g) ?
	                                g : d)(c))
	                        } catch (b) { k.reject(b), a(b) }
	                    }); return k.promise
	                }
	            }
	        }; return {
	            defer: e, reject: g, when: function (k, h, l, n) { var p = e(), q, s = function (b) { try { return (P(h) ? h : c)(b) } catch (d) { return a(d), g(d) } }, E = function (b) { try { return (P(l) ? l : d)(b) } catch (c) { return a(c), g(c) } }, u = function (b) { try { return (P(n) ? n : c)(b) } catch (d) { a(d) } }; b(function () { f(k).then(function (a) { q || (q = !0, p.resolve(f(a).then(s, E, u))) }, function (a) { q || (q = !0, p.resolve(E(a))) }, function (a) { q || p.notify(u(a)) }) }); return p.promise }, all: function (a) {
	                var b = e(), c = 0, d = I(a) ?
	                [] : {}; r(a, function (a, e) { c++; f(a).then(function (a) { d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d)) }, function (a) { d.hasOwnProperty(e) || b.reject(a) }) }); 0 === c && b.resolve(d); return b.promise
	            }
	        }
	    } function ge() {
	        this.$get = ["$window", "$timeout", function (b, a) {
	            var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame, d = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.webkitCancelRequestAnimationFrame, e = !!c, f = e ? function (a) { var b = c(a); return function () { d(b) } } :
	            function (b) { var c = a(b, 16.66, !1); return function () { a.cancel(c) } }; f.supported = e; return f
	        }]
	    } function Zd() {
	        var b = 10, a = D("$rootScope"), c = null; this.digestTtl = function (a) { arguments.length && (b = a); return b }; this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function (d, e, f, g) {
	            function k() {
	                this.$id = hb(); this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null; this["this"] = this.$root = this; this.$$destroyed = !1; this.$$asyncQueue = []; this.$$postDigestQueue =
	                []; this.$$listeners = {}; this.$$listenerCount = {}; this.$$isolateBindings = {}
	            } function m(b) { if (p.$$phase) throw a("inprog", p.$$phase); p.$$phase = b } function h(a, b) { var c = f(a); Wa(c, b); return c } function l(a, b, c) { do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent) } function n() { } k.prototype = {
	                constructor: k, $new: function (a) {
	                    a ? (a = new k, a.$root = this.$root, a.$$asyncQueue = this.$$asyncQueue, a.$$postDigestQueue = this.$$postDigestQueue) : (this.$$childScopeClass || (this.$$childScopeClass =
	                    function () { this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null; this.$$listeners = {}; this.$$listenerCount = {}; this.$id = hb(); this.$$childScopeClass = null }, this.$$childScopeClass.prototype = this), a = new this.$$childScopeClass); a["this"] = a; a.$parent = this; a.$$prevSibling = this.$$childTail; this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a; return a
	                }, $watch: function (a, b, d) {
	                    var e = h(a, "watch"), f = this.$$watchers, g = {
	                        fn: b, last: n, get: e, exp: a,
	                        eq: !!d
	                    }; c = null; if (!P(b)) { var k = h(b || F, "listener"); g.fn = function (a, b, c) { k(c) } } if ("string" == typeof a && e.constant) { var l = g.fn; g.fn = function (a, b, c) { l.call(this, a, b, c); Sa(f, g) } } f || (f = this.$$watchers = []); f.unshift(g); return function () { Sa(f, g); c = null }
	                }, $watchCollection: function (a, b) {
	                    var c = this, d, e, g, k = 1 < b.length, h = 0, l = f(a), m = [], p = {}, n = !0, r = 0; return this.$watch(function () {
	                        d = l(c); var a, b, f; if (T(d)) if (Pa(d)) for (e !== m && (e = m, r = e.length = 0, h++), a = d.length, r !== a && (h++, e.length = r = a), b = 0; b < a; b++) f = e[b] !== e[b] && d[b] !==
	                        d[b], f || e[b] === d[b] || (h++, e[b] = d[b]); else { e !== p && (e = p = {}, r = 0, h++); a = 0; for (b in d) d.hasOwnProperty(b) && (a++, e.hasOwnProperty(b) ? (f = e[b] !== e[b] && d[b] !== d[b], f || e[b] === d[b] || (h++, e[b] = d[b])) : (r++, e[b] = d[b], h++)); if (r > a) for (b in h++, e) e.hasOwnProperty(b) && !d.hasOwnProperty(b) && (r--, delete e[b]) } else e !== d && (e = d, h++); return h
	                    }, function () { n ? (n = !1, b(d, d, c)) : b(d, g, c); if (k) if (T(d)) if (Pa(d)) { g = Array(d.length); for (var a = 0; a < d.length; a++) g[a] = d[a] } else for (a in g = {}, d) kb.call(d, a) && (g[a] = d[a]); else g = d })
	                }, $digest: function () {
	                    var d,
	                    f, k, h, l = this.$$asyncQueue, r = this.$$postDigestQueue, R, w, t = b, K, O = [], v, C, x; m("$digest"); g.$$checkUrlChange(); c = null; do {
	                        w = !1; for (K = this; l.length;) { try { x = l.shift(), x.scope.$eval(x.expression) } catch (H) { p.$$phase = null, e(H) } c = null }a: do {
	                            if (h = K.$$watchers) for (R = h.length; R--;) try {
	                                if (d = h[R]) if ((f = d.get(K)) !== (k = d.last) && !(d.eq ? Aa(f, k) : "number" === typeof f && "number" === typeof k && isNaN(f) && isNaN(k))) w = !0, c = d, d.last = d.eq ? Ha(f, null) : f, d.fn(f, k === n ? f : k, K), 5 > t && (v = 4 - t, O[v] || (O[v] = []), C = P(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) :
	                                d.exp, C += "; newVal: " + na(f) + "; oldVal: " + na(k), O[v].push(C)); else if (d === c) { w = !1; break a }
	                            } catch (z) { p.$$phase = null, e(z) } if (!(h = K.$$childHead || K !== this && K.$$nextSibling)) for (; K !== this && !(h = K.$$nextSibling) ;) K = K.$parent
	                        } while (K = h); if ((w || l.length) && !t--) throw p.$$phase = null, a("infdig", b, na(O));
	                    } while (w || l.length); for (p.$$phase = null; r.length;) try { r.shift()() } catch (A) { e(A) }
	                }, $destroy: function () {
	                    if (!this.$$destroyed) {
	                        var a = this.$parent; this.$broadcast("$destroy"); this.$$destroyed = !0; this !== p && (r(this.$$listenerCount,
	                        Bb(null, l, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = F, this.$on =
	                        this.$watch = function () { return F })
	                    }
	                }, $eval: function (a, b) { return f(a)(this, b) }, $evalAsync: function (a) { p.$$phase || p.$$asyncQueue.length || g.defer(function () { p.$$asyncQueue.length && p.$digest() }); this.$$asyncQueue.push({ scope: this, expression: a }) }, $$postDigest: function (a) { this.$$postDigestQueue.push(a) }, $apply: function (a) { try { return m("$apply"), this.$eval(a) } catch (b) { e(b) } finally { p.$$phase = null; try { p.$digest() } catch (c) { throw e(c), c; } } }, $on: function (a, b) {
	                    var c = this.$$listeners[a]; c || (this.$$listeners[a] =
	                    c = []); c.push(b); var d = this; do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent); var e = this; return function () { c[Ra(c, b)] = null; l(e, 1, a) }
	                }, $emit: function (a, b) {
	                    var c = [], d, f = this, g = !1, k = { name: a, targetScope: f, stopPropagation: function () { g = !0 }, preventDefault: function () { k.defaultPrevented = !0 }, defaultPrevented: !1 }, h = [k].concat(Ba.call(arguments, 1)), l, m; do {
	                        d = f.$$listeners[a] || c; k.currentScope = f; l = 0; for (m = d.length; l < m; l++) if (d[l]) try { d[l].apply(null, h) } catch (p) { e(p) } else d.splice(l,
	                        1), l--, m--; if (g) break; f = f.$parent
	                    } while (f); return k
	                }, $broadcast: function (a, b) { for (var c = this, d = this, f = { name: a, targetScope: this, preventDefault: function () { f.defaultPrevented = !0 }, defaultPrevented: !1 }, g = [f].concat(Ba.call(arguments, 1)), k, h; c = d;) { f.currentScope = c; d = c.$$listeners[a] || []; k = 0; for (h = d.length; k < h; k++) if (d[k]) try { d[k].apply(null, g) } catch (l) { e(l) } else d.splice(k, 1), k--, h--; if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (; c !== this && !(d = c.$$nextSibling) ;) c = c.$parent } return f }
	            };
	            var p = new k; return p
	        }]
	    } function cd() { var b = /^\s*(https?|ftp|mailto|tel|file):/, a = /^\s*((https?|ftp|file):|data:image\/)/; this.aHrefSanitizationWhitelist = function (a) { return z(a) ? (b = a, this) : b }; this.imgSrcSanitizationWhitelist = function (b) { return z(b) ? (a = b, this) : a }; this.$get = function () { return function (c, d) { var e = d ? a : b, f; if (!Q || 8 <= Q) if (f = ua(c).href, "" !== f && !f.match(e)) return "unsafe:" + f; return c } } } function Be(b) {
	        if ("self" === b) return b; if (A(b)) {
	            if (-1 < b.indexOf("***")) throw xa("iwcard", b); b = b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,
	            "\\$1").replace(/\x08/g, "\\x08").replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"); return RegExp("^" + b + "$")
	        } if (jb(b)) return RegExp("^" + b.source + "$"); throw xa("imatcher");
	    } function Gc(b) { var a = []; z(b) && r(b, function (b) { a.push(Be(b)) }); return a } function be() {
	        this.SCE_CONTEXTS = ga; var b = ["self"], a = []; this.resourceUrlWhitelist = function (a) { arguments.length && (b = Gc(a)); return b }; this.resourceUrlBlacklist = function (b) { arguments.length && (a = Gc(b)); return a }; this.$get = ["$injector", function (c) {
	            function d(a) {
	                var b =
	                function (a) { this.$$unwrapTrustedValue = function () { return a } }; a && (b.prototype = new a); b.prototype.valueOf = function () { return this.$$unwrapTrustedValue() }; b.prototype.toString = function () { return this.$$unwrapTrustedValue().toString() }; return b
	            } var e = function (a) { throw xa("unsafe"); }; c.has("$sanitize") && (e = c.get("$sanitize")); var f = d(), g = {}; g[ga.HTML] = d(f); g[ga.CSS] = d(f); g[ga.URL] = d(f); g[ga.JS] = d(f); g[ga.RESOURCE_URL] = d(g[ga.URL]); return {
	                trustAs: function (a, b) {
	                    var c = g.hasOwnProperty(a) ? g[a] : null; if (!c) throw xa("icontext",
	                    a, b); if (null === b || b === t || "" === b) return b; if ("string" !== typeof b) throw xa("itype", a); return new c(b)
	                }, getTrusted: function (c, d) {
	                    if (null === d || d === t || "" === d) return d; var f = g.hasOwnProperty(c) ? g[c] : null; if (f && d instanceof f) return d.$$unwrapTrustedValue(); if (c === ga.RESOURCE_URL) {
	                        var f = ua(d.toString()), l, n, p = !1; l = 0; for (n = b.length; l < n; l++) if ("self" === b[l] ? Pb(f) : b[l].exec(f.href)) { p = !0; break } if (p) for (l = 0, n = a.length; l < n; l++) if ("self" === a[l] ? Pb(f) : a[l].exec(f.href)) { p = !1; break } if (p) return d; throw xa("insecurl",
	                        d.toString());
	                    } if (c === ga.HTML) return e(d); throw xa("unsafe");
	                }, valueOf: function (a) { return a instanceof f ? a.$$unwrapTrustedValue() : a }
	            }
	        }]
	    } function ae() {
	        var b = !0; this.enabled = function (a) { arguments.length && (b = !!a); return b }; this.$get = ["$parse", "$sniffer", "$sceDelegate", function (a, c, d) {
	            if (b && c.msie && 8 > c.msieDocumentMode) throw xa("iequirks"); var e = ha(ga); e.isEnabled = function () { return b }; e.trustAs = d.trustAs; e.getTrusted = d.getTrusted; e.valueOf = d.valueOf; b || (e.trustAs = e.getTrusted = function (a, b) { return b },
	            e.valueOf = Qa); e.parseAs = function (b, c) { var d = a(c); return d.literal && d.constant ? d : function (a, c) { return e.getTrusted(b, d(a, c)) } }; var f = e.parseAs, g = e.getTrusted, k = e.trustAs; r(ga, function (a, b) { var c = M(b); e[Za("parse_as_" + c)] = function (b) { return f(a, b) }; e[Za("get_trusted_" + c)] = function (b) { return g(a, b) }; e[Za("trust_as_" + c)] = function (b) { return k(a, b) } }); return e
	        }]
	    } function ce() {
	        this.$get = ["$window", "$document", function (b, a) {
	            var c = {}, d = U((/android (\d+)/.exec(M((b.navigator || {}).userAgent)) || [])[1]), e = /Boxee/i.test((b.navigator ||
	            {}).userAgent), f = a[0] || {}, g = f.documentMode, k, m = /^(Moz|webkit|O|ms)(?=[A-Z])/, h = f.body && f.body.style, l = !1, n = !1; if (h) { for (var p in h) if (l = m.exec(p)) { k = l[0]; k = k.substr(0, 1).toUpperCase() + k.substr(1); break } k || (k = "WebkitOpacity" in h && "webkit"); l = !!("transition" in h || k + "Transition" in h); n = !!("animation" in h || k + "Animation" in h); !d || l && n || (l = A(f.body.style.webkitTransition), n = A(f.body.style.webkitAnimation)) } return {
	                history: !(!b.history || !b.history.pushState || 4 > d || e), hashchange: "onhashchange" in b && (!g || 7 <
	                g), hasEvent: function (a) { if ("input" == a && 9 == Q) return !1; if (y(c[a])) { var b = f.createElement("div"); c[a] = "on" + a in b } return c[a] }, csp: Xa(), vendorPrefix: k, transitions: l, animations: n, android: d, msie: Q, msieDocumentMode: g
	            }
	        }]
	    } function ee() {
	        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function (b, a, c, d) {
	            function e(e, k, m) {
	                var h = c.defer(), l = h.promise, n = z(m) && !m; k = a.defer(function () { try { h.resolve(e()) } catch (a) { h.reject(a), d(a) } finally { delete f[l.$$timeoutId] } n || b.$apply() }, k); l.$$timeoutId = k; f[k] = h;
	                return l
	            } var f = {}; e.cancel = function (b) { return b && b.$$timeoutId in f ? (f[b.$$timeoutId].reject("canceled"), delete f[b.$$timeoutId], a.defer.cancel(b.$$timeoutId)) : !1 }; return e
	        }]
	    } function ua(b, a) {
	        var c = b; Q && (Y.setAttribute("href", c), c = Y.href); Y.setAttribute("href", c); return {
	            href: Y.href, protocol: Y.protocol ? Y.protocol.replace(/:$/, "") : "", host: Y.host, search: Y.search ? Y.search.replace(/^\?/, "") : "", hash: Y.hash ? Y.hash.replace(/^#/, "") : "", hostname: Y.hostname, port: Y.port, pathname: "/" === Y.pathname.charAt(0) ? Y.pathname :
	            "/" + Y.pathname
	        }
	    } function Pb(b) { b = A(b) ? ua(b) : b; return b.protocol === Hc.protocol && b.host === Hc.host } function fe() { this.$get = ba(W) } function mc(b) { function a(d, e) { if (T(d)) { var f = {}; r(d, function (b, c) { f[c] = a(c, b) }); return f } return b.factory(d + c, e) } var c = "Filter"; this.register = a; this.$get = ["$injector", function (a) { return function (b) { return a.get(b + c) } }]; a("currency", Ic); a("date", Jc); a("filter", Ce); a("json", De); a("limitTo", Ee); a("lowercase", Fe); a("number", Kc); a("orderBy", Lc); a("uppercase", Ge) } function Ce() {
	        return function (b,
	        a, c) {
	            if (!I(b)) return b; var d = typeof c, e = []; e.check = function (a) { for (var b = 0; b < e.length; b++) if (!e[b](a)) return !1; return !0 }; "function" !== d && (c = "boolean" === d && c ? function (a, b) { return Va.equals(a, b) } : function (a, b) { if (a && b && "object" === typeof a && "object" === typeof b) { for (var d in a) if ("$" !== d.charAt(0) && kb.call(a, d) && c(a[d], b[d])) return !0; return !1 } b = ("" + b).toLowerCase(); return -1 < ("" + a).toLowerCase().indexOf(b) }); var f = function (a, b) {
	                if ("string" == typeof b && "!" === b.charAt(0)) return !f(a, b.substr(1)); switch (typeof a) {
	                    case "boolean": case "number": case "string": return c(a,
	                    b); case "object": switch (typeof b) { case "object": return c(a, b); default: for (var d in a) if ("$" !== d.charAt(0) && f(a[d], b)) return !0 } return !1; case "array": for (d = 0; d < a.length; d++) if (f(a[d], b)) return !0; return !1; default: return !1
	                }
	            }; switch (typeof a) { case "boolean": case "number": case "string": a = { $: a }; case "object": for (var g in a) (function (b) { "undefined" !== typeof a[b] && e.push(function (c) { return f("$" == b ? c : c && c[b], a[b]) }) })(g); break; case "function": e.push(a); break; default: return b } d = []; for (g = 0; g < b.length; g++) {
	                var k =
	                b[g]; e.check(k) && d.push(k)
	            } return d
	        }
	    } function Ic(b) { var a = b.NUMBER_FORMATS; return function (b, d) { y(d) && (d = a.CURRENCY_SYM); return Mc(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, 2).replace(/\u00A4/g, d) } } function Kc(b) { var a = b.NUMBER_FORMATS; return function (b, d) { return Mc(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d) } } function Mc(b, a, c, d, e) {
	        if (null == b || !isFinite(b) || T(b)) return ""; var f = 0 > b; b = Math.abs(b); var g = b + "", k = "", m = [], h = !1; if (-1 !== g.indexOf("e")) {
	            var l = g.match(/([\d\.]+)e(-?)(\d+)/); l && "-" == l[2] &&
	            l[3] > e + 1 ? (g = "0", b = 0) : (k = g, h = !0)
	        } if (h) 0 < e && (-1 < b && 1 > b) && (k = b.toFixed(e)); else {
	            g = (g.split(Nc)[1] || "").length; y(e) && (e = Math.min(Math.max(a.minFrac, g), a.maxFrac)); b = +(Math.round(+(b.toString() + "e" + e)).toString() + "e" + -e); 0 === b && (f = !1); b = ("" + b).split(Nc); g = b[0]; b = b[1] || ""; var l = 0, n = a.lgSize, p = a.gSize; if (g.length >= n + p) for (l = g.length - n, h = 0; h < l; h++) 0 === (l - h) % p && 0 !== h && (k += c), k += g.charAt(h); for (h = l; h < g.length; h++) 0 === (g.length - h) % n && 0 !== h && (k += c), k += g.charAt(h); for (; b.length < e;) b += "0"; e && "0" !== e && (k += d + b.substr(0,
	            e))
	        } m.push(f ? a.negPre : a.posPre); m.push(k); m.push(f ? a.negSuf : a.posSuf); return m.join("")
	    } function Xb(b, a, c) { var d = ""; 0 > b && (d = "-", b = -b); for (b = "" + b; b.length < a;) b = "0" + b; c && (b = b.substr(b.length - a)); return d + b } function $(b, a, c, d) { c = c || 0; return function (e) { e = e["get" + b](); if (0 < c || e > -c) e += c; 0 === e && -12 == c && (e = 12); return Xb(e, a, d) } } function vb(b, a) { return function (c, d) { var e = c["get" + b](), f = Ia(a ? "SHORT" + b : b); return d[f][e] } } function Jc(b) {
	        function a(a) {
	            var b; if (b = a.match(c)) {
	                a = new Date(0); var f = 0, g = 0, k = b[8] ?
	                a.setUTCFullYear : a.setFullYear, m = b[8] ? a.setUTCHours : a.setHours; b[9] && (f = U(b[9] + b[10]), g = U(b[9] + b[11])); k.call(a, U(b[1]), U(b[2]) - 1, U(b[3])); f = U(b[4] || 0) - f; g = U(b[5] || 0) - g; k = U(b[6] || 0); b = Math.round(1E3 * parseFloat("0." + (b[7] || 0))); m.call(a, f, g, k, b)
	            } return a
	        } var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/; return function (c, e) {
	            var f = "", g = [], k, m; e = e || "mediumDate"; e = b.DATETIME_FORMATS[e] || e; A(c) && (c = He.test(c) ? U(c) : a(c)); ib(c) && (c = new Date(c));
	            if (!ta(c)) return c; for (; e;) (m = Ie.exec(e)) ? (g = g.concat(Ba.call(m, 1)), e = g.pop()) : (g.push(e), e = null); r(g, function (a) { k = Je[a]; f += k ? k(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'") }); return f
	        }
	    } function De() { return function (b) { return na(b, !0) } } function Ee() {
	        return function (b, a) {
	            if (!I(b) && !A(b)) return b; a = Infinity === Math.abs(Number(a)) ? Number(a) : U(a); if (A(b)) return a ? 0 <= a ? b.slice(0, a) : b.slice(a, b.length) : ""; var c = [], d, e; a > b.length ? a = b.length : a < -b.length && (a = -b.length); 0 < a ? (d = 0, e = a) : (d =
	            b.length + a, e = b.length); for (; d < e; d++) c.push(b[d]); return c
	        }
	    } function Lc(b) {
	        return function (a, c, d) {
	            function e(a, b) { return Ua(b) ? function (b, c) { return a(c, b) } : a } function f(a, b) { var c = typeof a, d = typeof b; return c == d ? (ta(a) && ta(b) && (a = a.valueOf(), b = b.valueOf()), "string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : a < b ? -1 : 1) : c < d ? -1 : 1 } if (!Pa(a) || !c) return a; c = I(c) ? c : [c]; c = Vc(c, function (a) {
	                var c = !1, d = a || Qa; if (A(a)) {
	                    if ("+" == a.charAt(0) || "-" == a.charAt(0)) c = "-" == a.charAt(0), a = a.substring(1); d = b(a); if (d.constant) {
	                        var g =
	                        d(); return e(function (a, b) { return f(a[g], b[g]) }, c)
	                    }
	                } return e(function (a, b) { return f(d(a), d(b)) }, c)
	            }); for (var g = [], k = 0; k < a.length; k++) g.push(a[k]); return g.sort(e(function (a, b) { for (var d = 0; d < c.length; d++) { var e = c[d](a, b); if (0 !== e) return e } return 0 }, d))
	        }
	    } function ya(b) { P(b) && (b = { link: b }); b.restrict = b.restrict || "AC"; return ba(b) } function Oc(b, a, c, d) {
	        function e(a, c) { c = c ? "-" + mb(c, "-") : ""; d.setClass(b, (a ? wb : xb) + c, (a ? xb : wb) + c) } var f = this, g = b.parent().controller("form") || yb, k = 0, m = f.$error = {}, h = []; f.$name =
	        a.name || a.ngForm; f.$dirty = !1; f.$pristine = !0; f.$valid = !0; f.$invalid = !1; g.$addControl(f); b.addClass(Oa); e(!0); f.$addControl = function (a) { Da(a.$name, "input"); h.push(a); a.$name && (f[a.$name] = a) }; f.$removeControl = function (a) { a.$name && f[a.$name] === a && delete f[a.$name]; r(m, function (b, c) { f.$setValidity(c, !0, a) }); Sa(h, a) }; f.$setValidity = function (a, b, c) {
	            var d = m[a]; if (b) d && (Sa(d, c), d.length || (k--, k || (e(b), f.$valid = !0, f.$invalid = !1), m[a] = !1, e(!0, a), g.$setValidity(a, !0, f))); else {
	                k || e(b); if (d) { if (-1 != Ra(d, c)) return } else m[a] =
	                d = [], k++, e(!1, a), g.$setValidity(a, !1, f); d.push(c); f.$valid = !1; f.$invalid = !0
	            }
	        }; f.$setDirty = function () { d.removeClass(b, Oa); d.addClass(b, zb); f.$dirty = !0; f.$pristine = !1; g.$setDirty() }; f.$setPristine = function () { d.removeClass(b, zb); d.addClass(b, Oa); f.$dirty = !1; f.$pristine = !0; r(h, function (a) { a.$setPristine() }) }
	    } function sa(b, a, c, d) { b.$setValidity(a, c); return c ? d : t } function Pc(b, a) { var c, d; if (a) for (c = 0; c < a.length; ++c) if (d = a[c], b[d]) return !0; return !1 } function Ke(b, a, c, d, e) {
	        T(e) && (b.$$hasNativeValidators = !0,
	        b.$parsers.push(function (f) { if (b.$error[a] || Pc(e, d) || !Pc(e, c)) return f; b.$setValidity(a, !1) }))
	    } function Ab(b, a, c, d, e, f) {
	        var g = a.prop(Le), k = a[0].placeholder, m = {}, h = M(a[0].type); d.$$validityState = g; if (!e.android) { var l = !1; a.on("compositionstart", function (a) { l = !0 }); a.on("compositionend", function () { l = !1; n() }) } var n = function (e) {
	            if (!l) {
	                var f = a.val(); if (Q && "input" === (e || m).type && a[0].placeholder !== k) k = a[0].placeholder; else if ("password" !== h && Ua(c.ngTrim || "T") && (f = aa(f)), e = g && d.$$hasNativeValidators, d.$viewValue !==
	                f || "" === f && e) b.$root.$$phase ? d.$setViewValue(f) : b.$apply(function () { d.$setViewValue(f) })
	            }
	        }; if (e.hasEvent("input")) a.on("input", n); else { var p, q = function () { p || (p = f.defer(function () { n(); p = null })) }; a.on("keydown", function (a) { a = a.keyCode; 91 === a || (15 < a && 19 > a || 37 <= a && 40 >= a) || q() }); if (e.hasEvent("paste")) a.on("paste cut", q) } a.on("change", n); d.$render = function () { a.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue) }; var s = c.ngPattern; s && ((e = s.match(/^\/(.*)\/([gim]*)$/)) ? (s = RegExp(e[1], e[2]), e = function (a) {
	            return sa(d,
	            "pattern", d.$isEmpty(a) || s.test(a), a)
	        }) : e = function (c) { var e = b.$eval(s); if (!e || !e.test) throw D("ngPattern")("noregexp", s, e, ia(a)); return sa(d, "pattern", d.$isEmpty(c) || e.test(c), c) }, d.$formatters.push(e), d.$parsers.push(e)); if (c.ngMinlength) { var r = U(c.ngMinlength); e = function (a) { return sa(d, "minlength", d.$isEmpty(a) || a.length >= r, a) }; d.$parsers.push(e); d.$formatters.push(e) } if (c.ngMaxlength) {
	            var u = U(c.ngMaxlength); e = function (a) { return sa(d, "maxlength", d.$isEmpty(a) || a.length <= u, a) }; d.$parsers.push(e);
	            d.$formatters.push(e)
	        }
	    } function Yb(b, a) {
	        b = "ngClass" + b; return ["$animate", function (c) {
	            function d(a, b) { var c = [], d = 0; a: for (; d < a.length; d++) { for (var e = a[d], l = 0; l < b.length; l++) if (e == b[l]) continue a; c.push(e) } return c } function e(a) { if (!I(a)) { if (A(a)) return a.split(" "); if (T(a)) { var b = []; r(a, function (a, c) { a && (b = b.concat(c.split(" "))) }); return b } } return a } return {
	                restrict: "AC", link: function (f, g, k) {
	                    function m(a, b) {
	                        var c = g.data("$classCounts") || {}, d = []; r(a, function (a) {
	                            if (0 < b || c[a]) c[a] = (c[a] || 0) + b, c[a] === +(0 <
	                            b) && d.push(a)
	                        }); g.data("$classCounts", c); return d.join(" ")
	                    } function h(b) { if (!0 === a || f.$index % 2 === a) { var h = e(b || []); if (!l) { var q = m(h, 1); k.$addClass(q) } else if (!Aa(b, l)) { var s = e(l), q = d(h, s), h = d(s, h), h = m(h, -1), q = m(q, 1); 0 === q.length ? c.removeClass(g, h) : 0 === h.length ? c.addClass(g, q) : c.setClass(g, q, h) } } l = ha(b) } var l; f.$watch(k[b], h, !0); k.$observe("class", function (a) { h(f.$eval(k[b])) }); "ngClass" !== b && f.$watch("$index", function (c, d) {
	                        var g = c & 1; if (g !== (d & 1)) {
	                            var h = e(f.$eval(k[b])); g === a ? (g = m(h, 1), k.$addClass(g)) :
	                            (g = m(h, -1), k.$removeClass(g))
	                        }
	                    })
	                }
	            }
	        }]
	    } var Le = "validity", M = function (b) { return A(b) ? b.toLowerCase() : b }, kb = Object.prototype.hasOwnProperty, Ia = function (b) { return A(b) ? b.toUpperCase() : b }, Q, v, Ea, Ba = [].slice, Me = [].push, za = Object.prototype.toString, Ta = D("ng"), Va = W.angular || (W.angular = {}), Ya, Ma, ma = ["0", "0", "0"]; Q = U((/msie (\d+)/.exec(M(navigator.userAgent)) || [])[1]); isNaN(Q) && (Q = U((/trident\/.*; rv:(\d+)/.exec(M(navigator.userAgent)) || [])[1])); F.$inject = []; Qa.$inject = []; var I = function () {
	        return P(Array.isArray) ?
	        Array.isArray : function (b) { return "[object Array]" === za.call(b) }
	    }(), aa = function () { return String.prototype.trim ? function (b) { return A(b) ? b.trim() : b } : function (b) { return A(b) ? b.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : b } }(); Ma = 9 > Q ? function (b) { b = b.nodeName ? b : b[0]; return b.scopeName && "HTML" != b.scopeName ? Ia(b.scopeName + ":" + b.nodeName) : b.nodeName } : function (b) { return b.nodeName ? b.nodeName : b[0].nodeName }; var Xa = function () {
	        if (z(Xa.isActive_)) return Xa.isActive_; var b = !(!X.querySelector("[ng-csp]") && !X.querySelector("[data-ng-csp]"));
	        if (!b) try { new Function("") } catch (a) { b = !0 } return Xa.isActive_ = b
	    }, Yc = /[A-Z]/g, ad = { full: "1.2.25", major: 1, minor: 2, dot: 25, codeName: "hypnotic-gesticulation" }; S.expando = "ng339"; var ab = S.cache = {}, ne = 1, sb = W.document.addEventListener ? function (b, a, c) { b.addEventListener(a, c, !1) } : function (b, a, c) { b.attachEvent("on" + a, c) }, $a = W.document.removeEventListener ? function (b, a, c) { b.removeEventListener(a, c, !1) } : function (b, a, c) { b.detachEvent("on" + a, c) }; S._data = function (b) { return this.cache[b[this.expando]] || {} }; var ie = /([\:\-\_]+(.))/g,
	    je = /^moz([A-Z])/, Hb = D("jqLite"), ke = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Ib = /<|&#?\w+;/, le = /<([\w:]+)/, me = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ea = { option: [1, '<select multiple="multiple">', "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] }; ea.optgroup = ea.option; ea.tbody = ea.tfoot = ea.colgroup = ea.caption = ea.thead; ea.th =
	    ea.td; var La = S.prototype = { ready: function (b) { function a() { c || (c = !0, b()) } var c = !1; "complete" === X.readyState ? setTimeout(a) : (this.on("DOMContentLoaded", a), S(W).on("load", a)) }, toString: function () { var b = []; r(this, function (a) { b.push("" + a) }); return "[" + b.join(", ") + "]" }, eq: function (b) { return 0 <= b ? v(this[b]) : v(this[this.length + b]) }, length: 0, push: Me, sort: [].sort, splice: [].splice }, qb = {}; r("multiple selected checked disabled readOnly required open".split(" "), function (b) { qb[M(b)] = b }); var rc = {}; r("input select option textarea button form details".split(" "),
	    function (b) { rc[Ia(b)] = !0 }); r({ data: Mb, removeData: Lb }, function (b, a) { S[a] = b }); r({
	        data: Mb, inheritedData: pb, scope: function (b) { return v.data(b, "$scope") || pb(b.parentNode || b, ["$isolateScope", "$scope"]) }, isolateScope: function (b) { return v.data(b, "$isolateScope") || v.data(b, "$isolateScopeNoTemplate") }, controller: oc, injector: function (b) { return pb(b, "$injector") }, removeAttr: function (b, a) { b.removeAttribute(a) }, hasClass: Nb, css: function (b, a, c) {
	            a = Za(a); if (z(c)) b.style[a] = c; else {
	                var d; 8 >= Q && (d = b.currentStyle && b.currentStyle[a],
	                "" === d && (d = "auto")); d = d || b.style[a]; 8 >= Q && (d = "" === d ? t : d); return d
	            }
	        }, attr: function (b, a, c) { var d = M(a); if (qb[d]) if (z(c)) c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d)); else return b[a] || (b.attributes.getNamedItem(a) || F).specified ? d : t; else if (z(c)) b.setAttribute(a, c); else if (b.getAttribute) return b = b.getAttribute(a, 2), null === b ? t : b }, prop: function (b, a, c) { if (z(c)) b[a] = c; else return b[a] }, text: function () {
	            function b(b, d) { var e = a[b.nodeType]; if (y(d)) return e ? b[e] : ""; b[e] = d } var a = []; 9 > Q ? (a[1] =
	            "innerText", a[3] = "nodeValue") : a[1] = a[3] = "textContent"; b.$dv = ""; return b
	        }(), val: function (b, a) { if (y(a)) { if ("SELECT" === Ma(b) && b.multiple) { var c = []; r(b.options, function (a) { a.selected && c.push(a.value || a.text) }); return 0 === c.length ? null : c } return b.value } b.value = a }, html: function (b, a) { if (y(a)) return b.innerHTML; for (var c = 0, d = b.childNodes; c < d.length; c++) Ja(d[c]); b.innerHTML = a }, empty: pc
	    }, function (b, a) {
	        S.prototype[a] = function (a, d) {
	            var e, f, g = this.length; if (b !== pc && (2 == b.length && b !== Nb && b !== oc ? a : d) === t) {
	                if (T(a)) {
	                    for (e =
	                    0; e < g; e++) if (b === Mb) b(this[e], a); else for (f in a) b(this[e], f, a[f]); return this
	                } e = b.$dv; g = e === t ? Math.min(g, 1) : g; for (f = 0; f < g; f++) { var k = b(this[f], a, d); e = e ? e + k : k } return e
	            } for (e = 0; e < g; e++) b(this[e], a, d); return this
	        }
	    }); r({
	        removeData: Lb, dealoc: Ja, on: function a(c, d, e, f) {
	            if (z(f)) throw Hb("onargs"); var g = oa(c, "events"), k = oa(c, "handle"); g || oa(c, "events", g = {}); k || oa(c, "handle", k = oe(c, g)); r(d.split(" "), function (d) {
	                var f = g[d]; if (!f) {
	                    if ("mouseenter" == d || "mouseleave" == d) {
	                        var l = X.body.contains || X.body.compareDocumentPosition ?
	                        function (a, c) { var d = 9 === a.nodeType ? a.documentElement : a, e = c && c.parentNode; return a === e || !!(e && 1 === e.nodeType && (d.contains ? d.contains(e) : a.compareDocumentPosition && a.compareDocumentPosition(e) & 16)) } : function (a, c) { if (c) for (; c = c.parentNode;) if (c === a) return !0; return !1 }; g[d] = []; a(c, { mouseleave: "mouseout", mouseenter: "mouseover" }[d], function (a) { var c = a.relatedTarget; c && (c === this || l(this, c)) || k(a, d) })
	                    } else sb(c, d, k), g[d] = []; f = g[d]
	                } f.push(e)
	            })
	        }, off: nc, one: function (a, c, d) {
	            a = v(a); a.on(c, function f() {
	                a.off(c,
	                d); a.off(c, f)
	            }); a.on(c, d)
	        }, replaceWith: function (a, c) { var d, e = a.parentNode; Ja(a); r(new S(c), function (c) { d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a); d = c }) }, children: function (a) { var c = []; r(a.childNodes, function (a) { 1 === a.nodeType && c.push(a) }); return c }, contents: function (a) { return a.contentDocument || a.childNodes || [] }, append: function (a, c) { r(new S(c), function (c) { 1 !== a.nodeType && 11 !== a.nodeType || a.appendChild(c) }) }, prepend: function (a, c) {
	            if (1 === a.nodeType) {
	                var d = a.firstChild; r(new S(c), function (c) {
	                    a.insertBefore(c,
	                    d)
	                })
	            }
	        }, wrap: function (a, c) { c = v(c)[0]; var d = a.parentNode; d && d.replaceChild(c, a); c.appendChild(a) }, remove: function (a) { Ja(a); var c = a.parentNode; c && c.removeChild(a) }, after: function (a, c) { var d = a, e = a.parentNode; r(new S(c), function (a) { e.insertBefore(a, d.nextSibling); d = a }) }, addClass: ob, removeClass: nb, toggleClass: function (a, c, d) { c && r(c.split(" "), function (c) { var f = d; y(f) && (f = !Nb(a, c)); (f ? ob : nb)(a, c) }) }, parent: function (a) { return (a = a.parentNode) && 11 !== a.nodeType ? a : null }, next: function (a) {
	            if (a.nextElementSibling) return a.nextElementSibling;
	            for (a = a.nextSibling; null != a && 1 !== a.nodeType;) a = a.nextSibling; return a
	        }, find: function (a, c) { return a.getElementsByTagName ? a.getElementsByTagName(c) : [] }, clone: Kb, triggerHandler: function (a, c, d) { var e, f; e = c.type || c; var g = (oa(a, "events") || {})[e]; g && (e = { preventDefault: function () { this.defaultPrevented = !0 }, isDefaultPrevented: function () { return !0 === this.defaultPrevented }, stopPropagation: F, type: e, target: a }, c.type && (e = J(e, c)), c = ha(g), f = d ? [e].concat(d) : [e], r(c, function (c) { c.apply(a, f) })) }
	    }, function (a, c) {
	        S.prototype[c] =
	        function (c, e, f) { for (var g, k = 0; k < this.length; k++) y(g) ? (g = a(this[k], c, e, f), z(g) && (g = v(g))) : Jb(g, a(this[k], c, e, f)); return z(g) ? g : this }; S.prototype.bind = S.prototype.on; S.prototype.unbind = S.prototype.off
	    }); bb.prototype = { put: function (a, c) { this[Ka(a, this.nextUid)] = c }, get: function (a) { return this[Ka(a, this.nextUid)] }, remove: function (a) { var c = this[a = Ka(a, this.nextUid)]; delete this[a]; return c } }; var qe = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, re = /,/, se = /^\s*(_?)(\S+?)\1\s*$/, pe = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
	    cb = D("$injector"), Ne = D("$animate"), Md = ["$provide", function (a) {
	        this.$$selectors = {}; this.register = function (c, d) { var e = c + "-animation"; if (c && "." != c.charAt(0)) throw Ne("notcsel", c); this.$$selectors[c.substr(1)] = e; a.factory(e, d) }; this.classNameFilter = function (a) { 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null); return this.$$classNameFilter }; this.$get = ["$timeout", "$$asyncCallback", function (a, d) {
	            return {
	                enter: function (a, c, g, k) {
	                    g ? g.after(a) : (c && c[0] || (c = g.parent()), c.append(a)); k &&
	                    d(k)
	                }, leave: function (a, c) { a.remove(); c && d(c) }, move: function (a, c, d, k) { this.enter(a, c, d, k) }, addClass: function (a, c, g) { c = A(c) ? c : I(c) ? c.join(" ") : ""; r(a, function (a) { ob(a, c) }); g && d(g) }, removeClass: function (a, c, g) { c = A(c) ? c : I(c) ? c.join(" ") : ""; r(a, function (a) { nb(a, c) }); g && d(g) }, setClass: function (a, c, g, k) { r(a, function (a) { ob(a, c); nb(a, g) }); k && d(k) }, enabled: F
	            }
	        }]
	    }], ja = D("$compile"); ic.$inject = ["$provide", "$$sanitizeUriProvider"]; var we = /^(x[\:\-_]|data[\:\-_])/i, yc = D("$interpolate"), Oe = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
	    ze = { http: 80, https: 443, ftp: 21 }, Sb = D("$location"); Ub.prototype = Tb.prototype = Bc.prototype = {
	        $$html5: !1, $$replace: !1, absUrl: tb("$$absUrl"), url: function (a) { if (y(a)) return this.$$url; a = Oe.exec(a); a[1] && this.path(decodeURIComponent(a[1])); (a[2] || a[1]) && this.search(a[3] || ""); this.hash(a[5] || ""); return this }, protocol: tb("$$protocol"), host: tb("$$host"), port: tb("$$port"), path: Cc("$$path", function (a) { a = a ? a.toString() : ""; return "/" == a.charAt(0) ? a : "/" + a }), search: function (a, c) {
	            switch (arguments.length) {
	                case 0: return this.$$search;
	                case 1: if (A(a) || ib(a)) a = a.toString(), this.$$search = ec(a); else if (T(a)) r(a, function (c, e) { null == c && delete a[e] }), this.$$search = a; else throw Sb("isrcharg"); break; default: y(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c
	            } this.$$compose(); return this
	        }, hash: Cc("$$hash", function (a) { return a ? a.toString() : "" }), replace: function () { this.$$replace = !0; return this }
	    }; var la = D("$parse"), Fc = {}, wa, Pe = Function.prototype.call, Qe = Function.prototype.apply, Qc = Function.prototype.bind, gb = {
	        "null": function () { return null },
	        "true": function () { return !0 }, "false": function () { return !1 }, undefined: F, "+": function (a, c, d, e) { d = d(a, c); e = e(a, c); return z(d) ? z(e) ? d + e : d : z(e) ? e : t }, "-": function (a, c, d, e) { d = d(a, c); e = e(a, c); return (z(d) ? d : 0) - (z(e) ? e : 0) }, "*": function (a, c, d, e) { return d(a, c) * e(a, c) }, "/": function (a, c, d, e) { return d(a, c) / e(a, c) }, "%": function (a, c, d, e) { return d(a, c) % e(a, c) }, "^": function (a, c, d, e) { return d(a, c) ^ e(a, c) }, "=": F, "===": function (a, c, d, e) { return d(a, c) === e(a, c) }, "!==": function (a, c, d, e) { return d(a, c) !== e(a, c) }, "==": function (a,
	        c, d, e) { return d(a, c) == e(a, c) }, "!=": function (a, c, d, e) { return d(a, c) != e(a, c) }, "<": function (a, c, d, e) { return d(a, c) < e(a, c) }, ">": function (a, c, d, e) { return d(a, c) > e(a, c) }, "<=": function (a, c, d, e) { return d(a, c) <= e(a, c) }, ">=": function (a, c, d, e) { return d(a, c) >= e(a, c) }, "&&": function (a, c, d, e) { return d(a, c) && e(a, c) }, "||": function (a, c, d, e) { return d(a, c) || e(a, c) }, "&": function (a, c, d, e) { return d(a, c) & e(a, c) }, "|": function (a, c, d, e) { return e(a, c)(a, c, d(a, c)) }, "!": function (a, c, d) { return !d(a, c) }
	    }, Re = {
	        n: "\n", f: "\f", r: "\r",
	        t: "\t", v: "\v", "'": "'", '"': '"'
	    }, Wb = function (a) { this.options = a }; Wb.prototype = {
	        constructor: Wb, lex: function (a) {
	            this.text = a; this.index = 0; this.ch = t; this.lastCh = ":"; for (this.tokens = []; this.index < this.text.length;) {
	                this.ch = this.text.charAt(this.index); if (this.is("\"'")) this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(this.ch)) this.readIdent(); else if (this.is("(){}[].,;:?")) this.tokens.push({ index: this.index, text: this.ch }),
	                this.index++; else if (this.isWhitespace(this.ch)) { this.index++; continue } else { a = this.ch + this.peek(); var c = a + this.peek(2), d = gb[this.ch], e = gb[a], f = gb[c]; f ? (this.tokens.push({ index: this.index, text: c, fn: f }), this.index += 3) : e ? (this.tokens.push({ index: this.index, text: a, fn: e }), this.index += 2) : d ? (this.tokens.push({ index: this.index, text: this.ch, fn: d }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1) } this.lastCh = this.ch
	            } return this.tokens
	        }, is: function (a) { return -1 !== a.indexOf(this.ch) },
	        was: function (a) { return -1 !== a.indexOf(this.lastCh) }, peek: function (a) { a = a || 1; return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1 }, isNumber: function (a) { return "0" <= a && "9" >= a }, isWhitespace: function (a) { return " " === a || "\r" === a || "\t" === a || "\n" === a || "\v" === a || "\u00a0" === a }, isIdent: function (a) { return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a }, isExpOperator: function (a) { return "-" === a || "+" === a || this.isNumber(a) }, throwError: function (a, c, d) {
	            d = d || this.index; c = z(c) ? "s " + c + "-" + this.index + " [" +
	            this.text.substring(c, d) + "]" : " " + d; throw la("lexerr", a, c, this.text);
	        }, readNumber: function () {
	            for (var a = "", c = this.index; this.index < this.text.length;) { var d = M(this.text.charAt(this.index)); if ("." == d || this.isNumber(d)) a += d; else { var e = this.peek(); if ("e" == d && this.isExpOperator(e)) a += d; else if (this.isExpOperator(d) && e && this.isNumber(e) && "e" == a.charAt(a.length - 1)) a += d; else if (!this.isExpOperator(d) || e && this.isNumber(e) || "e" != a.charAt(a.length - 1)) break; else this.throwError("Invalid exponent") } this.index++ } a *=
	            1; this.tokens.push({ index: c, text: a, literal: !0, constant: !0, fn: function () { return a } })
	        }, readIdent: function () {
	            for (var a = this, c = "", d = this.index, e, f, g, k; this.index < this.text.length;) { k = this.text.charAt(this.index); if ("." === k || this.isIdent(k) || this.isNumber(k)) "." === k && (e = this.index), c += k; else break; this.index++ } if (e) for (f = this.index; f < this.text.length;) { k = this.text.charAt(f); if ("(" === k) { g = c.substr(e - d + 1); c = c.substr(0, e - d); this.index = f; break } if (this.isWhitespace(k)) f++; else break } d = { index: d, text: c }; if (gb.hasOwnProperty(c)) d.fn =
	            gb[c], d.literal = !0, d.constant = !0; else { var m = Ec(c, this.options, this.text); d.fn = J(function (a, c) { return m(a, c) }, { assign: function (d, e) { return ub(d, c, e, a.text, a.options) } }) } this.tokens.push(d); g && (this.tokens.push({ index: e, text: "." }), this.tokens.push({ index: e + 1, text: g }))
	        }, readString: function (a) {
	            var c = this.index; this.index++; for (var d = "", e = a, f = !1; this.index < this.text.length;) {
	                var g = this.text.charAt(this.index), e = e + g; if (f) "u" === g ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) ||
	                this.throwError("Invalid unicode escape [\\u" + f + "]"), this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d += Re[g] || g, f = !1; else if ("\\" === g) f = !0; else { if (g === a) { this.index++; this.tokens.push({ index: c, text: e, string: d, literal: !0, constant: !0, fn: function () { return d } }); return } d += g } this.index++
	            } this.throwError("Unterminated quote", c)
	        }
	    }; var fb = function (a, c, d) { this.lexer = a; this.$filter = c; this.options = d }; fb.ZERO = J(function () { return 0 }, { constant: !0 }); fb.prototype = {
	        constructor: fb, parse: function (a) {
	            this.text =
	            a; this.tokens = this.lexer.lex(a); a = this.statements(); 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]); a.literal = !!a.literal; a.constant = !!a.constant; return a
	        }, primary: function () {
	            var a; if (this.expect("(")) a = this.filterChain(), this.consume(")"); else if (this.expect("[")) a = this.arrayDeclaration(); else if (this.expect("{")) a = this.object(); else { var c = this.expect(); (a = c.fn) || this.throwError("not a primary expression", c); a.literal = !!c.literal; a.constant = !!c.constant } for (var d; c =
	            this.expect("(", "[", ".") ;) "(" === c.text ? (a = this.functionCall(a, d), d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE"); return a
	        }, throwError: function (a, c) { throw la("syntax", c.text, a, c.index + 1, this.text, this.text.substring(c.index)); }, peekToken: function () { if (0 === this.tokens.length) throw la("ueoe", this.text); return this.tokens[0] }, peek: function (a, c, d, e) {
	            if (0 < this.tokens.length) {
	                var f = this.tokens[0], g = f.text; if (g === a || g === c || g === d || g ===
	                e || !(a || c || d || e)) return f
	            } return !1
	        }, expect: function (a, c, d, e) { return (a = this.peek(a, c, d, e)) ? (this.tokens.shift(), a) : !1 }, consume: function (a) { this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek()) }, unaryFn: function (a, c) { return J(function (d, e) { return a(d, e, c) }, { constant: c.constant }) }, ternaryFn: function (a, c, d) { return J(function (e, f) { return a(e, f) ? c(e, f) : d(e, f) }, { constant: a.constant && c.constant && d.constant }) }, binaryFn: function (a, c, d) {
	            return J(function (e, f) { return c(e, f, a, d) }, {
	                constant: a.constant &&
	                d.constant
	            })
	        }, statements: function () { for (var a = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";")) return 1 === a.length ? a[0] : function (c, d) { for (var e, f = 0; f < a.length; f++) { var g = a[f]; g && (e = g(c, d)) } return e } }, filterChain: function () { for (var a = this.expression(), c; ;) if (c = this.expect("|")) a = this.binaryFn(a, c.fn, this.filter()); else return a }, filter: function () {
	            for (var a = this.expect(), c = this.$filter(a.text), d = []; ;) if (a = this.expect(":")) d.push(this.expression());
	            else { var e = function (a, e, k) { k = [k]; for (var m = 0; m < d.length; m++) k.push(d[m](a, e)); return c.apply(a, k) }; return function () { return e } }
	        }, expression: function () { return this.assignment() }, assignment: function () { var a = this.ternary(), c, d; return (d = this.expect("=")) ? (a.assign || this.throwError("implies assignment but [" + this.text.substring(0, d.index) + "] can not be assigned to", d), c = this.ternary(), function (d, f) { return a.assign(d, c(d, f), f) }) : a }, ternary: function () {
	            var a = this.logicalOR(), c, d; if (this.expect("?")) {
	                c = this.assignment();
	                if (d = this.expect(":")) return this.ternaryFn(a, c, this.assignment()); this.throwError("expected :", d)
	            } else return a
	        }, logicalOR: function () { for (var a = this.logicalAND(), c; ;) if (c = this.expect("||")) a = this.binaryFn(a, c.fn, this.logicalAND()); else return a }, logicalAND: function () { var a = this.equality(), c; if (c = this.expect("&&")) a = this.binaryFn(a, c.fn, this.logicalAND()); return a }, equality: function () { var a = this.relational(), c; if (c = this.expect("==", "!=", "===", "!==")) a = this.binaryFn(a, c.fn, this.equality()); return a },
	        relational: function () { var a = this.additive(), c; if (c = this.expect("<", ">", "<=", ">=")) a = this.binaryFn(a, c.fn, this.relational()); return a }, additive: function () { for (var a = this.multiplicative(), c; c = this.expect("+", "-") ;) a = this.binaryFn(a, c.fn, this.multiplicative()); return a }, multiplicative: function () { for (var a = this.unary(), c; c = this.expect("*", "/", "%") ;) a = this.binaryFn(a, c.fn, this.unary()); return a }, unary: function () {
	            var a; return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(fb.ZERO, a.fn,
	            this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
	        }, fieldAccess: function (a) { var c = this, d = this.expect().text, e = Ec(d, this.options, this.text); return J(function (c, d, k) { return e(k || a(c, d)) }, { assign: function (e, g, k) { (k = a(e, k)) || a.assign(e, k = {}); return ub(k, d, g, c.text, c.options) } }) }, objectIndex: function (a) {
	            var c = this, d = this.expression(); this.consume("]"); return J(function (e, f) {
	                var g = a(e, f), k = d(e, f), m; ka(k, c.text); if (!g) return t; (g = va(g[k], c.text)) && (g.then && c.options.unwrapPromises) &&
	                (m = g, "$$v" in g || (m.$$v = t, m.then(function (a) { m.$$v = a })), g = g.$$v); return g
	            }, { assign: function (e, f, g) { var k = ka(d(e, g), c.text); (g = va(a(e, g), c.text)) || a.assign(e, g = {}); return g[k] = f } })
	        }, functionCall: function (a, c) {
	            var d = []; if (")" !== this.peekToken().text) { do d.push(this.expression()); while (this.expect(",")) } this.consume(")"); var e = this; return function (f, g) {
	                for (var k = [], m = c ? c(f, g) : f, h = 0; h < d.length; h++) k.push(va(d[h](f, g), e.text)); h = a(f, g, m) || F; va(m, e.text); var l = e.text; if (h) {
	                    if (h.constructor === h) throw la("isecfn",
	                    l); if (h === Pe || h === Qe || Qc && h === Qc) throw la("isecff", l);
	                } k = h.apply ? h.apply(m, k) : h(k[0], k[1], k[2], k[3], k[4]); return va(k, e.text)
	            }
	        }, arrayDeclaration: function () { var a = [], c = !0; if ("]" !== this.peekToken().text) { do { if (this.peek("]")) break; var d = this.expression(); a.push(d); d.constant || (c = !1) } while (this.expect(",")) } this.consume("]"); return J(function (c, d) { for (var g = [], k = 0; k < a.length; k++) g.push(a[k](c, d)); return g }, { literal: !0, constant: c }) }, object: function () {
	            var a = [], c = !0; if ("}" !== this.peekToken().text) {
	                do {
	                    if (this.peek("}")) break;
	                    var d = this.expect(), d = d.string || d.text; this.consume(":"); var e = this.expression(); a.push({ key: d, value: e }); e.constant || (c = !1)
	                } while (this.expect(","))
	            } this.consume("}"); return J(function (c, d) { for (var e = {}, m = 0; m < a.length; m++) { var h = a[m]; e[h.key] = h.value(c, d) } return e }, { literal: !0, constant: c })
	        }
	    }; var Vb = {}, xa = D("$sce"), ga = { HTML: "html", CSS: "css", URL: "url", RESOURCE_URL: "resourceUrl", JS: "js" }, Y = X.createElement("a"), Hc = ua(W.location.href, !0); mc.$inject = ["$provide"]; Ic.$inject = ["$locale"]; Kc.$inject = ["$locale"];
	    var Nc = ".", Je = {
	        yyyy: $("FullYear", 4), yy: $("FullYear", 2, 0, !0), y: $("FullYear", 1), MMMM: vb("Month"), MMM: vb("Month", !0), MM: $("Month", 2, 1), M: $("Month", 1, 1), dd: $("Date", 2), d: $("Date", 1), HH: $("Hours", 2), H: $("Hours", 1), hh: $("Hours", 2, -12), h: $("Hours", 1, -12), mm: $("Minutes", 2), m: $("Minutes", 1), ss: $("Seconds", 2), s: $("Seconds", 1), sss: $("Milliseconds", 3), EEEE: vb("Day"), EEE: vb("Day", !0), a: function (a, c) { return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1] }, Z: function (a) {
	            a = -1 * a.getTimezoneOffset(); return a = (0 <= a ? "+" : "") + (Xb(Math[0 <
	            a ? "floor" : "ceil"](a / 60), 2) + Xb(Math.abs(a % 60), 2))
	        }
	    }, Ie = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, He = /^\-?\d+$/; Jc.$inject = ["$locale"]; var Fe = ba(M), Ge = ba(Ia); Lc.$inject = ["$parse"]; var dd = ba({
	        restrict: "E", compile: function (a, c) {
	            8 >= Q && (c.href || c.name || c.$set("href", ""), a.append(X.createComment("IE fix"))); if (!c.href && !c.xlinkHref && !c.name) return function (a, c) {
	                var f = "[object SVGAnimatedString]" === za.call(c.prop("href")) ? "xlink:href" : "href"; c.on("click", function (a) {
	                    c.attr(f) ||
	                    a.preventDefault()
	                })
	            }
	        }
	    }), Fb = {}; r(qb, function (a, c) { if ("multiple" != a) { var d = pa("ng-" + c); Fb[d] = function () { return { priority: 100, link: function (a, f, g) { a.$watch(g[d], function (a) { g.$set(c, !!a) }) } } } } }); r(["src", "srcset", "href"], function (a) {
	        var c = pa("ng-" + a); Fb[c] = function () {
	            return {
	                priority: 99, link: function (d, e, f) {
	                    var g = a, k = a; "href" === a && "[object SVGAnimatedString]" === za.call(e.prop("href")) && (k = "xlinkHref", f.$attr[k] = "xlink:href", g = null); f.$observe(c, function (c) {
	                        c ? (f.$set(k, c), Q && g && e.prop(g, f[k])) : "href" ===
	                        a && f.$set(k, null)
	                    })
	                }
	            }
	        }
	    }); var yb = { $addControl: F, $removeControl: F, $setValidity: F, $setDirty: F, $setPristine: F }; Oc.$inject = ["$element", "$attrs", "$scope", "$animate"]; var Rc = function (a) {
	        return ["$timeout", function (c) {
	            return {
	                name: "form", restrict: a ? "EAC" : "E", controller: Oc, compile: function () {
	                    return {
	                        pre: function (a, e, f, g) {
	                            if (!f.action) { var k = function (a) { a.preventDefault ? a.preventDefault() : a.returnValue = !1 }; sb(e[0], "submit", k); e.on("$destroy", function () { c(function () { $a(e[0], "submit", k) }, 0, !1) }) } var m = e.parent().controller("form"),
	                            h = f.name || f.ngForm; h && ub(a, h, g, h); if (m) e.on("$destroy", function () { m.$removeControl(g); h && ub(a, h, t, h); J(g, yb) })
	                        }
	                    }
	                }
	            }
	        }]
	    }, ed = Rc(), rd = Rc(!0), Se = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Te = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, Ue = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Sc = {
	        text: Ab, number: function (a, c, d, e, f, g) {
	            Ab(a, c, d, e, f, g); e.$parsers.push(function (a) {
	                var c = e.$isEmpty(a); if (c || Ue.test(a)) return e.$setValidity("number",
	                !0), "" === a ? null : c ? a : parseFloat(a); e.$setValidity("number", !1); return t
	            }); Ke(e, "number", Ve, null, e.$$validityState); e.$formatters.push(function (a) { return e.$isEmpty(a) ? "" : "" + a }); d.min && (a = function (a) { var c = parseFloat(d.min); return sa(e, "min", e.$isEmpty(a) || a >= c, a) }, e.$parsers.push(a), e.$formatters.push(a)); d.max && (a = function (a) { var c = parseFloat(d.max); return sa(e, "max", e.$isEmpty(a) || a <= c, a) }, e.$parsers.push(a), e.$formatters.push(a)); e.$formatters.push(function (a) {
	                return sa(e, "number", e.$isEmpty(a) ||
	                ib(a), a)
	            })
	        }, url: function (a, c, d, e, f, g) { Ab(a, c, d, e, f, g); a = function (a) { return sa(e, "url", e.$isEmpty(a) || Se.test(a), a) }; e.$formatters.push(a); e.$parsers.push(a) }, email: function (a, c, d, e, f, g) { Ab(a, c, d, e, f, g); a = function (a) { return sa(e, "email", e.$isEmpty(a) || Te.test(a), a) }; e.$formatters.push(a); e.$parsers.push(a) }, radio: function (a, c, d, e) {
	            y(d.name) && c.attr("name", hb()); c.on("click", function () { c[0].checked && a.$apply(function () { e.$setViewValue(d.value) }) }); e.$render = function () { c[0].checked = d.value == e.$viewValue };
	            d.$observe("value", e.$render)
	        }, checkbox: function (a, c, d, e) { var f = d.ngTrueValue, g = d.ngFalseValue; A(f) || (f = !0); A(g) || (g = !1); c.on("click", function () { a.$apply(function () { e.$setViewValue(c[0].checked) }) }); e.$render = function () { c[0].checked = e.$viewValue }; e.$isEmpty = function (a) { return a !== f }; e.$formatters.push(function (a) { return a === f }); e.$parsers.push(function (a) { return a ? f : g }) }, hidden: F, button: F, submit: F, reset: F, file: F
	    }, Ve = ["badInput"], jc = ["$browser", "$sniffer", function (a, c) {
	        return {
	            restrict: "E", require: "?ngModel",
	            link: function (d, e, f, g) { g && (Sc[M(f.type)] || Sc.text)(d, e, f, g, c, a) }
	        }
	    }], wb = "ng-valid", xb = "ng-invalid", Oa = "ng-pristine", zb = "ng-dirty", We = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function (a, c, d, e, f, g) {
	        function k(a, c) { c = c ? "-" + mb(c, "-") : ""; g.removeClass(e, (a ? xb : wb) + c); g.addClass(e, (a ? wb : xb) + c) } this.$modelValue = this.$viewValue = Number.NaN; this.$parsers = []; this.$formatters = []; this.$viewChangeListeners = []; this.$pristine = !0; this.$dirty = !1; this.$valid = !0; this.$invalid = !1; this.$name =
	        d.name; var m = f(d.ngModel), h = m.assign; if (!h) throw D("ngModel")("nonassign", d.ngModel, ia(e)); this.$render = F; this.$isEmpty = function (a) { return y(a) || "" === a || null === a || a !== a }; var l = e.inheritedData("$formController") || yb, n = 0, p = this.$error = {}; e.addClass(Oa); k(!0); this.$setValidity = function (a, c) { p[a] !== !c && (c ? (p[a] && n--, n || (k(!0), this.$valid = !0, this.$invalid = !1)) : (k(!1), this.$invalid = !0, this.$valid = !1, n++), p[a] = !c, k(c, a), l.$setValidity(a, c, this)) }; this.$setPristine = function () {
	            this.$dirty = !1; this.$pristine =
	            !0; g.removeClass(e, zb); g.addClass(e, Oa)
	        }; this.$setViewValue = function (d) { this.$viewValue = d; this.$pristine && (this.$dirty = !0, this.$pristine = !1, g.removeClass(e, Oa), g.addClass(e, zb), l.$setDirty()); r(this.$parsers, function (a) { d = a(d) }); this.$modelValue !== d && (this.$modelValue = d, h(a, d), r(this.$viewChangeListeners, function (a) { try { a() } catch (d) { c(d) } })) }; var q = this; a.$watch(function () {
	            var c = m(a); if (q.$modelValue !== c) {
	                var d = q.$formatters, e = d.length; for (q.$modelValue = c; e--;) c = d[e](c); q.$viewValue !== c && (q.$viewValue =
	                c, q.$render())
	            } return c
	        })
	    }], Gd = function () { return { require: ["ngModel", "^?form"], controller: We, link: function (a, c, d, e) { var f = e[0], g = e[1] || yb; g.$addControl(f); a.$on("$destroy", function () { g.$removeControl(f) }) } } }, Id = ba({ require: "ngModel", link: function (a, c, d, e) { e.$viewChangeListeners.push(function () { a.$eval(d.ngChange) }) } }), kc = function () {
	        return {
	            require: "?ngModel", link: function (a, c, d, e) {
	                if (e) {
	                    d.required = !0; var f = function (a) {
	                        if (d.required && e.$isEmpty(a)) e.$setValidity("required", !1); else return e.$setValidity("required",
	                        !0), a
	                    }; e.$formatters.push(f); e.$parsers.unshift(f); d.$observe("required", function () { f(e.$viewValue) })
	                }
	            }
	        }
	    }, Hd = function () { return { require: "ngModel", link: function (a, c, d, e) { var f = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ","; e.$parsers.push(function (a) { if (!y(a)) { var c = []; a && r(a.split(f), function (a) { a && c.push(aa(a)) }); return c } }); e.$formatters.push(function (a) { return I(a) ? a.join(", ") : t }); e.$isEmpty = function (a) { return !a || !a.length } } } }, Xe = /^(true|false|\d+)$/, Jd = function () {
	        return {
	            priority: 100,
	            compile: function (a, c) { return Xe.test(c.ngValue) ? function (a, c, f) { f.$set("value", a.$eval(f.ngValue)) } : function (a, c, f) { a.$watch(f.ngValue, function (a) { f.$set("value", a) }) } }
	        }
	    }, jd = ya({ compile: function (a) { a.addClass("ng-binding"); return function (a, d, e) { d.data("$binding", e.ngBind); a.$watch(e.ngBind, function (a) { d.text(a == t ? "" : a) }) } } }), ld = ["$interpolate", function (a) { return function (c, d, e) { c = a(d.attr(e.$attr.ngBindTemplate)); d.addClass("ng-binding").data("$binding", c); e.$observe("ngBindTemplate", function (a) { d.text(a) }) } }],
	    kd = ["$sce", "$parse", function (a, c) { return { compile: function (d) { d.addClass("ng-binding"); return function (d, f, g) { f.data("$binding", g.ngBindHtml); var k = c(g.ngBindHtml); d.$watch(function () { return (k(d) || "").toString() }, function (c) { f.html(a.getTrustedHtml(k(d)) || "") }) } } } }], md = Yb("", !0), od = Yb("Odd", 0), nd = Yb("Even", 1), pd = ya({ compile: function (a, c) { c.$set("ngCloak", t); a.removeClass("ng-cloak") } }), qd = [function () { return { scope: !0, controller: "@", priority: 500 } }], lc = {}, Ye = { blur: !0, focus: !0 }; r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
	    function (a) { var c = pa("ng-" + a); lc[c] = ["$parse", "$rootScope", function (d, e) { return { compile: function (f, g) { var k = d(g[c]); return function (c, d) { d.on(a, function (d) { var f = function () { k(c, { $event: d }) }; Ye[a] && e.$$phase ? c.$evalAsync(f) : c.$apply(f) }) } } } }] }); var td = ["$animate", function (a) {
	        return {
	            transclude: "element", priority: 600, terminal: !0, restrict: "A", $$tlb: !0, link: function (c, d, e, f, g) {
	                var k, m, h; c.$watch(e.ngIf, function (f) {
	                    Ua(f) ? m || (m = c.$new(), g(m, function (c) {
	                        c[c.length++] = X.createComment(" end ngIf: " + e.ngIf +
	                        " "); k = { clone: c }; a.enter(c, d.parent(), d)
	                    })) : (h && (h.remove(), h = null), m && (m.$destroy(), m = null), k && (h = Eb(k.clone), a.leave(h, function () { h = null }), k = null))
	                })
	            }
	        }
	    }], ud = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function (a, c, d, e, f) {
	        return {
	            restrict: "ECA", priority: 400, terminal: !0, transclude: "element", controller: Va.noop, compile: function (g, k) {
	                var m = k.ngInclude || k.src, h = k.onload || "", l = k.autoscroll; return function (g, k, q, r, E) {
	                    var u = 0, t, v, R, w = function () {
	                        v && (v.remove(), v = null); t && (t.$destroy(), t = null);
	                        R && (e.leave(R, function () { v = null }), v = R, R = null)
	                    }; g.$watch(f.parseAsResourceUrl(m), function (f) { var m = function () { !z(l) || l && !g.$eval(l) || d() }, q = ++u; f ? (a.get(f, { cache: c }).success(function (a) { if (q === u) { var c = g.$new(); r.template = a; a = E(c, function (a) { w(); e.enter(a, null, k, m) }); t = c; R = a; t.$emit("$includeContentLoaded"); g.$eval(h) } }).error(function () { q === u && w() }), g.$emit("$includeContentRequested")) : (w(), r.template = null) })
	                }
	            }
	        }
	    }], Kd = ["$compile", function (a) {
	        return {
	            restrict: "ECA", priority: -400, require: "ngInclude",
	            link: function (c, d, e, f) { d.html(f.template); a(d.contents())(c) }
	        }
	    }], vd = ya({ priority: 450, compile: function () { return { pre: function (a, c, d) { a.$eval(d.ngInit) } } } }), wd = ya({ terminal: !0, priority: 1E3 }), xd = ["$locale", "$interpolate", function (a, c) {
	        var d = /{}/g; return {
	            restrict: "EA", link: function (e, f, g) {
	                var k = g.count, m = g.$attr.when && f.attr(g.$attr.when), h = g.offset || 0, l = e.$eval(m) || {}, n = {}, p = c.startSymbol(), q = c.endSymbol(), s = /^when(Minus)?(.+)$/; r(g, function (a, c) {
	                    s.test(c) && (l[M(c.replace("when", "").replace("Minus", "-"))] =
	                    f.attr(g.$attr[c]))
	                }); r(l, function (a, e) { n[e] = c(a.replace(d, p + k + "-" + h + q)) }); e.$watch(function () { var c = parseFloat(e.$eval(k)); if (isNaN(c)) return ""; c in l || (c = a.pluralCat(c - h)); return n[c](e, f, !0) }, function (a) { f.text(a) })
	            }
	        }
	    }], yd = ["$parse", "$animate", function (a, c) {
	        var d = D("ngRepeat"); return {
	            transclude: "element", priority: 1E3, terminal: !0, $$tlb: !0, link: function (e, f, g, k, m) {
	                var h = g.ngRepeat, l = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), n, p, q, s, t, u, B = { $id: Ka }; if (!l) throw d("iexp",
	                h); g = l[1]; k = l[2]; (l = l[3]) ? (n = a(l), p = function (a, c, d) { u && (B[u] = a); B[t] = c; B.$index = d; return n(e, B) }) : (q = function (a, c) { return Ka(c) }, s = function (a) { return a }); l = g.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/); if (!l) throw d("iidexp", g); t = l[3] || l[1]; u = l[2]; var z = {}; e.$watchCollection(k, function (a) {
	                    var g, k, l = f[0], n, B = {}, C, x, H, A, F, D, y, I = []; if (Pa(a)) D = a, F = p || q; else { F = p || s; D = []; for (H in a) a.hasOwnProperty(H) && "$" != H.charAt(0) && D.push(H); D.sort() } C = D.length; k = I.length = D.length; for (g = 0; g < k; g++) if (H = a ===
	                    D ? g : D[g], A = a[H], n = F(H, A, g), Da(n, "`track by` id"), z.hasOwnProperty(n)) y = z[n], delete z[n], B[n] = y, I[g] = y; else { if (B.hasOwnProperty(n)) throw r(I, function (a) { a && a.scope && (z[a.id] = a) }), d("dupes", h, n, na(A)); I[g] = { id: n }; B[n] = !1 } for (H in z) z.hasOwnProperty(H) && (y = z[H], g = Eb(y.clone), c.leave(g), r(g, function (a) { a.$$NG_REMOVED = !0 }), y.scope.$destroy()); g = 0; for (k = D.length; g < k; g++) {
	                        H = a === D ? g : D[g]; A = a[H]; y = I[g]; I[g - 1] && (l = I[g - 1].clone[I[g - 1].clone.length - 1]); if (y.scope) {
	                            x = y.scope; n = l; do n = n.nextSibling; while (n && n.$$NG_REMOVED);
	                            y.clone[0] != n && c.move(Eb(y.clone), null, v(l)); l = y.clone[y.clone.length - 1]
	                        } else x = e.$new(); x[t] = A; u && (x[u] = H); x.$index = g; x.$first = 0 === g; x.$last = g === C - 1; x.$middle = !(x.$first || x.$last); x.$odd = !(x.$even = 0 === (g & 1)); y.scope || m(x, function (a) { a[a.length++] = X.createComment(" end ngRepeat: " + h + " "); c.enter(a, null, v(l)); l = a; y.scope = x; y.clone = a; B[y.id] = y })
	                    } z = B
	                })
	            }
	        }
	    }], zd = ["$animate", function (a) { return function (c, d, e) { c.$watch(e.ngShow, function (c) { a[Ua(c) ? "removeClass" : "addClass"](d, "ng-hide") }) } }], sd = ["$animate",
	    function (a) { return function (c, d, e) { c.$watch(e.ngHide, function (c) { a[Ua(c) ? "addClass" : "removeClass"](d, "ng-hide") }) } }], Ad = ya(function (a, c, d) { a.$watch(d.ngStyle, function (a, d) { d && a !== d && r(d, function (a, d) { c.css(d, "") }); a && c.css(a) }, !0) }), Bd = ["$animate", function (a) {
	        return {
	            restrict: "EA", require: "ngSwitch", controller: ["$scope", function () { this.cases = {} }], link: function (c, d, e, f) {
	                var g = [], k = [], m = [], h = []; c.$watch(e.ngSwitch || e.on, function (d) {
	                    var n, p; n = 0; for (p = m.length; n < p; ++n) m[n].remove(); n = m.length = 0; for (p =
	                    h.length; n < p; ++n) { var q = k[n]; h[n].$destroy(); m[n] = q; a.leave(q, function () { m.splice(n, 1) }) } k.length = 0; h.length = 0; if (g = f.cases["!" + d] || f.cases["?"]) c.$eval(e.change), r(g, function (d) { var e = c.$new(); h.push(e); d.transclude(e, function (c) { var e = d.element; k.push(c); a.enter(c, e.parent(), e) }) })
	                })
	            }
	        }
	    }], Cd = ya({ transclude: "element", priority: 800, require: "^ngSwitch", link: function (a, c, d, e, f) { e.cases["!" + d.ngSwitchWhen] = e.cases["!" + d.ngSwitchWhen] || []; e.cases["!" + d.ngSwitchWhen].push({ transclude: f, element: c }) } }), Dd =
	    ya({ transclude: "element", priority: 800, require: "^ngSwitch", link: function (a, c, d, e, f) { e.cases["?"] = e.cases["?"] || []; e.cases["?"].push({ transclude: f, element: c }) } }), Fd = ya({ link: function (a, c, d, e, f) { if (!f) throw D("ngTransclude")("orphan", ia(c)); f(function (a) { c.empty(); c.append(a) }) } }), fd = ["$templateCache", function (a) { return { restrict: "E", terminal: !0, compile: function (c, d) { "text/ng-template" == d.type && a.put(d.id, c[0].text) } } }], Ze = D("ngOptions"), Ed = ba({ terminal: !0 }), gd = ["$compile", "$parse", function (a, c) {
	        var d =
	        /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, e = { $setViewValue: F }; return {
	            restrict: "E", require: ["select", "?ngModel"], controller: ["$element", "$scope", "$attrs", function (a, c, d) {
	                var m = this, h = {}, l = e, n; m.databound = d.ngModel; m.init = function (a, c, d) { l = a; n = d }; m.addOption = function (c) { Da(c, '"option value"'); h[c] = !0; l.$viewValue == c && (a.val(c), n.parent() && n.remove()) };
	                m.removeOption = function (a) { this.hasOption(a) && (delete h[a], l.$viewValue == a && this.renderUnknownOption(a)) }; m.renderUnknownOption = function (c) { c = "? " + Ka(c) + " ?"; n.val(c); a.prepend(n); a.val(c); n.prop("selected", !0) }; m.hasOption = function (a) { return h.hasOwnProperty(a) }; c.$on("$destroy", function () { m.renderUnknownOption = F })
	            }], link: function (e, g, k, m) {
	                function h(a, c, d, e) {
	                    d.$render = function () { var a = d.$viewValue; e.hasOption(a) ? (A.parent() && A.remove(), c.val(a), "" === a && u.prop("selected", !0)) : y(a) && u ? c.val("") : e.renderUnknownOption(a) };
	                    c.on("change", function () { a.$apply(function () { A.parent() && A.remove(); d.$setViewValue(c.val()) }) })
	                } function l(a, c, d) { var e; d.$render = function () { var a = new bb(d.$viewValue); r(c.find("option"), function (c) { c.selected = z(a.get(c.value)) }) }; a.$watch(function () { Aa(e, d.$viewValue) || (e = ha(d.$viewValue), d.$render()) }); c.on("change", function () { a.$apply(function () { var a = []; r(c.find("option"), function (c) { c.selected && a.push(c.value) }); d.$setViewValue(a) }) }) } function n(e, f, g) {
	                    function k() {
	                        var a = { "": [] }, c = [""], d, h,
	                        s, t, w; s = g.$modelValue; t = u(e) || []; var A = n ? Zb(t) : t, F, L, x; L = {}; x = !1; if (q) if (h = g.$modelValue, v && I(h)) for (x = new bb([]), d = {}, w = 0; w < h.length; w++) d[m] = h[w], x.put(v(e, d), h[w]); else x = new bb(h); w = x; var C, J; for (x = 0; F = A.length, x < F; x++) { h = x; if (n) { h = A[x]; if ("$" === h.charAt(0)) continue; L[n] = h } L[m] = t[h]; d = p(e, L) || ""; (h = a[d]) || (h = a[d] = [], c.push(d)); q ? d = z(w.remove(v ? v(e, L) : r(e, L))) : (v ? (d = {}, d[m] = s, d = v(e, d) === v(e, L)) : d = s === r(e, L), w = w || d); C = l(e, L); C = z(C) ? C : ""; h.push({ id: v ? v(e, L) : n ? A[x] : x, label: C, selected: d }) } q || (E || null ===
	                        s ? a[""].unshift({ id: "", label: "", selected: !w }) : w || a[""].unshift({ id: "?", label: "", selected: !0 })); L = 0; for (A = c.length; L < A; L++) {
	                            d = c[L]; h = a[d]; y.length <= L ? (s = { element: D.clone().attr("label", d), label: h.label }, t = [s], y.push(t), f.append(s.element)) : (t = y[L], s = t[0], s.label != d && s.element.attr("label", s.label = d)); C = null; x = 0; for (F = h.length; x < F; x++) d = h[x], (w = t[x + 1]) ? (C = w.element, w.label !== d.label && C.text(w.label = d.label), w.id !== d.id && C.val(w.id = d.id), C[0].selected !== d.selected && (C.prop("selected", w.selected = d.selected),
	                            Q && C.prop("selected", w.selected))) : ("" === d.id && E ? J = E : (J = B.clone()).val(d.id).prop("selected", d.selected).attr("selected", d.selected).text(d.label), t.push({ element: J, label: d.label, id: d.id, selected: d.selected }), C ? C.after(J) : s.element.append(J), C = J); for (x++; t.length > x;) t.pop().element.remove()
	                        } for (; y.length > L;) y.pop()[0].element.remove()
	                    } var h; if (!(h = s.match(d))) throw Ze("iexp", s, ia(f)); var l = c(h[2] || h[1]), m = h[4] || h[6], n = h[5], p = c(h[3] || ""), r = c(h[2] ? h[1] : m), u = c(h[7]), v = h[8] ? c(h[8]) : null, y = [[{
	                        element: f,
	                        label: ""
	                    }]]; E && (a(E)(e), E.removeClass("ng-scope"), E.remove()); f.empty(); f.on("change", function () {
	                        e.$apply(function () {
	                            var a, c = u(e) || [], d = {}, h, l, p, s, w, z, x; if (q) for (l = [], s = 0, z = y.length; s < z; s++) for (a = y[s], p = 1, w = a.length; p < w; p++) { if ((h = a[p].element)[0].selected) { h = h.val(); n && (d[n] = h); if (v) for (x = 0; x < c.length && (d[m] = c[x], v(e, d) != h) ; x++); else d[m] = c[h]; l.push(r(e, d)) } } else if (h = f.val(), "?" == h) l = t; else if ("" === h) l = null; else if (v) for (x = 0; x < c.length; x++) { if (d[m] = c[x], v(e, d) == h) { l = r(e, d); break } } else d[m] = c[h],
	                            n && (d[n] = h), l = r(e, d); g.$setViewValue(l); k()
	                        })
	                    }); g.$render = k; e.$watchCollection(u, k); e.$watchCollection(function () { var a = {}, c = u(e); if (c) { for (var d = Array(c.length), f = 0, g = c.length; f < g; f++) a[m] = c[f], d[f] = l(e, a); return d } }, k); q && e.$watchCollection(function () { return g.$modelValue }, k)
	                } if (m[1]) {
	                    var p = m[0]; m = m[1]; var q = k.multiple, s = k.ngOptions, E = !1, u, B = v(X.createElement("option")), D = v(X.createElement("optgroup")), A = B.clone(); k = 0; for (var w = g.children(), F = w.length; k < F; k++) if ("" === w[k].value) { u = E = w.eq(k); break } p.init(m,
	                    E, A); q && (m.$isEmpty = function (a) { return !a || 0 === a.length }); s ? n(e, g, m) : q ? l(e, g, m) : h(e, g, m, p)
	                }
	            }
	        }
	    }], id = ["$interpolate", function (a) {
	        var c = { addOption: F, removeOption: F }; return {
	            restrict: "E", priority: 100, compile: function (d, e) {
	                if (y(e.value)) { var f = a(d.text(), !0); f || e.$set("value", d.text()) } return function (a, d, e) {
	                    var h = d.parent(), l = h.data("$selectController") || h.parent().data("$selectController"); l && l.databound ? d.prop("selected", !1) : l = c; f ? a.$watch(f, function (a, c) { e.$set("value", a); a !== c && l.removeOption(c); l.addOption(a) }) :
	                    l.addOption(e.value); d.on("$destroy", function () { l.removeOption(e.value) })
	                }
	            }
	        }
	    }], hd = ba({ restrict: "E", terminal: !0 }); W.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : ((Ea = W.jQuery) && Ea.fn.on ? (v = Ea, J(Ea.fn, { scope: La.scope, isolateScope: La.isolateScope, controller: La.controller, injector: La.injector, inheritedData: La.inheritedData }), Gb("remove", !0, !0, !1), Gb("empty", !1, !1, !1), Gb("html", !1, !1, !0)) : v = S, Va.element = v, $c(Va), v(X).ready(function () { Xc(X, fc) }))
	})(window, document);
	!window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>');
	//# sourceMappingURL=angular.min.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	/**
	 * State-based routing for AngularJS
	 * @version v0.2.18
	 * @link http://angular-ui.github.com/
	 * @license MIT License, http://www.opensource.org/licenses/MIT
	 */

	/* commonjs package manager support (eg componentjs) */
	if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
	    module.exports = 'ui.router';
	}

	(function (window, angular, undefined) {
	    /*jshint globalstrict:true*/
	    /*global angular:false*/
	    'use strict';

	    var isDefined = angular.isDefined,
	        isFunction = angular.isFunction,
	        isString = angular.isString,
	        isObject = angular.isObject,
	        isArray = angular.isArray,
	        forEach = angular.forEach,
	        extend = angular.extend,
	        copy = angular.copy,
	        toJson = angular.toJson;

	    function inherit(parent, extra) {
	        return extend(new (extend(function () { }, { prototype: parent }))(), extra);
	    }

	    function merge(dst) {
	        forEach(arguments, function (obj) {
	            if (obj !== dst) {
	                forEach(obj, function (value, key) {
	                    if (!dst.hasOwnProperty(key)) dst[key] = value;
	                });
	            }
	        });
	        return dst;
	    }

	    /**
	     * Finds the common ancestor path between two states.
	     *
	     * @param {Object} first The first state.
	     * @param {Object} second The second state.
	     * @return {Array} Returns an array of state names in descending order, not including the root.
	     */
	    function ancestors(first, second) {
	        var path = [];

	        for (var n in first.path) {
	            if (first.path[n] !== second.path[n]) break;
	            path.push(first.path[n]);
	        }
	        return path;
	    }

	    /**
	     * IE8-safe wrapper for `Object.keys()`.
	     *
	     * @param {Object} object A JavaScript object.
	     * @return {Array} Returns the keys of the object as an array.
	     */
	    function objectKeys(object) {
	        if (Object.keys) {
	            return Object.keys(object);
	        }
	        var result = [];

	        forEach(object, function (val, key) {
	            result.push(key);
	        });
	        return result;
	    }

	    /**
	     * IE8-safe wrapper for `Array.prototype.indexOf()`.
	     *
	     * @param {Array} array A JavaScript array.
	     * @param {*} value A value to search the array for.
	     * @return {Number} Returns the array index value of `value`, or `-1` if not present.
	     */
	    function indexOf(array, value) {
	        if (Array.prototype.indexOf) {
	            return array.indexOf(value, Number(arguments[2]) || 0);
	        }
	        var len = array.length >>> 0, from = Number(arguments[2]) || 0;
	        from = (from < 0) ? Math.ceil(from) : Math.floor(from);

	        if (from < 0) from += len;

	        for (; from < len; from++) {
	            if (from in array && array[from] === value) return from;
	        }
	        return -1;
	    }

	    /**
	     * Merges a set of parameters with all parameters inherited between the common parents of the
	     * current state and a given destination state.
	     *
	     * @param {Object} currentParams The value of the current state parameters ($stateParams).
	     * @param {Object} newParams The set of parameters which will be composited with inherited params.
	     * @param {Object} $current Internal definition of object representing the current state.
	     * @param {Object} $to Internal definition of object representing state to transition to.
	     */
	    function inheritParams(currentParams, newParams, $current, $to) {
	        var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];

	        for (var i in parents) {
	            if (!parents[i] || !parents[i].params) continue;
	            parentParams = objectKeys(parents[i].params);
	            if (!parentParams.length) continue;

	            for (var j in parentParams) {
	                if (indexOf(inheritList, parentParams[j]) >= 0) continue;
	                inheritList.push(parentParams[j]);
	                inherited[parentParams[j]] = currentParams[parentParams[j]];
	            }
	        }
	        return extend({}, inherited, newParams);
	    }

	    /**
	     * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
	     *
	     * @param {Object} a The first object.
	     * @param {Object} b The second object.
	     * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
	     *                     it defaults to the list of keys in `a`.
	     * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
	     */
	    function equalForKeys(a, b, keys) {
	        if (!keys) {
	            keys = [];
	            for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility
	        }

	        for (var i = 0; i < keys.length; i++) {
	            var k = keys[i];
	            if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized
	        }
	        return true;
	    }

	    /**
	     * Returns the subset of an object, based on a list of keys.
	     *
	     * @param {Array} keys
	     * @param {Object} values
	     * @return {Boolean} Returns a subset of `values`.
	     */
	    function filterByKeys(keys, values) {
	        var filtered = {};

	        forEach(keys, function (name) {
	            filtered[name] = values[name];
	        });
	        return filtered;
	    }

	    // like _.indexBy
	    // when you know that your index values will be unique, or you want last-one-in to win
	    function indexBy(array, propName) {
	        var result = {};
	        forEach(array, function (item) {
	            result[item[propName]] = item;
	        });
	        return result;
	    }

	    // extracted from underscore.js
	    // Return a copy of the object only containing the whitelisted properties.
	    function pick(obj) {
	        var copy = {};
	        var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
	        forEach(keys, function (key) {
	            if (key in obj) copy[key] = obj[key];
	        });
	        return copy;
	    }

	    // extracted from underscore.js
	    // Return a copy of the object omitting the blacklisted properties.
	    function omit(obj) {
	        var copy = {};
	        var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
	        for (var key in obj) {
	            if (indexOf(keys, key) == -1) copy[key] = obj[key];
	        }
	        return copy;
	    }

	    function pluck(collection, key) {
	        var result = isArray(collection) ? [] : {};

	        forEach(collection, function (val, i) {
	            result[i] = isFunction(key) ? key(val) : val[key];
	        });
	        return result;
	    }

	    function filter(collection, callback) {
	        var array = isArray(collection);
	        var result = array ? [] : {};
	        forEach(collection, function (val, i) {
	            if (callback(val, i)) {
	                result[array ? result.length : i] = val;
	            }
	        });
	        return result;
	    }

	    function map(collection, callback) {
	        var result = isArray(collection) ? [] : {};

	        forEach(collection, function (val, i) {
	            result[i] = callback(val, i);
	        });
	        return result;
	    }

	    /**
	     * @ngdoc overview
	     * @name ui.router.util
	     *
	     * @description
	     * # ui.router.util sub-module
	     *
	     * This module is a dependency of other sub-modules. Do not include this module as a dependency
	     * in your angular app (use {@link ui.router} module instead).
	     *
	     */
	    angular.module('ui.router.util', ['ng']);

	    /**
	     * @ngdoc overview
	     * @name ui.router.router
	     * 
	     * @requires ui.router.util
	     *
	     * @description
	     * # ui.router.router sub-module
	     *
	     * This module is a dependency of other sub-modules. Do not include this module as a dependency
	     * in your angular app (use {@link ui.router} module instead).
	     */
	    angular.module('ui.router.router', ['ui.router.util']);

	    /**
	     * @ngdoc overview
	     * @name ui.router.state
	     * 
	     * @requires ui.router.router
	     * @requires ui.router.util
	     *
	     * @description
	     * # ui.router.state sub-module
	     *
	     * This module is a dependency of the main ui.router module. Do not include this module as a dependency
	     * in your angular app (use {@link ui.router} module instead).
	     * 
	     */
	    angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);

	    /**
	     * @ngdoc overview
	     * @name ui.router
	     *
	     * @requires ui.router.state
	     *
	     * @description
	     * # ui.router
	     * 
	     * ## The main module for ui.router 
	     * There are several sub-modules included with the ui.router module, however only this module is needed
	     * as a dependency within your angular app. The other modules are for organization purposes. 
	     *
	     * The modules are:
	     * * ui.router - the main "umbrella" module
	     * * ui.router.router - 
	     * 
	     * *You'll need to include **only** this module as the dependency within your angular app.*
	     * 
	     * <pre>
	     * <!doctype html>
	     * <html ng-app="myApp">
	     * <head>
	     *   <script src="js/angular.js"></script>
	     *   <!-- Include the ui-router script -->
	     *   <script src="js/angular-ui-router.min.js"></script>
	     *   <script>
	     *     // ...and add 'ui.router' as a dependency
	     *     var myApp = angular.module('myApp', ['ui.router']);
	     *   </script>
	     * </head>
	     * <body>
	     * </body>
	     * </html>
	     * </pre>
	     */
	    angular.module('ui.router', ['ui.router.state']);

	    angular.module('ui.router.compat', ['ui.router']);

	    /**
	     * @ngdoc object
	     * @name ui.router.util.$resolve
	     *
	     * @requires $q
	     * @requires $injector
	     *
	     * @description
	     * Manages resolution of (acyclic) graphs of promises.
	     */
	    $Resolve.$inject = ['$q', '$injector'];
	    function $Resolve($q, $injector) {

	        var VISIT_IN_PROGRESS = 1,
	            VISIT_DONE = 2,
	            NOTHING = {},
	            NO_DEPENDENCIES = [],
	            NO_LOCALS = NOTHING,
	            NO_PARENT = extend($q.when(NOTHING), { $$promises: NOTHING, $$values: NOTHING });


	        /**
	         * @ngdoc function
	         * @name ui.router.util.$resolve#study
	         * @methodOf ui.router.util.$resolve
	         *
	         * @description
	         * Studies a set of invocables that are likely to be used multiple times.
	         * <pre>
	         * $resolve.study(invocables)(locals, parent, self)
	         * </pre>
	         * is equivalent to
	         * <pre>
	         * $resolve.resolve(invocables, locals, parent, self)
	         * </pre>
	         * but the former is more efficient (in fact `resolve` just calls `study` 
	         * internally).
	         *
	         * @param {object} invocables Invocable objects
	         * @return {function} a function to pass in locals, parent and self
	         */
	        this.study = function (invocables) {
	            if (!isObject(invocables)) throw new Error("'invocables' must be an object");
	            var invocableKeys = objectKeys(invocables || {});

	            // Perform a topological sort of invocables to build an ordered plan
	            var plan = [], cycle = [], visited = {};
	            function visit(value, key) {
	                if (visited[key] === VISIT_DONE) return;

	                cycle.push(key);
	                if (visited[key] === VISIT_IN_PROGRESS) {
	                    cycle.splice(0, indexOf(cycle, key));
	                    throw new Error("Cyclic dependency: " + cycle.join(" -> "));
	                }
	                visited[key] = VISIT_IN_PROGRESS;

	                if (isString(value)) {
	                    plan.push(key, [function () { return $injector.get(value); }], NO_DEPENDENCIES);
	                } else {
	                    var params = $injector.annotate(value);
	                    forEach(params, function (param) {
	                        if (param !== key && invocables.hasOwnProperty(param)) visit(invocables[param], param);
	                    });
	                    plan.push(key, value, params);
	                }

	                cycle.pop();
	                visited[key] = VISIT_DONE;
	            }
	            forEach(invocables, visit);
	            invocables = cycle = visited = null; // plan is all that's required

	            function isResolve(value) {
	                return isObject(value) && value.then && value.$$promises;
	            }

	            return function (locals, parent, self) {
	                if (isResolve(locals) && self === undefined) {
	                    self = parent; parent = locals; locals = null;
	                }
	                if (!locals) locals = NO_LOCALS;
	                else if (!isObject(locals)) {
	                    throw new Error("'locals' must be an object");
	                }
	                if (!parent) parent = NO_PARENT;
	                else if (!isResolve(parent)) {
	                    throw new Error("'parent' must be a promise returned by $resolve.resolve()");
	                }

	                // To complete the overall resolution, we have to wait for the parent
	                // promise and for the promise for each invokable in our plan.
	                var resolution = $q.defer(),
	                    result = resolution.promise,
	                    promises = result.$$promises = {},
	                    values = extend({}, locals),
	                    wait = 1 + plan.length / 3,
	                    merged = false;

	                function done() {
	                    // Merge parent values we haven't got yet and publish our own $$values
	                    if (!--wait) {
	                        if (!merged) merge(values, parent.$$values);
	                        result.$$values = values;
	                        result.$$promises = result.$$promises || true; // keep for isResolve()
	                        delete result.$$inheritedValues;
	                        resolution.resolve(values);
	                    }
	                }

	                function fail(reason) {
	                    result.$$failure = reason;
	                    resolution.reject(reason);
	                }

	                // Short-circuit if parent has already failed
	                if (isDefined(parent.$$failure)) {
	                    fail(parent.$$failure);
	                    return result;
	                }

	                if (parent.$$inheritedValues) {
	                    merge(values, omit(parent.$$inheritedValues, invocableKeys));
	                }

	                // Merge parent values if the parent has already resolved, or merge
	                // parent promises and wait if the parent resolve is still in progress.
	                extend(promises, parent.$$promises);
	                if (parent.$$values) {
	                    merged = merge(values, omit(parent.$$values, invocableKeys));
	                    result.$$inheritedValues = omit(parent.$$values, invocableKeys);
	                    done();
	                } else {
	                    if (parent.$$inheritedValues) {
	                        result.$$inheritedValues = omit(parent.$$inheritedValues, invocableKeys);
	                    }
	                    parent.then(done, fail);
	                }

	                // Process each invocable in the plan, but ignore any where a local of the same name exists.
	                for (var i = 0, ii = plan.length; i < ii; i += 3) {
	                    if (locals.hasOwnProperty(plan[i])) done();
	                    else invoke(plan[i], plan[i + 1], plan[i + 2]);
	                }

	                function invoke(key, invocable, params) {
	                    // Create a deferred for this invocation. Failures will propagate to the resolution as well.
	                    var invocation = $q.defer(), waitParams = 0;
	                    function onfailure(reason) {
	                        invocation.reject(reason);
	                        fail(reason);
	                    }
	                    // Wait for any parameter that we have a promise for (either from parent or from this
	                    // resolve; in that case study() will have made sure it's ordered before us in the plan).
	                    forEach(params, function (dep) {
	                        if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) {
	                            waitParams++;
	                            promises[dep].then(function (result) {
	                                values[dep] = result;
	                                if (!(--waitParams)) proceed();
	                            }, onfailure);
	                        }
	                    });
	                    if (!waitParams) proceed();
	                    function proceed() {
	                        if (isDefined(result.$$failure)) return;
	                        try {
	                            invocation.resolve($injector.invoke(invocable, self, values));
	                            invocation.promise.then(function (result) {
	                                values[key] = result;
	                                done();
	                            }, onfailure);
	                        } catch (e) {
	                            onfailure(e);
	                        }
	                    }
	                    // Publish promise synchronously; invocations further down in the plan may depend on it.
	                    promises[key] = invocation.promise;
	                }

	                return result;
	            };
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$resolve#resolve
	         * @methodOf ui.router.util.$resolve
	         *
	         * @description
	         * Resolves a set of invocables. An invocable is a function to be invoked via 
	         * `$injector.invoke()`, and can have an arbitrary number of dependencies. 
	         * An invocable can either return a value directly,
	         * or a `$q` promise. If a promise is returned it will be resolved and the 
	         * resulting value will be used instead. Dependencies of invocables are resolved 
	         * (in this order of precedence)
	         *
	         * - from the specified `locals`
	         * - from another invocable that is part of this `$resolve` call
	         * - from an invocable that is inherited from a `parent` call to `$resolve` 
	         *   (or recursively
	         * - from any ancestor `$resolve` of that parent).
	         *
	         * The return value of `$resolve` is a promise for an object that contains 
	         * (in this order of precedence)
	         *
	         * - any `locals` (if specified)
	         * - the resolved return values of all injectables
	         * - any values inherited from a `parent` call to `$resolve` (if specified)
	         *
	         * The promise will resolve after the `parent` promise (if any) and all promises 
	         * returned by injectables have been resolved. If any invocable 
	         * (or `$injector.invoke`) throws an exception, or if a promise returned by an 
	         * invocable is rejected, the `$resolve` promise is immediately rejected with the 
	         * same error. A rejection of a `parent` promise (if specified) will likewise be 
	         * propagated immediately. Once the `$resolve` promise has been rejected, no 
	         * further invocables will be called.
	         * 
	         * Cyclic dependencies between invocables are not permitted and will cause `$resolve`
	         * to throw an error. As a special case, an injectable can depend on a parameter 
	         * with the same name as the injectable, which will be fulfilled from the `parent` 
	         * injectable of the same name. This allows inherited values to be decorated. 
	         * Note that in this case any other injectable in the same `$resolve` with the same
	         * dependency would see the decorated value, not the inherited value.
	         *
	         * Note that missing dependencies -- unlike cyclic dependencies -- will cause an 
	         * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous) 
	         * exception.
	         *
	         * Invocables are invoked eagerly as soon as all dependencies are available. 
	         * This is true even for dependencies inherited from a `parent` call to `$resolve`.
	         *
	         * As a special case, an invocable can be a string, in which case it is taken to 
	         * be a service name to be passed to `$injector.get()`. This is supported primarily 
	         * for backwards-compatibility with the `resolve` property of `$routeProvider` 
	         * routes.
	         *
	         * @param {object} invocables functions to invoke or 
	         * `$injector` services to fetch.
	         * @param {object} locals  values to make available to the injectables
	         * @param {object} parent  a promise returned by another call to `$resolve`.
	         * @param {object} self  the `this` for the invoked methods
	         * @return {object} Promise for an object that contains the resolved return value
	         * of all invocables, as well as any inherited and local values.
	         */
	        this.resolve = function (invocables, locals, parent, self) {
	            return this.study(invocables)(locals, parent, self);
	        };
	    }

	    angular.module('ui.router.util').service('$resolve', $Resolve);


	    /**
	     * @ngdoc object
	     * @name ui.router.util.$templateFactory
	     *
	     * @requires $http
	     * @requires $templateCache
	     * @requires $injector
	     *
	     * @description
	     * Service. Manages loading of templates.
	     */
	    $TemplateFactory.$inject = ['$http', '$templateCache', '$injector'];
	    function $TemplateFactory($http, $templateCache, $injector) {

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$templateFactory#fromConfig
	         * @methodOf ui.router.util.$templateFactory
	         *
	         * @description
	         * Creates a template from a configuration object. 
	         *
	         * @param {object} config Configuration object for which to load a template. 
	         * The following properties are search in the specified order, and the first one 
	         * that is defined is used to create the template:
	         *
	         * @param {string|object} config.template html string template or function to 
	         * load via {@link ui.router.util.$templateFactory#fromString fromString}.
	         * @param {string|object} config.templateUrl url to load or a function returning 
	         * the url to load via {@link ui.router.util.$templateFactory#fromUrl fromUrl}.
	         * @param {Function} config.templateProvider function to invoke via 
	         * {@link ui.router.util.$templateFactory#fromProvider fromProvider}.
	         * @param {object} params  Parameters to pass to the template function.
	         * @param {object} locals Locals to pass to `invoke` if the template is loaded 
	         * via a `templateProvider`. Defaults to `{ params: params }`.
	         *
	         * @return {string|object}  The template html as a string, or a promise for 
	         * that string,or `null` if no template is configured.
	         */
	        this.fromConfig = function (config, params, locals) {
	            return (
	              isDefined(config.template) ? this.fromString(config.template, params) :
	              isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
	              isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) :
	              null
	            );
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$templateFactory#fromString
	         * @methodOf ui.router.util.$templateFactory
	         *
	         * @description
	         * Creates a template from a string or a function returning a string.
	         *
	         * @param {string|object} template html template as a string or function that 
	         * returns an html template as a string.
	         * @param {object} params Parameters to pass to the template function.
	         *
	         * @return {string|object} The template html as a string, or a promise for that 
	         * string.
	         */
	        this.fromString = function (template, params) {
	            return isFunction(template) ? template(params) : template;
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$templateFactory#fromUrl
	         * @methodOf ui.router.util.$templateFactory
	         * 
	         * @description
	         * Loads a template from the a URL via `$http` and `$templateCache`.
	         *
	         * @param {string|Function} url url of the template to load, or a function 
	         * that returns a url.
	         * @param {Object} params Parameters to pass to the url function.
	         * @return {string|Promise.<string>} The template html as a string, or a promise 
	         * for that string.
	         */
	        this.fromUrl = function (url, params) {
	            if (isFunction(url)) url = url(params);
	            if (url == null) return null;
	            else return $http
	                .get(url, { cache: $templateCache, headers: { Accept: 'text/html' } })
	                .then(function (response) { return response.data; });
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$templateFactory#fromProvider
	         * @methodOf ui.router.util.$templateFactory
	         *
	         * @description
	         * Creates a template by invoking an injectable provider function.
	         *
	         * @param {Function} provider Function to invoke via `$injector.invoke`
	         * @param {Object} params Parameters for the template.
	         * @param {Object} locals Locals to pass to `invoke`. Defaults to 
	         * `{ params: params }`.
	         * @return {string|Promise.<string>} The template html as a string, or a promise 
	         * for that string.
	         */
	        this.fromProvider = function (provider, params, locals) {
	            return $injector.invoke(provider, null, locals || { params: params });
	        };
	    }

	    angular.module('ui.router.util').service('$templateFactory', $TemplateFactory);

	    var $$UMFP; // reference to $UrlMatcherFactoryProvider

	    /**
	     * @ngdoc object
	     * @name ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Matches URLs against patterns and extracts named parameters from the path or the search
	     * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
	     * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
	     * do not influence whether or not a URL is matched, but their values are passed through into
	     * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.
	     *
	     * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
	     * syntax, which optionally allows a regular expression for the parameter to be specified:
	     *
	     * * `':'` name - colon placeholder
	     * * `'*'` name - catch-all placeholder
	     * * `'{' name '}'` - curly placeholder
	     * * `'{' name ':' regexp|type '}'` - curly placeholder with regexp or type name. Should the
	     *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
	     *
	     * Parameter names may contain only word characters (latin letters, digits, and underscore) and
	     * must be unique within the pattern (across both path and search parameters). For colon
	     * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
	     * number of characters other than '/'. For catch-all placeholders the path parameter matches
	     * any number of characters.
	     *
	     * Examples:
	     *
	     * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
	     *   trailing slashes, and patterns have to match the entire path, not just a prefix.
	     * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
	     *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
	     * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
	     * * `'/user/{id:[^/]*}'` - Same as the previous example.
	     * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
	     *   parameter consists of 1 to 8 hex digits.
	     * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
	     *   path into the parameter 'path'.
	     * * `'/files/*path'` - ditto.
	     * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
	     *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start
	     *
	     * @param {string} pattern  The pattern to compile into a matcher.
	     * @param {Object} config  A configuration object hash:
	     * @param {Object=} parentMatcher Used to concatenate the pattern/config onto
	     *   an existing UrlMatcher
	     *
	     * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
	     * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
	     *
	     * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any
	     *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
	     *   non-null) will start with this prefix.
	     *
	     * @property {string} source  The pattern that was passed into the constructor
	     *
	     * @property {string} sourcePath  The path portion of the source property
	     *
	     * @property {string} sourceSearch  The search portion of the source property
	     *
	     * @property {string} regex  The constructed regex that will be used to match against the url when
	     *   it is time to determine which url will match.
	     *
	     * @returns {Object}  New `UrlMatcher` object
	     */
	    function UrlMatcher(pattern, config, parentMatcher) {
	        config = extend({ params: {} }, isObject(config) ? config : {});

	        // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
	        //   '*' name
	        //   ':' name
	        //   '{' name '}'
	        //   '{' name ':' regexp '}'
	        // The regular expression is somewhat complicated due to the need to allow curly braces
	        // inside the regular expression. The placeholder regexp breaks down as follows:
	        //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
	        //    \{([\w\[\]]+)(?:\:\s*( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
	        //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
	        //    [^{}\\]+                       - anything other than curly braces or backslash
	        //    \\.                            - a backslash escape
	        //    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
	        var placeholder = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
	            searchPlaceholder = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
	            compiled = '^', last = 0, m,
	            segments = this.segments = [],
	            parentParams = parentMatcher ? parentMatcher.params : {},
	            params = this.params = parentMatcher ? parentMatcher.params.$$new() : new $$UMFP.ParamSet(),
	            paramNames = [];

	        function addParameter(id, type, config, location) {
	            paramNames.push(id);
	            if (parentParams[id]) return parentParams[id];
	            if (!/^\w+([-.]+\w+)*(?:\[\])?$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
	            if (params[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
	            params[id] = new $$UMFP.Param(id, type, config, location);
	            return params[id];
	        }

	        function quoteRegExp(string, pattern, squash, optional) {
	            var surroundPattern = ['', ''], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
	            if (!pattern) return result;
	            switch (squash) {
	                case false: surroundPattern = ['(', ')' + (optional ? "?" : "")]; break;
	                case true:
	                    result = result.replace(/\/$/, '');
	                    surroundPattern = ['(?:\/(', ')|\/)?'];
	                    break;
	                default: surroundPattern = ['(' + squash + "|", ')?']; break;
	            }
	            return result + surroundPattern[0] + pattern + surroundPattern[1];
	        }

	        this.source = pattern;

	        // Split into static segments separated by path parameter placeholders.
	        // The number of segments is always 1 more than the number of parameters.
	        function matchDetails(m, isSearch) {
	            var id, regexp, segment, type, cfg, arrayMode;
	            id = m[2] || m[3]; // IE[78] returns '' for unmatched groups instead of null
	            cfg = config.params[id];
	            segment = pattern.substring(last, m.index);
	            regexp = isSearch ? m[4] : m[4] || (m[1] == '*' ? '.*' : null);

	            if (regexp) {
	                type = $$UMFP.type(regexp) || inherit($$UMFP.type("string"), { pattern: new RegExp(regexp, config.caseInsensitive ? 'i' : undefined) });
	            }

	            return {
	                id: id, regexp: regexp, segment: segment, type: type, cfg: cfg
	            };
	        }

	        var p, param, segment;
	        while ((m = placeholder.exec(pattern))) {
	            p = matchDetails(m, false);
	            if (p.segment.indexOf('?') >= 0) break; // we're into the search part

	            param = addParameter(p.id, p.type, p.cfg, "path");
	            compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash, param.isOptional);
	            segments.push(p.segment);
	            last = placeholder.lastIndex;
	        }
	        segment = pattern.substring(last);

	        // Find any search parameter names and remove them from the last segment
	        var i = segment.indexOf('?');

	        if (i >= 0) {
	            var search = this.sourceSearch = segment.substring(i);
	            segment = segment.substring(0, i);
	            this.sourcePath = pattern.substring(0, last + i);

	            if (search.length > 0) {
	                last = 0;
	                while ((m = searchPlaceholder.exec(search))) {
	                    p = matchDetails(m, true);
	                    param = addParameter(p.id, p.type, p.cfg, "search");
	                    last = placeholder.lastIndex;
	                    // check if ?&
	                }
	            }
	        } else {
	            this.sourcePath = pattern;
	            this.sourceSearch = '';
	        }

	        compiled += quoteRegExp(segment) + (config.strict === false ? '\/?' : '') + '$';
	        segments.push(segment);

	        this.regexp = new RegExp(compiled, config.caseInsensitive ? 'i' : undefined);
	        this.prefix = segments[0];
	        this.$$paramNames = paramNames;
	    }

	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#concat
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Returns a new matcher for a pattern constructed by appending the path part and adding the
	     * search parameters of the specified pattern to this pattern. The current pattern is not
	     * modified. This can be understood as creating a pattern for URLs that are relative to (or
	     * suffixes of) the current pattern.
	     *
	     * @example
	     * The following two matchers are equivalent:
	     * <pre>
	     * new UrlMatcher('/user/{id}?q').concat('/details?date');
	     * new UrlMatcher('/user/{id}/details?q&date');
	     * </pre>
	     *
	     * @param {string} pattern  The pattern to append.
	     * @param {Object} config  An object hash of the configuration for the matcher.
	     * @returns {UrlMatcher}  A matcher for the concatenated pattern.
	     */
	    UrlMatcher.prototype.concat = function (pattern, config) {
	        // Because order of search parameters is irrelevant, we can add our own search
	        // parameters to the end of the new pattern. Parse the new pattern by itself
	        // and then join the bits together, but it's much easier to do this on a string level.
	        var defaultConfig = {
	            caseInsensitive: $$UMFP.caseInsensitive(),
	            strict: $$UMFP.strictMode(),
	            squash: $$UMFP.defaultSquashPolicy()
	        };
	        return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, extend(defaultConfig, config), this);
	    };

	    UrlMatcher.prototype.toString = function () {
	        return this.source;
	    };

	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#exec
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Tests the specified path against this matcher, and returns an object containing the captured
	     * parameter values, or null if the path does not match. The returned object contains the values
	     * of any search parameters that are mentioned in the pattern, but their value may be null if
	     * they are not present in `searchParams`. This means that search parameters are always treated
	     * as optional.
	     *
	     * @example
	     * <pre>
	     * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
	     *   x: '1', q: 'hello'
	     * });
	     * // returns { id: 'bob', q: 'hello', r: null }
	     * </pre>
	     *
	     * @param {string} path  The URL path to match, e.g. `$location.path()`.
	     * @param {Object} searchParams  URL search parameters, e.g. `$location.search()`.
	     * @returns {Object}  The captured parameter values.
	     */
	    UrlMatcher.prototype.exec = function (path, searchParams) {
	        var m = this.regexp.exec(path);
	        if (!m) return null;
	        searchParams = searchParams || {};

	        var paramNames = this.parameters(), nTotal = paramNames.length,
	          nPath = this.segments.length - 1,
	          values = {}, i, j, cfg, paramName;

	        if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");

	        function decodePathArray(string) {
	            function reverseString(str) { return str.split("").reverse().join(""); }
	            function unquoteDashes(str) { return str.replace(/\\-/g, "-"); }

	            var split = reverseString(string).split(/-(?!\\)/);
	            var allReversed = map(split, reverseString);
	            return map(allReversed, unquoteDashes).reverse();
	        }

	        var param, paramVal;
	        for (i = 0; i < nPath; i++) {
	            paramName = paramNames[i];
	            param = this.params[paramName];
	            paramVal = m[i + 1];
	            // if the param value matches a pre-replace pair, replace the value before decoding.
	            for (j = 0; j < param.replace.length; j++) {
	                if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
	            }
	            if (paramVal && param.array === true) paramVal = decodePathArray(paramVal);
	            if (isDefined(paramVal)) paramVal = param.type.decode(paramVal);
	            values[paramName] = param.value(paramVal);
	        }
	        for (/**/; i < nTotal; i++) {
	            paramName = paramNames[i];
	            values[paramName] = this.params[paramName].value(searchParams[paramName]);
	            param = this.params[paramName];
	            paramVal = searchParams[paramName];
	            for (j = 0; j < param.replace.length; j++) {
	                if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
	            }
	            if (isDefined(paramVal)) paramVal = param.type.decode(paramVal);
	            values[paramName] = param.value(paramVal);
	        }

	        return values;
	    };

	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#parameters
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Returns the names of all path and search parameters of this pattern in an unspecified order.
	     *
	     * @returns {Array.<string>}  An array of parameter names. Must be treated as read-only. If the
	     *    pattern has no parameters, an empty array is returned.
	     */
	    UrlMatcher.prototype.parameters = function (param) {
	        if (!isDefined(param)) return this.$$paramNames;
	        return this.params[param] || null;
	    };

	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#validates
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Checks an object hash of parameters to validate their correctness according to the parameter
	     * types of this `UrlMatcher`.
	     *
	     * @param {Object} params The object hash of parameters to validate.
	     * @returns {boolean} Returns `true` if `params` validates, otherwise `false`.
	     */
	    UrlMatcher.prototype.validates = function (params) {
	        return this.params.$$validates(params);
	    };

	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:UrlMatcher#format
	     * @methodOf ui.router.util.type:UrlMatcher
	     *
	     * @description
	     * Creates a URL that matches this pattern by substituting the specified values
	     * for the path and search parameters. Null values for path parameters are
	     * treated as empty strings.
	     *
	     * @example
	     * <pre>
	     * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
	     * // returns '/user/bob?q=yes'
	     * </pre>
	     *
	     * @param {Object} values  the values to substitute for the parameters in this pattern.
	     * @returns {string}  the formatted URL (path and optionally search part).
	     */
	    UrlMatcher.prototype.format = function (values) {
	        values = values || {};
	        var segments = this.segments, params = this.parameters(), paramset = this.params;
	        if (!this.validates(values)) return null;

	        var i, search = false, nPath = segments.length - 1, nTotal = params.length, result = segments[0];

	        function encodeDashes(str) { // Replace dashes with encoded "\-"
	            return encodeURIComponent(str).replace(/-/g, function (c) { return '%5C%' + c.charCodeAt(0).toString(16).toUpperCase(); });
	        }

	        for (i = 0; i < nTotal; i++) {
	            var isPathParam = i < nPath;
	            var name = params[i], param = paramset[name], value = param.value(values[name]);
	            var isDefaultValue = param.isOptional && param.type.equals(param.value(), value);
	            var squash = isDefaultValue ? param.squash : false;
	            var encoded = param.type.encode(value);

	            if (isPathParam) {
	                var nextSegment = segments[i + 1];
	                var isFinalPathParam = i + 1 === nPath;

	                if (squash === false) {
	                    if (encoded != null) {
	                        if (isArray(encoded)) {
	                            result += map(encoded, encodeDashes).join("-");
	                        } else {
	                            result += encodeURIComponent(encoded);
	                        }
	                    }
	                    result += nextSegment;
	                } else if (squash === true) {
	                    var capture = result.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
	                    result += nextSegment.match(capture)[1];
	                } else if (isString(squash)) {
	                    result += squash + nextSegment;
	                }

	                if (isFinalPathParam && param.squash === true && result.slice(-1) === '/') result = result.slice(0, -1);
	            } else {
	                if (encoded == null || (isDefaultValue && squash !== false)) continue;
	                if (!isArray(encoded)) encoded = [encoded];
	                if (encoded.length === 0) continue;
	                encoded = map(encoded, encodeURIComponent).join('&' + name + '=');
	                result += (search ? '&' : '?') + (name + '=' + encoded);
	                search = true;
	            }
	        }

	        return result;
	    };

	    /**
	     * @ngdoc object
	     * @name ui.router.util.type:Type
	     *
	     * @description
	     * Implements an interface to define custom parameter types that can be decoded from and encoded to
	     * string parameters matched in a URL. Used by {@link ui.router.util.type:UrlMatcher `UrlMatcher`}
	     * objects when matching or formatting URLs, or comparing or validating parameter values.
	     *
	     * See {@link ui.router.util.$urlMatcherFactory#methods_type `$urlMatcherFactory#type()`} for more
	     * information on registering custom types.
	     *
	     * @param {Object} config  A configuration object which contains the custom type definition.  The object's
	     *        properties will override the default methods and/or pattern in `Type`'s public interface.
	     * @example
	     * <pre>
	     * {
	     *   decode: function(val) { return parseInt(val, 10); },
	     *   encode: function(val) { return val && val.toString(); },
	     *   equals: function(a, b) { return this.is(a) && a === b; },
	     *   is: function(val) { return angular.isNumber(val) isFinite(val) && val % 1 === 0; },
	     *   pattern: /\d+/
	     * }
	     * </pre>
	     *
	     * @property {RegExp} pattern The regular expression pattern used to match values of this type when
	     *           coming from a substring of a URL.
	     *
	     * @returns {Object}  Returns a new `Type` object.
	     */
	    function Type(config) {
	        extend(this, config);
	    }

	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:Type#is
	     * @methodOf ui.router.util.type:Type
	     *
	     * @description
	     * Detects whether a value is of a particular type. Accepts a native (decoded) value
	     * and determines whether it matches the current `Type` object.
	     *
	     * @param {*} val  The value to check.
	     * @param {string} key  Optional. If the type check is happening in the context of a specific
	     *        {@link ui.router.util.type:UrlMatcher `UrlMatcher`} object, this is the name of the
	     *        parameter in which `val` is stored. Can be used for meta-programming of `Type` objects.
	     * @returns {Boolean}  Returns `true` if the value matches the type, otherwise `false`.
	     */
	    Type.prototype.is = function (val, key) {
	        return true;
	    };

	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:Type#encode
	     * @methodOf ui.router.util.type:Type
	     *
	     * @description
	     * Encodes a custom/native type value to a string that can be embedded in a URL. Note that the
	     * return value does *not* need to be URL-safe (i.e. passed through `encodeURIComponent()`), it
	     * only needs to be a representation of `val` that has been coerced to a string.
	     *
	     * @param {*} val  The value to encode.
	     * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
	     *        meta-programming of `Type` objects.
	     * @returns {string}  Returns a string representation of `val` that can be encoded in a URL.
	     */
	    Type.prototype.encode = function (val, key) {
	        return val;
	    };

	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:Type#decode
	     * @methodOf ui.router.util.type:Type
	     *
	     * @description
	     * Converts a parameter value (from URL string or transition param) to a custom/native value.
	     *
	     * @param {string} val  The URL parameter value to decode.
	     * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
	     *        meta-programming of `Type` objects.
	     * @returns {*}  Returns a custom representation of the URL parameter value.
	     */
	    Type.prototype.decode = function (val, key) {
	        return val;
	    };

	    /**
	     * @ngdoc function
	     * @name ui.router.util.type:Type#equals
	     * @methodOf ui.router.util.type:Type
	     *
	     * @description
	     * Determines whether two decoded values are equivalent.
	     *
	     * @param {*} a  A value to compare against.
	     * @param {*} b  A value to compare against.
	     * @returns {Boolean}  Returns `true` if the values are equivalent/equal, otherwise `false`.
	     */
	    Type.prototype.equals = function (a, b) {
	        return a == b;
	    };

	    Type.prototype.$subPattern = function () {
	        var sub = this.pattern.toString();
	        return sub.substr(1, sub.length - 2);
	    };

	    Type.prototype.pattern = /.*/;

	    Type.prototype.toString = function () { return "{Type:" + this.name + "}"; };

	    /** Given an encoded string, or a decoded object, returns a decoded object */
	    Type.prototype.$normalize = function (val) {
	        return this.is(val) ? val : this.decode(val);
	    };

	    /*
	     * Wraps an existing custom Type as an array of Type, depending on 'mode'.
	     * e.g.:
	     * - urlmatcher pattern "/path?{queryParam[]:int}"
	     * - url: "/path?queryParam=1&queryParam=2
	     * - $stateParams.queryParam will be [1, 2]
	     * if `mode` is "auto", then
	     * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
	     * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
	     */
	    Type.prototype.$asArray = function (mode, isSearch) {
	        if (!mode) return this;
	        if (mode === "auto" && !isSearch) throw new Error("'auto' array mode is for query parameters only");

	        function ArrayType(type, mode) {
	            function bindTo(type, callbackName) {
	                return function () {
	                    return type[callbackName].apply(type, arguments);
	                };
	            }

	            // Wrap non-array value as array
	            function arrayWrap(val) { return isArray(val) ? val : (isDefined(val) ? [val] : []); }
	            // Unwrap array value for "auto" mode. Return undefined for empty array.
	            function arrayUnwrap(val) {
	                switch (val.length) {
	                    case 0: return undefined;
	                    case 1: return mode === "auto" ? val[0] : val;
	                    default: return val;
	                }
	            }
	            function falsey(val) { return !val; }

	            // Wraps type (.is/.encode/.decode) functions to operate on each value of an array
	            function arrayHandler(callback, allTruthyMode) {
	                return function handleArray(val) {
	                    if (isArray(val) && val.length === 0) return val;
	                    val = arrayWrap(val);
	                    var result = map(val, callback);
	                    if (allTruthyMode === true)
	                        return filter(result, falsey).length === 0;
	                    return arrayUnwrap(result);
	                };
	            }

	            // Wraps type (.equals) functions to operate on each value of an array
	            function arrayEqualsHandler(callback) {
	                return function handleArray(val1, val2) {
	                    var left = arrayWrap(val1), right = arrayWrap(val2);
	                    if (left.length !== right.length) return false;
	                    for (var i = 0; i < left.length; i++) {
	                        if (!callback(left[i], right[i])) return false;
	                    }
	                    return true;
	                };
	            }

	            this.encode = arrayHandler(bindTo(type, 'encode'));
	            this.decode = arrayHandler(bindTo(type, 'decode'));
	            this.is = arrayHandler(bindTo(type, 'is'), true);
	            this.equals = arrayEqualsHandler(bindTo(type, 'equals'));
	            this.pattern = type.pattern;
	            this.$normalize = arrayHandler(bindTo(type, '$normalize'));
	            this.name = type.name;
	            this.$arrayMode = mode;
	        }

	        return new ArrayType(this, mode);
	    };



	    /**
	     * @ngdoc object
	     * @name ui.router.util.$urlMatcherFactory
	     *
	     * @description
	     * Factory for {@link ui.router.util.type:UrlMatcher `UrlMatcher`} instances. The factory
	     * is also available to providers under the name `$urlMatcherFactoryProvider`.
	     */
	    function $UrlMatcherFactory() {
	        $$UMFP = this;

	        var isCaseInsensitive = false, isStrictMode = true, defaultSquashPolicy = false;

	        // Use tildes to pre-encode slashes.
	        // If the slashes are simply URLEncoded, the browser can choose to pre-decode them,
	        // and bidirectional encoding/decoding fails.
	        // Tilde was chosen because it's not a RFC 3986 section 2.2 Reserved Character
	        function valToString(val) { return val != null ? val.toString().replace(/~/g, "~~").replace(/\//g, "~2F") : val; }
	        function valFromString(val) { return val != null ? val.toString().replace(/~2F/g, "/").replace(/~~/g, "~") : val; }

	        var $types = {}, enqueue = true, typeQueue = [], injector, defaultTypes = {
	            "string": {
	                encode: valToString,
	                decode: valFromString,
	                // TODO: in 1.0, make string .is() return false if value is undefined/null by default.
	                // In 0.2.x, string params are optional by default for backwards compat
	                is: function (val) { return val == null || !isDefined(val) || typeof val === "string"; },
	                pattern: /[^/]*/
	            },
	            "int": {
	                encode: valToString,
	                decode: function (val) { return parseInt(val, 10); },
	                is: function (val) { return isDefined(val) && this.decode(val.toString()) === val; },
	                pattern: /\d+/
	            },
	            "bool": {
	                encode: function (val) { return val ? 1 : 0; },
	                decode: function (val) { return parseInt(val, 10) !== 0; },
	                is: function (val) { return val === true || val === false; },
	                pattern: /0|1/
	            },
	            "date": {
	                encode: function (val) {
	                    if (!this.is(val))
	                        return undefined;
	                    return [val.getFullYear(),
	                      ('0' + (val.getMonth() + 1)).slice(-2),
	                      ('0' + val.getDate()).slice(-2)
	                    ].join("-");
	                },
	                decode: function (val) {
	                    if (this.is(val)) return val;
	                    var match = this.capture.exec(val);
	                    return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
	                },
	                is: function (val) { return val instanceof Date && !isNaN(val.valueOf()); },
	                equals: function (a, b) { return this.is(a) && this.is(b) && a.toISOString() === b.toISOString(); },
	                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
	                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
	            },
	            "json": {
	                encode: angular.toJson,
	                decode: angular.fromJson,
	                is: angular.isObject,
	                equals: angular.equals,
	                pattern: /[^/]*/
	            },
	            "any": { // does not encode/decode
	                encode: angular.identity,
	                decode: angular.identity,
	                equals: angular.equals,
	                pattern: /.*/
	            }
	        };

	        function getDefaultConfig() {
	            return {
	                strict: isStrictMode,
	                caseInsensitive: isCaseInsensitive
	            };
	        }

	        function isInjectable(value) {
	            return (isFunction(value) || (isArray(value) && isFunction(value[value.length - 1])));
	        }

	        /**
	         * [Internal] Get the default value of a parameter, which may be an injectable function.
	         */
	        $UrlMatcherFactory.$$getDefaultValue = function (config) {
	            if (!isInjectable(config.value)) return config.value;
	            if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
	            return injector.invoke(config.value);
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$urlMatcherFactory#caseInsensitive
	         * @methodOf ui.router.util.$urlMatcherFactory
	         *
	         * @description
	         * Defines whether URL matching should be case sensitive (the default behavior), or not.
	         *
	         * @param {boolean} value `false` to match URL in a case sensitive manner; otherwise `true`;
	         * @returns {boolean} the current value of caseInsensitive
	         */
	        this.caseInsensitive = function (value) {
	            if (isDefined(value))
	                isCaseInsensitive = value;
	            return isCaseInsensitive;
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$urlMatcherFactory#strictMode
	         * @methodOf ui.router.util.$urlMatcherFactory
	         *
	         * @description
	         * Defines whether URLs should match trailing slashes, or not (the default behavior).
	         *
	         * @param {boolean=} value `false` to match trailing slashes in URLs, otherwise `true`.
	         * @returns {boolean} the current value of strictMode
	         */
	        this.strictMode = function (value) {
	            if (isDefined(value))
	                isStrictMode = value;
	            return isStrictMode;
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$urlMatcherFactory#defaultSquashPolicy
	         * @methodOf ui.router.util.$urlMatcherFactory
	         *
	         * @description
	         * Sets the default behavior when generating or matching URLs with default parameter values.
	         *
	         * @param {string} value A string that defines the default parameter URL squashing behavior.
	         *    `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
	         *    `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
	         *             parameter is surrounded by slashes, squash (remove) one slash from the URL
	         *    any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
	         *             the parameter value from the URL and replace it with this string.
	         */
	        this.defaultSquashPolicy = function (value) {
	            if (!isDefined(value)) return defaultSquashPolicy;
	            if (value !== true && value !== false && !isString(value))
	                throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
	            defaultSquashPolicy = value;
	            return value;
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$urlMatcherFactory#compile
	         * @methodOf ui.router.util.$urlMatcherFactory
	         *
	         * @description
	         * Creates a {@link ui.router.util.type:UrlMatcher `UrlMatcher`} for the specified pattern.
	         *
	         * @param {string} pattern  The URL pattern.
	         * @param {Object} config  The config object hash.
	         * @returns {UrlMatcher}  The UrlMatcher.
	         */
	        this.compile = function (pattern, config) {
	            return new UrlMatcher(pattern, extend(getDefaultConfig(), config));
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$urlMatcherFactory#isMatcher
	         * @methodOf ui.router.util.$urlMatcherFactory
	         *
	         * @description
	         * Returns true if the specified object is a `UrlMatcher`, or false otherwise.
	         *
	         * @param {Object} object  The object to perform the type check against.
	         * @returns {Boolean}  Returns `true` if the object matches the `UrlMatcher` interface, by
	         *          implementing all the same methods.
	         */
	        this.isMatcher = function (o) {
	            if (!isObject(o)) return false;
	            var result = true;

	            forEach(UrlMatcher.prototype, function (val, name) {
	                if (isFunction(val)) {
	                    result = result && (isDefined(o[name]) && isFunction(o[name]));
	                }
	            });
	            return result;
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.util.$urlMatcherFactory#type
	         * @methodOf ui.router.util.$urlMatcherFactory
	         *
	         * @description
	         * Registers a custom {@link ui.router.util.type:Type `Type`} object that can be used to
	         * generate URLs with typed parameters.
	         *
	         * @param {string} name  The type name.
	         * @param {Object|Function} definition   The type definition. See
	         *        {@link ui.router.util.type:Type `Type`} for information on the values accepted.
	         * @param {Object|Function} definitionFn (optional) A function that is injected before the app
	         *        runtime starts.  The result of this function is merged into the existing `definition`.
	         *        See {@link ui.router.util.type:Type `Type`} for information on the values accepted.
	         *
	         * @returns {Object}  Returns `$urlMatcherFactoryProvider`.
	         *
	         * @example
	         * This is a simple example of a custom type that encodes and decodes items from an
	         * array, using the array index as the URL-encoded value:
	         *
	         * <pre>
	         * var list = ['John', 'Paul', 'George', 'Ringo'];
	         *
	         * $urlMatcherFactoryProvider.type('listItem', {
	         *   encode: function(item) {
	         *     // Represent the list item in the URL using its corresponding index
	         *     return list.indexOf(item);
	         *   },
	         *   decode: function(item) {
	         *     // Look up the list item by index
	         *     return list[parseInt(item, 10)];
	         *   },
	         *   is: function(item) {
	         *     // Ensure the item is valid by checking to see that it appears
	         *     // in the list
	         *     return list.indexOf(item) > -1;
	         *   }
	         * });
	         *
	         * $stateProvider.state('list', {
	         *   url: "/list/{item:listItem}",
	         *   controller: function($scope, $stateParams) {
	         *     console.log($stateParams.item);
	         *   }
	         * });
	         *
	         * // ...
	         *
	         * // Changes URL to '/list/3', logs "Ringo" to the console
	         * $state.go('list', { item: "Ringo" });
	         * </pre>
	         *
	         * This is a more complex example of a type that relies on dependency injection to
	         * interact with services, and uses the parameter name from the URL to infer how to
	         * handle encoding and decoding parameter values:
	         *
	         * <pre>
	         * // Defines a custom type that gets a value from a service,
	         * // where each service gets different types of values from
	         * // a backend API:
	         * $urlMatcherFactoryProvider.type('dbObject', {}, function(Users, Posts) {
	         *
	         *   // Matches up services to URL parameter names
	         *   var services = {
	         *     user: Users,
	         *     post: Posts
	         *   };
	         *
	         *   return {
	         *     encode: function(object) {
	         *       // Represent the object in the URL using its unique ID
	         *       return object.id;
	         *     },
	         *     decode: function(value, key) {
	         *       // Look up the object by ID, using the parameter
	         *       // name (key) to call the correct service
	         *       return services[key].findById(value);
	         *     },
	         *     is: function(object, key) {
	         *       // Check that object is a valid dbObject
	         *       return angular.isObject(object) && object.id && services[key];
	         *     }
	         *     equals: function(a, b) {
	         *       // Check the equality of decoded objects by comparing
	         *       // their unique IDs
	         *       return a.id === b.id;
	         *     }
	         *   };
	         * });
	         *
	         * // In a config() block, you can then attach URLs with
	         * // type-annotated parameters:
	         * $stateProvider.state('users', {
	         *   url: "/users",
	         *   // ...
	         * }).state('users.item', {
	         *   url: "/{user:dbObject}",
	         *   controller: function($scope, $stateParams) {
	         *     // $stateParams.user will now be an object returned from
	         *     // the Users service
	         *   },
	         *   // ...
	         * });
	         * </pre>
	         */
	        this.type = function (name, definition, definitionFn) {
	            if (!isDefined(definition)) return $types[name];
	            if ($types.hasOwnProperty(name)) throw new Error("A type named '" + name + "' has already been defined.");

	            $types[name] = new Type(extend({ name: name }, definition));
	            if (definitionFn) {
	                typeQueue.push({ name: name, def: definitionFn });
	                if (!enqueue) flushTypeQueue();
	            }
	            return this;
	        };

	        // `flushTypeQueue()` waits until `$urlMatcherFactory` is injected before invoking the queued `definitionFn`s
	        function flushTypeQueue() {
	            while (typeQueue.length) {
	                var type = typeQueue.shift();
	                if (type.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
	                angular.extend($types[type.name], injector.invoke(type.def));
	            }
	        }

	        // Register default types. Store them in the prototype of $types.
	        forEach(defaultTypes, function (type, name) { $types[name] = new Type(extend({ name: name }, type)); });
	        $types = inherit($types, {});

	        /* No need to document $get, since it returns this */
	        this.$get = ['$injector', function ($injector) {
	            injector = $injector;
	            enqueue = false;
	            flushTypeQueue();

	            forEach(defaultTypes, function (type, name) {
	                if (!$types[name]) $types[name] = new Type(type);
	            });
	            return this;
	        }];

	        this.Param = function Param(id, type, config, location) {
	            var self = this;
	            config = unwrapShorthand(config);
	            type = getType(config, type, location);
	            var arrayMode = getArrayMode();
	            type = arrayMode ? type.$asArray(arrayMode, location === "search") : type;
	            if (type.name === "string" && !arrayMode && location === "path" && config.value === undefined)
	                config.value = ""; // for 0.2.x; in 0.3.0+ do not automatically default to ""
	            var isOptional = config.value !== undefined;
	            var squash = getSquashPolicy(config, isOptional);
	            var replace = getReplace(config, arrayMode, isOptional, squash);

	            function unwrapShorthand(config) {
	                var keys = isObject(config) ? objectKeys(config) : [];
	                var isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 &&
	                                  indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;
	                if (isShorthand) config = { value: config };
	                config.$$fn = isInjectable(config.value) ? config.value : function () { return config.value; };
	                return config;
	            }

	            function getType(config, urlType, location) {
	                if (config.type && urlType) throw new Error("Param '" + id + "' has two type configurations.");
	                if (urlType) return urlType;
	                if (!config.type) return (location === "config" ? $types.any : $types.string);

	                if (angular.isString(config.type))
	                    return $types[config.type];
	                if (config.type instanceof Type)
	                    return config.type;
	                return new Type(config.type);
	            }

	            // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
	            function getArrayMode() {
	                var arrayDefaults = { array: (location === "search" ? "auto" : false) };
	                var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
	                return extend(arrayDefaults, arrayParamNomenclature, config).array;
	            }

	            /**
	             * returns false, true, or the squash value to indicate the "default parameter url squash policy".
	             */
	            function getSquashPolicy(config, isOptional) {
	                var squash = config.squash;
	                if (!isOptional || squash === false) return false;
	                if (!isDefined(squash) || squash == null) return defaultSquashPolicy;
	                if (squash === true || isString(squash)) return squash;
	                throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
	            }

	            function getReplace(config, arrayMode, isOptional, squash) {
	                var replace, configuredKeys, defaultPolicy = [
	                  { from: "", to: (isOptional || arrayMode ? undefined : "") },
	                  { from: null, to: (isOptional || arrayMode ? undefined : "") }
	                ];
	                replace = isArray(config.replace) ? config.replace : [];
	                if (isString(squash))
	                    replace.push({ from: squash, to: undefined });
	                configuredKeys = map(replace, function (item) { return item.from; });
	                return filter(defaultPolicy, function (item) { return indexOf(configuredKeys, item.from) === -1; }).concat(replace);
	            }

	            /**
	             * [Internal] Get the default value of a parameter, which may be an injectable function.
	             */
	            function $$getDefaultValue() {
	                if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
	                var defaultValue = injector.invoke(config.$$fn);
	                if (defaultValue !== null && defaultValue !== undefined && !self.type.is(defaultValue))
	                    throw new Error("Default value (" + defaultValue + ") for parameter '" + self.id + "' is not an instance of Type (" + self.type.name + ")");
	                return defaultValue;
	            }

	            /**
	             * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
	             * default value, which may be the result of an injectable function.
	             */
	            function $value(value) {
	                function hasReplaceVal(val) { return function (obj) { return obj.from === val; }; }
	                function $replace(value) {
	                    var replacement = map(filter(self.replace, hasReplaceVal(value)), function (obj) { return obj.to; });
	                    return replacement.length ? replacement[0] : value;
	                }
	                value = $replace(value);
	                return !isDefined(value) ? $$getDefaultValue() : self.type.$normalize(value);
	            }

	            function toString() { return "{Param:" + id + " " + type + " squash: '" + squash + "' optional: " + isOptional + "}"; }

	            extend(this, {
	                id: id,
	                type: type,
	                location: location,
	                array: arrayMode,
	                squash: squash,
	                replace: replace,
	                isOptional: isOptional,
	                value: $value,
	                dynamic: undefined,
	                config: config,
	                toString: toString
	            });
	        };

	        function ParamSet(params) {
	            extend(this, params || {});
	        }

	        ParamSet.prototype = {
	            $$new: function () {
	                return inherit(this, extend(new ParamSet(), { $$parent: this }));
	            },
	            $$keys: function () {
	                var keys = [], chain = [], parent = this,
	                  ignore = objectKeys(ParamSet.prototype);
	                while (parent) { chain.push(parent); parent = parent.$$parent; }
	                chain.reverse();
	                forEach(chain, function (paramset) {
	                    forEach(objectKeys(paramset), function (key) {
	                        if (indexOf(keys, key) === -1 && indexOf(ignore, key) === -1) keys.push(key);
	                    });
	                });
	                return keys;
	            },
	            $$values: function (paramValues) {
	                var values = {}, self = this;
	                forEach(self.$$keys(), function (key) {
	                    values[key] = self[key].value(paramValues && paramValues[key]);
	                });
	                return values;
	            },
	            $$equals: function (paramValues1, paramValues2) {
	                var equal = true, self = this;
	                forEach(self.$$keys(), function (key) {
	                    var left = paramValues1 && paramValues1[key], right = paramValues2 && paramValues2[key];
	                    if (!self[key].type.equals(left, right)) equal = false;
	                });
	                return equal;
	            },
	            $$validates: function $$validate(paramValues) {
	                var keys = this.$$keys(), i, param, rawVal, normalized, encoded;
	                for (i = 0; i < keys.length; i++) {
	                    param = this[keys[i]];
	                    rawVal = paramValues[keys[i]];
	                    if ((rawVal === undefined || rawVal === null) && param.isOptional)
	                        break; // There was no parameter value, but the param is optional
	                    normalized = param.type.$normalize(rawVal);
	                    if (!param.type.is(normalized))
	                        return false; // The value was not of the correct Type, and could not be decoded to the correct Type
	                    encoded = param.type.encode(normalized);
	                    if (angular.isString(encoded) && !param.type.pattern.exec(encoded))
	                        return false; // The value was of the correct type, but when encoded, did not match the Type's regexp
	                }
	                return true;
	            },
	            $$parent: undefined
	        };

	        this.ParamSet = ParamSet;
	    }

	    // Register as a provider so it's available to other providers
	    angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);
	    angular.module('ui.router.util').run(['$urlMatcherFactory', function ($urlMatcherFactory) { }]);

	    /**
	     * @ngdoc object
	     * @name ui.router.router.$urlRouterProvider
	     *
	     * @requires ui.router.util.$urlMatcherFactoryProvider
	     * @requires $locationProvider
	     *
	     * @description
	     * `$urlRouterProvider` has the responsibility of watching `$location`. 
	     * When `$location` changes it runs through a list of rules one by one until a 
	     * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify 
	     * a url in a state configuration. All urls are compiled into a UrlMatcher object.
	     *
	     * There are several methods on `$urlRouterProvider` that make it useful to use directly
	     * in your module config.
	     */
	    $UrlRouterProvider.$inject = ['$locationProvider', '$urlMatcherFactoryProvider'];
	    function $UrlRouterProvider($locationProvider, $urlMatcherFactory) {
	        var rules = [], otherwise = null, interceptDeferred = false, listener;

	        // Returns a string that is a prefix of all strings matching the RegExp
	        function regExpPrefix(re) {
	            var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
	            return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
	        }

	        // Interpolates matched values into a String.replace()-style pattern
	        function interpolate(pattern, match) {
	            return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {
	                return match[what === '$' ? 0 : Number(what)];
	            });
	        }

	        /**
	         * @ngdoc function
	         * @name ui.router.router.$urlRouterProvider#rule
	         * @methodOf ui.router.router.$urlRouterProvider
	         *
	         * @description
	         * Defines rules that are used by `$urlRouterProvider` to find matches for
	         * specific URLs.
	         *
	         * @example
	         * <pre>
	         * var app = angular.module('app', ['ui.router.router']);
	         *
	         * app.config(function ($urlRouterProvider) {
	         *   // Here's an example of how you might allow case insensitive urls
	         *   $urlRouterProvider.rule(function ($injector, $location) {
	         *     var path = $location.path(),
	         *         normalized = path.toLowerCase();
	         *
	         *     if (path !== normalized) {
	         *       return normalized;
	         *     }
	         *   });
	         * });
	         * </pre>
	         *
	         * @param {function} rule Handler function that takes `$injector` and `$location`
	         * services as arguments. You can use them to return a valid path as a string.
	         *
	         * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
	         */
	        this.rule = function (rule) {
	            if (!isFunction(rule)) throw new Error("'rule' must be a function");
	            rules.push(rule);
	            return this;
	        };

	        /**
	         * @ngdoc object
	         * @name ui.router.router.$urlRouterProvider#otherwise
	         * @methodOf ui.router.router.$urlRouterProvider
	         *
	         * @description
	         * Defines a path that is used when an invalid route is requested.
	         *
	         * @example
	         * <pre>
	         * var app = angular.module('app', ['ui.router.router']);
	         *
	         * app.config(function ($urlRouterProvider) {
	         *   // if the path doesn't match any of the urls you configured
	         *   // otherwise will take care of routing the user to the
	         *   // specified url
	         *   $urlRouterProvider.otherwise('/index');
	         *
	         *   // Example of using function rule as param
	         *   $urlRouterProvider.otherwise(function ($injector, $location) {
	         *     return '/a/valid/url';
	         *   });
	         * });
	         * </pre>
	         *
	         * @param {string|function} rule The url path you want to redirect to or a function 
	         * rule that returns the url path. The function version is passed two params: 
	         * `$injector` and `$location` services, and must return a url string.
	         *
	         * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
	         */
	        this.otherwise = function (rule) {
	            if (isString(rule)) {
	                var redirect = rule;
	                rule = function () { return redirect; };
	            }
	            else if (!isFunction(rule)) throw new Error("'rule' must be a function");
	            otherwise = rule;
	            return this;
	        };


	        function handleIfMatch($injector, handler, match) {
	            if (!match) return false;
	            var result = $injector.invoke(handler, handler, { $match: match });
	            return isDefined(result) ? result : true;
	        }

	        /**
	         * @ngdoc function
	         * @name ui.router.router.$urlRouterProvider#when
	         * @methodOf ui.router.router.$urlRouterProvider
	         *
	         * @description
	         * Registers a handler for a given url matching. 
	         * 
	         * If the handler is a string, it is
	         * treated as a redirect, and is interpolated according to the syntax of match
	         * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
	         *
	         * If the handler is a function, it is injectable. It gets invoked if `$location`
	         * matches. You have the option of inject the match object as `$match`.
	         *
	         * The handler can return
	         *
	         * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
	         *   will continue trying to find another one that matches.
	         * - **string** which is treated as a redirect and passed to `$location.url()`
	         * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
	         *
	         * @example
	         * <pre>
	         * var app = angular.module('app', ['ui.router.router']);
	         *
	         * app.config(function ($urlRouterProvider) {
	         *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
	         *     if ($state.$current.navigable !== state ||
	         *         !equalForKeys($match, $stateParams) {
	         *      $state.transitionTo(state, $match, false);
	         *     }
	         *   });
	         * });
	         * </pre>
	         *
	         * @param {string|object} what The incoming path that you want to redirect.
	         * @param {string|function} handler The path you want to redirect your user to.
	         */
	        this.when = function (what, handler) {
	            var redirect, handlerIsString = isString(handler);
	            if (isString(what)) what = $urlMatcherFactory.compile(what);

	            if (!handlerIsString && !isFunction(handler) && !isArray(handler))
	                throw new Error("invalid 'handler' in when()");

	            var strategies = {
	                matcher: function (what, handler) {
	                    if (handlerIsString) {
	                        redirect = $urlMatcherFactory.compile(handler);
	                        handler = ['$match', function ($match) { return redirect.format($match); }];
	                    }
	                    return extend(function ($injector, $location) {
	                        return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));
	                    }, {
	                        prefix: isString(what.prefix) ? what.prefix : ''
	                    });
	                },
	                regex: function (what, handler) {
	                    if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");

	                    if (handlerIsString) {
	                        redirect = handler;
	                        handler = ['$match', function ($match) { return interpolate(redirect, $match); }];
	                    }
	                    return extend(function ($injector, $location) {
	                        return handleIfMatch($injector, handler, what.exec($location.path()));
	                    }, {
	                        prefix: regExpPrefix(what)
	                    });
	                }
	            };

	            var check = { matcher: $urlMatcherFactory.isMatcher(what), regex: what instanceof RegExp };

	            for (var n in check) {
	                if (check[n]) return this.rule(strategies[n](what, handler));
	            }

	            throw new Error("invalid 'what' in when()");
	        };

	        /**
	         * @ngdoc function
	         * @name ui.router.router.$urlRouterProvider#deferIntercept
	         * @methodOf ui.router.router.$urlRouterProvider
	         *
	         * @description
	         * Disables (or enables) deferring location change interception.
	         *
	         * If you wish to customize the behavior of syncing the URL (for example, if you wish to
	         * defer a transition but maintain the current URL), call this method at configuration time.
	         * Then, at run time, call `$urlRouter.listen()` after you have configured your own
	         * `$locationChangeSuccess` event handler.
	         *
	         * @example
	         * <pre>
	         * var app = angular.module('app', ['ui.router.router']);
	         *
	         * app.config(function ($urlRouterProvider) {
	         *
	         *   // Prevent $urlRouter from automatically intercepting URL changes;
	         *   // this allows you to configure custom behavior in between
	         *   // location changes and route synchronization:
	         *   $urlRouterProvider.deferIntercept();
	         *
	         * }).run(function ($rootScope, $urlRouter, UserService) {
	         *
	         *   $rootScope.$on('$locationChangeSuccess', function(e) {
	         *     // UserService is an example service for managing user state
	         *     if (UserService.isLoggedIn()) return;
	         *
	         *     // Prevent $urlRouter's default handler from firing
	         *     e.preventDefault();
	         *
	         *     UserService.handleLogin().then(function() {
	         *       // Once the user has logged in, sync the current URL
	         *       // to the router:
	         *       $urlRouter.sync();
	         *     });
	         *   });
	         *
	         *   // Configures $urlRouter's listener *after* your custom listener
	         *   $urlRouter.listen();
	         * });
	         * </pre>
	         *
	         * @param {boolean} defer Indicates whether to defer location change interception. Passing
	                  no parameter is equivalent to `true`.
	         */
	        this.deferIntercept = function (defer) {
	            if (defer === undefined) defer = true;
	            interceptDeferred = defer;
	        };

	        /**
	         * @ngdoc object
	         * @name ui.router.router.$urlRouter
	         *
	         * @requires $location
	         * @requires $rootScope
	         * @requires $injector
	         * @requires $browser
	         *
	         * @description
	         *
	         */
	        this.$get = $get;
	        $get.$inject = ['$location', '$rootScope', '$injector', '$browser', '$sniffer'];
	        function $get($location, $rootScope, $injector, $browser, $sniffer) {

	            var baseHref = $browser.baseHref(), location = $location.url(), lastPushedUrl;

	            function appendBasePath(url, isHtml5, absolute) {
	                if (baseHref === '/') return url;
	                if (isHtml5) return baseHref.slice(0, -1) + url;
	                if (absolute) return baseHref.slice(1) + url;
	                return url;
	            }

	            // TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
	            function update(evt) {
	                if (evt && evt.defaultPrevented) return;
	                var ignoreUpdate = lastPushedUrl && $location.url() === lastPushedUrl;
	                lastPushedUrl = undefined;
	                // TODO: Re-implement this in 1.0 for https://github.com/angular-ui/ui-router/issues/1573
	                //if (ignoreUpdate) return true;

	                function check(rule) {
	                    var handled = rule($injector, $location);

	                    if (!handled) return false;
	                    if (isString(handled)) $location.replace().url(handled);
	                    return true;
	                }
	                var n = rules.length, i;

	                for (i = 0; i < n; i++) {
	                    if (check(rules[i])) return;
	                }
	                // always check otherwise last to allow dynamic updates to the set of rules
	                if (otherwise) check(otherwise);
	            }

	            function listen() {
	                listener = listener || $rootScope.$on('$locationChangeSuccess', update);
	                return listener;
	            }

	            if (!interceptDeferred) listen();

	            return {
	                /**
	                 * @ngdoc function
	                 * @name ui.router.router.$urlRouter#sync
	                 * @methodOf ui.router.router.$urlRouter
	                 *
	                 * @description
	                 * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
	                 * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
	                 * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
	                 * with the transition by calling `$urlRouter.sync()`.
	                 *
	                 * @example
	                 * <pre>
	                 * angular.module('app', ['ui.router'])
	                 *   .run(function($rootScope, $urlRouter) {
	                 *     $rootScope.$on('$locationChangeSuccess', function(evt) {
	                 *       // Halt state change from even starting
	                 *       evt.preventDefault();
	                 *       // Perform custom logic
	                 *       var meetsRequirement = ...
	                 *       // Continue with the update and state transition if logic allows
	                 *       if (meetsRequirement) $urlRouter.sync();
	                 *     });
	                 * });
	                 * </pre>
	                 */
	                sync: function () {
	                    update();
	                },

	                listen: function () {
	                    return listen();
	                },

	                update: function (read) {
	                    if (read) {
	                        location = $location.url();
	                        return;
	                    }
	                    if ($location.url() === location) return;

	                    $location.url(location);
	                    $location.replace();
	                },

	                push: function (urlMatcher, params, options) {
	                    var url = urlMatcher.format(params || {});

	                    // Handle the special hash param, if needed
	                    if (url !== null && params && params['#']) {
	                        url += '#' + params['#'];
	                    }

	                    $location.url(url);
	                    lastPushedUrl = options && options.$$avoidResync ? $location.url() : undefined;
	                    if (options && options.replace) $location.replace();
	                },

	                /**
	                 * @ngdoc function
	                 * @name ui.router.router.$urlRouter#href
	                 * @methodOf ui.router.router.$urlRouter
	                 *
	                 * @description
	                 * A URL generation method that returns the compiled URL for a given
	                 * {@link ui.router.util.type:UrlMatcher `UrlMatcher`}, populated with the provided parameters.
	                 *
	                 * @example
	                 * <pre>
	                 * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
	                 *   person: "bob"
	                 * });
	                 * // $bob == "/about/bob";
	                 * </pre>
	                 *
	                 * @param {UrlMatcher} urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate.
	                 * @param {object=} params An object of parameter values to fill the matcher's required parameters.
	                 * @param {object=} options Options object. The options are:
	                 *
	                 * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
	                 *
	                 * @returns {string} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
	                 */
	                href: function (urlMatcher, params, options) {
	                    if (!urlMatcher.validates(params)) return null;

	                    var isHtml5 = $locationProvider.html5Mode();
	                    if (angular.isObject(isHtml5)) {
	                        isHtml5 = isHtml5.enabled;
	                    }

	                    isHtml5 = isHtml5 && $sniffer.history;

	                    var url = urlMatcher.format(params);
	                    options = options || {};

	                    if (!isHtml5 && url !== null) {
	                        url = "#" + $locationProvider.hashPrefix() + url;
	                    }

	                    // Handle special hash param, if needed
	                    if (url !== null && params && params['#']) {
	                        url += '#' + params['#'];
	                    }

	                    url = appendBasePath(url, isHtml5, options.absolute);

	                    if (!options.absolute || !url) {
	                        return url;
	                    }

	                    var slash = (!isHtml5 && url ? '/' : ''), port = $location.port();
	                    port = (port === 80 || port === 443 ? '' : ':' + port);

	                    return [$location.protocol(), '://', $location.host(), port, slash, url].join('');
	                }
	            };
	        }
	    }

	    angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);

	    /**
	     * @ngdoc object
	     * @name ui.router.state.$stateProvider
	     *
	     * @requires ui.router.router.$urlRouterProvider
	     * @requires ui.router.util.$urlMatcherFactoryProvider
	     *
	     * @description
	     * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
	     * on state.
	     *
	     * A state corresponds to a "place" in the application in terms of the overall UI and
	     * navigation. A state describes (via the controller / template / view properties) what
	     * the UI looks like and does at that place.
	     *
	     * States often have things in common, and the primary way of factoring out these
	     * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
	     * nested states.
	     *
	     * The `$stateProvider` provides interfaces to declare these states for your app.
	     */
	    $StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];
	    function $StateProvider($urlRouterProvider, $urlMatcherFactory) {

	        var root, states = {}, $state, queue = {}, abstractKey = 'abstract';

	        // Builds state properties from definition passed to registerState()
	        var stateBuilder = {

	            // Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
	            // state.children = [];
	            // if (parent) parent.children.push(state);
	            parent: function (state) {
	                if (isDefined(state.parent) && state.parent) return findState(state.parent);
	                // regex matches any valid composite state name
	                // would match "contact.list" but not "contacts"
	                var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
	                return compositeName ? findState(compositeName[1]) : root;
	            },

	            // inherit 'data' from parent and override by own values (if any)
	            data: function (state) {
	                if (state.parent && state.parent.data) {
	                    state.data = state.self.data = inherit(state.parent.data, state.data);
	                }
	                return state.data;
	            },

	            // Build a URLMatcher if necessary, either via a relative or absolute URL
	            url: function (state) {
	                var url = state.url, config = { params: state.params || {} };

	                if (isString(url)) {
	                    if (url.charAt(0) == '^') return $urlMatcherFactory.compile(url.substring(1), config);
	                    return (state.parent.navigable || root).url.concat(url, config);
	                }

	                if (!url || $urlMatcherFactory.isMatcher(url)) return url;
	                throw new Error("Invalid url '" + url + "' in state '" + state + "'");
	            },

	            // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
	            navigable: function (state) {
	                return state.url ? state : (state.parent ? state.parent.navigable : null);
	            },

	            // Own parameters for this state. state.url.params is already built at this point. Create and add non-url params
	            ownParams: function (state) {
	                var params = state.url && state.url.params || new $$UMFP.ParamSet();
	                forEach(state.params || {}, function (config, id) {
	                    if (!params[id]) params[id] = new $$UMFP.Param(id, null, config, "config");
	                });
	                return params;
	            },

	            // Derive parameters for this state and ensure they're a super-set of parent's parameters
	            params: function (state) {
	                var ownParams = pick(state.ownParams, state.ownParams.$$keys());
	                return state.parent && state.parent.params ? extend(state.parent.params.$$new(), ownParams) : new $$UMFP.ParamSet();
	            },

	            // If there is no explicit multi-view configuration, make one up so we don't have
	            // to handle both cases in the view directive later. Note that having an explicit
	            // 'views' property will mean the default unnamed view properties are ignored. This
	            // is also a good time to resolve view names to absolute names, so everything is a
	            // straight lookup at link time.
	            views: function (state) {
	                var views = {};

	                forEach(isDefined(state.views) ? state.views : { '': state }, function (view, name) {
	                    if (name.indexOf('@') < 0) name += '@' + state.parent.name;
	                    views[name] = view;
	                });
	                return views;
	            },

	            // Keep a full path from the root down to this state as this is needed for state activation.
	            path: function (state) {
	                return state.parent ? state.parent.path.concat(state) : []; // exclude root from path
	            },

	            // Speed up $state.contains() as it's used a lot
	            includes: function (state) {
	                var includes = state.parent ? extend({}, state.parent.includes) : {};
	                includes[state.name] = true;
	                return includes;
	            },

	            $delegates: {}
	        };

	        function isRelative(stateName) {
	            return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
	        }

	        function findState(stateOrName, base) {
	            if (!stateOrName) return undefined;

	            var isStr = isString(stateOrName),
	                name = isStr ? stateOrName : stateOrName.name,
	                path = isRelative(name);

	            if (path) {
	                if (!base) throw new Error("No reference point given for path '" + name + "'");
	                base = findState(base);

	                var rel = name.split("."), i = 0, pathLength = rel.length, current = base;

	                for (; i < pathLength; i++) {
	                    if (rel[i] === "" && i === 0) {
	                        current = base;
	                        continue;
	                    }
	                    if (rel[i] === "^") {
	                        if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
	                        current = current.parent;
	                        continue;
	                    }
	                    break;
	                }
	                rel = rel.slice(i).join(".");
	                name = current.name + (current.name && rel ? "." : "") + rel;
	            }
	            var state = states[name];

	            if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
	                return state;
	            }
	            return undefined;
	        }

	        function queueState(parentName, state) {
	            if (!queue[parentName]) {
	                queue[parentName] = [];
	            }
	            queue[parentName].push(state);
	        }

	        function flushQueuedChildren(parentName) {
	            var queued = queue[parentName] || [];
	            while (queued.length) {
	                registerState(queued.shift());
	            }
	        }

	        function registerState(state) {
	            // Wrap a new object around the state so we can store our private details easily.
	            state = inherit(state, {
	                self: state,
	                resolve: state.resolve || {},
	                toString: function () { return this.name; }
	            });

	            var name = state.name;
	            if (!isString(name) || name.indexOf('@') >= 0) throw new Error("State must have a valid name");
	            if (states.hasOwnProperty(name)) throw new Error("State '" + name + "' is already defined");

	            // Get parent name
	            var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))
	                : (isString(state.parent)) ? state.parent
	                : (isObject(state.parent) && isString(state.parent.name)) ? state.parent.name
	                : '';

	            // If parent is not registered yet, add state to queue and register later
	            if (parentName && !states[parentName]) {
	                return queueState(parentName, state.self);
	            }

	            for (var key in stateBuilder) {
	                if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
	            }
	            states[name] = state;

	            // Register the state in the global state list and with $urlRouter if necessary.
	            if (!state[abstractKey] && state.url) {
	                $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
	                    if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
	                        $state.transitionTo(state, $match, { inherit: true, location: false });
	                    }
	                }]);
	            }

	            // Register any queued children
	            flushQueuedChildren(name);

	            return state;
	        }

	        // Checks text to see if it looks like a glob.
	        function isGlob(text) {
	            return text.indexOf('*') > -1;
	        }

	        // Returns true if glob matches current $state name.
	        function doesStateMatchGlob(glob) {
	            var globSegments = glob.split('.'),
	                segments = $state.$current.name.split('.');

	            //match single stars
	            for (var i = 0, l = globSegments.length; i < l; i++) {
	                if (globSegments[i] === '*') {
	                    segments[i] = '*';
	                }
	            }

	            //match greedy starts
	            if (globSegments[0] === '**') {
	                segments = segments.slice(indexOf(segments, globSegments[1]));
	                segments.unshift('**');
	            }
	            //match greedy ends
	            if (globSegments[globSegments.length - 1] === '**') {
	                segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
	                segments.push('**');
	            }

	            if (globSegments.length != segments.length) {
	                return false;
	            }

	            return segments.join('') === globSegments.join('');
	        }


	        // Implicit root state that is always active
	        root = registerState({
	            name: '',
	            url: '^',
	            views: null,
	            'abstract': true
	        });
	        root.navigable = null;


	        /**
	         * @ngdoc function
	         * @name ui.router.state.$stateProvider#decorator
	         * @methodOf ui.router.state.$stateProvider
	         *
	         * @description
	         * Allows you to extend (carefully) or override (at your own peril) the 
	         * `stateBuilder` object used internally by `$stateProvider`. This can be used 
	         * to add custom functionality to ui-router, for example inferring templateUrl 
	         * based on the state name.
	         *
	         * When passing only a name, it returns the current (original or decorated) builder
	         * function that matches `name`.
	         *
	         * The builder functions that can be decorated are listed below. Though not all
	         * necessarily have a good use case for decoration, that is up to you to decide.
	         *
	         * In addition, users can attach custom decorators, which will generate new 
	         * properties within the state's internal definition. There is currently no clear 
	         * use-case for this beyond accessing internal states (i.e. $state.$current), 
	         * however, expect this to become increasingly relevant as we introduce additional 
	         * meta-programming features.
	         *
	         * **Warning**: Decorators should not be interdependent because the order of 
	         * execution of the builder functions in non-deterministic. Builder functions 
	         * should only be dependent on the state definition object and super function.
	         *
	         *
	         * Existing builder functions and current return values:
	         *
	         * - **parent** `{object}` - returns the parent state object.
	         * - **data** `{object}` - returns state data, including any inherited data that is not
	         *   overridden by own values (if any).
	         * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}
	         *   or `null`.
	         * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is 
	         *   navigable).
	         * - **params** `{object}` - returns an array of state params that are ensured to 
	         *   be a super-set of parent's params.
	         * - **views** `{object}` - returns a views object where each key is an absolute view 
	         *   name (i.e. "viewName@stateName") and each value is the config object 
	         *   (template, controller) for the view. Even when you don't use the views object 
	         *   explicitly on a state config, one is still created for you internally.
	         *   So by decorating this builder function you have access to decorating template 
	         *   and controller properties.
	         * - **ownParams** `{object}` - returns an array of params that belong to the state, 
	         *   not including any params defined by ancestor states.
	         * - **path** `{string}` - returns the full path from the root down to this state. 
	         *   Needed for state activation.
	         * - **includes** `{object}` - returns an object that includes every state that 
	         *   would pass a `$state.includes()` test.
	         *
	         * @example
	         * <pre>
	         * // Override the internal 'views' builder with a function that takes the state
	         * // definition, and a reference to the internal function being overridden:
	         * $stateProvider.decorator('views', function (state, parent) {
	         *   var result = {},
	         *       views = parent(state);
	         *
	         *   angular.forEach(views, function (config, name) {
	         *     var autoName = (state.name + '.' + name).replace('.', '/');
	         *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
	         *     result[name] = config;
	         *   });
	         *   return result;
	         * });
	         *
	         * $stateProvider.state('home', {
	         *   views: {
	         *     'contact.list': { controller: 'ListController' },
	         *     'contact.item': { controller: 'ItemController' }
	         *   }
	         * });
	         *
	         * // ...
	         *
	         * $state.go('home');
	         * // Auto-populates list and item views with /partials/home/contact/list.html,
	         * // and /partials/home/contact/item.html, respectively.
	         * </pre>
	         *
	         * @param {string} name The name of the builder function to decorate. 
	         * @param {object} func A function that is responsible for decorating the original 
	         * builder function. The function receives two parameters:
	         *
	         *   - `{object}` - state - The state config object.
	         *   - `{object}` - super - The original builder function.
	         *
	         * @return {object} $stateProvider - $stateProvider instance
	         */
	        this.decorator = decorator;
	        function decorator(name, func) {
	            /*jshint validthis: true */
	            if (isString(name) && !isDefined(func)) {
	                return stateBuilder[name];
	            }
	            if (!isFunction(func) || !isString(name)) {
	                return this;
	            }
	            if (stateBuilder[name] && !stateBuilder.$delegates[name]) {
	                stateBuilder.$delegates[name] = stateBuilder[name];
	            }
	            stateBuilder[name] = func;
	            return this;
	        }

	        /**
	         * @ngdoc function
	         * @name ui.router.state.$stateProvider#state
	         * @methodOf ui.router.state.$stateProvider
	         *
	         * @description
	         * Registers a state configuration under a given state name. The stateConfig object
	         * has the following acceptable properties.
	         *
	         * @param {string} name A unique state name, e.g. "home", "about", "contacts".
	         * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
	         * @param {object} stateConfig State configuration object.
	         * @param {string|function=} stateConfig.template
	         * <a id='template'></a>
	         *   html template as a string or a function that returns
	         *   an html template as a string which should be used by the uiView directives. This property 
	         *   takes precedence over templateUrl.
	         *   
	         *   If `template` is a function, it will be called with the following parameters:
	         *
	         *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
	         *     applying the current state
	         *
	         * <pre>template:
	         *   "<h1>inline template definition</h1>" +
	         *   "<div ui-view></div>"</pre>
	         * <pre>template: function(params) {
	         *       return "<h1>generated template</h1>"; }</pre>
	         * </div>
	         *
	         * @param {string|function=} stateConfig.templateUrl
	         * <a id='templateUrl'></a>
	         *
	         *   path or function that returns a path to an html
	         *   template that should be used by uiView.
	         *   
	         *   If `templateUrl` is a function, it will be called with the following parameters:
	         *
	         *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by 
	         *     applying the current state
	         *
	         * <pre>templateUrl: "home.html"</pre>
	         * <pre>templateUrl: function(params) {
	         *     return myTemplates[params.pageId]; }</pre>
	         *
	         * @param {function=} stateConfig.templateProvider
	         * <a id='templateProvider'></a>
	         *    Provider function that returns HTML content string.
	         * <pre> templateProvider:
	         *       function(MyTemplateService, params) {
	         *         return MyTemplateService.getTemplate(params.pageId);
	         *       }</pre>
	         *
	         * @param {string|function=} stateConfig.controller
	         * <a id='controller'></a>
	         *
	         *  Controller fn that should be associated with newly
	         *   related scope or the name of a registered controller if passed as a string.
	         *   Optionally, the ControllerAs may be declared here.
	         * <pre>controller: "MyRegisteredController"</pre>
	         * <pre>controller:
	         *     "MyRegisteredController as fooCtrl"}</pre>
	         * <pre>controller: function($scope, MyService) {
	         *     $scope.data = MyService.getData(); }</pre>
	         *
	         * @param {function=} stateConfig.controllerProvider
	         * <a id='controllerProvider'></a>
	         *
	         * Injectable provider function that returns the actual controller or string.
	         * <pre>controllerProvider:
	         *   function(MyResolveData) {
	         *     if (MyResolveData.foo)
	         *       return "FooCtrl"
	         *     else if (MyResolveData.bar)
	         *       return "BarCtrl";
	         *     else return function($scope) {
	         *       $scope.baz = "Qux";
	         *     }
	         *   }</pre>
	         *
	         * @param {string=} stateConfig.controllerAs
	         * <a id='controllerAs'></a>
	         * 
	         * A controller alias name. If present the controller will be
	         *   published to scope under the controllerAs name.
	         * <pre>controllerAs: "myCtrl"</pre>
	         *
	         * @param {string|object=} stateConfig.parent
	         * <a id='parent'></a>
	         * Optionally specifies the parent state of this state.
	         *
	         * <pre>parent: 'parentState'</pre>
	         * <pre>parent: parentState // JS variable</pre>
	         *
	         * @param {object=} stateConfig.resolve
	         * <a id='resolve'></a>
	         *
	         * An optional map&lt;string, function&gt; of dependencies which
	         *   should be injected into the controller. If any of these dependencies are promises, 
	         *   the router will wait for them all to be resolved before the controller is instantiated.
	         *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired
	         *   and the values of the resolved promises are injected into any controllers that reference them.
	         *   If any  of the promises are rejected the $stateChangeError event is fired.
	         *
	         *   The map object is:
	         *   
	         *   - key - {string}: name of dependency to be injected into controller
	         *   - factory - {string|function}: If string then it is alias for service. Otherwise if function, 
	         *     it is injected and return value it treated as dependency. If result is a promise, it is 
	         *     resolved before its value is injected into controller.
	         *
	         * <pre>resolve: {
	         *     myResolve1:
	         *       function($http, $stateParams) {
	         *         return $http.get("/api/foos/"+stateParams.fooID);
	         *       }
	         *     }</pre>
	         *
	         * @param {string=} stateConfig.url
	         * <a id='url'></a>
	         *
	         *   A url fragment with optional parameters. When a state is navigated or
	         *   transitioned to, the `$stateParams` service will be populated with any 
	         *   parameters that were passed.
	         *
	         *   (See {@link ui.router.util.type:UrlMatcher UrlMatcher} `UrlMatcher`} for
	         *   more details on acceptable patterns )
	         *
	         * examples:
	         * <pre>url: "/home"
	         * url: "/users/:userid"
	         * url: "/books/{bookid:[a-zA-Z_-]}"
	         * url: "/books/{categoryid:int}"
	         * url: "/books/{publishername:string}/{categoryid:int}"
	         * url: "/messages?before&after"
	         * url: "/messages?{before:date}&{after:date}"
	         * url: "/messages/:mailboxid?{before:date}&{after:date}"
	         * </pre>
	         *
	         * @param {object=} stateConfig.views
	         * <a id='views'></a>
	         * an optional map&lt;string, object&gt; which defined multiple views, or targets views
	         * manually/explicitly.
	         *
	         * Examples:
	         *
	         * Targets three named `ui-view`s in the parent state's template
	         * <pre>views: {
	         *     header: {
	         *       controller: "headerCtrl",
	         *       templateUrl: "header.html"
	         *     }, body: {
	         *       controller: "bodyCtrl",
	         *       templateUrl: "body.html"
	         *     }, footer: {
	         *       controller: "footCtrl",
	         *       templateUrl: "footer.html"
	         *     }
	         *   }</pre>
	         *
	         * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
	         * <pre>views: {
	         *     'header@top': {
	         *       controller: "msgHeaderCtrl",
	         *       templateUrl: "msgHeader.html"
	         *     }, 'body': {
	         *       controller: "messagesCtrl",
	         *       templateUrl: "messages.html"
	         *     }
	         *   }</pre>
	         *
	         * @param {boolean=} [stateConfig.abstract=false]
	         * <a id='abstract'></a>
	         * An abstract state will never be directly activated,
	         *   but can provide inherited properties to its common children states.
	         * <pre>abstract: true</pre>
	         *
	         * @param {function=} stateConfig.onEnter
	         * <a id='onEnter'></a>
	         *
	         * Callback function for when a state is entered. Good way
	         *   to trigger an action or dispatch an event, such as opening a dialog.
	         * If minifying your scripts, make sure to explicitly annotate this function,
	         * because it won't be automatically annotated by your build tools.
	         *
	         * <pre>onEnter: function(MyService, $stateParams) {
	         *     MyService.foo($stateParams.myParam);
	         * }</pre>
	         *
	         * @param {function=} stateConfig.onExit
	         * <a id='onExit'></a>
	         *
	         * Callback function for when a state is exited. Good way to
	         *   trigger an action or dispatch an event, such as opening a dialog.
	         * If minifying your scripts, make sure to explicitly annotate this function,
	         * because it won't be automatically annotated by your build tools.
	         *
	         * <pre>onExit: function(MyService, $stateParams) {
	         *     MyService.cleanup($stateParams.myParam);
	         * }</pre>
	         *
	         * @param {boolean=} [stateConfig.reloadOnSearch=true]
	         * <a id='reloadOnSearch'></a>
	         *
	         * If `false`, will not retrigger the same state
	         *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
	         *   Useful for when you'd like to modify $location.search() without triggering a reload.
	         * <pre>reloadOnSearch: false</pre>
	         *
	         * @param {object=} stateConfig.data
	         * <a id='data'></a>
	         *
	         * Arbitrary data object, useful for custom configuration.  The parent state's `data` is
	         *   prototypally inherited.  In other words, adding a data property to a state adds it to
	         *   the entire subtree via prototypal inheritance.
	         *
	         * <pre>data: {
	         *     requiredRole: 'foo'
	         * } </pre>
	         *
	         * @param {object=} stateConfig.params
	         * <a id='params'></a>
	         *
	         * A map which optionally configures parameters declared in the `url`, or
	         *   defines additional non-url parameters.  For each parameter being
	         *   configured, add a configuration object keyed to the name of the parameter.
	         *
	         *   Each parameter configuration object may contain the following properties:
	         *
	         *   - ** value ** - {object|function=}: specifies the default value for this
	         *     parameter.  This implicitly sets this parameter as optional.
	         *
	         *     When UI-Router routes to a state and no value is
	         *     specified for this parameter in the URL or transition, the
	         *     default value will be used instead.  If `value` is a function,
	         *     it will be injected and invoked, and the return value used.
	         *
	         *     *Note*: `undefined` is treated as "no default value" while `null`
	         *     is treated as "the default value is `null`".
	         *
	         *     *Shorthand*: If you only need to configure the default value of the
	         *     parameter, you may use a shorthand syntax.   In the **`params`**
	         *     map, instead mapping the param name to a full parameter configuration
	         *     object, simply set map it to the default parameter value, e.g.:
	         *
	         * <pre>// define a parameter's default value
	         * params: {
	         *     param1: { value: "defaultValue" }
	         * }
	         * // shorthand default values
	         * params: {
	         *     param1: "defaultValue",
	         *     param2: "param2Default"
	         * }</pre>
	         *
	         *   - ** array ** - {boolean=}: *(default: false)* If true, the param value will be
	         *     treated as an array of values.  If you specified a Type, the value will be
	         *     treated as an array of the specified Type.  Note: query parameter values
	         *     default to a special `"auto"` mode.
	         *
	         *     For query parameters in `"auto"` mode, if multiple  values for a single parameter
	         *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values
	         *     are mapped to an array (e.g.: `{ foo: [ '1', '2', '3' ] }`).  However, if
	         *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single
	         *     value (e.g.: `{ foo: '1' }`).
	         *
	         * <pre>params: {
	         *     param1: { array: true }
	         * }</pre>
	         *
	         *   - ** squash ** - {bool|string=}: `squash` configures how a default parameter value is represented in the URL when
	         *     the current parameter value is the same as the default value. If `squash` is not set, it uses the
	         *     configured default squash policy.
	         *     (See {@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`})
	         *
	         *   There are three squash settings:
	         *
	         *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL
	         *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed
	         *       by slashes in the state's `url` declaration, then one of those slashes are omitted.
	         *       This can allow for cleaner looking URLs.
	         *     - `"<arbitrary string>"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
	         *
	         * <pre>params: {
	         *     param1: {
	         *       value: "defaultId",
	         *       squash: true
	         * } }
	         * // squash "defaultValue" to "~"
	         * params: {
	         *     param1: {
	         *       value: "defaultValue",
	         *       squash: "~"
	         * } }
	         * </pre>
	         *
	         *
	         * @example
	         * <pre>
	         * // Some state name examples
	         *
	         * // stateName can be a single top-level name (must be unique).
	         * $stateProvider.state("home", {});
	         *
	         * // Or it can be a nested state name. This state is a child of the
	         * // above "home" state.
	         * $stateProvider.state("home.newest", {});
	         *
	         * // Nest states as deeply as needed.
	         * $stateProvider.state("home.newest.abc.xyz.inception", {});
	         *
	         * // state() returns $stateProvider, so you can chain state declarations.
	         * $stateProvider
	         *   .state("home", {})
	         *   .state("about", {})
	         *   .state("contacts", {});
	         * </pre>
	         *
	         */
	        this.state = state;
	        function state(name, definition) {
	            /*jshint validthis: true */
	            if (isObject(name)) definition = name;
	            else definition.name = name;
	            registerState(definition);
	            return this;
	        }

	        /**
	         * @ngdoc object
	         * @name ui.router.state.$state
	         *
	         * @requires $rootScope
	         * @requires $q
	         * @requires ui.router.state.$view
	         * @requires $injector
	         * @requires ui.router.util.$resolve
	         * @requires ui.router.state.$stateParams
	         * @requires ui.router.router.$urlRouter
	         *
	         * @property {object} params A param object, e.g. {sectionId: section.id)}, that 
	         * you'd like to test against the current active state.
	         * @property {object} current A reference to the state's config object. However 
	         * you passed it in. Useful for accessing custom data.
	         * @property {object} transition Currently pending transition. A promise that'll 
	         * resolve or reject.
	         *
	         * @description
	         * `$state` service is responsible for representing states as well as transitioning
	         * between them. It also provides interfaces to ask for current state or even states
	         * you're coming from.
	         */
	        this.$get = $get;
	        $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$urlRouter', '$location', '$urlMatcherFactory'];
	        function $get($rootScope, $q, $view, $injector, $resolve, $stateParams, $urlRouter, $location, $urlMatcherFactory) {

	            var TransitionSuperseded = $q.reject(new Error('transition superseded'));
	            var TransitionPrevented = $q.reject(new Error('transition prevented'));
	            var TransitionAborted = $q.reject(new Error('transition aborted'));
	            var TransitionFailed = $q.reject(new Error('transition failed'));

	            // Handles the case where a state which is the target of a transition is not found, and the user
	            // can optionally retry or defer the transition
	            function handleRedirect(redirect, state, params, options) {
	                /**
	                 * @ngdoc event
	                 * @name ui.router.state.$state#$stateNotFound
	                 * @eventOf ui.router.state.$state
	                 * @eventType broadcast on root scope
	                 * @description
	                 * Fired when a requested state **cannot be found** using the provided state name during transition.
	                 * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
	                 * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
	                 * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
	                 * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
	                 *
	                 * @param {Object} event Event object.
	                 * @param {Object} unfoundState Unfound State information. Contains: `to, toParams, options` properties.
	                 * @param {State} fromState Current state object.
	                 * @param {Object} fromParams Current state params.
	                 *
	                 * @example
	                 *
	                 * <pre>
	                 * // somewhere, assume lazy.state has not been defined
	                 * $state.go("lazy.state", {a:1, b:2}, {inherit:false});
	                 *
	                 * // somewhere else
	                 * $scope.$on('$stateNotFound',
	                 * function(event, unfoundState, fromState, fromParams){
	                 *     console.log(unfoundState.to); // "lazy.state"
	                 *     console.log(unfoundState.toParams); // {a:1, b:2}
	                 *     console.log(unfoundState.options); // {inherit:false} + default options
	                 * })
	                 * </pre>
	                 */
	                var evt = $rootScope.$broadcast('$stateNotFound', redirect, state, params);

	                if (evt.defaultPrevented) {
	                    $urlRouter.update();
	                    return TransitionAborted;
	                }

	                if (!evt.retry) {
	                    return null;
	                }

	                // Allow the handler to return a promise to defer state lookup retry
	                if (options.$retry) {
	                    $urlRouter.update();
	                    return TransitionFailed;
	                }
	                var retryTransition = $state.transition = $q.when(evt.retry);

	                retryTransition.then(function () {
	                    if (retryTransition !== $state.transition) return TransitionSuperseded;
	                    redirect.options.$retry = true;
	                    return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
	                }, function () {
	                    return TransitionAborted;
	                });
	                $urlRouter.update();

	                return retryTransition;
	            }

	            root.locals = { resolve: null, globals: { $stateParams: {} } };

	            $state = {
	                params: {},
	                current: root.self,
	                $current: root,
	                transition: null
	            };

	            /**
	             * @ngdoc function
	             * @name ui.router.state.$state#reload
	             * @methodOf ui.router.state.$state
	             *
	             * @description
	             * A method that force reloads the current state. All resolves are re-resolved,
	             * controllers reinstantiated, and events re-fired.
	             *
	             * @example
	             * <pre>
	             * var app angular.module('app', ['ui.router']);
	             *
	             * app.controller('ctrl', function ($scope, $state) {
	             *   $scope.reload = function(){
	             *     $state.reload();
	             *   }
	             * });
	             * </pre>
	             *
	             * `reload()` is just an alias for:
	             * <pre>
	             * $state.transitionTo($state.current, $stateParams, { 
	             *   reload: true, inherit: false, notify: true
	             * });
	             * </pre>
	             *
	             * @param {string=|object=} state - A state name or a state object, which is the root of the resolves to be re-resolved.
	             * @example
	             * <pre>
	             * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item' 
	             * //and current state is 'contacts.detail.item'
	             * var app angular.module('app', ['ui.router']);
	             *
	             * app.controller('ctrl', function ($scope, $state) {
	             *   $scope.reload = function(){
	             *     //will reload 'contact.detail' and 'contact.detail.item' states
	             *     $state.reload('contact.detail');
	             *   }
	             * });
	             * </pre>
	             *
	             * `reload()` is just an alias for:
	             * <pre>
	             * $state.transitionTo($state.current, $stateParams, { 
	             *   reload: true, inherit: false, notify: true
	             * });
	             * </pre>
	        
	             * @returns {promise} A promise representing the state of the new transition. See
	             * {@link ui.router.state.$state#methods_go $state.go}.
	             */
	            $state.reload = function reload(state) {
	                return $state.transitionTo($state.current, $stateParams, { reload: state || true, inherit: false, notify: true });
	            };

	            /**
	             * @ngdoc function
	             * @name ui.router.state.$state#go
	             * @methodOf ui.router.state.$state
	             *
	             * @description
	             * Convenience method for transitioning to a new state. `$state.go` calls 
	             * `$state.transitionTo` internally but automatically sets options to 
	             * `{ location: true, inherit: true, relative: $state.$current, notify: true }`. 
	             * This allows you to easily use an absolute or relative to path and specify 
	             * only the parameters you'd like to update (while letting unspecified parameters 
	             * inherit from the currently active ancestor states).
	             *
	             * @example
	             * <pre>
	             * var app = angular.module('app', ['ui.router']);
	             *
	             * app.controller('ctrl', function ($scope, $state) {
	             *   $scope.changeState = function () {
	             *     $state.go('contact.detail');
	             *   };
	             * });
	             * </pre>
	             * <img src='../ngdoc_assets/StateGoExamples.png'/>
	             *
	             * @param {string} to Absolute state name or relative state path. Some examples:
	             *
	             * - `$state.go('contact.detail')` - will go to the `contact.detail` state
	             * - `$state.go('^')` - will go to a parent state
	             * - `$state.go('^.sibling')` - will go to a sibling state
	             * - `$state.go('.child.grandchild')` - will go to grandchild state
	             *
	             * @param {object=} params A map of the parameters that will be sent to the state, 
	             * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
	             * defined parameters. Only parameters specified in the state definition can be overridden, new 
	             * parameters will be ignored. This allows, for example, going to a sibling state that shares parameters
	             * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
	             * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
	             * will get you all current parameters, etc.
	             * @param {object=} options Options object. The options are:
	             *
	             * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
	             *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
	             * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
	             * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
	             *    defines which state to be relative from.
	             * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
	             * - **`reload`** (v0.2.5) - {boolean=false|string|object}, If `true` will force transition even if no state or params
	             *    have changed.  It will reload the resolves and views of the current state and parent states.
	             *    If `reload` is a string (or state object), the state object is fetched (by name, or object reference); and \
	             *    the transition reloads the resolves and views for that matched state, and all its children states.
	             *
	             * @returns {promise} A promise representing the state of the new transition.
	             *
	             * Possible success values:
	             *
	             * - $state.current
	             *
	             * <br/>Possible rejection values:
	             *
	             * - 'transition superseded' - when a newer transition has been started after this one
	             * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
	             * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
	             *   when a `$stateNotFound` `event.retry` promise errors.
	             * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
	             * - *resolve error* - when an error has occurred with a `resolve`
	             *
	             */
	            $state.go = function go(to, params, options) {
	                return $state.transitionTo(to, params, extend({ inherit: true, relative: $state.$current }, options));
	            };

	            /**
	             * @ngdoc function
	             * @name ui.router.state.$state#transitionTo
	             * @methodOf ui.router.state.$state
	             *
	             * @description
	             * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
	             * uses `transitionTo` internally. `$state.go` is recommended in most situations.
	             *
	             * @example
	             * <pre>
	             * var app = angular.module('app', ['ui.router']);
	             *
	             * app.controller('ctrl', function ($scope, $state) {
	             *   $scope.changeState = function () {
	             *     $state.transitionTo('contact.detail');
	             *   };
	             * });
	             * </pre>
	             *
	             * @param {string} to State name.
	             * @param {object=} toParams A map of the parameters that will be sent to the state,
	             * will populate $stateParams.
	             * @param {object=} options Options object. The options are:
	             *
	             * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
	             *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
	             * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
	             * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'), 
	             *    defines which state to be relative from.
	             * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
	             * - **`reload`** (v0.2.5) - {boolean=false|string=|object=}, If `true` will force transition even if the state or params 
	             *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
	             *    use this when you want to force a reload when *everything* is the same, including search params.
	             *    if String, then will reload the state with the name given in reload, and any children.
	             *    if Object, then a stateObj is expected, will reload the state found in stateObj, and any children.
	             *
	             * @returns {promise} A promise representing the state of the new transition. See
	             * {@link ui.router.state.$state#methods_go $state.go}.
	             */
	            $state.transitionTo = function transitionTo(to, toParams, options) {
	                toParams = toParams || {};
	                options = extend({
	                    location: true, inherit: false, relative: null, notify: true, reload: false, $retry: false
	                }, options || {});

	                var from = $state.$current, fromParams = $state.params, fromPath = from.path;
	                var evt, toState = findState(to, options.relative);

	                // Store the hash param for later (since it will be stripped out by various methods)
	                var hash = toParams['#'];

	                if (!isDefined(toState)) {
	                    var redirect = { to: to, toParams: toParams, options: options };
	                    var redirectResult = handleRedirect(redirect, from.self, fromParams, options);

	                    if (redirectResult) {
	                        return redirectResult;
	                    }

	                    // Always retry once if the $stateNotFound was not prevented
	                    // (handles either redirect changed or state lazy-definition)
	                    to = redirect.to;
	                    toParams = redirect.toParams;
	                    options = redirect.options;
	                    toState = findState(to, options.relative);

	                    if (!isDefined(toState)) {
	                        if (!options.relative) throw new Error("No such state '" + to + "'");
	                        throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
	                    }
	                }
	                if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
	                if (options.inherit) toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState);
	                if (!toState.params.$$validates(toParams)) return TransitionFailed;

	                toParams = toState.params.$$values(toParams);
	                to = toState;

	                var toPath = to.path;

	                // Starting from the root of the path, keep all levels that haven't changed
	                var keep = 0, state = toPath[keep], locals = root.locals, toLocals = [];

	                if (!options.reload) {
	                    while (state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams)) {
	                        locals = toLocals[keep] = state.locals;
	                        keep++;
	                        state = toPath[keep];
	                    }
	                } else if (isString(options.reload) || isObject(options.reload)) {
	                    if (isObject(options.reload) && !options.reload.name) {
	                        throw new Error('Invalid reload state object');
	                    }

	                    var reloadState = options.reload === true ? fromPath[0] : findState(options.reload);
	                    if (options.reload && !reloadState) {
	                        throw new Error("No such reload state '" + (isString(options.reload) ? options.reload : options.reload.name) + "'");
	                    }

	                    while (state && state === fromPath[keep] && state !== reloadState) {
	                        locals = toLocals[keep] = state.locals;
	                        keep++;
	                        state = toPath[keep];
	                    }
	                }

	                // If we're going to the same state and all locals are kept, we've got nothing to do.
	                // But clear 'transition', as we still want to cancel any other pending transitions.
	                // TODO: We may not want to bump 'transition' if we're called from a location change
	                // that we've initiated ourselves, because we might accidentally abort a legitimate
	                // transition initiated from code?
	                if (shouldSkipReload(to, toParams, from, fromParams, locals, options)) {
	                    if (hash) toParams['#'] = hash;
	                    $state.params = toParams;
	                    copy($state.params, $stateParams);
	                    copy(filterByKeys(to.params.$$keys(), $stateParams), to.locals.globals.$stateParams);
	                    if (options.location && to.navigable && to.navigable.url) {
	                        $urlRouter.push(to.navigable.url, toParams, {
	                            $$avoidResync: true, replace: options.location === 'replace'
	                        });
	                        $urlRouter.update(true);
	                    }
	                    $state.transition = null;
	                    return $q.when($state.current);
	                }

	                // Filter parameters before we pass them to event handlers etc.
	                toParams = filterByKeys(to.params.$$keys(), toParams || {});

	                // Re-add the saved hash before we start returning things or broadcasting $stateChangeStart
	                if (hash) toParams['#'] = hash;

	                // Broadcast start event and cancel the transition if requested
	                if (options.notify) {
	                    /**
	                     * @ngdoc event
	                     * @name ui.router.state.$state#$stateChangeStart
	                     * @eventOf ui.router.state.$state
	                     * @eventType broadcast on root scope
	                     * @description
	                     * Fired when the state transition **begins**. You can use `event.preventDefault()`
	                     * to prevent the transition from happening and then the transition promise will be
	                     * rejected with a `'transition prevented'` value.
	                     *
	                     * @param {Object} event Event object.
	                     * @param {State} toState The state being transitioned to.
	                     * @param {Object} toParams The params supplied to the `toState`.
	                     * @param {State} fromState The current state, pre-transition.
	                     * @param {Object} fromParams The params supplied to the `fromState`.
	                     *
	                     * @example
	                     *
	                     * <pre>
	                     * $rootScope.$on('$stateChangeStart',
	                     * function(event, toState, toParams, fromState, fromParams){
	                     *     event.preventDefault();
	                     *     // transitionTo() promise will be rejected with
	                     *     // a 'transition prevented' error
	                     * })
	                     * </pre>
	                     */
	                    if ($rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams, options).defaultPrevented) {
	                        $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
	                        //Don't update and resync url if there's been a new transition started. see issue #2238, #600
	                        if ($state.transition == null) $urlRouter.update();
	                        return TransitionPrevented;
	                    }
	                }

	                // Resolve locals for the remaining states, but don't update any global state just
	                // yet -- if anything fails to resolve the current state needs to remain untouched.
	                // We also set up an inheritance chain for the locals here. This allows the view directive
	                // to quickly look up the correct definition for each view in the current state. Even
	                // though we create the locals object itself outside resolveState(), it is initially
	                // empty and gets filled asynchronously. We need to keep track of the promise for the
	                // (fully resolved) current locals, and pass this down the chain.
	                var resolved = $q.when(locals);

	                for (var l = keep; l < toPath.length; l++, state = toPath[l]) {
	                    locals = toLocals[l] = inherit(locals);
	                    resolved = resolveState(state, toParams, state === to, resolved, locals, options);
	                }

	                // Once everything is resolved, we are ready to perform the actual transition
	                // and return a promise for the new state. We also keep track of what the
	                // current promise is, so that we can detect overlapping transitions and
	                // keep only the outcome of the last transition.
	                var transition = $state.transition = resolved.then(function () {
	                    var l, entering, exiting;

	                    if ($state.transition !== transition) return TransitionSuperseded;

	                    // Exit 'from' states not kept
	                    for (l = fromPath.length - 1; l >= keep; l--) {
	                        exiting = fromPath[l];
	                        if (exiting.self.onExit) {
	                            $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
	                        }
	                        exiting.locals = null;
	                    }

	                    // Enter 'to' states not kept
	                    for (l = keep; l < toPath.length; l++) {
	                        entering = toPath[l];
	                        entering.locals = toLocals[l];
	                        if (entering.self.onEnter) {
	                            $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
	                        }
	                    }

	                    // Run it again, to catch any transitions in callbacks
	                    if ($state.transition !== transition) return TransitionSuperseded;

	                    // Update globals in $state
	                    $state.$current = to;
	                    $state.current = to.self;
	                    $state.params = toParams;
	                    copy($state.params, $stateParams);
	                    $state.transition = null;

	                    if (options.location && to.navigable) {
	                        $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, {
	                            $$avoidResync: true, replace: options.location === 'replace'
	                        });
	                    }

	                    if (options.notify) {
	                        /**
	                         * @ngdoc event
	                         * @name ui.router.state.$state#$stateChangeSuccess
	                         * @eventOf ui.router.state.$state
	                         * @eventType broadcast on root scope
	                         * @description
	                         * Fired once the state transition is **complete**.
	                         *
	                         * @param {Object} event Event object.
	                         * @param {State} toState The state being transitioned to.
	                         * @param {Object} toParams The params supplied to the `toState`.
	                         * @param {State} fromState The current state, pre-transition.
	                         * @param {Object} fromParams The params supplied to the `fromState`.
	                         */
	                        $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);
	                    }
	                    $urlRouter.update(true);

	                    return $state.current;
	                }, function (error) {
	                    if ($state.transition !== transition) return TransitionSuperseded;

	                    $state.transition = null;
	                    /**
	                     * @ngdoc event
	                     * @name ui.router.state.$state#$stateChangeError
	                     * @eventOf ui.router.state.$state
	                     * @eventType broadcast on root scope
	                     * @description
	                     * Fired when an **error occurs** during transition. It's important to note that if you
	                     * have any errors in your resolve functions (javascript errors, non-existent services, etc)
	                     * they will not throw traditionally. You must listen for this $stateChangeError event to
	                     * catch **ALL** errors.
	                     *
	                     * @param {Object} event Event object.
	                     * @param {State} toState The state being transitioned to.
	                     * @param {Object} toParams The params supplied to the `toState`.
	                     * @param {State} fromState The current state, pre-transition.
	                     * @param {Object} fromParams The params supplied to the `fromState`.
	                     * @param {Error} error The resolve error object.
	                     */
	                    evt = $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);

	                    if (!evt.defaultPrevented) {
	                        $urlRouter.update();
	                    }

	                    return $q.reject(error);
	                });

	                return transition;
	            };

	            /**
	             * @ngdoc function
	             * @name ui.router.state.$state#is
	             * @methodOf ui.router.state.$state
	             *
	             * @description
	             * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
	             * but only checks for the full state name. If params is supplied then it will be
	             * tested for strict equality against the current active params object, so all params
	             * must match with none missing and no extras.
	             *
	             * @example
	             * <pre>
	             * $state.$current.name = 'contacts.details.item';
	             *
	             * // absolute name
	             * $state.is('contact.details.item'); // returns true
	             * $state.is(contactDetailItemStateObject); // returns true
	             *
	             * // relative name (. and ^), typically from a template
	             * // E.g. from the 'contacts.details' template
	             * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
	             * </pre>
	             *
	             * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.
	             * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
	             * to test against the current active state.
	             * @param {object=} options An options object.  The options are:
	             *
	             * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
	             * test relative to `options.relative` state (or name).
	             *
	             * @returns {boolean} Returns true if it is the state.
	             */
	            $state.is = function is(stateOrName, params, options) {
	                options = extend({ relative: $state.$current }, options || {});
	                var state = findState(stateOrName, options.relative);

	                if (!isDefined(state)) { return undefined; }
	                if ($state.$current !== state) { return false; }
	                return params ? equalForKeys(state.params.$$values(params), $stateParams) : true;
	            };

	            /**
	             * @ngdoc function
	             * @name ui.router.state.$state#includes
	             * @methodOf ui.router.state.$state
	             *
	             * @description
	             * A method to determine if the current active state is equal to or is the child of the
	             * state stateName. If any params are passed then they will be tested for a match as well.
	             * Not all the parameters need to be passed, just the ones you'd like to test for equality.
	             *
	             * @example
	             * Partial and relative names
	             * <pre>
	             * $state.$current.name = 'contacts.details.item';
	             *
	             * // Using partial names
	             * $state.includes("contacts"); // returns true
	             * $state.includes("contacts.details"); // returns true
	             * $state.includes("contacts.details.item"); // returns true
	             * $state.includes("contacts.list"); // returns false
	             * $state.includes("about"); // returns false
	             *
	             * // Using relative names (. and ^), typically from a template
	             * // E.g. from the 'contacts.details' template
	             * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
	             * </pre>
	             *
	             * Basic globbing patterns
	             * <pre>
	             * $state.$current.name = 'contacts.details.item.url';
	             *
	             * $state.includes("*.details.*.*"); // returns true
	             * $state.includes("*.details.**"); // returns true
	             * $state.includes("**.item.**"); // returns true
	             * $state.includes("*.details.item.url"); // returns true
	             * $state.includes("*.details.*.url"); // returns true
	             * $state.includes("*.details.*"); // returns false
	             * $state.includes("item.**"); // returns false
	             * </pre>
	             *
	             * @param {string} stateOrName A partial name, relative name, or glob pattern
	             * to be searched for within the current state name.
	             * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
	             * that you'd like to test against the current active state.
	             * @param {object=} options An options object.  The options are:
	             *
	             * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
	             * .includes will test relative to `options.relative` state (or name).
	             *
	             * @returns {boolean} Returns true if it does include the state
	             */
	            $state.includes = function includes(stateOrName, params, options) {
	                options = extend({ relative: $state.$current }, options || {});
	                if (isString(stateOrName) && isGlob(stateOrName)) {
	                    if (!doesStateMatchGlob(stateOrName)) {
	                        return false;
	                    }
	                    stateOrName = $state.$current.name;
	                }

	                var state = findState(stateOrName, options.relative);
	                if (!isDefined(state)) { return undefined; }
	                if (!isDefined($state.$current.includes[state.name])) { return false; }
	                return params ? equalForKeys(state.params.$$values(params), $stateParams, objectKeys(params)) : true;
	            };


	            /**
	             * @ngdoc function
	             * @name ui.router.state.$state#href
	             * @methodOf ui.router.state.$state
	             *
	             * @description
	             * A url generation method that returns the compiled url for the given state populated with the given params.
	             *
	             * @example
	             * <pre>
	             * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
	             * </pre>
	             *
	             * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
	             * @param {object=} params An object of parameter values to fill the state's required parameters.
	             * @param {object=} options Options object. The options are:
	             *
	             * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
	             *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
	             *    ancestor with a valid url).
	             * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
	             * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
	             *    defines which state to be relative from.
	             * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
	             * 
	             * @returns {string} compiled state url
	             */
	            $state.href = function href(stateOrName, params, options) {
	                options = extend({
	                    lossy: true,
	                    inherit: true,
	                    absolute: false,
	                    relative: $state.$current
	                }, options || {});

	                var state = findState(stateOrName, options.relative);

	                if (!isDefined(state)) return null;
	                if (options.inherit) params = inheritParams($stateParams, params || {}, $state.$current, state);

	                var nav = (state && options.lossy) ? state.navigable : state;

	                if (!nav || nav.url === undefined || nav.url === null) {
	                    return null;
	                }
	                return $urlRouter.href(nav.url, filterByKeys(state.params.$$keys().concat('#'), params || {}), {
	                    absolute: options.absolute
	                });
	            };

	            /**
	             * @ngdoc function
	             * @name ui.router.state.$state#get
	             * @methodOf ui.router.state.$state
	             *
	             * @description
	             * Returns the state configuration object for any specific state or all states.
	             *
	             * @param {string|object=} stateOrName (absolute or relative) If provided, will only get the config for
	             * the requested state. If not provided, returns an array of ALL state configs.
	             * @param {string|object=} context When stateOrName is a relative state reference, the state will be retrieved relative to context.
	             * @returns {Object|Array} State configuration object or array of all objects.
	             */
	            $state.get = function (stateOrName, context) {
	                if (arguments.length === 0) return map(objectKeys(states), function (name) { return states[name].self; });
	                var state = findState(stateOrName, context || $state.$current);
	                return (state && state.self) ? state.self : null;
	            };

	            function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {
	                // Make a restricted $stateParams with only the parameters that apply to this state if
	                // necessary. In addition to being available to the controller and onEnter/onExit callbacks,
	                // we also need $stateParams to be available for any $injector calls we make during the
	                // dependency resolution process.
	                var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params.$$keys(), params);
	                var locals = { $stateParams: $stateParams };

	                // Resolve 'global' dependencies for the state, i.e. those not specific to a view.
	                // We're also including $stateParams in this; that way the parameters are restricted
	                // to the set that should be visible to the state, and are independent of when we update
	                // the global $state and $stateParams values.
	                dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
	                var promises = [dst.resolve.then(function (globals) {
	                    dst.globals = globals;
	                })];
	                if (inherited) promises.push(inherited);

	                function resolveViews() {
	                    var viewsPromises = [];

	                    // Resolve template and dependencies for all views.
	                    forEach(state.views, function (view, name) {
	                        var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {});
	                        injectables.$template = [function () {
	                            return $view.load(name, { view: view, locals: dst.globals, params: $stateParams, notify: options.notify }) || '';
	                        }];

	                        viewsPromises.push($resolve.resolve(injectables, dst.globals, dst.resolve, state).then(function (result) {
	                            // References to the controller (only instantiated at link time)
	                            if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
	                                var injectLocals = angular.extend({}, injectables, dst.globals);
	                                result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
	                            } else {
	                                result.$$controller = view.controller;
	                            }
	                            // Provide access to the state itself for internal use
	                            result.$$state = state;
	                            result.$$controllerAs = view.controllerAs;
	                            dst[name] = result;
	                        }));
	                    });

	                    return $q.all(viewsPromises).then(function () {
	                        return dst.globals;
	                    });
	                }

	                // Wait for all the promises and then return the activation object
	                return $q.all(promises).then(resolveViews).then(function (values) {
	                    return dst;
	                });
	            }

	            return $state;
	        }

	        function shouldSkipReload(to, toParams, from, fromParams, locals, options) {
	            // Return true if there are no differences in non-search (path/object) params, false if there are differences
	            function nonSearchParamsEqual(fromAndToState, fromParams, toParams) {
	                // Identify whether all the parameters that differ between `fromParams` and `toParams` were search params.
	                function notSearchParam(key) {
	                    return fromAndToState.params[key].location != "search";
	                }
	                var nonQueryParamKeys = fromAndToState.params.$$keys().filter(notSearchParam);
	                var nonQueryParams = pick.apply({}, [fromAndToState.params].concat(nonQueryParamKeys));
	                var nonQueryParamSet = new $$UMFP.ParamSet(nonQueryParams);
	                return nonQueryParamSet.$$equals(fromParams, toParams);
	            }

	            // If reload was not explicitly requested
	            // and we're transitioning to the same state we're already in
	            // and    the locals didn't change
	            //     or they changed in a way that doesn't merit reloading
	            //        (reloadOnParams:false, or reloadOnSearch.false and only search params changed)
	            // Then return true.
	            if (!options.reload && to === from &&
	              (locals === from.locals || (to.self.reloadOnSearch === false && nonSearchParamsEqual(from, fromParams, toParams)))) {
	                return true;
	            }
	        }
	    }

	    angular.module('ui.router.state')
	      .factory('$stateParams', function () { return {}; })
	      .provider('$state', $StateProvider);


	    $ViewProvider.$inject = [];
	    function $ViewProvider() {

	        this.$get = $get;
	        /**
	         * @ngdoc object
	         * @name ui.router.state.$view
	         *
	         * @requires ui.router.util.$templateFactory
	         * @requires $rootScope
	         *
	         * @description
	         *
	         */
	        $get.$inject = ['$rootScope', '$templateFactory'];
	        function $get($rootScope, $templateFactory) {
	            return {
	                // $view.load('full.viewName', { template: ..., controller: ..., resolve: ..., async: false, params: ... })
	                /**
	                 * @ngdoc function
	                 * @name ui.router.state.$view#load
	                 * @methodOf ui.router.state.$view
	                 *
	                 * @description
	                 *
	                 * @param {string} name name
	                 * @param {object} options option object.
	                 */
	                load: function load(name, options) {
	                    var result, defaults = {
	                        template: null, controller: null, view: null, locals: null, notify: true, async: true, params: {}
	                    };
	                    options = extend(defaults, options);

	                    if (options.view) {
	                        result = $templateFactory.fromConfig(options.view, options.params, options.locals);
	                    }
	                    return result;
	                }
	            };
	        }
	    }

	    angular.module('ui.router.state').provider('$view', $ViewProvider);

	    /**
	     * @ngdoc object
	     * @name ui.router.state.$uiViewScrollProvider
	     *
	     * @description
	     * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
	     */
	    function $ViewScrollProvider() {

	        var useAnchorScroll = false;

	        /**
	         * @ngdoc function
	         * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
	         * @methodOf ui.router.state.$uiViewScrollProvider
	         *
	         * @description
	         * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
	         * scrolling based on the url anchor.
	         */
	        this.useAnchorScroll = function () {
	            useAnchorScroll = true;
	        };

	        /**
	         * @ngdoc object
	         * @name ui.router.state.$uiViewScroll
	         *
	         * @requires $anchorScroll
	         * @requires $timeout
	         *
	         * @description
	         * When called with a jqLite element, it scrolls the element into view (after a
	         * `$timeout` so the DOM has time to refresh).
	         *
	         * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
	         * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
	         */
	        this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {
	            if (useAnchorScroll) {
	                return $anchorScroll;
	            }

	            return function ($element) {
	                return $timeout(function () {
	                    $element[0].scrollIntoView();
	                }, 0, false);
	            };
	        }];
	    }

	    angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);

	    var ngMajorVer = angular.version.major;
	    var ngMinorVer = angular.version.minor;
	    /**
	     * @ngdoc directive
	     * @name ui.router.state.directive:ui-view
	     *
	     * @requires ui.router.state.$state
	     * @requires $compile
	     * @requires $controller
	     * @requires $injector
	     * @requires ui.router.state.$uiViewScroll
	     * @requires $document
	     *
	     * @restrict ECA
	     *
	     * @description
	     * The ui-view directive tells $state where to place your templates.
	     *
	     * @param {string=} name A view name. The name should be unique amongst the other views in the
	     * same state. You can have views of the same name that live in different states.
	     *
	     * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
	     * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
	     * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
	     * scroll ui-view elements into view when they are populated during a state activation.
	     *
	     * @param {string=} noanimation If truthy, the non-animated renderer will be selected (no animations
	     * will be applied to the ui-view)
	     *
	     * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
	     * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
	     *
	     * @param {string=} onload Expression to evaluate whenever the view updates.
	     * 
	     * @example
	     * A view can be unnamed or named. 
	     * <pre>
	     * <!-- Unnamed -->
	     * <div ui-view></div> 
	     * 
	     * <!-- Named -->
	     * <div ui-view="viewName"></div>
	     * </pre>
	     *
	     * You can only have one unnamed view within any template (or root html). If you are only using a 
	     * single view and it is unnamed then you can populate it like so:
	     * <pre>
	     * <div ui-view></div> 
	     * $stateProvider.state("home", {
	     *   template: "<h1>HELLO!</h1>"
	     * })
	     * </pre>
	     * 
	     * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#views `views`}
	     * config property, by name, in this case an empty name:
	     * <pre>
	     * $stateProvider.state("home", {
	     *   views: {
	     *     "": {
	     *       template: "<h1>HELLO!</h1>"
	     *     }
	     *   }    
	     * })
	     * </pre>
	     * 
	     * But typically you'll only use the views property if you name your view or have more than one view 
	     * in the same template. There's not really a compelling reason to name a view if its the only one, 
	     * but you could if you wanted, like so:
	     * <pre>
	     * <div ui-view="main"></div>
	     * </pre> 
	     * <pre>
	     * $stateProvider.state("home", {
	     *   views: {
	     *     "main": {
	     *       template: "<h1>HELLO!</h1>"
	     *     }
	     *   }    
	     * })
	     * </pre>
	     * 
	     * Really though, you'll use views to set up multiple views:
	     * <pre>
	     * <div ui-view></div>
	     * <div ui-view="chart"></div> 
	     * <div ui-view="data"></div> 
	     * </pre>
	     * 
	     * <pre>
	     * $stateProvider.state("home", {
	     *   views: {
	     *     "": {
	     *       template: "<h1>HELLO!</h1>"
	     *     },
	     *     "chart": {
	     *       template: "<chart_thing/>"
	     *     },
	     *     "data": {
	     *       template: "<data_thing/>"
	     *     }
	     *   }    
	     * })
	     * </pre>
	     *
	     * Examples for `autoscroll`:
	     *
	     * <pre>
	     * <!-- If autoscroll present with no expression,
	     *      then scroll ui-view into view -->
	     * <ui-view autoscroll/>
	     *
	     * <!-- If autoscroll present with valid expression,
	     *      then scroll ui-view into view if expression evaluates to true -->
	     * <ui-view autoscroll='true'/>
	     * <ui-view autoscroll='false'/>
	     * <ui-view autoscroll='scopeVariable'/>
	     * </pre>
	     */
	    $ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll', '$interpolate'];
	    function $ViewDirective($state, $injector, $uiViewScroll, $interpolate) {

	        function getService() {
	            return ($injector.has) ? function (service) {
	                return $injector.has(service) ? $injector.get(service) : null;
	            } : function (service) {
	                try {
	                    return $injector.get(service);
	                } catch (e) {
	                    return null;
	                }
	            };
	        }

	        var service = getService(),
	            $animator = service('$animator'),
	            $animate = service('$animate');

	        // Returns a set of DOM manipulation functions based on which Angular version
	        // it should use
	        function getRenderer(attrs, scope) {
	            var statics = {
	                enter: function (element, target, cb) { target.after(element); cb(); },
	                leave: function (element, cb) { element.remove(); cb(); }
	            };

	            if (!!attrs.noanimation) return statics;

	            function animEnabled(element) {
	                if (ngMajorVer === 1 && ngMinorVer >= 4) return !!$animate.enabled(element);
	                if (ngMajorVer === 1 && ngMinorVer >= 2) return !!$animate.enabled();
	                return (!!$animator);
	            }

	            // ng 1.2+
	            if ($animate) {
	                return {
	                    enter: function (element, target, cb) {
	                        if (!animEnabled(element)) {
	                            statics.enter(element, target, cb);
	                        } else if (angular.version.minor > 2) {
	                            $animate.enter(element, null, target).then(cb);
	                        } else {
	                            $animate.enter(element, null, target, cb);
	                        }
	                    },
	                    leave: function (element, cb) {
	                        if (!animEnabled(element)) {
	                            statics.leave(element, cb);
	                        } else if (angular.version.minor > 2) {
	                            $animate.leave(element).then(cb);
	                        } else {
	                            $animate.leave(element, cb);
	                        }
	                    }
	                };
	            }

	            // ng 1.1.5
	            if ($animator) {
	                var animate = $animator && $animator(scope, attrs);

	                return {
	                    enter: function (element, target, cb) { animate.enter(element, null, target); cb(); },
	                    leave: function (element, cb) { animate.leave(element); cb(); }
	                };
	            }

	            return statics;
	        }

	        var directive = {
	            restrict: 'ECA',
	            terminal: true,
	            priority: 400,
	            transclude: 'element',
	            compile: function (tElement, tAttrs, $transclude) {
	                return function (scope, $element, attrs) {
	                    var previousEl, currentEl, currentScope, latestLocals,
	                        onloadExp = attrs.onload || '',
	                        autoScrollExp = attrs.autoscroll,
	                        renderer = getRenderer(attrs, scope);

	                    scope.$on('$stateChangeSuccess', function () {
	                        updateView(false);
	                    });

	                    updateView(true);

	                    function cleanupLastView() {
	                        var _previousEl = previousEl;
	                        var _currentScope = currentScope;

	                        if (_currentScope) {
	                            _currentScope._willBeDestroyed = true;
	                        }

	                        function cleanOld() {
	                            if (_previousEl) {
	                                _previousEl.remove();
	                            }

	                            if (_currentScope) {
	                                _currentScope.$destroy();
	                            }
	                        }

	                        if (currentEl) {
	                            renderer.leave(currentEl, function () {
	                                cleanOld();
	                                previousEl = null;
	                            });

	                            previousEl = currentEl;
	                        } else {
	                            cleanOld();
	                            previousEl = null;
	                        }

	                        currentEl = null;
	                        currentScope = null;
	                    }

	                    function updateView(firstTime) {
	                        var newScope,
	                            name = getUiViewName(scope, attrs, $element, $interpolate),
	                            previousLocals = name && $state.$current && $state.$current.locals[name];

	                        if (!firstTime && previousLocals === latestLocals || scope._willBeDestroyed) return; // nothing to do
	                        newScope = scope.$new();
	                        latestLocals = $state.$current.locals[name];

	                        /**
	                         * @ngdoc event
	                         * @name ui.router.state.directive:ui-view#$viewContentLoading
	                         * @eventOf ui.router.state.directive:ui-view
	                         * @eventType emits on ui-view directive scope
	                         * @description
	                         *
	                         * Fired once the view **begins loading**, *before* the DOM is rendered.
	                         *
	                         * @param {Object} event Event object.
	                         * @param {string} viewName Name of the view.
	                         */
	                        newScope.$emit('$viewContentLoading', name);

	                        var clone = $transclude(newScope, function (clone) {
	                            renderer.enter(clone, $element, function onUiViewEnter() {
	                                if (currentScope) {
	                                    currentScope.$emit('$viewContentAnimationEnded');
	                                }

	                                if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
	                                    $uiViewScroll(clone);
	                                }
	                            });
	                            cleanupLastView();
	                        });

	                        currentEl = clone;
	                        currentScope = newScope;
	                        /**
	                         * @ngdoc event
	                         * @name ui.router.state.directive:ui-view#$viewContentLoaded
	                         * @eventOf ui.router.state.directive:ui-view
	                         * @eventType emits on ui-view directive scope
	                         * @description
	                         * Fired once the view is **loaded**, *after* the DOM is rendered.
	                         *
	                         * @param {Object} event Event object.
	                         * @param {string} viewName Name of the view.
	                         */
	                        currentScope.$emit('$viewContentLoaded', name);
	                        currentScope.$eval(onloadExp);
	                    }
	                };
	            }
	        };

	        return directive;
	    }

	    $ViewDirectiveFill.$inject = ['$compile', '$controller', '$state', '$interpolate'];
	    function $ViewDirectiveFill($compile, $controller, $state, $interpolate) {
	        return {
	            restrict: 'ECA',
	            priority: -400,
	            compile: function (tElement) {
	                var initial = tElement.html();
	                return function (scope, $element, attrs) {
	                    var current = $state.$current,
	                        name = getUiViewName(scope, attrs, $element, $interpolate),
	                        locals = current && current.locals[name];

	                    if (!locals) {
	                        return;
	                    }

	                    $element.data('$uiView', { name: name, state: locals.$$state });
	                    $element.html(locals.$template ? locals.$template : initial);

	                    var link = $compile($element.contents());

	                    if (locals.$$controller) {
	                        locals.$scope = scope;
	                        locals.$element = $element;
	                        var controller = $controller(locals.$$controller, locals);
	                        if (locals.$$controllerAs) {
	                            scope[locals.$$controllerAs] = controller;
	                        }
	                        $element.data('$ngControllerController', controller);
	                        $element.children().data('$ngControllerController', controller);
	                    }

	                    link(scope);
	                };
	            }
	        };
	    }

	    /**
	     * Shared ui-view code for both directives:
	     * Given scope, element, and its attributes, return the view's name
	     */
	    function getUiViewName(scope, attrs, element, $interpolate) {
	        var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
	        var inherited = element.inheritedData('$uiView');
	        return name.indexOf('@') >= 0 ? name : (name + '@' + (inherited ? inherited.state.name : ''));
	    }

	    angular.module('ui.router.state').directive('uiView', $ViewDirective);
	    angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);

	    function parseStateRef(ref, current) {
	        var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
	        if (preparsed) ref = current + '(' + preparsed[1] + ')';
	        parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
	        if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
	        return { state: parsed[1], paramExpr: parsed[3] || null };
	    }

	    function stateContext(el) {
	        var stateData = el.parent().inheritedData('$uiView');

	        if (stateData && stateData.state && stateData.state.name) {
	            return stateData.state;
	        }
	    }

	    function getTypeInfo(el) {
	        // SVGAElement does not use the href attribute, but rather the 'xlinkHref' attribute.
	        var isSvg = Object.prototype.toString.call(el.prop('href')) === '[object SVGAnimatedString]';
	        var isForm = el[0].nodeName === "FORM";

	        return {
	            attr: isForm ? "action" : (isSvg ? 'xlink:href' : 'href'),
	            isAnchor: el.prop("tagName").toUpperCase() === "A",
	            clickable: !isForm
	        };
	    }

	    function clickHook(el, $state, $timeout, type, current) {
	        return function (e) {
	            var button = e.which || e.button, target = current();

	            if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || el.attr('target'))) {
	                // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
	                var transition = $timeout(function () {
	                    $state.go(target.state, target.params, target.options);
	                });
	                e.preventDefault();

	                // if the state has no URL, ignore one preventDefault from the <a> directive.
	                var ignorePreventDefaultCount = type.isAnchor && !target.href ? 1 : 0;

	                e.preventDefault = function () {
	                    if (ignorePreventDefaultCount-- <= 0) $timeout.cancel(transition);
	                };
	            }
	        };
	    }

	    function defaultOpts(el, $state) {
	        return { relative: stateContext(el) || $state.$current, inherit: true };
	    }

	    /**
	     * @ngdoc directive
	     * @name ui.router.state.directive:ui-sref
	     *
	     * @requires ui.router.state.$state
	     * @requires $timeout
	     *
	     * @restrict A
	     *
	     * @description
	     * A directive that binds a link (`<a>` tag) to a state. If the state has an associated
	     * URL, the directive will automatically generate & update the `href` attribute via
	     * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking
	     * the link will trigger a state transition with optional parameters.
	     *
	     * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be
	     * handled natively by the browser.
	     *
	     * You can also use relative state paths within ui-sref, just like the relative
	     * paths passed to `$state.go()`. You just need to be aware that the path is relative
	     * to the state that the link lives in, in other words the state that loaded the
	     * template containing the link.
	     *
	     * You can specify options to pass to {@link ui.router.state.$state#go $state.go()}
	     * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
	     * and `reload`.
	     *
	     * @example
	     * Here's an example of how you'd use ui-sref and how it would compile. If you have the
	     * following template:
	     * <pre>
	     * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>
	     *
	     * <ul>
	     *     <li ng-repeat="contact in contacts">
	     *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
	     *     </li>
	     * </ul>
	     * </pre>
	     *
	     * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
	     * <pre>
	     * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
	     *
	     * <ul>
	     *     <li ng-repeat="contact in contacts">
	     *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
	     *     </li>
	     *     <li ng-repeat="contact in contacts">
	     *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
	     *     </li>
	     *     <li ng-repeat="contact in contacts">
	     *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
	     *     </li>
	     * </ul>
	     *
	     * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
	     * </pre>
	     *
	     * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
	     * @param {Object} ui-sref-opts options to pass to {@link ui.router.state.$state#go $state.go()}
	     */
	    $StateRefDirective.$inject = ['$state', '$timeout'];
	    function $StateRefDirective($state, $timeout) {
	        return {
	            restrict: 'A',
	            require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
	            link: function (scope, element, attrs, uiSrefActive) {
	                var ref = parseStateRef(attrs.uiSref, $state.current.name);
	                var def = { state: ref.state, href: null, params: null };
	                var type = getTypeInfo(element);
	                var active = uiSrefActive[1] || uiSrefActive[0];

	                def.options = extend(defaultOpts(element, $state), attrs.uiSrefOpts ? scope.$eval(attrs.uiSrefOpts) : {});

	                var update = function (val) {
	                    if (val) def.params = angular.copy(val);
	                    def.href = $state.href(ref.state, def.params, def.options);

	                    if (active) active.$$addStateInfo(ref.state, def.params);
	                    if (def.href !== null) attrs.$set(type.attr, def.href);
	                };

	                if (ref.paramExpr) {
	                    scope.$watch(ref.paramExpr, function (val) { if (val !== def.params) update(val); }, true);
	                    def.params = angular.copy(scope.$eval(ref.paramExpr));
	                }
	                update();

	                if (!type.clickable) return;
	                element.bind("click", clickHook(element, $state, $timeout, type, function () { return def; }));
	            }
	        };
	    }

	    /**
	     * @ngdoc directive
	     * @name ui.router.state.directive:ui-state
	     *
	     * @requires ui.router.state.uiSref
	     *
	     * @restrict A
	     *
	     * @description
	     * Much like ui-sref, but will accept named $scope properties to evaluate for a state definition,
	     * params and override options.
	     *
	     * @param {string} ui-state 'stateName' can be any valid absolute or relative state
	     * @param {Object} ui-state-params params to pass to {@link ui.router.state.$state#href $state.href()}
	     * @param {Object} ui-state-opts options to pass to {@link ui.router.state.$state#go $state.go()}
	     */
	    $StateRefDynamicDirective.$inject = ['$state', '$timeout'];
	    function $StateRefDynamicDirective($state, $timeout) {
	        return {
	            restrict: 'A',
	            require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
	            link: function (scope, element, attrs, uiSrefActive) {
	                var type = getTypeInfo(element);
	                var active = uiSrefActive[1] || uiSrefActive[0];
	                var group = [attrs.uiState, attrs.uiStateParams || null, attrs.uiStateOpts || null];
	                var watch = '[' + group.map(function (val) { return val || 'null'; }).join(', ') + ']';
	                var def = { state: null, params: null, options: null, href: null };

	                function runStateRefLink(group) {
	                    def.state = group[0]; def.params = group[1]; def.options = group[2];
	                    def.href = $state.href(def.state, def.params, def.options);

	                    if (active) active.$$addStateInfo(def.state, def.params);
	                    if (def.href) attrs.$set(type.attr, def.href);
	                }

	                scope.$watch(watch, runStateRefLink, true);
	                runStateRefLink(scope.$eval(watch));

	                if (!type.clickable) return;
	                element.bind("click", clickHook(element, $state, $timeout, type, function () { return def; }));
	            }
	        };
	    }


	    /**
	     * @ngdoc directive
	     * @name ui.router.state.directive:ui-sref-active
	     *
	     * @requires ui.router.state.$state
	     * @requires ui.router.state.$stateParams
	     * @requires $interpolate
	     *
	     * @restrict A
	     *
	     * @description
	     * A directive working alongside ui-sref to add classes to an element when the
	     * related ui-sref directive's state is active, and removing them when it is inactive.
	     * The primary use-case is to simplify the special appearance of navigation menus
	     * relying on `ui-sref`, by having the "active" state's menu button appear different,
	     * distinguishing it from the inactive menu items.
	     *
	     * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
	     * ui-sref-active found at the same level or above the ui-sref will be used.
	     *
	     * Will activate when the ui-sref's target state or any child state is active. If you
	     * need to activate only when the ui-sref target state is active and *not* any of
	     * it's children, then you will use
	     * {@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq}
	     *
	     * @example
	     * Given the following template:
	     * <pre>
	     * <ul>
	     *   <li ui-sref-active="active" class="item">
	     *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
	     *   </li>
	     * </ul>
	     * </pre>
	     *
	     *
	     * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
	     * the resulting HTML will appear as (note the 'active' class):
	     * <pre>
	     * <ul>
	     *   <li ui-sref-active="active" class="item active">
	     *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
	     *   </li>
	     * </ul>
	     * </pre>
	     *
	     * The class name is interpolated **once** during the directives link time (any further changes to the
	     * interpolated value are ignored).
	     *
	     * Multiple classes may be specified in a space-separated format:
	     * <pre>
	     * <ul>
	     *   <li ui-sref-active='class1 class2 class3'>
	     *     <a ui-sref="app.user">link</a>
	     *   </li>
	     * </ul>
	     * </pre>
	     *
	     * It is also possible to pass ui-sref-active an expression that evaluates
	     * to an object hash, whose keys represent active class names and whose
	     * values represent the respective state names/globs.
	     * ui-sref-active will match if the current active state **includes** any of
	     * the specified state names/globs, even the abstract ones.
	     *
	     * @Example
	     * Given the following template, with "admin" being an abstract state:
	     * <pre>
	     * <div ui-sref-active="{'active': 'admin.*'}">
	     *   <a ui-sref-active="active" ui-sref="admin.roles">Roles</a>
	     * </div>
	     * </pre>
	     *
	     * When the current state is "admin.roles" the "active" class will be applied
	     * to both the <div> and <a> elements. It is important to note that the state
	     * names/globs passed to ui-sref-active shadow the state provided by ui-sref.
	     */

	    /**
	     * @ngdoc directive
	     * @name ui.router.state.directive:ui-sref-active-eq
	     *
	     * @requires ui.router.state.$state
	     * @requires ui.router.state.$stateParams
	     * @requires $interpolate
	     *
	     * @restrict A
	     *
	     * @description
	     * The same as {@link ui.router.state.directive:ui-sref-active ui-sref-active} but will only activate
	     * when the exact target state used in the `ui-sref` is active; no child states.
	     *
	     */
	    $StateRefActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
	    function $StateRefActiveDirective($state, $stateParams, $interpolate) {
	        return {
	            restrict: "A",
	            controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
	                var states = [], activeClasses = {}, activeEqClass, uiSrefActive;

	                // There probably isn't much point in $observing this
	                // uiSrefActive and uiSrefActiveEq share the same directive object with some
	                // slight difference in logic routing
	                activeEqClass = $interpolate($attrs.uiSrefActiveEq || '', false)($scope);

	                try {
	                    uiSrefActive = $scope.$eval($attrs.uiSrefActive);
	                } catch (e) {
	                    // Do nothing. uiSrefActive is not a valid expression.
	                    // Fall back to using $interpolate below
	                }
	                uiSrefActive = uiSrefActive || $interpolate($attrs.uiSrefActive || '', false)($scope);
	                if (isObject(uiSrefActive)) {
	                    forEach(uiSrefActive, function (stateOrName, activeClass) {
	                        if (isString(stateOrName)) {
	                            var ref = parseStateRef(stateOrName, $state.current.name);
	                            addState(ref.state, $scope.$eval(ref.paramExpr), activeClass);
	                        }
	                    });
	                }

	                // Allow uiSref to communicate with uiSrefActive[Equals]
	                this.$$addStateInfo = function (newState, newParams) {
	                    // we already got an explicit state provided by ui-sref-active, so we
	                    // shadow the one that comes from ui-sref
	                    if (isObject(uiSrefActive) && states.length > 0) {
	                        return;
	                    }
	                    addState(newState, newParams, uiSrefActive);
	                    update();
	                };

	                $scope.$on('$stateChangeSuccess', update);

	                function addState(stateName, stateParams, activeClass) {
	                    var state = $state.get(stateName, stateContext($element));
	                    var stateHash = createStateHash(stateName, stateParams);

	                    states.push({
	                        state: state || { name: stateName },
	                        params: stateParams,
	                        hash: stateHash
	                    });

	                    activeClasses[stateHash] = activeClass;
	                }

	                /**
	                 * @param {string} state
	                 * @param {Object|string} [params]
	                 * @return {string}
	                 */
	                function createStateHash(state, params) {
	                    if (!isString(state)) {
	                        throw new Error('state should be a string');
	                    }
	                    if (isObject(params)) {
	                        return state + toJson(params);
	                    }
	                    params = $scope.$eval(params);
	                    if (isObject(params)) {
	                        return state + toJson(params);
	                    }
	                    return state;
	                }

	                // Update route state
	                function update() {
	                    for (var i = 0; i < states.length; i++) {
	                        if (anyMatch(states[i].state, states[i].params)) {
	                            addClass($element, activeClasses[states[i].hash]);
	                        } else {
	                            removeClass($element, activeClasses[states[i].hash]);
	                        }

	                        if (exactMatch(states[i].state, states[i].params)) {
	                            addClass($element, activeEqClass);
	                        } else {
	                            removeClass($element, activeEqClass);
	                        }
	                    }
	                }

	                function addClass(el, className) { $timeout(function () { el.addClass(className); }); }
	                function removeClass(el, className) { el.removeClass(className); }
	                function anyMatch(state, params) { return $state.includes(state.name, params); }
	                function exactMatch(state, params) { return $state.is(state.name, params); }

	                update();
	            }]
	        };
	    }

	    angular.module('ui.router.state')
	      .directive('uiSref', $StateRefDirective)
	      .directive('uiSrefActive', $StateRefActiveDirective)
	      .directive('uiSrefActiveEq', $StateRefActiveDirective)
	      .directive('uiState', $StateRefDynamicDirective);

	    /**
	     * @ngdoc filter
	     * @name ui.router.state.filter:isState
	     *
	     * @requires ui.router.state.$state
	     *
	     * @description
	     * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
	     */
	    $IsStateFilter.$inject = ['$state'];
	    function $IsStateFilter($state) {
	        var isFilter = function (state, params) {
	            return $state.is(state, params);
	        };
	        isFilter.$stateful = true;
	        return isFilter;
	    }

	    /**
	     * @ngdoc filter
	     * @name ui.router.state.filter:includedByState
	     *
	     * @requires ui.router.state.$state
	     *
	     * @description
	     * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
	     */
	    $IncludedByStateFilter.$inject = ['$state'];
	    function $IncludedByStateFilter($state) {
	        var includesFilter = function (state, params, options) {
	            return $state.includes(state, params, options);
	        };
	        includesFilter.$stateful = true;
	        return includesFilter;
	    }

	    angular.module('ui.router.state')
	      .filter('isState', $IsStateFilter)
	      .filter('includedByState', $IncludedByStateFilter);
	})(window, window.angular);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	/**
	 * An Angular module that gives you access to the browsers local storage
	 * @version v0.3.0 - 2016-07-29
	 * @link https://github.com/grevory/angular-local-storage
	 * @author grevory <greg@gregpike.ca>
	 * @license MIT License, http://www.opensource.org/licenses/MIT
	 */
	!function(a,b){var c=b.isDefined,d=b.isUndefined,e=b.isNumber,f=b.isObject,g=b.isArray,h=b.extend,i=b.toJson;b.module("LocalStorageModule",[]).provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.defaultToCookie=!0,this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(a){return this.prefix=a,this},this.setStorageType=function(a){return this.storageType=a,this},this.setDefaultToCookie=function(a){return this.defaultToCookie=!!a,this},this.setStorageCookie=function(a,b){return this.cookie.expiry=a,this.cookie.path=b,this},this.setStorageCookieDomain=function(a){return this.cookie.domain=a,this},this.setNotify=function(a,b){return this.notify={setItem:a,removeItem:b},this},this.$get=["$rootScope","$window","$document","$parse","$timeout",function(a,b,j,k,l){function m(c){if(c||(c=b.event),r.setItem&&v(c.key)){var d=u(c.key);l(function(){a.$broadcast("LocalStorageModule.notification.changed",{key:d,newvalue:c.newValue,storageType:o.storageType})})}}var n,o=this,p=o.prefix,q=o.cookie,r=o.notify,s=o.storageType;j?j[0]&&(j=j[0]):j=document,"."!==p.substr(-1)&&(p=p?p+".":"");var t=function(a){return p+a},u=function(a){return a.replace(new RegExp("^"+p,"g"),"")},v=function(a){return 0===a.indexOf(p)},w=function(){try{var c=s in b&&null!==b[s],d=t("__"+Math.round(1e7*Math.random()));return c&&(n=b[s],n.setItem(d,""),n.removeItem(d)),c}catch(b){return o.defaultToCookie&&(s="cookie"),a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},x=w(),y=function(b,c,e){if(J(e),c=d(c)?null:i(c),!x&&o.defaultToCookie||"cookie"===o.storageType)return x||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:"cookie"}),E(b,c);try{n&&n.setItem(t(b),c),r.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:o.storageType})}catch(d){return a.$broadcast("LocalStorageModule.notification.error",d.message),E(b,c)}return!0},z=function(b,c){if(J(c),!x&&o.defaultToCookie||"cookie"===o.storageType)return x||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),F(b);var d=n?n.getItem(t(b)):null;if(!d||"null"===d)return null;try{return JSON.parse(d)}catch(a){return d}},A=function(){var b=0;arguments.length>=1&&("localStorage"===arguments[arguments.length-1]||"sessionStorage"===arguments[arguments.length-1])&&(b=1,J(arguments[arguments.length-1]));var c,d;for(c=0;c<arguments.length-b;c++)if(d=arguments[c],!x&&o.defaultToCookie||"cookie"===o.storageType)x||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:d,storageType:"cookie"}),G(d);else try{n.removeItem(t(d)),r.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:d,storageType:o.storageType})}catch(b){a.$broadcast("LocalStorageModule.notification.error",b.message),G(d)}},B=function(b){if(J(b),!x)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),[];var c=p.length,d=[];for(var e in n)if(e.substr(0,c)===p)try{d.push(e.substr(c))}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.Description),[]}return d},C=function(b,c){J(c);var d=p?new RegExp("^"+p):new RegExp,e=b?new RegExp(b):new RegExp;if(!x&&o.defaultToCookie||"cookie"===o.storageType)return x||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),H();if(!x&&!o.defaultToCookie)return!1;var f=p.length;for(var g in n)if(d.test(g)&&e.test(g.substr(f)))try{A(g.substr(f))}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),H()}return!0},D=function(){try{return b.navigator.cookieEnabled||"cookie"in j&&(j.cookie.length>0||(j.cookie="test").indexOf.call(j.cookie,"test")>-1)}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}}(),E=function(b,c,h){if(d(c))return!1;if((g(c)||f(c))&&(c=i(c)),!D)return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var k="",l=new Date,m="";if(null===c?(l.setTime(l.getTime()+-864e5),k="; expires="+l.toGMTString(),c=""):e(h)&&0!==h?(l.setTime(l.getTime()+24*h*60*60*1e3),k="; expires="+l.toGMTString()):0!==q.expiry&&(l.setTime(l.getTime()+24*q.expiry*60*60*1e3),k="; expires="+l.toGMTString()),b){var n="; path="+q.path;q.domain&&(m="; domain="+q.domain),j.cookie=t(b)+"="+encodeURIComponent(c)+k+n+m}}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}return!0},F=function(b){if(!D)return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var c=j.cookie&&j.cookie.split(";")||[],d=0;d<c.length;d++){for(var e=c[d];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(t(b)+"=")){var f=decodeURIComponent(e.substring(p.length+b.length+1,e.length));try{return JSON.parse(f)}catch(a){return f}}}return null},G=function(a){E(a,null)},H=function(){for(var a=null,b=p.length,c=j.cookie.split(";"),d=0;d<c.length;d++){for(a=c[d];" "===a.charAt(0);)a=a.substring(1,a.length);var e=a.substring(b,a.indexOf("="));G(e)}},I=function(){return s},J=function(a){return a&&s!==a&&(s=a,x=w()),x},K=function(a,b,d,e,g){e=e||b;var i=z(e,g);return null===i&&c(d)?i=d:f(i)&&f(d)&&(i=h(i,d)),k(b).assign(a,i),a.$watch(b,function(a){y(e,a,g)},f(a[b]))};x&&(b.addEventListener?b.addEventListener("storage",m,!1):b.attachEvent&&b.attachEvent("onstorage",m));var L=function(a){J(a);for(var c=0,d=b[s],e=0;e<d.length;e++)0===d.key(e).indexOf(p)&&c++;return c};return{isSupported:x,getStorageType:I,setStorageType:J,set:y,add:y,get:z,keys:B,remove:A,clearAll:C,bind:K,deriveKey:t,underiveKey:u,length:L,defaultToCookie:this.defaultToCookie,cookie:{isSupported:D,set:E,add:E,get:F,remove:G,clearAll:H}}}]})}(window,window.angular);
	//# sourceMappingURL=angular-local-storage.min.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"format amd"; !function () { "use strict"; function a(a) { return angular.isUndefined(a) || null === a } function b() { try { return __webpack_require__(25) } catch (a) { throw new Error("Please install moment via npm. Please reference to: https://github.com/urish/angular-moment") } } function c(c, d) { if ("undefined" == typeof d) { if (false) throw new Error("Moment cannot be found by angular-moment! Please reference to: https://github.com/urish/angular-moment"); d = b() } return c.module("angularMoment", []).constant("angularMomentConfig", { preprocess: null, timezone: null, format: null, statefulFilters: !0 }).constant("moment", d).constant("amTimeAgoConfig", { withoutSuffix: !1, serverTime: null, titleFormat: null, fullDateThreshold: null, fullDateFormat: null }).directive("amTimeAgo", ["$window", "moment", "amMoment", "amTimeAgoConfig", function (b, d, e, f) { return function (g, h, i) { function j() { var a; if (p) a = p; else if (f.serverTime) { var b = (new Date).getTime(), c = b - v + f.serverTime; a = d(c) } else a = d(); return a } function k() { q && (b.clearTimeout(q), q = null) } function l(a) { var c = j().diff(a, "day"), d = t && c >= t; if (d ? h.text(a.format(u)) : h.text(a.from(j(), r)), s && y && h.attr("title", a.local().format(s)), !d) { var e = Math.abs(j().diff(a, "minute")), f = 3600; 1 > e ? f = 1 : 60 > e ? f = 30 : 180 > e && (f = 300), q = b.setTimeout(function () { l(a) }, 1e3 * f) } } function m(a) { x && h.attr("datetime", a) } function n() { if (k(), o) { var a = e.preprocessDate(o); l(a), m(a.toISOString()) } } var o, p, q = null, r = f.withoutSuffix, s = f.titleFormat, t = f.fullDateThreshold, u = f.fullDateFormat, v = (new Date).getTime(), w = i.amTimeAgo, x = "TIME" === h[0].nodeName.toUpperCase(), y = !h.attr("title"); g.$watch(w, function (b) { return a(b) || "" === b ? (k(), void (o && (h.text(""), m(""), o = null))) : (o = b, void n()) }), c.isDefined(i.amFrom) && g.$watch(i.amFrom, function (b) { p = a(b) || "" === b ? null : d(b), n() }), c.isDefined(i.amWithoutSuffix) && g.$watch(i.amWithoutSuffix, function (a) { "boolean" == typeof a ? (r = a, n()) : r = f.withoutSuffix }), i.$observe("amFullDateThreshold", function (a) { t = a, n() }), i.$observe("amFullDateFormat", function (a) { u = a, n() }), g.$on("$destroy", function () { k() }), g.$on("amMoment:localeChanged", function () { n() }) } }]).service("amMoment", ["moment", "$rootScope", "$log", "angularMomentConfig", function (a, b, d, e) { var f = null; this.changeLocale = function (d, e) { var f = a.locale(d, e); return c.isDefined(d) && b.$broadcast("amMoment:localeChanged"), f }, this.changeTimezone = function (c) { a.tz && a.tz.setDefault ? (a.tz.setDefault(c), b.$broadcast("amMoment:timezoneChanged")) : d.warn("angular-moment: changeTimezone() works only with moment-timezone.js v0.3.0 or greater."), e.timezone = c, f = c }, this.preprocessDate = function (b) { return f !== e.timezone && this.changeTimezone(e.timezone), e.preprocess ? e.preprocess(b) : a(!isNaN(parseFloat(b)) && isFinite(b) ? parseInt(b, 10) : b) } }]).filter("amParse", ["moment", function (a) { return function (b, c) { return a(b, c) } }]).filter("amFromUnix", ["moment", function (a) { return function (b) { return a.unix(b) } }]).filter("amUtc", ["moment", function (a) { return function (b) { return a.utc(b) } }]).filter("amUtcOffset", ["amMoment", function (a) { function b(b, c) { return a.preprocessDate(b).utcOffset(c) } return b }]).filter("amLocal", ["moment", function (a) { return function (b) { return a.isMoment(b) ? b.local() : null } }]).filter("amTimezone", ["amMoment", "angularMomentConfig", "$log", function (a, b, c) { function d(b, d) { var e = a.preprocessDate(b); return d ? e.tz ? e.tz(d) : (c.warn("angular-moment: named timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js ?"), e) : e } return d }]).filter("amCalendar", ["moment", "amMoment", "angularMomentConfig", function (b, c, d) { function e(b) { if (a(b)) return ""; var d = c.preprocessDate(b); return d.isValid() ? d.calendar() : "" } return e.$stateful = d.statefulFilters, e }]).filter("amDifference", ["moment", "amMoment", "angularMomentConfig", function (b, c, d) { function e(d, e, f, g) { if (a(d)) return ""; var h = c.preprocessDate(d), i = a(e) ? b() : c.preprocessDate(e); return h.isValid() && i.isValid() ? h.diff(i, f, g) : "" } return e.$stateful = d.statefulFilters, e }]).filter("amDateFormat", ["moment", "amMoment", "angularMomentConfig", function (b, c, d) { function e(b, d) { if (a(b)) return ""; var e = c.preprocessDate(b); return e.isValid() ? e.format(d) : "" } return e.$stateful = d.statefulFilters, e }]).filter("amDurationFormat", ["moment", "angularMomentConfig", function (b, c) { function d(c, d, e) { return a(c) ? "" : b.duration(c, d).humanize(e) } return d.$stateful = c.statefulFilters, d }]).filter("amTimeAgo", ["moment", "amMoment", "angularMomentConfig", function (b, c, d) { function e(d, e, f) { var g, h; return a(d) ? "" : (d = c.preprocessDate(d), g = b(d), g.isValid() ? (h = b(f), !a(f) && h.isValid() ? g.from(h, e) : g.fromNow(e)) : "") } return e.$stateful = d.statefulFilters, e }]).filter("amSubtract", ["moment", "angularMomentConfig", function (b, c) { function d(c, d, e) { return a(c) ? "" : b(c).subtract(parseInt(d, 10), e) } return d.$stateful = c.statefulFilters, d }]).filter("amAdd", ["moment", "angularMomentConfig", function (b, c) { function d(c, d, e) { return a(c) ? "" : b(c).add(parseInt(d, 10), e) } return d.$stateful = c.statefulFilters, d }]).filter("amStartOf", ["moment", "angularMomentConfig", function (b, c) { function d(c, d) { return a(c) ? "" : b(c).startOf(d) } return d.$stateful = c.statefulFilters, d }]).filter("amEndOf", ["moment", "angularMomentConfig", function (b, c) { function d(c, d) { return a(c) ? "" : b(c).endOf(d) } return d.$stateful = c.statefulFilters, d }]) }  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(26), __webpack_require__(25)], __WEBPACK_AMD_DEFINE_FACTORY__ = (c), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof module && module && module.exports ? (c(require("angular"), require("moment")), module.exports = "angularMoment") : c(angular, ("undefined" != typeof global ? global : window).moment) }();
	//# sourceMappingURL=angular-moment.min.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = moment;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = angular;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	/**
	 * oclazyload - Load modules on demand (lazy load) with angularJS
	 * @version v1.0.9
	 * @link https://github.com/ocombe/ocLazyLoad
	 * @license MIT
	 * @author Olivier Combe <olivier.combe@gmail.com>
	 */
	!function(e,n){"use strict";var r=["ng","oc.lazyLoad"],o={},t=[],i=[],a=[],s=[],u=e.noop,c={},l=[],d=e.module("oc.lazyLoad",["ng"]);d.provider("$ocLazyLoad",["$controllerProvider","$provide","$compileProvider","$filterProvider","$injector","$animateProvider",function(d,f,p,m,v,y){function L(n,o,t){if(o){var i,s,d,f=[];for(i=o.length-1;i>=0;i--)if(s=o[i],e.isString(s)||(s=E(s)),s&&-1===l.indexOf(s)&&(!w[s]||-1!==a.indexOf(s))){var h=-1===r.indexOf(s);if(d=g(s),h&&(r.push(s),L(n,d.requires,t)),d._runBlocks.length>0)for(c[s]=[];d._runBlocks.length>0;)c[s].push(d._runBlocks.shift());e.isDefined(c[s])&&(h||t.rerun)&&(f=f.concat(c[s])),j(n,d._invokeQueue,s,t.reconfig),j(n,d._configBlocks,s,t.reconfig),u(h?"ocLazyLoad.moduleLoaded":"ocLazyLoad.moduleReloaded",s),o.pop(),l.push(s)}var p=n.getInstanceInjector();e.forEach(f,function(e){p.invoke(e)})}}function $(n,r){function t(n,r){var o,t=!0;return r.length&&(o=i(n),e.forEach(r,function(e){t=t&&i(e)!==o})),t}function i(n){return e.isArray(n)?M(n.toString()):e.isObject(n)?M(S(n)):e.isDefined(n)&&null!==n?M(n.toString()):n}var a=n[2][0],s=n[1],c=!1;e.isUndefined(o[r])&&(o[r]={}),e.isUndefined(o[r][s])&&(o[r][s]={});var l=function(e,n){o[r][s].hasOwnProperty(e)||(o[r][s][e]=[]),t(n,o[r][s][e])&&(c=!0,o[r][s][e].push(n),u("ocLazyLoad.componentLoaded",[r,s,e]))};if(e.isString(a))l(a,n[2][1]);else{if(!e.isObject(a))return!1;e.forEach(a,function(n,r){e.isString(n)?l(n,a[1]):l(r,n)})}return c}function j(n,r,o,i){if(r){var a,s,u,c;for(a=0,s=r.length;s>a;a++)if(u=r[a],e.isArray(u)){if(null!==n){if(!n.hasOwnProperty(u[0]))throw new Error("unsupported provider "+u[0]);c=n[u[0]]}var l=$(u,o);if("invoke"!==u[1])l&&e.isDefined(c)&&c[u[1]].apply(c,u[2]);else{var d=function(n){var r=t.indexOf(o+"-"+n);(-1===r||i)&&(-1===r&&t.push(o+"-"+n),e.isDefined(c)&&c[u[1]].apply(c,u[2]))};if(e.isFunction(u[2][0]))d(u[2][0]);else if(e.isArray(u[2][0]))for(var f=0,h=u[2][0].length;h>f;f++)e.isFunction(u[2][0][f])&&d(u[2][0][f])}}}}function E(n){var r=null;return e.isString(n)?r=n:e.isObject(n)&&n.hasOwnProperty("name")&&e.isString(n.name)&&(r=n.name),r}function _(n){if(!e.isString(n))return!1;try{return g(n)}catch(r){if(/No module/.test(r)||r.message.indexOf("$injector:nomod")>-1)return!1}}var w={},O={$controllerProvider:d,$compileProvider:p,$filterProvider:m,$provide:f,$injector:v,$animateProvider:y},x=!1,b=!1,z=[],D={};z.push=function(e){-1===this.indexOf(e)&&Array.prototype.push.apply(this,arguments)},this.config=function(n){e.isDefined(n.modules)&&(e.isArray(n.modules)?e.forEach(n.modules,function(e){w[e.name]=e}):w[n.modules.name]=n.modules),e.isDefined(n.debug)&&(x=n.debug),e.isDefined(n.events)&&(b=n.events)},this._init=function(o){if(0===i.length){var t=[o],a=["ng:app","ng-app","x-ng-app","data-ng-app"],u=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/,c=function(e){return e&&t.push(e)};e.forEach(a,function(n){a[n]=!0,c(document.getElementById(n)),n=n.replace(":","\\:"),"undefined"!=typeof o[0]&&o[0].querySelectorAll&&(e.forEach(o[0].querySelectorAll("."+n),c),e.forEach(o[0].querySelectorAll("."+n+"\\:"),c),e.forEach(o[0].querySelectorAll("["+n+"]"),c))}),e.forEach(t,function(n){if(0===i.length){var r=" "+o.className+" ",t=u.exec(r);t?i.push((t[2]||"").replace(/\s+/g,",")):e.forEach(n.attributes,function(e){0===i.length&&a[e.name]&&i.push(e.value)})}})}0!==i.length||(n.jasmine||n.mocha)&&e.isDefined(e.mock)||console.error("No module found during bootstrap, unable to init ocLazyLoad. You should always use the ng-app directive or angular.boostrap when you use ocLazyLoad.");var l=function d(n){if(-1===r.indexOf(n)){r.push(n);var o=e.module(n);j(null,o._invokeQueue,n),j(null,o._configBlocks,n),e.forEach(o.requires,d)}};e.forEach(i,function(e){l(e)}),i=[],s.pop()};var S=function(n){try{return JSON.stringify(n)}catch(r){var o=[];return JSON.stringify(n,function(n,r){if(e.isObject(r)&&null!==r){if(-1!==o.indexOf(r))return;o.push(r)}return r})}},M=function(e){var n,r,o,t=0;if(0==e.length)return t;for(n=0,o=e.length;o>n;n++)r=e.charCodeAt(n),t=(t<<5)-t+r,t|=0;return t};this.$get=["$log","$rootElement","$rootScope","$cacheFactory","$q",function(n,t,a,c,d){function f(e){var r=d.defer();return n.error(e.message),r.reject(e),r.promise}var p,m=c("ocLazyLoad");return x||(n={},n.error=e.noop,n.warn=e.noop,n.info=e.noop),O.getInstanceInjector=function(){return p?p:p=t.data("$injector")||e.injector()},u=function(e,r){b&&a.$broadcast(e,r),x&&n.info(e,r)},{_broadcast:u,_$log:n,_getFilesCache:function(){return m},toggleWatch:function(e){e?s.push(!0):s.pop()},getModuleConfig:function(n){if(!e.isString(n))throw new Error("You need to give the name of the module to get");return w[n]?e.copy(w[n]):null},setModuleConfig:function(n){if(!e.isObject(n))throw new Error("You need to give the module config object to set");return w[n.name]=n,n},getModules:function(){return r},isLoaded:function(n){var o=function(e){var n=r.indexOf(e)>-1;return n||(n=!!_(e)),n};if(e.isString(n)&&(n=[n]),e.isArray(n)){var t,i;for(t=0,i=n.length;i>t;t++)if(!o(n[t]))return!1;return!0}throw new Error("You need to define the module(s) name(s)")},_getModuleName:E,_getModule:function(e){try{return g(e)}catch(n){throw(/No module/.test(n)||n.message.indexOf("$injector:nomod")>-1)&&(n.message='The module "'+S(e)+'" that you are trying to load does not exist. '+n.message),n}},moduleExists:_,_loadDependencies:function(n,r){var o,t,i,a=[],s=this;if(n=s._getModuleName(n),null===n)return d.when();try{o=s._getModule(n)}catch(u){return f(u)}return t=s.getRequires(o),e.forEach(t,function(o){if(e.isString(o)){var t=s.getModuleConfig(o);if(null===t)return void z.push(o);o=t,t.name=void 0}if(s.moduleExists(o.name))return i=o.files.filter(function(e){return s.getModuleConfig(o.name).files.indexOf(e)<0}),0!==i.length&&s._$log.warn('Module "',n,'" attempted to redefine configuration for dependency. "',o.name,'"\n Additional Files Loaded:',i),e.isDefined(s.filesLoader)?void a.push(s.filesLoader(o,r).then(function(){return s._loadDependencies(o)})):f(new Error("Error: New dependencies need to be loaded from external files ("+o.files+"), but no loader has been defined."));if(e.isArray(o)){var u=[];e.forEach(o,function(e){var n=s.getModuleConfig(e);null===n?u.push(e):n.files&&(u=u.concat(n.files))}),u.length>0&&(o={files:u})}else e.isObject(o)&&o.hasOwnProperty("name")&&o.name&&(s.setModuleConfig(o),z.push(o.name));if(e.isDefined(o.files)&&0!==o.files.length){if(!e.isDefined(s.filesLoader))return f(new Error('Error: the module "'+o.name+'" is defined in external files ('+o.files+"), but no loader has been defined."));a.push(s.filesLoader(o,r).then(function(){return s._loadDependencies(o)}))}}),d.all(a)},inject:function(n){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],t=this,a=d.defer();if(e.isDefined(n)&&null!==n){if(e.isArray(n)){var s=[];return e.forEach(n,function(e){s.push(t.inject(e,r,o))}),d.all(s)}t._addToLoadList(t._getModuleName(n),!0,o)}if(i.length>0){var u=i.slice(),c=function f(e){z.push(e),D[e]=a.promise,t._loadDependencies(e,r).then(function(){try{l=[],L(O,z,r)}catch(e){return t._$log.error(e.message),void a.reject(e)}i.length>0?f(i.shift()):a.resolve(u)},function(e){a.reject(e)})};c(i.shift())}else{if(r&&r.name&&D[r.name])return D[r.name];a.resolve()}return a.promise},getRequires:function(n){var o=[];return e.forEach(n.requires,function(e){-1===r.indexOf(e)&&o.push(e)}),o},_invokeQueue:j,_registerInvokeList:$,_register:L,_addToLoadList:h,_unregister:function(n){e.isDefined(n)&&e.isArray(n)&&e.forEach(n,function(e){o[e]=void 0})}}}],this._init(e.element(n.document))}]);var f=e.bootstrap;e.bootstrap=function(n,r,o){return e.forEach(r.slice(),function(e){h(e,!0,!0)}),f(n,r,o)};var h=function(n,r,o){(s.length>0||r)&&e.isString(n)&&-1===i.indexOf(n)&&(i.push(n),o&&a.push(n))},g=e.module;e.module=function(e,n,r){return h(e,!1,!0),g(e,n,r)},"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="oc.lazyLoad")}(angular,window),function(e){"use strict";e.module("oc.lazyLoad").directive("ocLazyLoad",["$ocLazyLoad","$compile","$animate","$parse","$timeout",function(n,r,o,t,i){return{restrict:"A",terminal:!0,priority:1e3,compile:function(i,a){var s=i[0].innerHTML;return i.html(""),function(i,a,u){var c=t(u.ocLazyLoad);i.$watch(function(){return c(i)||u.ocLazyLoad},function(t){e.isDefined(t)&&n.load(t).then(function(){o.enter(s,a),r(a.contents())(i)})},!0)}}}}])}(angular),function(e){"use strict";e.module("oc.lazyLoad").config(["$provide",function(n){n.decorator("$ocLazyLoad",["$delegate","$q","$window","$interval",function(n,r,o,t){var i=!1,a=!1,s=o.document.getElementsByTagName("head")[0]||o.document.getElementsByTagName("body")[0];return n.buildElement=function(u,c,l){var d,f,h=r.defer(),g=n._getFilesCache(),p=function(e){var n=(new Date).getTime();return e.indexOf("?")>=0?"&"===e.substring(0,e.length-1)?e+"_dc="+n:e+"&_dc="+n:e+"?_dc="+n};switch(e.isUndefined(g.get(c))&&g.put(c,h.promise),u){case"css":d=o.document.createElement("link"),d.type="text/css",d.rel="stylesheet",d.href=l.cache===!1?p(c):c;break;case"js":d=o.document.createElement("script"),d.src=l.cache===!1?p(c):c;break;default:g.remove(c),h.reject(new Error('Requested type "'+u+'" is not known. Could not inject "'+c+'"'))}d.onload=d.onreadystatechange=function(e){d.readyState&&!/^c|loade/.test(d.readyState)||f||(d.onload=d.onreadystatechange=null,f=1,n._broadcast("ocLazyLoad.fileLoaded",c),h.resolve())},d.onerror=function(){g.remove(c),h.reject(new Error("Unable to load "+c))},d.async=l.serie?0:1;var m=s.lastChild;if(l.insertBefore){var v=e.element(e.isDefined(window.jQuery)?l.insertBefore:document.querySelector(l.insertBefore));v&&v.length>0&&(m=v[0])}if(m.parentNode.insertBefore(d,m),"css"==u){if(!i){var y=o.navigator.userAgent.toLowerCase();if(/iP(hone|od|ad)/.test(o.navigator.platform)){var L=o.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),$=parseFloat([parseInt(L[1],10),parseInt(L[2],10),parseInt(L[3]||0,10)].join("."));a=6>$}else if(y.indexOf("android")>-1){var j=parseFloat(y.slice(y.indexOf("android")+8));a=4.4>j}else if(y.indexOf("safari")>-1){var E=y.match(/version\/([\.\d]+)/i);a=E&&E[1]&&parseFloat(E[1])<6}}if(a)var _=1e3,w=t(function(){try{d.sheet.cssRules,t.cancel(w),d.onload()}catch(e){--_<=0&&d.onerror()}},20)}return h.promise},n}])}])}(angular),function(e){"use strict";e.module("oc.lazyLoad").config(["$provide",function(n){n.decorator("$ocLazyLoad",["$delegate","$q",function(n,r){return n.filesLoader=function(o){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=[],a=[],s=[],u=[],c=null,l=n._getFilesCache();n.toggleWatch(!0),e.extend(t,o);var d=function(r){var o,d=null;if(e.isObject(r)&&(d=r.type,r=r.path),c=l.get(r),e.isUndefined(c)||t.cache===!1){if(null!==(o=/^(css|less|html|htm|js)?(?=!)/.exec(r))&&(d=o[1],r=r.substr(o[1].length+1,r.length)),!d)if(null!==(o=/[.](css|less|html|htm|js)?((\?|#).*)?$/.exec(r)))d=o[1];else{if(n.jsLoader.hasOwnProperty("ocLazyLoadLoader")||!n.jsLoader.hasOwnProperty("requirejs"))return void n._$log.error("File type could not be determined. "+r);d="js"}"css"!==d&&"less"!==d||-1!==i.indexOf(r)?"html"!==d&&"htm"!==d||-1!==a.indexOf(r)?"js"===d||-1===s.indexOf(r)?s.push(r):n._$log.error("File type is not valid. "+r):a.push(r):i.push(r)}else c&&u.push(c)};if(t.serie?d(t.files.shift()):e.forEach(t.files,function(e){d(e)}),i.length>0){var f=r.defer();n.cssLoader(i,function(r){e.isDefined(r)&&n.cssLoader.hasOwnProperty("ocLazyLoadLoader")?(n._$log.error(r),f.reject(r)):f.resolve()},t),u.push(f.promise)}if(a.length>0){var h=r.defer();n.templatesLoader(a,function(r){e.isDefined(r)&&n.templatesLoader.hasOwnProperty("ocLazyLoadLoader")?(n._$log.error(r),h.reject(r)):h.resolve()},t),u.push(h.promise)}if(s.length>0){var g=r.defer();n.jsLoader(s,function(r){e.isDefined(r)&&(n.jsLoader.hasOwnProperty("ocLazyLoadLoader")||n.jsLoader.hasOwnProperty("requirejs"))?(n._$log.error(r),g.reject(r)):g.resolve()},t),u.push(g.promise)}if(0===u.length){var p=r.defer(),m="Error: no file to load has been found, if you're trying to load an existing module you should use the 'inject' method instead of 'load'.";return n._$log.error(m),p.reject(m),p.promise}return t.serie&&t.files.length>0?r.all(u).then(function(){return n.filesLoader(o,t)}):r.all(u)["finally"](function(e){return n.toggleWatch(!1),e})},n.load=function(o){var t,i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],a=this,s=null,u=[],c=r.defer(),l=e.copy(o),d=e.copy(i);if(e.isArray(l))return e.forEach(l,function(e){u.push(a.load(e,d))}),r.all(u).then(function(e){c.resolve(e)},function(e){c.reject(e)}),c.promise;if(e.isString(l)?(s=a.getModuleConfig(l),s||(s={files:[l]})):e.isObject(l)&&(s=e.isDefined(l.path)&&e.isDefined(l.type)?{files:[l]}:a.setModuleConfig(l)),null===s){var f=a._getModuleName(l);return t='Module "'+(f||"unknown")+'" is not configured, cannot load.',n._$log.error(t),c.reject(new Error(t)),c.promise}e.isDefined(s.template)&&(e.isUndefined(s.files)&&(s.files=[]),e.isString(s.template)?s.files.push(s.template):e.isArray(s.template)&&s.files.concat(s.template));var h=e.extend({},d,s);return e.isUndefined(s.files)&&e.isDefined(s.name)&&n.moduleExists(s.name)?n.inject(s.name,h,!0):(n.filesLoader(s,h).then(function(){n.inject(null,h).then(function(e){c.resolve(e)},function(e){c.reject(e)})},function(e){c.reject(e)}),c.promise)},n}])}])}(angular),function(e){"use strict";e.module("oc.lazyLoad").config(["$provide",function(n){n.decorator("$ocLazyLoad",["$delegate","$q",function(n,r){return n.cssLoader=function(o,t,i){var a=[];e.forEach(o,function(e){a.push(n.buildElement("css",e,i))}),r.all(a).then(function(){t()},function(e){t(e)})},n.cssLoader.ocLazyLoadLoader=!0,n}])}])}(angular),function(e){"use strict";e.module("oc.lazyLoad").config(["$provide",function(n){n.decorator("$ocLazyLoad",["$delegate","$q",function(n,r){return n.jsLoader=function(o,t,i){var a=[];e.forEach(o,function(e){a.push(n.buildElement("js",e,i))}),r.all(a).then(function(){t()},function(e){t(e)})},n.jsLoader.ocLazyLoadLoader=!0,n}])}])}(angular),function(e){"use strict";e.module("oc.lazyLoad").config(["$provide",function(n){n.decorator("$ocLazyLoad",["$delegate","$templateCache","$q","$http",function(n,r,o,t){return n.templatesLoader=function(i,a,s){var u=[],c=n._getFilesCache();return e.forEach(i,function(n){var i=o.defer();u.push(i.promise),t.get(n,s).success(function(o){e.isString(o)&&o.length>0&&e.forEach(e.element(o),function(e){"SCRIPT"===e.nodeName&&"text/ng-template"===e.type&&r.put(e.id,e.innerHTML)}),e.isUndefined(c.get(n))&&c.put(n,!0),i.resolve()}).error(function(e){i.reject(new Error('Unable to load template file "'+n+'": '+e))})}),o.all(u).then(function(){a()},function(e){a(e)})},n.templatesLoader.ocLazyLoadLoader=!0,n}])}])}(angular),Array.prototype.indexOf||(Array.prototype.indexOf=function(e,n){var r;if(null==this)throw new TypeError('"this" is null or not defined');var o=Object(this),t=o.length>>>0;if(0===t)return-1;var i=+n||0;if(Math.abs(i)===1/0&&(i=0),i>=t)return-1;for(r=Math.max(i>=0?i:t-Math.abs(i),0);t>r;){if(r in o&&o[r]===e)return r;r++}return-1});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	/*
	 AngularJS v1.3.17
	 (c) 2010-2014 Google, Inc. http://angularjs.org
	 License: MIT
	*/
	(function(n,h,p){'use strict';function E(a){var e=[];r(e,h.noop).chars(a);return e.join("")}function g(a){var e={};a=a.split(",");var d;for(d=0;d<a.length;d++)e[a[d]]=!0;return e}function F(a,e){function d(a,b,d,l){b=h.lowercase(b);if(s[b])for(;f.last()&&t[f.last()];)c("",f.last());u[b]&&f.last()==b&&c("",b);(l=v[b]||!!l)||f.push(b);var m={};d.replace(G,function(a,b,e,c,d){m[b]=q(e||c||d||"")});e.start&&e.start(b,m,l)}function c(a,b){var c=0,d;if(b=h.lowercase(b))for(c=f.length-1;0<=c&&f[c]!=b;c--);
	if(0<=c){for(d=f.length-1;d>=c;d--)e.end&&e.end(f[d]);f.length=c}}"string"!==typeof a&&(a=null===a||"undefined"===typeof a?"":""+a);var b,k,f=[],m=a,l;for(f.last=function(){return f[f.length-1]};a;){l="";k=!0;if(f.last()&&w[f.last()])a=a.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*"+f.last()+"[^>]*>","i"),function(a,b){b=b.replace(H,"$1").replace(I,"$1");e.chars&&e.chars(q(b));return""}),c("",f.last());else{if(0===a.indexOf("\x3c!--"))b=a.indexOf("--",4),0<=b&&a.lastIndexOf("--\x3e",b)===b&&(e.comment&&
	e.comment(a.substring(4,b)),a=a.substring(b+3),k=!1);else if(x.test(a)){if(b=a.match(x))a=a.replace(b[0],""),k=!1}else if(J.test(a)){if(b=a.match(y))a=a.substring(b[0].length),b[0].replace(y,c),k=!1}else K.test(a)&&((b=a.match(z))?(b[4]&&(a=a.substring(b[0].length),b[0].replace(z,d)),k=!1):(l+="<",a=a.substring(1)));k&&(b=a.indexOf("<"),l+=0>b?a:a.substring(0,b),a=0>b?"":a.substring(b),e.chars&&e.chars(q(l)))}if(a==m)throw L("badparse",a);m=a}c()}function q(a){if(!a)return"";A.innerHTML=a.replace(/</g,
	"&lt;");return A.textContent}function B(a){return a.replace(/&/g,"&amp;").replace(M,function(a){var d=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(d-55296)+(a-56320)+65536)+";"}).replace(N,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(a,e){var d=!1,c=h.bind(a,a.push);return{start:function(a,k,f){a=h.lowercase(a);!d&&w[a]&&(d=a);d||!0!==C[a]||(c("<"),c(a),h.forEach(k,function(d,f){var k=h.lowercase(f),g="img"===a&&"src"===k||"background"===
	k;!0!==O[k]||!0===D[k]&&!e(d,g)||(c(" "),c(f),c('="'),c(B(d)),c('"'))}),c(f?"/>":">"))},end:function(a){a=h.lowercase(a);d||!0!==C[a]||(c("</"),c(a),c(">"));a==d&&(d=!1)},chars:function(a){d||c(B(a))}}}var L=h.$$minErr("$sanitize"),z=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,y=/^<\/\s*([\w:-]+)[^>]*>/,G=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,K=/^</,J=/^<\//,H=/\x3c!--(.*?)--\x3e/g,x=/<!DOCTYPE([^>]*?)>/i,
	I=/<!\[CDATA\[(.*?)]]\x3e/g,M=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,N=/([^\#-~| |!])/g,v=g("area,br,col,hr,img,wbr");n=g("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");p=g("rp,rt");var u=h.extend({},p,n),s=h.extend({},n,g("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),t=h.extend({},p,g("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
	n=g("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use");var w=g("script,style"),C=h.extend({},v,s,t,u,n),D=g("background,cite,href,longdesc,src,usemap,xlink:href");n=g("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width");
	p=g("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan");
	var O=h.extend({},D,p,n),A=document.createElement("pre");h.module("ngSanitize",[]).provider("$sanitize",function(){this.$get=["$$sanitizeUri",function(a){return function(e){var d=[];F(e,r(d,function(c,b){return!/^unsafe/.test(a(c,b))}));return d.join("")}}]});h.module("ngSanitize").filter("linky",["$sanitize",function(a){var e=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,d=/^mailto:/i;return function(c,b){function k(a){a&&g.push(E(a))}function f(a,c){g.push("<a ");
	h.isDefined(b)&&g.push('target="',b,'" ');g.push('href="',a.replace(/"/g,"&quot;"),'">');k(c);g.push("</a>")}if(!c)return c;for(var m,l=c,g=[],n,p;m=l.match(e);)n=m[0],m[2]||m[4]||(n=(m[3]?"http://":"mailto:")+n),p=m.index,k(l.substr(0,p)),f(n,m[0].replace(d,"")),l=l.substring(p+m[0].length);k(l);return a(g.join(""))}}])})(window,window.angular);
	//# sourceMappingURL=angular-sanitize.min.js.map


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	angular.module('SignalR', [])
	.constant('$', window.jQuery)
	.factory('Hub', ['$', function ($) {
		//This will allow same connection to be used for all Hubs
		//It also keeps connection as singleton.
		var globalConnections = [];

		function initNewConnection(options) {
			var connection = null;
			if (options && options.rootPath) {
				connection = $.hubConnection(options.rootPath, { useDefaultPath: false });
			} else {
				connection = $.hubConnection();
			}

			connection.logging = (options && options.logging ? true : false);
			return connection;
		}

		function getConnection(options) {
			var useSharedConnection = !(options && options.useSharedConnection === false);
			if (useSharedConnection) {
				return typeof globalConnections[options.rootPath] === 'undefined' ?
				globalConnections[options.rootPath] = initNewConnection(options) :
				globalConnections[options.rootPath];
			}
			else {
				return initNewConnection(options);
			}
		}

		return function (hubName, options) {
			var Hub = this;

			Hub.connection = getConnection(options);
			Hub.proxy = Hub.connection.createHubProxy(hubName);

			Hub.on = function (event, fn) {
				Hub.proxy.on(event, fn);
			};
			Hub.invoke = function (method, args) {
				return Hub.proxy.invoke.apply(Hub.proxy, arguments)
			};
			Hub.disconnect = function () {
				Hub.connection.stop();
			};
			Hub.connect = function (queryParams) {
				var startOptions = {};
				if (options.transport) startOptions.transport = options.transport;
				if (options.jsonp) startOptions.jsonp = options.jsonp;
				if (options.pingInterval !== undefined) startOptions.pingInterval = options.pingInterval;
				
				if (angular.isDefined(options.withCredentials)) startOptions.withCredentials = options.withCredentials;
				if(queryParams) Hub.connection.qs = queryParams;
				return Hub.connection.start(startOptions);
			};

			if (options && options.listeners) {
				Object.getOwnPropertyNames(options.listeners)
				.filter(function (propName) {
			        	return typeof options.listeners[propName] === 'function';})
			        .forEach(function (propName) {
			        	Hub.on(propName, options.listeners[propName]);
			    	});
			}
			if (options && options.methods) {
				angular.forEach(options.methods, function (method) {
					Hub[method] = function () {
						var args = $.makeArray(arguments);
						args.unshift(method);
						return Hub.invoke.apply(Hub, args);
					};
				});
			}
			if (options && options.queryParams) {
				Hub.connection.qs = options.queryParams;
			}
			if (options && options.errorHandler) {
				Hub.connection.error(options.errorHandler);
			}
			if (options && options.stateChanged) {
			    Hub.connection.stateChanged(options.stateChanged);
			}

			//Adding additional property of promise allows to access it in rest of the application.
			if(options.autoConnect === undefined || options.autoConnect){
				Hub.promise = Hub.connect();	
			}
			
			return Hub;
		};
	}]);

	// Common.js package manager support (e.g. ComponentJS, WebPack)
	if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
	  module.exports = 'SignalR';
	}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	angular.module('ui.slimscroll', []).directive('slimscroll', ['$timeout', '$window', function ($timeout, $window) {
	    'use strict';

	    return {
	        restrict: 'A',
	        link: function ($scope, $elem, $attr) {
	            var off = [];
	            var option = {};

	            var refresh = function () {

	                var isEventBound = false;

	                $timeout(function () {
	                    if (angular.isDefined($attr.slimscroll)) {
	                        option = $scope.$eval($attr.slimscroll) || {};
	                    } else if ($attr.slimscrollOption) {
	                        option = $scope.$eval($attr.slimscrollOption) || {};
	                    }

	                    var el = angular.element($elem);

	                    el.slimScroll({ destroy: true });

	                    if (option.onScroll && !isEventBound) {
	                        el.slimScroll(option).bind('slimscrolling', function (e, pos) {
	                            option.onScroll();
	                            isEventBound = true;
	                        });
	                    } else {
	                        el.slimScroll(option);
	                    }
	                });
	            };

	            angular.element($window).bind('resize', function () {
	                if ($attr.slimscroll) {
	                    option = $scope.$eval($attr.slimscroll);
	                } else if ($attr.slimscrollOption) {
	                    option = $scope.$eval($attr.slimscrollOption);
	                }

	                $($elem).slimScroll(option);
	            });

	            var registerWatch = function () {
	                if (angular.isDefined($attr.slimscroll) && !option.noWatch) {
	                    off.push($scope.$watchCollection($attr.slimscroll, refresh));
	                }

	                if ($attr.slimscrollWatch) {
	                    off.push($scope.$watchCollection($attr.slimscrollWatch, refresh));
	                }

	                if ($attr.slimscrolllistento) {
	                    off.push($scope.$on($attr.slimscrolllistento, refresh));
	                }
	            };

	            var destructor = function () {
	                angular.element($elem).slimScroll({ destroy: true });
	                off.forEach(function (unbind) {
	                    unbind();
	                });
	                off = null;
	            };

	            off.push($scope.$on('$destroy', destructor));

	            registerWatch();
	        }
	    };
	}]);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * angucomplete-alt
	 * Autocomplete directive for AngularJS
	 * This is a fork of Daryl Rowland's angucomplete with some extra features.
	 * By Hidenari Nozaki
	 */

	/*! Copyright (c) 2014 Hidenari Nozaki and contributors | Licensed under the MIT license */

	(function (root, factory) {
	    'use strict';
	    if (typeof module !== 'undefined' && module.exports) {
	        // CommonJS
	        module.exports = factory(__webpack_require__(26));
	    } else if (true) {
	        // AMD
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(26)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        // Global Variables
	        factory(root.angular);
	    }
	}(window, function (angular) {
	    'use strict';

	    angular.module('angucomplete-alt', []).directive('angucompleteAlt', ['$q', '$parse', '$http', '$sce', '$timeout', '$templateCache', '$interpolate', function ($q, $parse, $http, $sce, $timeout, $templateCache, $interpolate) {
	        // keyboard events
	        var KEY_DW = 40;
	        var KEY_RT = 39;
	        var KEY_UP = 38;
	        var KEY_LF = 37;
	        var KEY_ES = 27;
	        var KEY_EN = 13;
	        var KEY_TAB = 9;

	        var MIN_LENGTH = 3;
	        var MAX_LENGTH = 524288;  // the default max length per the html maxlength attribute
	        var PAUSE = 500;
	        var BLUR_TIMEOUT = 200;

	        // string constants
	        var REQUIRED_CLASS = 'autocomplete-required';
	        var TEXT_SEARCHING = 'Searching...';
	        var TEXT_NORESULTS = 'No results found';
	        var TEMPLATE_URL = '/angucomplete-alt/index.html';

	        // Set the default template for this directive
	        $templateCache.put(TEMPLATE_URL,
	            '<div class="angucomplete-holder" ng-class="{\'angucomplete-dropdown-visible\': showDropdown}">' +
	            '  <input id="{{id}}_value" name="{{inputName}}" tabindex="{{fieldTabindex}}" ng-class="{\'angucomplete-input-not-empty\': notEmpty}" ng-model="searchStr" ng-disabled="disableInput" type="{{inputType}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" ng-focus="onFocusHandler()" class="{{inputClass}}" ng-focus="resetHideResults()" ng-blur="hideResults($event)" autocapitalize="off" autocorrect="off" autocomplete="off" ng-change="inputChangeHandler(searchStr)"/>' +
	            '  <div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-show="showDropdown">' +
	            '    <div class="angucomplete-searching" ng-show="searching" ng-bind="textSearching"></div>' +
	            '    <div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" ng-bind="textNoResults"></div>' +
	            '    <div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseenter="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">' +
	            '      <div ng-if="imageField" class="angucomplete-image-holder">' +
	            '        <img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>' +
	            '        <div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div>' +
	            '      </div>' +
	            '      <div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div>' +
	            '      <div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div>' +
	            '      <div ng-if="matchClass && result.description && result.description != \'\'" class="angucomplete-description" ng-bind-html="result.description"></div>' +
	            '      <div ng-if="!matchClass && result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>' +
	            '    </div>' +
	            '  </div>' +
	            '</div>'
	        );

	        function link(scope, elem, attrs, ctrl) {
	            var inputField = elem.find('input');
	            var minlength = MIN_LENGTH;
	            var searchTimer = null;
	            var hideTimer;
	            var requiredClassName = REQUIRED_CLASS;
	            var responseFormatter;
	            var validState = null;
	            var httpCanceller = null;
	            var httpCallInProgress = false;
	            var dd = elem[0].querySelector('.angucomplete-dropdown');
	            var isScrollOn = false;
	            var mousedownOn = null;
	            var unbindInitialValue;
	            var displaySearching;
	            var displayNoResults;

	            elem.on('mousedown', function (event) {
	                if (event.target.id) {
	                    mousedownOn = event.target.id;
	                    if (mousedownOn === scope.id + '_dropdown') {
	                        document.body.addEventListener('click', clickoutHandlerForDropdown);
	                    }
	                }
	                else {
	                    mousedownOn = event.target.className;
	                }
	            });

	            scope.currentIndex = scope.focusFirst ? 0 : null;
	            scope.searching = false;
	            unbindInitialValue = scope.$watch('initialValue', function (newval) {
	                if (newval) {
	                    // remove scope listener
	                    unbindInitialValue();
	                    // change input
	                    handleInputChange(newval, true);
	                }
	            });

	            scope.$watch('fieldRequired', function (newval, oldval) {
	                if (newval !== oldval) {
	                    if (!newval) {
	                        ctrl[scope.inputName].$setValidity(requiredClassName, true);
	                    }
	                    else if (!validState || scope.currentIndex === -1) {
	                        handleRequired(false);
	                    }
	                    else {
	                        handleRequired(true);
	                    }
	                }
	            });

	            scope.$on('angucomplete-alt:clearInput', function (event, elementId) {
	                if (!elementId || elementId === scope.id) {
	                    scope.searchStr = null;
	                    callOrAssign();
	                    handleRequired(false);
	                    clearResults();
	                }
	            });

	            scope.$on('angucomplete-alt:changeInput', function (event, elementId, newval) {
	                if (!!elementId && elementId === scope.id) {
	                    handleInputChange(newval);
	                }
	            });

	            function handleInputChange(newval, initial) {
	                if (newval) {
	                    if (typeof newval === 'object') {
	                        scope.searchStr = extractTitle(newval);
	                        callOrAssign({ originalObject: newval });
	                    } else if (typeof newval === 'string' && newval.length > 0) {
	                        scope.searchStr = newval;
	                    } else {
	                        if (console && console.error) {
	                            console.error('Tried to set ' + (!!initial ? 'initial' : '') + ' value of angucomplete to', newval, 'which is an invalid value');
	                        }
	                    }

	                    handleRequired(true);
	                }
	            }

	            // #194 dropdown list not consistent in collapsing (bug).
	            function clickoutHandlerForDropdown(event) {
	                mousedownOn = null;
	                scope.hideResults(event);
	                document.body.removeEventListener('click', clickoutHandlerForDropdown);
	            }

	            // for IE8 quirkiness about event.which
	            function ie8EventNormalizer(event) {
	                return event.which ? event.which : event.keyCode;
	            }

	            function callOrAssign(value) {
	                if (typeof scope.selectedObject === 'function') {
	                    scope.selectedObject(value, scope.selectedObjectData);
	                }
	                else {
	                    scope.selectedObject = value;
	                }

	                if (value) {
	                    handleRequired(true);
	                }
	                else {
	                    handleRequired(false);
	                }
	            }

	            function callFunctionOrIdentity(fn) {
	                return function (data) {
	                    return scope[fn] ? scope[fn](data) : data;
	                };
	            }

	            function setInputString(str) {
	                callOrAssign({ originalObject: str });

	                if (scope.clearSelected) {
	                    scope.searchStr = null;
	                }
	                clearResults();
	            }

	            function extractTitle(data) {
	                // split title fields and run extractValue for each and join with ' '
	                return scope.titleField.split(',')
	                  .map(function (field) {
	                      return extractValue(data, field);
	                  })
	                  .join(' ');
	            }

	            function extractValue(obj, key) {
	                var keys, result;
	                if (key) {
	                    keys = key.split('.');
	                    result = obj;
	                    for (var i = 0; i < keys.length; i++) {
	                        result = result[keys[i]];
	                    }
	                }
	                else {
	                    result = obj;
	                }
	                return result;
	            }

	            function findMatchString(target, str) {
	                var result, matches, re;
	                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
	                // Escape user input to be treated as a literal string within a regular expression
	                re = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
	                if (!target) { return; }
	                if (!target.match || !target.replace) { target = target.toString(); }
	                matches = target.match(re);
	                if (matches) {
	                    result = target.replace(re,
	                        '<span class="' + scope.matchClass + '">' + matches[0] + '</span>');
	                }
	                else {
	                    result = target;
	                }
	                return $sce.trustAsHtml(result);
	            }

	            function handleRequired(valid) {
	                scope.notEmpty = valid;
	                validState = scope.searchStr;
	                if (scope.fieldRequired && ctrl && scope.inputName) {
	                    ctrl[scope.inputName].$setValidity(requiredClassName, valid);
	                }
	            }

	            function keyupHandler(event) {
	                var which = ie8EventNormalizer(event);
	                if (which === KEY_LF || which === KEY_RT) {
	                    // do nothing
	                    return;
	                }

	                if (which === KEY_UP || which === KEY_EN) {
	                    event.preventDefault();
	                }
	                else if (which === KEY_DW) {
	                    event.preventDefault();
	                    if (!scope.showDropdown && scope.searchStr && scope.searchStr.length >= minlength) {
	                        initResults();
	                        scope.searching = true;
	                        searchTimerComplete(scope.searchStr);
	                    }
	                }
	                else if (which === KEY_ES) {
	                    clearResults();
	                    scope.$apply(function () {
	                        inputField.val(scope.searchStr);
	                    });
	                }
	                else {
	                    if (minlength === 0 && !scope.searchStr) {
	                        return;
	                    }

	                    if (!scope.searchStr || scope.searchStr === '') {
	                        scope.showDropdown = false;
	                    } else if (scope.searchStr.length >= minlength) {
	                        initResults();

	                        if (searchTimer) {
	                            $timeout.cancel(searchTimer);
	                        }

	                        scope.searching = true;

	                        searchTimer = $timeout(function () {
	                            searchTimerComplete(scope.searchStr);
	                        }, scope.pause);
	                    }

	                    if (validState && validState !== scope.searchStr && !scope.clearSelected) {
	                        scope.$apply(function () {
	                            callOrAssign();
	                        });
	                    }
	                }
	            }

	            function handleOverrideSuggestions(event) {
	                if (scope.overrideSuggestions &&
	                    !(scope.selectedObject && scope.selectedObject.originalObject === scope.searchStr)) {
	                    if (event) {
	                        event.preventDefault();
	                    }

	                    // cancel search timer
	                    $timeout.cancel(searchTimer);
	                    // cancel http request
	                    cancelHttpRequest();

	                    setInputString(scope.searchStr);
	                }
	            }

	            function dropdownRowOffsetHeight(row) {
	                var css = getComputedStyle(row);
	                return row.offsetHeight +
	                  parseInt(css.marginTop, 10) + parseInt(css.marginBottom, 10);
	            }

	            function dropdownHeight() {
	                return dd.getBoundingClientRect().top +
	                  parseInt(getComputedStyle(dd).maxHeight, 10);
	            }

	            function dropdownRow() {
	                return elem[0].querySelectorAll('.angucomplete-row')[scope.currentIndex];
	            }

	            function dropdownRowTop() {
	                return dropdownRow().getBoundingClientRect().top -
	                  (dd.getBoundingClientRect().top +
	                   parseInt(getComputedStyle(dd).paddingTop, 10));
	            }

	            function dropdownScrollTopTo(offset) {
	                dd.scrollTop = dd.scrollTop + offset;
	            }

	            function updateInputField() {
	                var current = scope.results[scope.currentIndex];
	                if (scope.matchClass) {
	                    inputField.val(extractTitle(current.originalObject));
	                }
	                else {
	                    inputField.val(current.title);
	                }
	            }

	            function keydownHandler(event) {
	                var which = ie8EventNormalizer(event);
	                var row = null;
	                var rowTop = null;

	                if (which === KEY_EN && scope.results) {
	                    if (scope.currentIndex >= 0 && scope.currentIndex < scope.results.length) {
	                        event.preventDefault();
	                        scope.selectResult(scope.results[scope.currentIndex]);
	                    } else {
	                        handleOverrideSuggestions(event);
	                        clearResults();
	                    }
	                    scope.$apply();
	                } else if (which === KEY_DW && scope.results) {
	                    event.preventDefault();
	                    if ((scope.currentIndex + 1) < scope.results.length && scope.showDropdown) {
	                        scope.$apply(function () {
	                            scope.currentIndex++;
	                            updateInputField();
	                        });

	                        if (isScrollOn) {
	                            row = dropdownRow();
	                            if (dropdownHeight() < row.getBoundingClientRect().bottom) {
	                                dropdownScrollTopTo(dropdownRowOffsetHeight(row));
	                            }
	                        }
	                    }
	                } else if (which === KEY_UP && scope.results) {
	                    event.preventDefault();
	                    if (scope.currentIndex >= 1) {
	                        scope.$apply(function () {
	                            scope.currentIndex--;
	                            updateInputField();
	                        });

	                        if (isScrollOn) {
	                            rowTop = dropdownRowTop();
	                            if (rowTop < 0) {
	                                dropdownScrollTopTo(rowTop - 1);
	                            }
	                        }
	                    }
	                    else if (scope.currentIndex === 0) {
	                        scope.$apply(function () {
	                            scope.currentIndex = -1;
	                            inputField.val(scope.searchStr);
	                        });
	                    }
	                } else if (which === KEY_TAB) {
	                    if (scope.results && scope.results.length > 0 && scope.showDropdown) {
	                        if (scope.currentIndex === -1 && scope.overrideSuggestions) {
	                            // intentionally not sending event so that it does not
	                            // prevent default tab behavior
	                            handleOverrideSuggestions();
	                        }
	                        else {
	                            if (scope.currentIndex === -1) {
	                                scope.currentIndex = 0;
	                            }
	                            scope.selectResult(scope.results[scope.currentIndex]);
	                            scope.$digest();
	                        }
	                    }
	                    else {
	                        // no results
	                        // intentionally not sending event so that it does not
	                        // prevent default tab behavior
	                        if (scope.searchStr && scope.searchStr.length > 0) {
	                            handleOverrideSuggestions();
	                        }
	                    }
	                } else if (which === KEY_ES) {
	                    // This is very specific to IE10/11 #272
	                    // without this, IE clears the input text
	                    event.preventDefault();
	                }
	            }

	            function httpSuccessCallbackGen(str) {
	                return function (responseData, status, headers, config) {
	                    // normalize return obejct from promise
	                    if (!status && !headers && !config && responseData.data) {
	                        responseData = responseData.data;
	                    }
	                    scope.searching = false;
	                    processResults(
	                      extractValue(responseFormatter(responseData), scope.remoteUrlDataField),
	                      str);
	                };
	            }

	            function httpErrorCallback(errorRes, status, headers, config) {
	                scope.searching = httpCallInProgress;

	                // normalize return obejct from promise
	                if (!status && !headers && !config) {
	                    status = errorRes.status;
	                }

	                // cancelled/aborted
	                if (status === 0 || status === -1) { return; }
	                if (scope.remoteUrlErrorCallback) {
	                    scope.remoteUrlErrorCallback(errorRes, status, headers, config);
	                }
	                else {
	                    if (console && console.error) {
	                        console.error('http error');
	                    }
	                }
	            }

	            function cancelHttpRequest() {
	                if (httpCanceller) {
	                    httpCanceller.resolve();
	                }
	            }

	            function getRemoteResults(str) {
	                var params = {},
	                    url = scope.remoteUrl + encodeURIComponent(str);
	                if (scope.remoteUrlRequestFormatter) {
	                    params = { params: scope.remoteUrlRequestFormatter(str) };
	                    url = scope.remoteUrl;
	                }
	                if (!!scope.remoteUrlRequestWithCredentials) {
	                    params.withCredentials = true;
	                }
	                cancelHttpRequest();
	                httpCanceller = $q.defer();
	                params.timeout = httpCanceller.promise;
	                httpCallInProgress = true;
	                $http.get(url, params)
	                  .then(httpSuccessCallbackGen(str))
	                  .catch(httpErrorCallback)
	                  .finally(function () { httpCallInProgress = false; });
	            }

	            function getRemoteResultsWithCustomHandler(str) {
	                cancelHttpRequest();

	                httpCanceller = $q.defer();

	                scope.remoteApiHandler(str, httpCanceller.promise)
	                  .then(httpSuccessCallbackGen(str))
	                  .catch(httpErrorCallback);

	                /* IE8 compatible
	                scope.remoteApiHandler(str, httpCanceller.promise)
	                  ['then'](httpSuccessCallbackGen(str))
	                  ['catch'](httpErrorCallback);
	                */
	            }

	            function clearResults() {
	                scope.showDropdown = false;
	                scope.results = [];
	                if (dd) {
	                    dd.scrollTop = 0;
	                }
	            }

	            function initResults() {
	                scope.showDropdown = displaySearching;
	                scope.currentIndex = scope.focusFirst ? 0 : -1;
	                scope.results = [];
	            }

	            function getLocalResults(str) {
	                var i, match, s, value,
	                    searchFields = scope.searchFields.split(','),
	                    matches = [];
	                if (typeof scope.parseInput() !== 'undefined') {
	                    str = scope.parseInput()(str);
	                }
	                for (i = 0; i < scope.localData.length; i++) {
	                    match = false;

	                    for (s = 0; s < searchFields.length; s++) {
	                        value = extractValue(scope.localData[i], searchFields[s]) || '';
	                        match = match || (value.toString().toLowerCase().indexOf(str.toString().toLowerCase()) >= 0);
	                    }

	                    if (match) {
	                        matches[matches.length] = scope.localData[i];
	                    }
	                }
	                return matches;
	            }

	            function checkExactMatch(result, obj, str) {
	                if (!str) { return false; }
	                for (var key in obj) {
	                    if (obj[key].toLowerCase() === str.toLowerCase()) {
	                        scope.selectResult(result);
	                        return true;
	                    }
	                }
	                return false;
	            }

	            function searchTimerComplete(str) {
	                // Begin the search
	                if (!str || str.length < minlength) {
	                    return;
	                }
	                if (scope.localData) {
	                    scope.$apply(function () {
	                        var matches;
	                        if (typeof scope.localSearch() !== 'undefined') {
	                            matches = scope.localSearch()(str, scope.localData);
	                        } else {
	                            matches = getLocalResults(str);
	                        }
	                        scope.searching = false;
	                        processResults(matches, str);
	                    });
	                }
	                else if (scope.remoteApiHandler) {
	                    getRemoteResultsWithCustomHandler(str);
	                } else {
	                    getRemoteResults(str);
	                }
	            }

	            function processResults(responseData, str) {
	                var i, description, image, text, formattedText, formattedDesc;

	                if (responseData && responseData.length > 0) {
	                    scope.results = [];

	                    for (i = 0; i < responseData.length; i++) {
	                        if (scope.titleField && scope.titleField !== '') {
	                            text = formattedText = extractTitle(responseData[i]);
	                        }

	                        description = '';
	                        if (scope.descriptionField) {
	                            description = formattedDesc = extractValue(responseData[i], scope.descriptionField);
	                        }

	                        image = '';
	                        if (scope.imageField) {
	                            image = extractValue(responseData[i], scope.imageField);
	                        }

	                        if (scope.matchClass) {
	                            formattedText = findMatchString(text, str);
	                            formattedDesc = findMatchString(description, str);
	                        }

	                        scope.results[scope.results.length] = {
	                            title: formattedText,
	                            description: formattedDesc,
	                            image: image,
	                            originalObject: responseData[i]
	                        };
	                    }

	                } else {
	                    scope.results = [];
	                }

	                if (scope.autoMatch && scope.results.length === 1 &&
	                    checkExactMatch(scope.results[0],
	                      { title: text, desc: description || '' }, scope.searchStr)) {
	                    scope.showDropdown = false;
	                } else if (scope.results.length === 0 && !displayNoResults) {
	                    scope.showDropdown = false;
	                } else {
	                    scope.showDropdown = true;
	                }
	            }

	            function showAll() {
	                if (scope.localData) {
	                    scope.searching = false;
	                    processResults(scope.localData, '');
	                }
	                else if (scope.remoteApiHandler) {
	                    scope.searching = true;
	                    getRemoteResultsWithCustomHandler('');
	                }
	                else {
	                    scope.searching = true;
	                    getRemoteResults('');
	                }
	            }

	            scope.onFocusHandler = function () {
	                if (scope.focusIn) {
	                    scope.focusIn();
	                }
	                if (minlength === 0 && (!scope.searchStr || scope.searchStr.length === 0)) {
	                    scope.currentIndex = scope.focusFirst ? 0 : scope.currentIndex;
	                    scope.showDropdown = true;
	                    showAll();
	                }
	            };

	            scope.hideResults = function () {
	                if (mousedownOn &&
	                    (mousedownOn === scope.id + '_dropdown' ||
	                     mousedownOn.indexOf('angucomplete') >= 0)) {
	                    mousedownOn = null;
	                }
	                else {
	                    hideTimer = $timeout(function () {
	                        clearResults();
	                        scope.$apply(function () {
	                            if (scope.searchStr && scope.searchStr.length > 0) {
	                                inputField.val(scope.searchStr);
	                            }
	                        });
	                    }, BLUR_TIMEOUT);
	                    cancelHttpRequest();

	                    if (scope.focusOut) {
	                        scope.focusOut();
	                    }

	                    if (scope.overrideSuggestions) {
	                        if (scope.searchStr && scope.searchStr.length > 0 && scope.currentIndex === -1) {
	                            handleOverrideSuggestions();
	                        }
	                    }
	                }
	            };

	            scope.resetHideResults = function () {
	                if (hideTimer) {
	                    $timeout.cancel(hideTimer);
	                }
	            };

	            scope.hoverRow = function (index) {
	                scope.currentIndex = index;
	            };

	            scope.selectResult = function (result) {
	                // Restore original values
	                if (scope.matchClass) {
	                    result.title = extractTitle(result.originalObject);
	                    result.description = extractValue(result.originalObject, scope.descriptionField);
	                }

	                if (scope.clearSelected) {
	                    scope.searchStr = null;
	                }
	                else {
	                    scope.searchStr = result.title;
	                }
	                callOrAssign(result);
	                clearResults();
	            };

	            scope.inputChangeHandler = function (str) {
	                if (str.length < minlength) {
	                    cancelHttpRequest();
	                    clearResults();
	                }
	                else if (str.length === 0 && minlength === 0) {
	                    showAll();
	                }

	                if (scope.inputChanged) {
	                    str = scope.inputChanged(str);
	                }
	                return str;
	            };

	            // check required
	            if (scope.fieldRequiredClass && scope.fieldRequiredClass !== '') {
	                requiredClassName = scope.fieldRequiredClass;
	            }

	            // check min length
	            if (scope.minlength && scope.minlength !== '') {
	                minlength = parseInt(scope.minlength, 10);
	            }

	            // check pause time
	            if (!scope.pause) {
	                scope.pause = PAUSE;
	            }

	            // check clearSelected
	            if (!scope.clearSelected) {
	                scope.clearSelected = false;
	            }

	            // check override suggestions
	            if (!scope.overrideSuggestions) {
	                scope.overrideSuggestions = false;
	            }

	            // check required field
	            if (scope.fieldRequired && ctrl) {
	                // check initial value, if given, set validitity to true
	                if (scope.initialValue) {
	                    handleRequired(true);
	                }
	                else {
	                    handleRequired(false);
	                }
	            }

	            scope.inputType = attrs.type ? attrs.type : 'text';

	            // set strings for "Searching..." and "No results"
	            scope.textSearching = attrs.textSearching ? attrs.textSearching : TEXT_SEARCHING;
	            scope.textNoResults = attrs.textNoResults ? attrs.textNoResults : TEXT_NORESULTS;
	            displaySearching = scope.textSearching === 'false' ? false : true;
	            displayNoResults = scope.textNoResults === 'false' ? false : true;

	            // set max length (default to maxlength deault from html
	            scope.maxlength = attrs.maxlength ? attrs.maxlength : MAX_LENGTH;

	            // register events
	            inputField.on('keydown', keydownHandler);
	            inputField.on('keyup compositionend', keyupHandler);

	            // set response formatter
	            responseFormatter = callFunctionOrIdentity('remoteUrlResponseFormatter');

	            // set isScrollOn
	            $timeout(function () {
	                var css = getComputedStyle(dd);
	                isScrollOn = css.maxHeight && css.overflowY === 'auto';
	            });
	        }

	        return {
	            restrict: 'EA',
	            require: '^?form',
	            scope: {
	                selectedObject: '=',
	                selectedObjectData: '=',
	                disableInput: '=',
	                initialValue: '=',
	                localData: '=',
	                localSearch: '&',
	                remoteUrlRequestFormatter: '=',
	                remoteUrlRequestWithCredentials: '@',
	                remoteUrlResponseFormatter: '=',
	                remoteUrlErrorCallback: '=',
	                remoteApiHandler: '=',
	                id: '@',
	                type: '@',
	                placeholder: '@',
	                textSearching: '@',
	                textNoResults: '@',
	                remoteUrl: '@',
	                remoteUrlDataField: '@',
	                titleField: '@',
	                descriptionField: '@',
	                imageField: '@',
	                inputClass: '@',
	                pause: '@',
	                searchFields: '@',
	                minlength: '@',
	                matchClass: '@',
	                clearSelected: '@',
	                overrideSuggestions: '@',
	                fieldRequired: '=',
	                fieldRequiredClass: '@',
	                inputChanged: '=',
	                autoMatch: '@',
	                focusOut: '&',
	                focusIn: '&',
	                fieldTabindex: '@',
	                inputName: '@',
	                focusFirst: '@',
	                parseInput: '&'
	            },
	            templateUrl: function (element, attrs) {
	                return attrs.templateUrl || TEMPLATE_URL;
	            },
	            compile: function (tElement) {
	                var startSym = $interpolate.startSymbol();
	                var endSym = $interpolate.endSymbol();
	                if (!(startSym === '{{' && endSym === '}}')) {
	                    var interpolatedHtml = tElement.html()
	                      .replace(/\{\{/g, startSym)
	                      .replace(/\}\}/g, endSym);
	                    tElement.html(interpolatedHtml);
	                }
	                return link;
	            }
	        };
	    }]);

	}));

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	/*!
	 * ASP.NET SignalR JavaScript Library v2.2.1
	 * http://signalr.net/
	 *
	 * Copyright (c) .NET Foundation. All rights reserved.
	 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
	 *
	 */
	(function(n,t,i){function w(t,i){var u,f;if(n.isArray(t)){for(u=t.length-1;u>=0;u--)f=t[u],n.type(f)==="string"&&r.transports[f]||(i.log("Invalid transport: "+f+", removing it from the transports list."),t.splice(u,1));t.length===0&&(i.log("No transports remain within the specified transport array."),t=null)}else if(r.transports[t]||t==="auto"){if(t==="auto"&&r._.ieVersion<=8)return["longPolling"]}else i.log("Invalid transport: "+t.toString()+"."),t=null;return t}function b(n){return n==="http:"?80:n==="https:"?443:void 0}function a(n,t){return t.match(/:\d+$/)?t:t+":"+b(n)}function k(t,i){var u=this,r=[];u.tryBuffer=function(i){return t.state===n.signalR.connectionState.connecting?(r.push(i),!0):!1};u.drain=function(){if(t.state===n.signalR.connectionState.connected)while(r.length>0)i(r.shift())};u.clear=function(){r=[]}}var f={nojQuery:"jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",noTransportOnInit:"No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",errorOnNegotiate:"Error during negotiation request.",stoppedWhileLoading:"The connection was stopped during page load.",stoppedWhileNegotiating:"The connection was stopped during the negotiate request.",errorParsingNegotiateResponse:"Error parsing negotiate response.",errorDuringStartRequest:"Error during start request. Stopping the connection.",stoppedDuringStartRequest:"The connection was stopped during the start request.",errorParsingStartResponse:"Error parsing start response: '{0}'. Stopping the connection.",invalidStartResponse:"Invalid start response: '{0}'. Stopping the connection.",protocolIncompatible:"You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",sendFailed:"Send failed.",parseFailed:"Failed at parsing response: {0}",longPollFailed:"Long polling request failed.",eventSourceFailedToConnect:"EventSource failed to connect.",eventSourceError:"Error raised by EventSource",webSocketClosed:"WebSocket closed.",pingServerFailedInvalidResponse:"Invalid ping response when pinging server: '{0}'.",pingServerFailed:"Failed to ping server.",pingServerFailedStatusCode:"Failed to ping server.  Server responded with status code {0}, stopping the connection.",pingServerFailedParse:"Failed to parse ping server response, stopping the connection.",noConnectionTransport:"Connection is in an invalid state, there is no transport active.",webSocketsInvalidState:"The Web Socket transport is in an invalid state, transitioning into reconnecting.",reconnectTimeout:"Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",reconnectWindowTimeout:"The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."};if(typeof n!="function")throw new Error(f.nojQuery);var r,h,o=t.document.readyState==="complete",e=n(t),c="__Negotiate Aborted__",u={onStart:"onStart",onStarting:"onStarting",onReceived:"onReceived",onError:"onError",onConnectionSlow:"onConnectionSlow",onReconnecting:"onReconnecting",onReconnect:"onReconnect",onStateChanged:"onStateChanged",onDisconnect:"onDisconnect"},v=function(n,i){if(i!==!1){var r;typeof t.console!="undefined"&&(r="["+(new Date).toTimeString()+"] SignalR: "+n,t.console.debug?t.console.debug(r):t.console.log&&t.console.log(r))}},s=function(t,i,r){return i===t.state?(t.state=r,n(t).triggerHandler(u.onStateChanged,[{oldState:i,newState:r}]),!0):!1},y=function(n){return n.state===r.connectionState.disconnected},l=function(n){return n._.keepAliveData.activated&&n.transport.supportsKeepAlive(n)},p=function(i){var f,e;i._.configuredStopReconnectingTimeout||(e=function(t){var i=r._.format(r.resources.reconnectTimeout,t.disconnectTimeout);t.log(i);n(t).triggerHandler(u.onError,[r._.error(i,"TimeoutException")]);t.stop(!1,!1)},i.reconnecting(function(){var n=this;n.state===r.connectionState.reconnecting&&(f=t.setTimeout(function(){e(n)},n.disconnectTimeout))}),i.stateChanged(function(n){n.oldState===r.connectionState.reconnecting&&t.clearTimeout(f)}),i._.configuredStopReconnectingTimeout=!0)};if(r=function(n,t,i){return new r.fn.init(n,t,i)},r._={defaultContentType:"application/x-www-form-urlencoded; charset=UTF-8",ieVersion:function(){var i,n;return t.navigator.appName==="Microsoft Internet Explorer"&&(n=/MSIE ([0-9]+\.[0-9]+)/.exec(t.navigator.userAgent),n&&(i=t.parseFloat(n[1]))),i}(),error:function(n,t,i){var r=new Error(n);return r.source=t,typeof i!="undefined"&&(r.context=i),r},transportError:function(n,t,r,u){var f=this.error(n,r,u);return f.transport=t?t.name:i,f},format:function(){for(var t=arguments[0],n=0;n<arguments.length-1;n++)t=t.replace("{"+n+"}",arguments[n+1]);return t},firefoxMajorVersion:function(n){var t=n.match(/Firefox\/(\d+)/);return!t||!t.length||t.length<2?0:parseInt(t[1],10)},configurePingInterval:function(i){var f=i._.config,e=function(t){n(i).triggerHandler(u.onError,[t])};f&&!i._.pingIntervalId&&f.pingInterval&&(i._.pingIntervalId=t.setInterval(function(){r.transports._logic.pingServer(i).fail(e)},f.pingInterval))}},r.events=u,r.resources=f,r.ajaxDefaults={processData:!0,timeout:null,async:!0,global:!1,cache:!1},r.changeState=s,r.isDisconnecting=y,r.connectionState={connecting:0,connected:1,reconnecting:2,disconnected:4},r.hub={start:function(){throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'><\/script>.");}},typeof e.on=="function")e.on("load",function(){o=!0});else e.load(function(){o=!0});r.fn=r.prototype={init:function(t,i,r){var f=n(this);this.url=t;this.qs=i;this.lastError=null;this._={keepAliveData:{},connectingMessageBuffer:new k(this,function(n){f.triggerHandler(u.onReceived,[n])}),lastMessageAt:(new Date).getTime(),lastActiveAt:(new Date).getTime(),beatInterval:5e3,beatHandle:null,totalTransportConnectTimeout:0};typeof r=="boolean"&&(this.logging=r)},_parseResponse:function(n){var t=this;return n?typeof n=="string"?t.json.parse(n):n:n},_originalJson:t.JSON,json:t.JSON,isCrossDomain:function(i,r){var u;return(i=n.trim(i),r=r||t.location,i.indexOf("http")!==0)?!1:(u=t.document.createElement("a"),u.href=i,u.protocol+a(u.protocol,u.host)!==r.protocol+a(r.protocol,r.host))},ajaxDataType:"text",contentType:"application/json; charset=UTF-8",logging:!1,state:r.connectionState.disconnected,clientProtocol:"1.5",reconnectDelay:2e3,transportConnectTimeout:0,disconnectTimeout:3e4,reconnectWindow:3e4,keepAliveWarnAt:2/3,start:function(i,h){var a=this,v={pingInterval:3e5,waitForPageLoad:!0,transport:"auto",jsonp:!1},d,y=a._deferral||n.Deferred(),b=t.document.createElement("a"),k,g;if(a.lastError=null,a._deferral=y,!a.json)throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");if(n.type(i)==="function"?h=i:n.type(i)==="object"&&(n.extend(v,i),n.type(v.callback)==="function"&&(h=v.callback)),v.transport=w(v.transport,a),!v.transport)throw new Error("SignalR: Invalid transport(s) specified, aborting start.");return(a._.config=v,!o&&v.waitForPageLoad===!0)?(a._.deferredStartHandler=function(){a.start(i,h)},e.bind("load",a._.deferredStartHandler),y.promise()):a.state===r.connectionState.connecting?y.promise():s(a,r.connectionState.disconnected,r.connectionState.connecting)===!1?(y.resolve(a),y.promise()):(p(a),b.href=a.url,b.protocol&&b.protocol!==":"?(a.protocol=b.protocol,a.host=b.host):(a.protocol=t.document.location.protocol,a.host=b.host||t.document.location.host),a.baseUrl=a.protocol+"//"+a.host,a.wsProtocol=a.protocol==="https:"?"wss://":"ws://",v.transport==="auto"&&v.jsonp===!0&&(v.transport="longPolling"),a.url.indexOf("//")===0&&(a.url=t.location.protocol+a.url,a.log("Protocol relative URL detected, normalizing it to '"+a.url+"'.")),this.isCrossDomain(a.url)&&(a.log("Auto detected cross domain url."),v.transport==="auto"&&(v.transport=["webSockets","serverSentEvents","longPolling"]),typeof v.withCredentials=="undefined"&&(v.withCredentials=!0),v.jsonp||(v.jsonp=!n.support.cors,v.jsonp&&a.log("Using jsonp because this browser doesn't support CORS.")),a.contentType=r._.defaultContentType),a.withCredentials=v.withCredentials,a.ajaxDataType=v.jsonp?"jsonp":"text",n(a).bind(u.onStart,function(){n.type(h)==="function"&&h.call(a);y.resolve(a)}),a._.initHandler=r.transports._logic.initHandler(a),d=function(i,o){var c=r._.error(f.noTransportOnInit);if(o=o||0,o>=i.length){o===0?a.log("No transports supported by the server were selected."):o===1?a.log("No fallback transports were selected."):a.log("Fallback transports exhausted.");n(a).triggerHandler(u.onError,[c]);y.reject(c);a.stop();return}if(a.state!==r.connectionState.disconnected){var p=i[o],h=r.transports[p],v=function(){d(i,o+1)};a.transport=h;try{a._.initHandler.start(h,function(){var i=r._.firefoxMajorVersion(t.navigator.userAgent)>=11,f=!!a.withCredentials&&i;a.log("The start request succeeded. Transitioning to the connected state.");l(a)&&r.transports._logic.monitorKeepAlive(a);r.transports._logic.startHeartbeat(a);r._.configurePingInterval(a);s(a,r.connectionState.connecting,r.connectionState.connected)||a.log("WARNING! The connection was not in the connecting state.");a._.connectingMessageBuffer.drain();n(a).triggerHandler(u.onStart);e.bind("unload",function(){a.log("Window unloading, stopping the connection.");a.stop(f)});i&&e.bind("beforeunload",function(){t.setTimeout(function(){a.stop(f)},0)})},v)}catch(w){a.log(h.name+" transport threw '"+w.message+"' when attempting to start.");v()}}},k=a.url+"/negotiate",g=function(t,i){var e=r._.error(f.errorOnNegotiate,t,i._.negotiateRequest);n(i).triggerHandler(u.onError,e);y.reject(e);i.stop()},n(a).triggerHandler(u.onStarting),k=r.transports._logic.prepareQueryString(a,k),a.log("Negotiating with '"+k+"'."),a._.negotiateRequest=r.transports._logic.ajax(a,{url:k,error:function(n,t){t!==c?g(n,a):y.reject(r._.error(f.stoppedWhileNegotiating,null,a._.negotiateRequest))},success:function(t){var i,e,h,o=[],s=[];try{i=a._parseResponse(t)}catch(c){g(r._.error(f.errorParsingNegotiateResponse,c),a);return}if(e=a._.keepAliveData,a.appRelativeUrl=i.Url,a.id=i.ConnectionId,a.token=i.ConnectionToken,a.webSocketServerUrl=i.WebSocketServerUrl,a._.pollTimeout=i.ConnectionTimeout*1e3+1e4,a.disconnectTimeout=i.DisconnectTimeout*1e3,a._.totalTransportConnectTimeout=a.transportConnectTimeout+i.TransportConnectTimeout*1e3,i.KeepAliveTimeout?(e.activated=!0,e.timeout=i.KeepAliveTimeout*1e3,e.timeoutWarning=e.timeout*a.keepAliveWarnAt,a._.beatInterval=(e.timeout-e.timeoutWarning)/3):e.activated=!1,a.reconnectWindow=a.disconnectTimeout+(e.timeout||0),!i.ProtocolVersion||i.ProtocolVersion!==a.clientProtocol){h=r._.error(r._.format(f.protocolIncompatible,a.clientProtocol,i.ProtocolVersion));n(a).triggerHandler(u.onError,[h]);y.reject(h);return}n.each(r.transports,function(n){if(n.indexOf("_")===0||n==="webSockets"&&!i.TryWebSockets)return!0;s.push(n)});n.isArray(v.transport)?n.each(v.transport,function(t,i){n.inArray(i,s)>=0&&o.push(i)}):v.transport==="auto"?o=s:n.inArray(v.transport,s)>=0&&o.push(v.transport);d(o)}}),y.promise())},starting:function(t){var i=this;return n(i).bind(u.onStarting,function(){t.call(i)}),i},send:function(n){var t=this;if(t.state===r.connectionState.disconnected)throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");if(t.state===r.connectionState.connecting)throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");return t.transport.send(t,n),t},received:function(t){var i=this;return n(i).bind(u.onReceived,function(n,r){t.call(i,r)}),i},stateChanged:function(t){var i=this;return n(i).bind(u.onStateChanged,function(n,r){t.call(i,r)}),i},error:function(t){var i=this;return n(i).bind(u.onError,function(n,r,u){i.lastError=r;t.call(i,r,u)}),i},disconnected:function(t){var i=this;return n(i).bind(u.onDisconnect,function(){t.call(i)}),i},connectionSlow:function(t){var i=this;return n(i).bind(u.onConnectionSlow,function(){t.call(i)}),i},reconnecting:function(t){var i=this;return n(i).bind(u.onReconnecting,function(){t.call(i)}),i},reconnected:function(t){var i=this;return n(i).bind(u.onReconnect,function(){t.call(i)}),i},stop:function(i,h){var a=this,v=a._deferral;if(a._.deferredStartHandler&&e.unbind("load",a._.deferredStartHandler),delete a._.config,delete a._.deferredStartHandler,!o&&(!a._.config||a._.config.waitForPageLoad===!0)){a.log("Stopping connection prior to negotiate.");v&&v.reject(r._.error(f.stoppedWhileLoading));return}if(a.state!==r.connectionState.disconnected)return a.log("Stopping connection."),t.clearTimeout(a._.beatHandle),t.clearInterval(a._.pingIntervalId),a.transport&&(a.transport.stop(a),h!==!1&&a.transport.abort(a,i),l(a)&&r.transports._logic.stopMonitoringKeepAlive(a),a.transport=null),a._.negotiateRequest&&(a._.negotiateRequest.abort(c),delete a._.negotiateRequest),a._.initHandler&&a._.initHandler.stop(),delete a._deferral,delete a.messageId,delete a.groupsToken,delete a.id,delete a._.pingIntervalId,delete a._.lastMessageAt,delete a._.lastActiveAt,a._.connectingMessageBuffer.clear(),s(a,a.state,r.connectionState.disconnected),n(a).triggerHandler(u.onDisconnect),a},log:function(n){v(n,this.logging)}};r.fn.init.prototype=r.fn;r.noConflict=function(){return n.connection===r&&(n.connection=h),r};n.connection&&(h=n.connection);n.connection=n.signalR=r})(window.jQuery,window),function(n,t,i){function s(n){n._.keepAliveData.monitoring&&l(n);u.markActive(n)&&(n._.beatHandle=t.setTimeout(function(){s(n)},n._.beatInterval))}function l(t){var i=t._.keepAliveData,u;t.state===r.connectionState.connected&&(u=(new Date).getTime()-t._.lastMessageAt,u>=i.timeout?(t.log("Keep alive timed out.  Notifying transport that connection has been lost."),t.transport.lostConnection(t)):u>=i.timeoutWarning?i.userNotified||(t.log("Keep alive has been missed, connection may be dead/slow."),n(t).triggerHandler(f.onConnectionSlow),i.userNotified=!0):i.userNotified=!1)}function e(n,t){var i=n.url+t;return n.transport&&(i+="?transport="+n.transport.name),u.prepareQueryString(n,i)}function h(n){this.connection=n;this.startRequested=!1;this.startCompleted=!1;this.connectionStopped=!1}var r=n.signalR,f=n.signalR.events,c=n.signalR.changeState,o="__Start Aborted__",u;r.transports={};h.prototype={start:function(n,r,u){var f=this,e=f.connection,o=!1;if(f.startRequested||f.connectionStopped){e.log("WARNING! "+n.name+" transport cannot be started. Initialization ongoing or completed.");return}e.log(n.name+" transport starting.");n.start(e,function(){o||f.initReceived(n,r)},function(t){return o||(o=!0,f.transportFailed(n,t,u)),!f.startCompleted||f.connectionStopped});f.transportTimeoutHandle=t.setTimeout(function(){o||(o=!0,e.log(n.name+" transport timed out when trying to connect."),f.transportFailed(n,i,u))},e._.totalTransportConnectTimeout)},stop:function(){this.connectionStopped=!0;t.clearTimeout(this.transportTimeoutHandle);r.transports._logic.tryAbortStartRequest(this.connection)},initReceived:function(n,i){var u=this,f=u.connection;if(u.startRequested){f.log("WARNING! The client received multiple init messages.");return}u.connectionStopped||(u.startRequested=!0,t.clearTimeout(u.transportTimeoutHandle),f.log(n.name+" transport connected. Initiating start request."),r.transports._logic.ajaxStart(f,function(){u.startCompleted=!0;i()}))},transportFailed:function(i,u,e){var o=this.connection,h=o._deferral,s;this.connectionStopped||(t.clearTimeout(this.transportTimeoutHandle),this.startRequested?this.startCompleted||(s=r._.error(r.resources.errorDuringStartRequest,u),o.log(i.name+" transport failed during the start request. Stopping the connection."),n(o).triggerHandler(f.onError,[s]),h&&h.reject(s),o.stop()):(i.stop(o),o.log(i.name+" transport failed to connect. Attempting to fall back."),e()))}};u=r.transports._logic={ajax:function(t,i){return n.ajax(n.extend(!0,{},n.signalR.ajaxDefaults,{type:"GET",data:{},xhrFields:{withCredentials:t.withCredentials},contentType:t.contentType,dataType:t.ajaxDataType},i))},pingServer:function(t){var e,f,i=n.Deferred();return t.transport?(e=t.url+"/ping",e=u.addQs(e,t.qs),f=u.ajax(t,{url:e,success:function(n){var u;try{u=t._parseResponse(n)}catch(e){i.reject(r._.transportError(r.resources.pingServerFailedParse,t.transport,e,f));t.stop();return}u.Response==="pong"?i.resolve():i.reject(r._.transportError(r._.format(r.resources.pingServerFailedInvalidResponse,n),t.transport,null,f))},error:function(n){n.status===401||n.status===403?(i.reject(r._.transportError(r._.format(r.resources.pingServerFailedStatusCode,n.status),t.transport,n,f)),t.stop()):i.reject(r._.transportError(r.resources.pingServerFailed,t.transport,n,f))}})):i.reject(r._.transportError(r.resources.noConnectionTransport,t.transport)),i.promise()},prepareQueryString:function(n,i){var r;return r=u.addQs(i,"clientProtocol="+n.clientProtocol),r=u.addQs(r,n.qs),n.token&&(r+="&connectionToken="+t.encodeURIComponent(n.token)),n.data&&(r+="&connectionData="+t.encodeURIComponent(n.data)),r},addQs:function(t,i){var r=t.indexOf("?")!==-1?"&":"?",u;if(!i)return t;if(typeof i=="object")return t+r+n.param(i);if(typeof i=="string")return u=i.charAt(0),(u==="?"||u==="&")&&(r=""),t+r+i;throw new Error("Query string property must be either a string or object.");},getUrl:function(n,i,r,f,e){var h=i==="webSockets"?"":n.baseUrl,o=h+n.appRelativeUrl,s="transport="+i;return!e&&n.groupsToken&&(s+="&groupsToken="+t.encodeURIComponent(n.groupsToken)),r?(o+=f?"/poll":"/reconnect",!e&&n.messageId&&(s+="&messageId="+t.encodeURIComponent(n.messageId))):o+="/connect",o+="?"+s,o=u.prepareQueryString(n,o),e||(o+="&tid="+Math.floor(Math.random()*11)),o},maximizePersistentResponse:function(n){return{MessageId:n.C,Messages:n.M,Initialized:typeof n.S!="undefined"?!0:!1,ShouldReconnect:typeof n.T!="undefined"?!0:!1,LongPollDelay:n.L,GroupsToken:n.G}},updateGroups:function(n,t){t&&(n.groupsToken=t)},stringifySend:function(n,t){return typeof t=="string"||typeof t=="undefined"||t===null?t:n.json.stringify(t)},ajaxSend:function(t,i){var h=u.stringifySend(t,i),c=e(t,"/send"),o,s=function(t,u){n(u).triggerHandler(f.onError,[r._.transportError(r.resources.sendFailed,u.transport,t,o),i])};return o=u.ajax(t,{url:c,type:t.ajaxDataType==="jsonp"?"GET":"POST",contentType:r._.defaultContentType,data:{data:h},success:function(n){var i;if(n){try{i=t._parseResponse(n)}catch(r){s(r,t);t.stop();return}u.triggerReceived(t,i)}},error:function(n,i){i!=="abort"&&i!=="parsererror"&&s(n,t)}})},ajaxAbort:function(n,t){if(typeof n.transport!="undefined"){t=typeof t=="undefined"?!0:t;var i=e(n,"/abort");u.ajax(n,{url:i,async:t,timeout:1e3,type:"POST"});n.log("Fired ajax abort async = "+t+".")}},ajaxStart:function(t,i){var h=function(n){var i=t._deferral;i&&i.reject(n)},s=function(i){t.log("The start request failed. Stopping the connection.");n(t).triggerHandler(f.onError,[i]);h(i);t.stop()};t._.startRequest=u.ajax(t,{url:e(t,"/start"),success:function(n,u,f){var e;try{e=t._parseResponse(n)}catch(o){s(r._.error(r._.format(r.resources.errorParsingStartResponse,n),o,f));return}e.Response==="started"?i():s(r._.error(r._.format(r.resources.invalidStartResponse,n),null,f))},error:function(n,i,u){i!==o?s(r._.error(r.resources.errorDuringStartRequest,u,n)):(t.log("The start request aborted because connection.stop() was called."),h(r._.error(r.resources.stoppedDuringStartRequest,null,n)))}})},tryAbortStartRequest:function(n){n._.startRequest&&(n._.startRequest.abort(o),delete n._.startRequest)},tryInitialize:function(n,t,i){t.Initialized&&i?i():t.Initialized&&n.log("WARNING! The client received an init message after reconnecting.")},triggerReceived:function(t,i){t._.connectingMessageBuffer.tryBuffer(i)||n(t).triggerHandler(f.onReceived,[i])},processMessages:function(t,i,r){var f;u.markLastMessage(t);i&&(f=u.maximizePersistentResponse(i),u.updateGroups(t,f.GroupsToken),f.MessageId&&(t.messageId=f.MessageId),f.Messages&&(n.each(f.Messages,function(n,i){u.triggerReceived(t,i)}),u.tryInitialize(t,f,r)))},monitorKeepAlive:function(t){var i=t._.keepAliveData;i.monitoring?t.log("Tried to monitor keep alive but it's already being monitored."):(i.monitoring=!0,u.markLastMessage(t),t._.keepAliveData.reconnectKeepAliveUpdate=function(){u.markLastMessage(t)},n(t).bind(f.onReconnect,t._.keepAliveData.reconnectKeepAliveUpdate),t.log("Now monitoring keep alive with a warning timeout of "+i.timeoutWarning+", keep alive timeout of "+i.timeout+" and disconnecting timeout of "+t.disconnectTimeout))},stopMonitoringKeepAlive:function(t){var i=t._.keepAliveData;i.monitoring&&(i.monitoring=!1,n(t).unbind(f.onReconnect,t._.keepAliveData.reconnectKeepAliveUpdate),t._.keepAliveData={},t.log("Stopping the monitoring of the keep alive."))},startHeartbeat:function(n){n._.lastActiveAt=(new Date).getTime();s(n)},markLastMessage:function(n){n._.lastMessageAt=(new Date).getTime()},markActive:function(n){return u.verifyLastActive(n)?(n._.lastActiveAt=(new Date).getTime(),!0):!1},isConnectedOrReconnecting:function(n){return n.state===r.connectionState.connected||n.state===r.connectionState.reconnecting},ensureReconnectingState:function(t){return c(t,r.connectionState.connected,r.connectionState.reconnecting)===!0&&n(t).triggerHandler(f.onReconnecting),t.state===r.connectionState.reconnecting},clearReconnectTimeout:function(n){n&&n._.reconnectTimeout&&(t.clearTimeout(n._.reconnectTimeout),delete n._.reconnectTimeout)},verifyLastActive:function(t){if((new Date).getTime()-t._.lastActiveAt>=t.reconnectWindow){var i=r._.format(r.resources.reconnectWindowTimeout,new Date(t._.lastActiveAt),t.reconnectWindow);return t.log(i),n(t).triggerHandler(f.onError,[r._.error(i,"TimeoutException")]),t.stop(!1,!1),!1}return!0},reconnect:function(n,i){var f=r.transports[i];if(u.isConnectedOrReconnecting(n)&&!n._.reconnectTimeout){if(!u.verifyLastActive(n))return;n._.reconnectTimeout=t.setTimeout(function(){u.verifyLastActive(n)&&(f.stop(n),u.ensureReconnectingState(n)&&(n.log(i+" reconnecting."),f.start(n)))},n.reconnectDelay)}},handleParseFailure:function(t,i,u,e,o){var s=r._.transportError(r._.format(r.resources.parseFailed,i),t.transport,u,o);e&&e(s)?t.log("Failed to parse server response while attempting to connect."):(n(t).triggerHandler(f.onError,[s]),t.stop())},initHandler:function(n){return new h(n)},foreverFrame:{count:0,connections:{}}}}(window.jQuery,window),function(n,t){var r=n.signalR,u=n.signalR.events,f=n.signalR.changeState,i=r.transports._logic;r.transports.webSockets={name:"webSockets",supportsKeepAlive:function(){return!0},send:function(t,f){var e=i.stringifySend(t,f);try{t.socket.send(e)}catch(o){n(t).triggerHandler(u.onError,[r._.transportError(r.resources.webSocketsInvalidState,t.transport,o,t.socket),f])}},start:function(e,o,s){var h,c=!1,l=this,a=!o,v=n(e);if(!t.WebSocket){s();return}e.socket||(h=e.webSocketServerUrl?e.webSocketServerUrl:e.wsProtocol+e.host,h+=i.getUrl(e,this.name,a),e.log("Connecting to websocket endpoint '"+h+"'."),e.socket=new t.WebSocket(h),e.socket.onopen=function(){c=!0;e.log("Websocket opened.");i.clearReconnectTimeout(e);f(e,r.connectionState.reconnecting,r.connectionState.connected)===!0&&v.triggerHandler(u.onReconnect)},e.socket.onclose=function(t){var i;this===e.socket&&(c&&typeof t.wasClean!="undefined"&&t.wasClean===!1?(i=r._.transportError(r.resources.webSocketClosed,e.transport,t),e.log("Unclean disconnect from websocket: "+(t.reason||"[no reason given]."))):e.log("Websocket closed."),s&&s(i)||(i&&n(e).triggerHandler(u.onError,[i]),l.reconnect(e)))},e.socket.onmessage=function(t){var r;try{r=e._parseResponse(t.data)}catch(u){i.handleParseFailure(e,t.data,u,s,t);return}r&&(n.isEmptyObject(r)||r.M?i.processMessages(e,r,o):i.triggerReceived(e,r))})},reconnect:function(n){i.reconnect(n,this.name)},lostConnection:function(n){this.reconnect(n)},stop:function(n){i.clearReconnectTimeout(n);n.socket&&(n.log("Closing the Websocket."),n.socket.close(),n.socket=null)},abort:function(n,t){i.ajaxAbort(n,t)}}}(window.jQuery,window),function(n,t){var i=n.signalR,u=n.signalR.events,e=n.signalR.changeState,r=i.transports._logic,f=function(n){t.clearTimeout(n._.reconnectAttemptTimeoutHandle);delete n._.reconnectAttemptTimeoutHandle};i.transports.serverSentEvents={name:"serverSentEvents",supportsKeepAlive:function(){return!0},timeOut:3e3,start:function(o,s,h){var c=this,l=!1,a=n(o),v=!s,y;if(o.eventSource&&(o.log("The connection already has an event source. Stopping it."),o.stop()),!t.EventSource){h&&(o.log("This browser doesn't support SSE."),h());return}y=r.getUrl(o,this.name,v);try{o.log("Attempting to connect to SSE endpoint '"+y+"'.");o.eventSource=new t.EventSource(y,{withCredentials:o.withCredentials})}catch(p){o.log("EventSource failed trying to connect with error "+p.Message+".");h?h():(a.triggerHandler(u.onError,[i._.transportError(i.resources.eventSourceFailedToConnect,o.transport,p)]),v&&c.reconnect(o));return}v&&(o._.reconnectAttemptTimeoutHandle=t.setTimeout(function(){l===!1&&o.eventSource.readyState!==t.EventSource.OPEN&&c.reconnect(o)},c.timeOut));o.eventSource.addEventListener("open",function(){o.log("EventSource connected.");f(o);r.clearReconnectTimeout(o);l===!1&&(l=!0,e(o,i.connectionState.reconnecting,i.connectionState.connected)===!0&&a.triggerHandler(u.onReconnect))},!1);o.eventSource.addEventListener("message",function(n){var t;if(n.data!=="initialized"){try{t=o._parseResponse(n.data)}catch(i){r.handleParseFailure(o,n.data,i,h,n);return}r.processMessages(o,t,s)}},!1);o.eventSource.addEventListener("error",function(n){var r=i._.transportError(i.resources.eventSourceError,o.transport,n);this===o.eventSource&&(h&&h(r)||(o.log("EventSource readyState: "+o.eventSource.readyState+"."),n.eventPhase===t.EventSource.CLOSED?(o.log("EventSource reconnecting due to the server connection ending."),c.reconnect(o)):(o.log("EventSource error."),a.triggerHandler(u.onError,[r]))))},!1)},reconnect:function(n){r.reconnect(n,this.name)},lostConnection:function(n){this.reconnect(n)},send:function(n,t){r.ajaxSend(n,t)},stop:function(n){f(n);r.clearReconnectTimeout(n);n&&n.eventSource&&(n.log("EventSource calling close()."),n.eventSource.close(),n.eventSource=null,delete n.eventSource)},abort:function(n,t){r.ajaxAbort(n,t)}}}(window.jQuery,window),function(n,t){var r=n.signalR,e=n.signalR.events,o=n.signalR.changeState,i=r.transports._logic,u=function(){var n=t.document.createElement("iframe");return n.setAttribute("style","position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;"),n},f=function(){var i=null,f=1e3,n=0;return{prevent:function(){r._.ieVersion<=8&&(n===0&&(i=t.setInterval(function(){var n=u();t.document.body.appendChild(n);t.document.body.removeChild(n);n=null},f)),n++)},cancel:function(){n===1&&t.clearInterval(i);n>0&&n--}}}();r.transports.foreverFrame={name:"foreverFrame",supportsKeepAlive:function(){return!0},iframeClearThreshold:50,start:function(n,r,e){var l=this,s=i.foreverFrame.count+=1,h,o=u(),c=function(){n.log("Forever frame iframe finished loading and is no longer receiving messages.");e&&e()||l.reconnect(n)};if(t.EventSource){e&&(n.log("Forever Frame is not supported by SignalR on browsers with SSE support."),e());return}o.setAttribute("data-signalr-connection-id",n.id);f.prevent();h=i.getUrl(n,this.name);h+="&frameId="+s;t.document.documentElement.appendChild(o);n.log("Binding to iframe's load event.");o.addEventListener?o.addEventListener("load",c,!1):o.attachEvent&&o.attachEvent("onload",c);o.src=h;i.foreverFrame.connections[s]=n;n.frame=o;n.frameId=s;r&&(n.onSuccess=function(){n.log("Iframe transport started.");r()})},reconnect:function(n){var r=this;i.isConnectedOrReconnecting(n)&&i.verifyLastActive(n)&&t.setTimeout(function(){if(i.verifyLastActive(n)&&n.frame&&i.ensureReconnectingState(n)){var u=n.frame,t=i.getUrl(n,r.name,!0)+"&frameId="+n.frameId;n.log("Updating iframe src to '"+t+"'.");u.src=t}},n.reconnectDelay)},lostConnection:function(n){this.reconnect(n)},send:function(n,t){i.ajaxSend(n,t)},receive:function(t,u){var f,e,o;if(t.json!==t._originalJson&&(u=t._originalJson.stringify(u)),o=t._parseResponse(u),i.processMessages(t,o,t.onSuccess),t.state===n.signalR.connectionState.connected&&(t.frameMessageCount=(t.frameMessageCount||0)+1,t.frameMessageCount>r.transports.foreverFrame.iframeClearThreshold&&(t.frameMessageCount=0,f=t.frame.contentWindow||t.frame.contentDocument,f&&f.document&&f.document.body)))for(e=f.document.body;e.firstChild;)e.removeChild(e.firstChild)},stop:function(n){var r=null;if(f.cancel(),n.frame){if(n.frame.stop)n.frame.stop();else try{r=n.frame.contentWindow||n.frame.contentDocument;r.document&&r.document.execCommand&&r.document.execCommand("Stop")}catch(u){n.log("Error occurred when stopping foreverFrame transport. Message = "+u.message+".")}n.frame.parentNode===t.document.body&&t.document.body.removeChild(n.frame);delete i.foreverFrame.connections[n.frameId];n.frame=null;n.frameId=null;delete n.frame;delete n.frameId;delete n.onSuccess;delete n.frameMessageCount;n.log("Stopping forever frame.")}},abort:function(n,t){i.ajaxAbort(n,t)},getConnection:function(n){return i.foreverFrame.connections[n]},started:function(t){o(t,r.connectionState.reconnecting,r.connectionState.connected)===!0&&n(t).triggerHandler(e.onReconnect)}}}(window.jQuery,window),function(n,t){var r=n.signalR,u=n.signalR.events,e=n.signalR.changeState,f=n.signalR.isDisconnecting,i=r.transports._logic;r.transports.longPolling={name:"longPolling",supportsKeepAlive:function(){return!1},reconnectDelay:3e3,start:function(o,s,h){var a=this,v=function(){v=n.noop;o.log("LongPolling connected.");s?s():o.log("WARNING! The client received an init message after reconnecting.")},y=function(n){return h(n)?(o.log("LongPolling failed to connect."),!0):!1},c=o._,l=0,p=function(i){t.clearTimeout(c.reconnectTimeoutId);c.reconnectTimeoutId=null;e(i,r.connectionState.reconnecting,r.connectionState.connected)===!0&&(i.log("Raising the reconnect event"),n(i).triggerHandler(u.onReconnect))},w=36e5;o.pollXhr&&(o.log("Polling xhr requests already exists, aborting."),o.stop());o.messageId=null;c.reconnectTimeoutId=null;c.pollTimeoutId=t.setTimeout(function(){(function e(s,h){var g=s.messageId,nt=g===null,k=!nt,tt=!h,d=i.getUrl(s,a.name,k,tt,!0),b={};(s.messageId&&(b.messageId=s.messageId),s.groupsToken&&(b.groupsToken=s.groupsToken),f(s)!==!0)&&(o.log("Opening long polling request to '"+d+"'."),s.pollXhr=i.ajax(o,{xhrFields:{onprogress:function(){i.markLastMessage(o)}},url:d,type:"POST",contentType:r._.defaultContentType,data:b,timeout:o._.pollTimeout,success:function(r){var h,w=0,u,a;o.log("Long poll complete.");l=0;try{h=o._parseResponse(r)}catch(b){i.handleParseFailure(s,r,b,y,s.pollXhr);return}(c.reconnectTimeoutId!==null&&p(s),h&&(u=i.maximizePersistentResponse(h)),i.processMessages(s,h,v),u&&n.type(u.LongPollDelay)==="number"&&(w=u.LongPollDelay),f(s)!==!0)&&(a=u&&u.ShouldReconnect,!a||i.ensureReconnectingState(s))&&(w>0?c.pollTimeoutId=t.setTimeout(function(){e(s,a)},w):e(s,a))},error:function(f,h){var v=r._.transportError(r.resources.longPollFailed,o.transport,f,s.pollXhr);if(t.clearTimeout(c.reconnectTimeoutId),c.reconnectTimeoutId=null,h==="abort"){o.log("Aborted xhr request.");return}if(!y(v)){if(l++,o.state!==r.connectionState.reconnecting&&(o.log("An error occurred using longPolling. Status = "+h+".  Response = "+f.responseText+"."),n(s).triggerHandler(u.onError,[v])),(o.state===r.connectionState.connected||o.state===r.connectionState.reconnecting)&&!i.verifyLastActive(o))return;if(!i.ensureReconnectingState(s))return;c.pollTimeoutId=t.setTimeout(function(){e(s,!0)},a.reconnectDelay)}}}),k&&h===!0&&(c.reconnectTimeoutId=t.setTimeout(function(){p(s)},Math.min(1e3*(Math.pow(2,l)-1),w))))})(o)},250)},lostConnection:function(n){n.pollXhr&&n.pollXhr.abort("lostConnection")},send:function(n,t){i.ajaxSend(n,t)},stop:function(n){t.clearTimeout(n._.pollTimeoutId);t.clearTimeout(n._.reconnectTimeoutId);delete n._.pollTimeoutId;delete n._.reconnectTimeoutId;n.pollXhr&&(n.pollXhr.abort(),n.pollXhr=null,delete n.pollXhr)},abort:function(n,t){i.ajaxAbort(n,t)}}}(window.jQuery,window),function(n){function r(n){return n+e}function s(n,t,i){for(var f=n.length,u=[],r=0;r<f;r+=1)n.hasOwnProperty(r)&&(u[r]=t.call(i,n[r],r,n));return u}function h(t){return n.isFunction(t)?null:n.type(t)==="undefined"?null:t}function u(n){for(var t in n)if(n.hasOwnProperty(t))return!0;return!1}function f(n,t){var i=n._.invocationCallbacks,r,f;u(i)&&n.log("Clearing hub invocation callbacks with error: "+t+".");n._.invocationCallbackId=0;delete n._.invocationCallbacks;n._.invocationCallbacks={};for(f in i)r=i[f],r.method.call(r.scope,{E:t})}function i(n,t){return new i.fn.init(n,t)}function t(i,r){var u={qs:null,logging:!1,useDefaultPath:!0};return n.extend(u,r),(!i||u.useDefaultPath)&&(i=(i||"")+"/signalr"),new t.fn.init(i,u)}var e=".hubProxy",o=n.signalR;i.fn=i.prototype={init:function(n,t){this.state={};this.connection=n;this.hubName=t;this._={callbackMap:{}}},constructor:i,hasSubscriptions:function(){return u(this._.callbackMap)},on:function(t,i){var u=this,f=u._.callbackMap;return t=t.toLowerCase(),f[t]||(f[t]={}),f[t][i]=function(n,t){i.apply(u,t)},n(u).bind(r(t),f[t][i]),u},off:function(t,i){var e=this,o=e._.callbackMap,f;return t=t.toLowerCase(),f=o[t],f&&(f[i]?(n(e).unbind(r(t),f[i]),delete f[i],u(f)||delete o[t]):i||(n(e).unbind(r(t)),delete o[t])),e},invoke:function(t){var i=this,r=i.connection,e=n.makeArray(arguments).slice(1),c=s(e,h),f={H:i.hubName,M:t,A:c,I:r._.invocationCallbackId},u=n.Deferred(),l=function(f){var e=i._maximizeHubResponse(f),h,s;n.extend(i.state,e.State);e.Progress?u.notifyWith?u.notifyWith(i,[e.Progress.Data]):r._.progressjQueryVersionLogged||(r.log("A hub method invocation progress update was received but the version of jQuery in use ("+n.prototype.jquery+") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications."),r._.progressjQueryVersionLogged=!0):e.Error?(e.StackTrace&&r.log(e.Error+"\n"+e.StackTrace+"."),h=e.IsHubException?"HubException":"Exception",s=o._.error(e.Error,h),s.data=e.ErrorData,r.log(i.hubName+"."+t+" failed to execute. Error: "+s.message),u.rejectWith(i,[s])):(r.log("Invoked "+i.hubName+"."+t),u.resolveWith(i,[e.Result]))};return r._.invocationCallbacks[r._.invocationCallbackId.toString()]={scope:i,method:l},r._.invocationCallbackId+=1,n.isEmptyObject(i.state)||(f.S=i.state),r.log("Invoking "+i.hubName+"."+t),r.send(f),u.promise()},_maximizeHubResponse:function(n){return{State:n.S,Result:n.R,Progress:n.P?{Id:n.P.I,Data:n.P.D}:null,Id:n.I,IsHubException:n.H,Error:n.E,StackTrace:n.T,ErrorData:n.D}}};i.fn.init.prototype=i.fn;t.fn=t.prototype=n.connection();t.fn.init=function(t,i){var e={qs:null,logging:!1,useDefaultPath:!0},u=this;n.extend(e,i);n.signalR.fn.init.call(u,t,e.qs,e.logging);u.proxies={};u._.invocationCallbackId=0;u._.invocationCallbacks={};u.received(function(t){var f,o,e,i,s,h;t&&(typeof t.P!="undefined"?(e=t.P.I.toString(),i=u._.invocationCallbacks[e],i&&i.method.call(i.scope,t)):typeof t.I!="undefined"?(e=t.I.toString(),i=u._.invocationCallbacks[e],i&&(u._.invocationCallbacks[e]=null,delete u._.invocationCallbacks[e],i.method.call(i.scope,t))):(f=this._maximizeClientHubInvocation(t),u.log("Triggering client hub event '"+f.Method+"' on hub '"+f.Hub+"'."),s=f.Hub.toLowerCase(),h=f.Method.toLowerCase(),o=this.proxies[s],n.extend(o.state,f.State),n(o).triggerHandler(r(h),[f.Args])))});u.error(function(n,t){var i,r;t&&(i=t.I,r=u._.invocationCallbacks[i],r&&(u._.invocationCallbacks[i]=null,delete u._.invocationCallbacks[i],r.method.call(r.scope,{E:n})))});u.reconnecting(function(){u.transport&&u.transport.name==="webSockets"&&f(u,"Connection started reconnecting before invocation result was received.")});u.disconnected(function(){f(u,"Connection was disconnected before invocation result was received.")})};t.fn._maximizeClientHubInvocation=function(n){return{Hub:n.H,Method:n.M,Args:n.A,State:n.S}};t.fn._registerSubscribedHubs=function(){var t=this;t._subscribedToHubs||(t._subscribedToHubs=!0,t.starting(function(){var i=[];n.each(t.proxies,function(n){this.hasSubscriptions()&&(i.push({name:n}),t.log("Client subscribed to hub '"+n+"'."))});i.length===0&&t.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.");t.data=t.json.stringify(i)}))};t.fn.createHubProxy=function(n){n=n.toLowerCase();var t=this.proxies[n];return t||(t=i(this,n),this.proxies[n]=t),this._registerSubscribedHubs(),t};t.fn.init.prototype=t.fn;n.hubConnection=t}(window.jQuery,window),function(n){n.signalR.version="2.2.1"}(window.jQuery)

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	"use strict"; angular.module("mentio", []).directive("mentio", ["mentioUtil", "$document", "$compile", "$log", "$timeout", function (e, t, n, r, i) { return { restrict: "A", scope: { macros: "=mentioMacros", search: "&mentioSearch", select: "&mentioSelect", items: "=mentioItems", typedTerm: "=mentioTypedTerm", altId: "=mentioId", iframeElement: "=mentioIframeElement", requireLeadingSpace: "=mentioRequireLeadingSpace", selectNotFound: "=mentioSelectNotFound", trimTerm: "=mentioTrimTerm", ngModel: "=" }, controller: ["$scope", "$timeout", "$attrs", function (n, r, i) { n.query = function (e, t) { var r = n.triggerCharMap[e]; (void 0 === n.trimTerm || n.trimTerm) && (t = t.trim()), r.showMenu(), r.search({ term: t }), r.typedTerm = t }, n.defaultSearch = function (e) { var t = []; angular.forEach(n.items, function (n) { n.label.toUpperCase().indexOf(e.term.toUpperCase()) >= 0 && t.push(n) }), n.localItems = t }, n.bridgeSearch = function (e) { var t = i.mentioSearch ? n.search : n.defaultSearch; t({ term: e }) }, n.defaultSelect = function (e) { return n.defaultTriggerChar + e.item.label }, n.bridgeSelect = function (e) { var t = i.mentioSelect ? n.select : n.defaultSelect; return t({ item: e }) }, n.setTriggerText = function (e) { n.syncTriggerText && (n.typedTerm = void 0 === n.trimTerm || n.trimTerm ? e.trim() : e) }, n.context = function () { return n.iframeElement ? { iframe: n.iframeElement } : void 0 }, n.replaceText = function (t, i) { if (n.hideAll(), e.replaceTriggerText(n.context(), n.targetElement, n.targetElementPath, n.targetElementSelectedOffset, n.triggerCharSet, t, n.requireLeadingSpace, i), !i && (n.setTriggerText(""), angular.element(n.targetElement).triggerHandler("change"), n.isContentEditable())) { n.contentEditableMenuPasted = !0; var o = r(function () { n.contentEditableMenuPasted = !1 }, 200); n.$on("$destroy", function () { r.cancel(o) }) } }, n.hideAll = function () { for (var e in n.triggerCharMap) n.triggerCharMap.hasOwnProperty(e) && n.triggerCharMap[e].hideMenu() }, n.getActiveMenuScope = function () { for (var e in n.triggerCharMap) if (n.triggerCharMap.hasOwnProperty(e) && n.triggerCharMap[e].visible) return n.triggerCharMap[e]; return null }, n.selectActive = function () { for (var e in n.triggerCharMap) n.triggerCharMap.hasOwnProperty(e) && n.triggerCharMap[e].visible && n.triggerCharMap[e].selectActive() }, n.isActive = function () { for (var e in n.triggerCharMap) if (n.triggerCharMap.hasOwnProperty(e) && n.triggerCharMap[e].visible) return !0; return !1 }, n.isContentEditable = function () { return "INPUT" !== n.targetElement.nodeName && "TEXTAREA" !== n.targetElement.nodeName }, n.replaceMacro = function (t, i) { i ? e.replaceMacroText(n.context(), n.targetElement, n.targetElementPath, n.targetElementSelectedOffset, n.macros, n.macros[t]) : (n.replacingMacro = !0, n.timer = r(function () { e.replaceMacroText(n.context(), n.targetElement, n.targetElementPath, n.targetElementSelectedOffset, n.macros, n.macros[t]), angular.element(n.targetElement).triggerHandler("change"), n.replacingMacro = !1 }, 300), n.$on("$destroy", function () { r.cancel(n.timer) })) }, n.addMenu = function (e) { e.parentScope && n.triggerCharMap.hasOwnProperty(e.triggerChar) || (n.triggerCharMap[e.triggerChar] = e, void 0 === n.triggerCharSet && (n.triggerCharSet = []), n.triggerCharSet.push(e.triggerChar), e.setParent(n)) }, n.$on("menuCreated", function (e, t) { (void 0 !== i.id || void 0 !== i.mentioId) && (i.id === t.targetElement || void 0 !== i.mentioId && n.altId === t.targetElement) && n.addMenu(t.scope) }), t.on("click", function () { n.isActive() && n.$apply(function () { n.hideAll() }) }), t.on("keydown keypress paste", function (e) { var t = n.getActiveMenuScope(); t && ((9 === e.which || 13 === e.which) && (e.preventDefault(), t.selectActive()), 27 === e.which && (e.preventDefault(), t.$apply(function () { t.hideMenu() })), 40 === e.which && (e.preventDefault(), t.$apply(function () { t.activateNextItem() }), t.adjustScroll(1)), 38 === e.which && (e.preventDefault(), t.$apply(function () { t.activatePreviousItem() }), t.adjustScroll(-1)), (37 === e.which || 39 === e.which) && e.preventDefault()) }) }], link: function (t, o, a) { function c(e) { function n(e) { e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation() } var r = t.getActiveMenuScope(); if (r) { if (9 === e.which || 13 === e.which) return n(e), r.selectActive(), !1; if (27 === e.which) return n(e), r.$apply(function () { r.hideMenu() }), !1; if (40 === e.which) return n(e), r.$apply(function () { r.activateNextItem() }), r.adjustScroll(1), !1; if (38 === e.which) return n(e), r.$apply(function () { r.activatePreviousItem() }), r.adjustScroll(-1), !1; if (37 === e.which || 39 === e.which) return n(e), !1 } } if (t.triggerCharMap = {}, t.targetElement = o, a.$set("autocomplete", "off"), a.mentioItems) { t.localItems = [], t.parentScope = t; var l = a.mentioSearch ? ' mentio-items="items"' : ' mentio-items="localItems"'; t.defaultTriggerChar = a.mentioTriggerChar ? t.$eval(a.mentioTriggerChar) : "@"; var s = '<mentio-menu mentio-search="bridgeSearch(term)" mentio-select="bridgeSelect(item)"' + l; a.mentioTemplateUrl && (s = s + ' mentio-template-url="' + a.mentioTemplateUrl + '"'), s = s + " mentio-trigger-char=\"'" + t.defaultTriggerChar + '\'" mentio-parent-scope="parentScope"/>'; var m = n(s), u = m(t); o.parent().append(u), t.$on("$destroy", function () { u.remove() }) } a.mentioTypedTerm && (t.syncTriggerText = !0), t.$watch("iframeElement", function (e) { if (e) { var n = e.contentWindow.document; n.addEventListener("click", function () { t.isActive() && t.$apply(function () { t.hideAll() }) }), n.addEventListener("keydown", c, !0), t.$on("$destroy", function () { n.removeEventListener("keydown", c) }) } }), t.$watch("ngModel", function (n) { if (n && "" !== n || t.isActive()) { if (void 0 === t.triggerCharSet) return void r.error("Error, no mentio-items attribute was provided, and no separate mentio-menus were specified.  Nothing to do."); if (t.contentEditableMenuPasted) return void (t.contentEditableMenuPasted = !1); t.replacingMacro && (i.cancel(t.timer), t.replacingMacro = !1); var o = t.isActive(), a = t.isContentEditable(), c = e.getTriggerInfo(t.context(), t.triggerCharSet, t.requireLeadingSpace, o); if (void 0 !== c && (!o || o && (a && c.mentionTriggerChar === t.currentMentionTriggerChar || !a && c.mentionPosition === t.currentMentionPosition))) c.mentionSelectedElement && (t.targetElement = c.mentionSelectedElement, t.targetElementPath = c.mentionSelectedPath, t.targetElementSelectedOffset = c.mentionSelectedOffset), t.setTriggerText(c.mentionText), t.currentMentionPosition = c.mentionPosition, t.currentMentionTriggerChar = c.mentionTriggerChar, t.query(c.mentionTriggerChar, c.mentionText); else { var l = t.typedTerm; t.setTriggerText(""), t.hideAll(); var s = e.getMacroMatch(t.context(), t.macros); if (void 0 !== s) t.targetElement = s.macroSelectedElement, t.targetElementPath = s.macroSelectedPath, t.targetElementSelectedOffset = s.macroSelectedOffset, t.replaceMacro(s.macroText, s.macroHasTrailingSpace); else if (t.selectNotFound && l && "" !== l) { var m = t.triggerCharMap[t.currentMentionTriggerChar]; if (m) { var u = m.select({ item: { label: l } }); "function" == typeof u.then ? u.then(t.replaceText) : t.replaceText(u, !0) } } } } }) } } }]).directive("mentioMenu", ["mentioUtil", "$rootScope", "$log", "$window", "$document", function (e, t, n, r, i) { return { restrict: "E", scope: { search: "&mentioSearch", select: "&mentioSelect", items: "=mentioItems", triggerChar: "=mentioTriggerChar", forElem: "=mentioFor", parentScope: "=mentioParentScope" }, templateUrl: function (e, t) { return void 0 !== t.mentioTemplateUrl ? t.mentioTemplateUrl : "mentio-menu.tpl.html" }, controller: ["$scope", function (e) { e.visible = !1, this.activate = e.activate = function (t) { e.activeItem = t }, this.isActive = e.isActive = function (t) { return e.activeItem === t }, this.selectItem = e.selectItem = function (t) { var n = e.select({ item: t }); "function" == typeof n.then ? n.then(e.parentMentio.replaceText) : e.parentMentio.replaceText(n) }, e.activateNextItem = function () { var t = e.items.indexOf(e.activeItem); this.activate(e.items[(t + 1) % e.items.length]) }, e.activatePreviousItem = function () { var t = e.items.indexOf(e.activeItem); this.activate(e.items[0 === t ? e.items.length - 1 : t - 1]) }, e.isFirstItemActive = function () { var t = e.items.indexOf(e.activeItem); return 0 === t }, e.isLastItemActive = function () { var t = e.items.indexOf(e.activeItem); return t === e.items.length - 1 }, e.selectActive = function () { e.selectItem(e.activeItem) }, e.isVisible = function () { return e.visible }, e.showMenu = function () { e.visible || (e.requestVisiblePendingSearch = !0) }, e.setParent = function (t) { e.parentMentio = t, e.targetElement = t.targetElement } }], link: function (o, a) { if (a[0].parentNode.removeChild(a[0]), i[0].body.appendChild(a[0]), o.menuElement = a, o.parentScope) o.parentScope.addMenu(o); else { if (!o.forElem) return void n.error("mentio-menu requires a target element in tbe mentio-for attribute"); if (!o.triggerChar) return void n.error("mentio-menu requires a trigger char"); t.$broadcast("menuCreated", { targetElement: o.forElem, scope: o }) } angular.element(r).bind("resize", function () { if (o.isVisible()) { var t = []; t.push(o.triggerChar), e.popUnderMention(o.parentMentio.context(), t, a, o.requireLeadingSpace) } }), o.$watch("items", function (e) { e && e.length > 0 ? (o.activate(e[0]), !o.visible && o.requestVisiblePendingSearch && (o.visible = !0, o.requestVisiblePendingSearch = !1)) : o.hideMenu() }), o.$watch("isVisible()", function (t) { if (t) { var n = []; n.push(o.triggerChar), e.popUnderMention(o.parentMentio.context(), n, a, o.requireLeadingSpace) } }), o.parentMentio.$on("$destroy", function () { a.remove() }), o.hideMenu = function () { o.visible = !1, a.css("display", "none") }, o.adjustScroll = function (e) { var t = a[0], n = t.querySelector("ul"), r = t.querySelector("[mentio-menu-item].active") || t.querySelector("[data-mentio-menu-item].active"); return o.isFirstItemActive() ? n.scrollTop = 0 : o.isLastItemActive() ? n.scrollTop = n.scrollHeight : void (1 === e ? n.scrollTop += r.offsetHeight : n.scrollTop -= r.offsetHeight) } } } }]).directive("mentioMenuItem", function () { return { restrict: "A", scope: { item: "=mentioMenuItem" }, require: "^mentioMenu", link: function (e, t, n, r) { e.$watch(function () { return r.isActive(e.item) }, function (e) { e ? t.addClass("active") : t.removeClass("active") }), t.bind("mouseenter", function () { e.$apply(function () { r.activate(e.item) }) }), t.bind("click", function () { return r.selectItem(e.item), !1 }) } } }).filter("unsafe", ["$sce", function (e) { return function (t) { return e.trustAsHtml(t) } }]).filter("mentioHighlight", function () { function e(e) { return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") } return function (t, n, r) { if (n) { var i = r ? '<span class="' + r + '">$&</span>' : "<strong>$&</strong>"; return ("" + t).replace(new RegExp(e(n), "gi"), i) } return t } }), angular.module("mentio").factory("mentioUtil", ["$window", "$location", "$anchorScroll", "$timeout", function (e, t, n, r) { function i(e, t, n, i) { var c, l = h(e, t, i, !1); void 0 !== l ? (c = a(e) ? b(e, v(e).activeElement, l.mentionPosition) : S(e, l.mentionPosition), n.css({ top: c.top + "px", left: c.left + "px", position: "absolute", zIndex: 1e4, display: "block" }), r(function () { o(e, n) }, 0)) : n.css({ display: "none" }) } function o(t, n) { for (var r, i = 20, o = 100, a = n[0]; void 0 === r || 0 === r.height;) if (r = a.getBoundingClientRect(), 0 === r.height && (a = a.childNodes[0], void 0 === a || !a.getBoundingClientRect)) return; var c = r.top, l = c + r.height; if (0 > c) e.scrollTo(0, e.pageYOffset + r.top - i); else if (l > e.innerHeight) { var s = e.pageYOffset + r.top - i; s - e.pageYOffset > o && (s = e.pageYOffset + o); var m = e.pageYOffset - (e.innerHeight - l); m > s && (m = s), e.scrollTo(0, m) } } function a(e) { var t = v(e).activeElement; if (null !== t) { var n = t.nodeName, r = t.getAttribute("type"); return "INPUT" === n && "text" === r || "TEXTAREA" === n } return !1 } function c(e, t, n, r) { var i, o = t; if (n) for (var a = 0; a < n.length; a++) { if (o = o.childNodes[n[a]], void 0 === o) return; for (; o.length < r;) r -= o.length, o = o.nextSibling; 0 !== o.childNodes.length || o.length || (o = o.previousSibling) } var c = p(e); i = v(e).createRange(), i.setStart(o, r), i.setEnd(o, r), i.collapse(!0); try { c.removeAllRanges() } catch (l) { } c.addRange(i), t.focus() } function l(e, t, n, r) { var i, o; o = p(e), i = v(e).createRange(), i.setStart(o.anchorNode, n), i.setEnd(o.anchorNode, r), i.deleteContents(); var a = v(e).createElement("div"); a.innerHTML = t; for (var c, l, s = v(e).createDocumentFragment() ; c = a.firstChild;) l = s.appendChild(c); i.insertNode(s), l && (i = i.cloneRange(), i.setStartAfter(l), i.collapse(!0), o.removeAllRanges(), o.addRange(i)) } function s(e, t, n, r) { var i = t.nodeName; "INPUT" === i || "TEXTAREA" === i ? t !== v(e).activeElement && t.focus() : c(e, t, n, r) } function m(e, t, n, r, i, o) { s(e, t, n, r); var c = d(e, i); if (c.macroHasTrailingSpace && (c.macroText = c.macroText + " ", o += " "), void 0 !== c) { var m = v(e).activeElement; if (a(e)) { var u = c.macroPosition, g = c.macroPosition + c.macroText.length; m.value = m.value.substring(0, u) + o + m.value.substring(g, m.value.length), m.selectionStart = u + o.length, m.selectionEnd = u + o.length } else l(e, o, c.macroPosition, c.macroPosition + c.macroText.length) } } function u(e, t, n, r, i, o, c, m) { s(e, t, n, r); var u = h(e, i, c, !0, m); if (void 0 !== u) if (a()) { var g = v(e).activeElement; o += " "; var d = u.mentionPosition, f = u.mentionPosition + u.mentionText.length + 1; g.value = g.value.substring(0, d) + o + g.value.substring(f, g.value.length), g.selectionStart = d + o.length, g.selectionEnd = d + o.length } else o += " ", l(e, o, u.mentionPosition, u.mentionPosition + u.mentionText.length + 1) } function g(e, t) { if (null === t.parentNode) return 0; for (var n = 0; n < t.parentNode.childNodes.length; n++) { var r = t.parentNode.childNodes[n]; if (r === t) return n } } function d(e, t) { var n, r, i = []; if (a(e)) n = v(e).activeElement; else { var o = f(e); o && (n = o.selected, i = o.path, r = o.offset) } var c = T(e); if (void 0 !== c && null !== c) { var l, s = !1; if (c.length > 0 && (" " === c.charAt(c.length - 1) || " " === c.charAt(c.length - 1)) && (s = !0, c = c.substring(0, c.length - 1)), angular.forEach(t, function (e, t) { var o = c.toUpperCase().lastIndexOf(t.toUpperCase()); if (o >= 0 && t.length + o === c.length) { var a = o - 1; (0 === o || " " === c.charAt(a) || " " === c.charAt(a)) && (l = { macroPosition: o, macroText: t, macroSelectedElement: n, macroSelectedPath: i, macroSelectedOffset: r, macroHasTrailingSpace: s }) } }), l) return l } } function f(e) { var t, n = p(e), r = n.anchorNode, i = []; if (null != r) { for (var o, a = r.contentEditable; null !== r && "true" !== a;) o = g(e, r), i.push(o), r = r.parentNode, null !== r && (a = r.contentEditable); return i.reverse(), t = n.getRangeAt(0).startOffset, { selected: r, path: i, offset: t } } } function h(e, t, n, r, i) { var o, c, l; if (a(e)) o = v(e).activeElement; else { var s = f(e); s && (o = s.selected, c = s.path, l = s.offset) } var m = T(e); if (void 0 !== m && null !== m) { var u, g = -1; if (t.forEach(function (e) { var t = m.lastIndexOf(e); t > g && (g = t, u = e) }), g >= 0 && (0 === g || !n || /[\xA0\s]/g.test(m.substring(g - 1, g)))) { var d = m.substring(g + 1, m.length); u = m.substring(g, g + 1); var h = d.substring(0, 1), p = d.length > 0 && (" " === h || " " === h); if (i && (d = d.trim()), !p && (r || !/[\xA0\s]/g.test(d))) return { mentionPosition: g, mentionText: d, mentionSelectedElement: o, mentionSelectedPath: c, mentionSelectedOffset: l, mentionTriggerChar: u } } } } function p(e) { return e ? e.iframe.contentWindow.getSelection() : window.getSelection() } function v(e) { return e ? e.iframe.contentWindow.document : document } function T(e) { var t; if (a(e)) { var n = v(e).activeElement, r = n.selectionStart; t = n.value.substring(0, r) } else { var i = p(e).anchorNode; if (null != i) { var o = i.textContent, c = p(e).getRangeAt(0).startOffset; c >= 0 && (t = o.substring(0, c)) } } return t } function S(e, t) { var n, r, i = "﻿", o = "sel_" + (new Date).getTime() + "_" + Math.random().toString().substr(2), a = p(e), c = a.getRangeAt(0); r = v(e).createRange(), r.setStart(a.anchorNode, t), r.setEnd(a.anchorNode, t), r.collapse(!1), n = v(e).createElement("span"), n.id = o, n.appendChild(v(e).createTextNode(i)), r.insertNode(n), a.removeAllRanges(), a.addRange(c); var l = { left: 0, top: n.offsetHeight }; return E(e, n, l), n.parentNode.removeChild(n), l } function E(e, t, n) { for (var r = t, i = e ? e.iframe : null; r;) n.left += r.offsetLeft + r.clientLeft, n.top += r.offsetTop + r.clientTop, r = r.offsetParent, !r && i && (r = i, i = null); for (r = t, i = e ? e.iframe : null; r !== v().body;) r.scrollTop && r.scrollTop > 0 && (n.top -= r.scrollTop), r.scrollLeft && r.scrollLeft > 0 && (n.left -= r.scrollLeft), r = r.parentNode, !r && i && (r = i, i = null) } function b(e, t, n) { var r = ["direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing"], i = null !== window.mozInnerScreenX, o = v(e).createElement("div"); o.id = "input-textarea-caret-position-mirror-div", v(e).body.appendChild(o); var a = o.style, c = window.getComputedStyle ? getComputedStyle(t) : t.currentStyle; a.whiteSpace = "pre-wrap", "INPUT" !== t.nodeName && (a.wordWrap = "break-word"), a.position = "absolute", a.visibility = "hidden", r.forEach(function (e) { a[e] = c[e] }), i ? (a.width = parseInt(c.width) - 2 + "px", t.scrollHeight > parseInt(c.height) && (a.overflowY = "scroll")) : a.overflow = "hidden", o.textContent = t.value.substring(0, n), "INPUT" === t.nodeName && (o.textContent = o.textContent.replace(/\s/g, " ")); var l = v(e).createElement("span"); l.textContent = t.value.substring(n) || ".", o.appendChild(l); var s = { top: l.offsetTop + parseInt(c.borderTopWidth) + parseInt(c.fontSize), left: l.offsetLeft + parseInt(c.borderLeftWidth) }; return E(e, t, s), v(e).body.removeChild(o), s } return { popUnderMention: i, replaceMacroText: m, replaceTriggerText: u, getMacroMatch: d, getTriggerInfo: h, selectElement: c, getTextAreaOrInputUnderlinePosition: b, getTextPrecedingCurrentSelection: T, getContentEditableSelectedPath: f, getNodePositionInParent: g, getContentEditableCaretPosition: S, pasteHtml: l, resetSelection: s, scrollIntoView: o } }]), angular.module("mentio").run(["$templateCache", function (e) { e.put("mentio-menu.tpl.html", '<style>\n.scrollable-menu {\n    height: auto;\n    max-height: 300px;\n    overflow: auto;\n}\n\n.menu-highlighted {\n    font-weight: bold;\n}\n</style>\n<ul class="dropdown-menu scrollable-menu" style="display:block">\n    <li mentio-menu-item="item" ng-repeat="item in items track by $index">\n        <a class="text-primary" ng-bind-html="item.label | mentioHighlight:typedTerm:\'menu-highlighted\' | unsafe"></a>\n    </li>\n</ul>') }]);

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	var Configuration = {
	    rootApiUrl: "",
	    adminUrlPathPrefix: "/admin",
	    pluginPath: "/Plugins/Widgets.mobSocial",
	    globalApiEndPoint: "http://localhost:15536/api" // "https://mobsocial.co/api"
	};

	window.Configuration = Configuration;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

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

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	window.mobSocial = angular.module("mobSocialApp", ['ui.router', 'LocalStorageModule', 'angularMoment', "oc.lazyLoad", "ngSanitize", "mentio", "SignalR", 'ui.slimscroll', "angucomplete-alt"])
	    .constant('rootUrl', './Plugins/Widgets.mobSocial/Content/mobSocial')
	    .constant('globalApiEndPoint', window.Configuration.globalApiEndPoint)
	    .constant('accessTokenEndPoint', '/social/access-token')
	    .constant('signalREndPoint', 'https://mobsocial.co/signalr')
	    .constant('mobSocialClientId', '714c2b79f006444fa089466cee4433c6')
		.constant('loggedInUserKey', 'loggedin')
	    .constant('userInfoKey', 'userinfo')
	    .factory('$global', [
	        'globalApiEndPoint', function (globalApiEndPoint) {
	            return {
	                getApiUrl: function (url) {
	                    return globalApiEndPoint + url;
	                }
	            }
	        }
	    ]);



	//attach some global functions to rootScope
	window.mobSocial.run([
	    "$rootScope", "$sce", "$state", "$window", "$q", "$interval", "autoCompleteService", "authProvider",
	    "conversationHub", "$http", "globalApiEndPoint", "oauthService",
	    function ($rootScope, $sce, $state, $window, $q, $interval, autoCompleteService, authProvider, conversationHub, $http, globalApiEndPoint, oauthService) {

	        $rootScope.$state = $state;
	        //whenever a route changes, check if authentication is required, if yes, better redirect to login page
	        $rootScope.$on('$stateChangeError',
	            function(event, toState, toParams, fromState, fromParams, error) {
	                if (error === 'Not Authenticated') {
	                    event.preventDefault();
	                    $rootScope.login();
	                }
	            });
	        //whenever state changes, see if we are in administration area or registered area
	        $rootScope.$on('$stateChangeSuccess',
	            function(event, toState, toParams, fromState, fromParams, error) {
	                $rootScope.isAdministrationArea = $window.location.pathname
	                    .startsWith($window.Configuration.adminUrlPathPrefix);
	                //and scroll to top
	                $window.scrollTo(0, 0);
	            });

	        //execute some theme callbacks on view content loaded
	        $rootScope.$on('$viewContentLoaded',
	            function(event, viewConfig) {
	                if (viewConfig !== "@") {
	                    if ($window['viewContentLoaded']) {
	                        $window['viewContentLoaded']();
	                    }
	                }

	            });

	        $rootScope.$on("$includeContentLoaded",
	            function(event, templateName) {
	                if ($window['viewContentLoaded']) {
	                    $window['viewContentLoaded']();
	                }
	            });

	        oauthService.getAccessToken(function(token) {
	            if (token && !token.startsWith("app_")) {
	                //set logged in user for use throughout
	                $rootScope.CurrentUser = authProvider.getLoggedInUser();
	            }
	        });
	        
	        $rootScope.currentUserIs = function(id) {
	            return $rootScope.CurrentUser && $rootScope.CurrentUser.Id == id;
	        };
	        $rootScope.login = function(returnUrl) {
	            if (window.location.pathname == "/login")
	                return;
	            returnUrl = returnUrl || window.location.href;
	            //because the returnUrl may be absolute, it's better to explicitly reference the path from url for proper functioning
	            var a = document.createElement("a");
	            a.href = returnUrl;
	            window.location.href = "/login?ReturnUrl=" + encodeURIComponent(a.pathname + a.search);
	        };

	        $rootScope.displayErrors = function(contextName) {
	            var errors = $rootScope._errorMessages[contextName] || $rootScope._errorMessages["_global"];
	            if (!errors)
	                return "";

	            var container = '<div class="alert alert-danger alert-dismissible">' +
	                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
	                '<h4><i class="icon fa fa-ban"></i>Error</h4>' +
	                '{MESSAGES}' +
	                '</div>';

	            var str = "<ul>";
	            for (var i = 0; i < errors.length; i++) {
	                str += "<li>" + errors[i] + "</li>";
	            }
	            str += "</ul>";
	            return $sce.trustAsHtml(container.replace("{MESSAGES}", str));
	        };

	        $rootScope.displayMessages = function(contextName) {
	            var msgs = $rootScope._responseMessages[contextName] || $rootScope._responseMessages["_global"];
	            if (!msgs)
	                return "";

	            var container = '<div class="alert alert-success alert-dismissible">' +
	                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
	                '<h4><i class="icon fa fa-check"></i>Success</h4>' +
	                '{MESSAGES}' +
	                '</div>';
	            var str = "<ul>";
	            for (var i = 0; i < msgs.length; i++) {
	                str += "<li>" + msgs[i] + "</li>";
	            }
	            str += "</ul>";
	            return $sce.trustAsHtml(container.replace("{MESSAGES}", str));
	        };
	        $rootScope._Notifications = function(contextName) {
	            return $sce.trustAsHtml($rootScope.displayErrors(contextName) + $rootScope.displayMessages(contextName));
	        };
	        $rootScope.clearMessages = function() {
	            $rootScope._responseMessages = {};
	            $rootScope._errorMessages = {};
	        };
	        $rootScope.clearMessages();

	        //helper to wait a callback until the parent scope of provided scope provides it
	        $rootScope.waitFromParent = function($scope, objectNameToLookFor, defaultObjectValue) {
	            var deferred = $q.defer();
	            var checker;
	            if ($scope.$parent) {
	                //we need to wait for parent to get data. we need objectNameToLookFor to complete the task
	                checker = $interval(function() {
	                        if ($scope.$parent[objectNameToLookFor]) {
	                            $interval.cancel(checker);
	                            var returnValue = $scope.$parent[objectNameToLookFor];
	                            deferred.resolve(returnValue);
	                        } else {
	                            return;
	                        }
	                    },
	                    300); //check every 300 ms if anything has been provided by parent
	            } else {
	                deferred.resolve(defaultObjectValue);
	            }
	            return deferred.promise;
	        };

	        $rootScope.videogularConfig = {
	            theme: "/plugins/Widgets.mobSocial/app/libraries/videogular/theme/videogular.css",
	            preload: "metadata"
	        };
	        /*
	         * Updates videogular source
	         */
	        $rootScope.updatedVideoSource = function($api, url, mimeType) {
	            var source = [
	                {
	                    src: $sce.trustAsResourceUrl(url),
	                    type: mimeType
	                }
	            ];
	            $api.changeSource(source);
	            $api.sources = source;
	        };

	        $rootScope.mentioHelper = {
	            userMention: function(term, callback) {
	                autoCompleteService.get("users",
	                    term /*search term*/,
	                    function(response) {
	                        if (response.Success) {
	                            var mentionedUsers = response.ResponseData.AutoComplete.Users.map(function(element) {
	                                return {
	                                    label: element.Name, // This gets displayed in the dropdown
	                                    item: element // This will get passed to onSelect
	                                };
	                            });
	                            callback(mentionedUsers);
	                        }
	                    });
	            }
	        };
	        var activeConfigs = {};
	        //smart configs for autocomplete
	        $rootScope.smartConfig = function(onSelectCallBack, contextName) {
	            if (!activeConfigs[contextName]) {
	                activeConfigs[contextName] = {
	                    user: {
	                        autocomplete: [
	                            {
	                                words: [/@([A-Za-z]+[_A-Za-z0-9]+)/gi],
	                                cssClass: 'autocomplete-user-chip'
	                            }
	                        ],
	                        dropdown: [
	                            {
	                                trigger: /@([_A-Za-z0-9]+)/gi,
	                                list: function(match, callback) {
	                                    autoCompleteService.get("users",
	                                        match[1] /*search term*/,
	                                        function(response) {
	                                            if (response.Success) {
	                                                var users = response.ResponseData.AutoComplete.Users.map(
	                                                    function(element) {
	                                                        return {
	                                                            display:
	                                                                element.Name, // This gets displayed in the dropdown
	                                                            item: element // This will get passed to onSelect
	                                                        };
	                                                    });
	                                                callback(users);
	                                            }
	                                        });
	                                },
	                                onSelect: function(item) {
	                                    onSelectCallBack(item);
	                                    return item.display;
	                                },
	                                mode: 'replace'
	                            }
	                        ]
	                    }
	                };
	            }
	            return activeConfigs[contextName];
	        };


	        $rootScope.AutocompleteCustomer = function(userInputString, timeoutPromise) {
	            var response = $http.get(globalApiEndPoint + '/autocomplete/users/get',
	                { params: { search: userInputString, excludeLoggedInUser: true } },
	                { timeout: timeoutPromise });
	            response.success(function(res) {
	                if (res.ResponseData.AutoComplete.Users.length == 0 && validateEmail(userInputString)) {
	                    //because the response is zero, let's see if it's an email, if it is, we can add it for direct email invitation
	                    res.ResponseData.AutoComplete.Users.push({
	                        DisplayName: userInputString,
	                        Id: userInputString,
	                        EmailInvite: true
	                    });
	                }
	            });
	            return response;
	        };

	        $rootScope.checkTokenExpiration = function () {
	           
	            if (document.cookie.indexOf("mobsocial_reset_token") > 0) {
	                //we need to clear the token
	                oauthService.clearAccessToken();
	                //clear the cookie
	                document.cookie = "mobsocial_reset_token=;expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/";
	            }
	        };
	        $rootScope.checkTokenExpiration(); //call immediately
	    }
	]);

	//todo: move to a separate file
	function setDataModel(model) {
	    window.mobSocial.value("dataModel", model);
	}



/***/ }),
/* 37 */
/***/ (function(module, exports) {

	"use strict";

	window.mobSocial.service("oauthService", ["accessTokenEndPoint", "$injector", "localStorageService", function (accessTokenEndPoint, $injector, localStorageService) {
	    var accessTokenKey = "mobsocial_access_token";
	    this.getAccessToken = function (callback, forceFetch) {
	        if (!forceFetch) {
	            var token = localStorageService.get(accessTokenKey);
	            if (token) {
	                return callback(token);
	            }
	        }
	        this.clearAccessToken();
	        var $http = $injector.get("$http");
	        return $http.post(accessTokenEndPoint).then(function (response) {
	            if (response.data.success) {
	                var token = response.data.access_token;
	                if (token) {
	                    localStorageService.set(accessTokenKey, token);
	                    return callback(token);
	                }
	            }
	            return null;
	        });
	    };

	    this.clearAccessToken = function() {
	        localStorageService.set(accessTokenKey, null);
	    };
	}]);


/***/ }),
/* 38 */
/***/ (function(module, exports) {

	window.mobSocial.config(["$stateProvider",
	    "$urlRouterProvider",
	    "$locationProvider",
	    "localStorageServiceProvider",
	    "$controllerProvider",
	    "$compileProvider",
	    "$filterProvider",
	    "$provide",
	     function ($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, $controllerProvider, $compileProvider, $filterProvider, $provider) {
	         var adminPrefix = window.Configuration.adminUrlPathPrefix;
	         window.mobSocial.lazy = {
	             controller: $controllerProvider.register,
	             directive: $compileProvider.directive,
	             filter: $filterProvider.register,
	             factory: $provider.factory,
	             service: $provider.service
	         };

	         
	         $stateProvider
	             .state("layoutAdministration",
	             {
	                 abstract: true,
	                 resolve: {
	                     auth: ["authProvider", function(authProvider) {
	                         return authProvider.isLoggedIn();
	                     }]
	                 },
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/layouts/_layout-administration.html"
	             })
	             .state("layoutAdministration.dashboard",
	             {
	                 url: adminPrefix,
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/dashboard.html"
	             })
	             .state("layoutAdministration.users",
	             {
	                 abstract: true,
	                 url: adminPrefix + "/users",
	                 template: "<div ui-view></div>",
	                 resolve: {
	                     resolver: ["controllerProvider",function(controllerProvider) {
	                         return controllerProvider.resolveBundles(["fileUpload", "users"]);
	                     }]
	                 }
	             })
	             .state("layoutAdministration.users.list",
	             {
	                 url: '',
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/users/users.list.html",
	                 controller: "userController"
	             })
	             .state("layoutAdministration.users.edit",
	             {
	                 abstract: true,
	                 url: "/edit/:id",
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/users/user.edit.html",
	                 controller: "userEditController"
	             })
	             .state('layoutAdministration.users.edit.basic',
	             {
	                 url: '',
	                 templateUrl: 'pages/users/user.edit.basic.html'
	             })
	             .state('layoutAdministration.users.edit.timeline',
	             {
	                 url: '/timeline',
	                 templateUrl: window.Configuration.pluginPath + '/app/pages/users/user.edit.timeline.html'
	             })
	             .state("layoutAdministration.settings",
	             {
	                 url: adminPrefix + "/settings/:settingType",
	                 templateUrl: function(stateParams) {
	                     return window.Configuration.pluginPath + "/app/pages/settings/" + stateParams.settingType + "Settings.edit.html";
	                 },
	                 controllerProvider: ["$stateParams",function($stateParams) {
	                     if (!$stateParams.settingType)
	                         return "settingEditController";
	                     switch ($stateParams.settingType) {
	                     default:
	                         return "settingEditController";

	                     }
	                 }],
	                 resolve: {
	                     resolver: ["controllerProvider",function(controllerProvider) {
	                         return controllerProvider.resolveBundles(["settings"]);
	                     }]
	                 }
	             })
	             .state("layoutAdministration.emails",
	             {
	                 abstract: true,
	                 url: adminPrefix + "/emails",
	                 template: "<div ui-view></div>",
	                 resolve: {
	                     resolver: ["controllerProvider",function (controllerProvider) {
	                         return controllerProvider.resolveBundles(["emailAccounts"]);
	                     }]
	                 }
	             })
	             .state("layoutAdministration.emails.accountlist",
	             {
	                 url: "/emailaccounts",
	                 controller: "emailAccountController",
	                 templateUrl: "/pages/emails/emailAccount.list.html"
	             })
	             .state("layoutAdministration.emails.accountedit",
	             {
	                 url: "/emailaccount/:id",
	                 controller: "emailAccountController",
	                 templateUrl: "/pages/emails/emailAccount.editor.html"
	             })
	            .state("layoutAdministration.emails.templatelist",
	             {
	                 url: "/emailtemplates",
	                 controller: "emailTemplateController",
	                 templateUrl: "/pages/emails/emailTemplate.list.html"
	             })
	             .state("layoutAdministration.emails.templateedit",
	             {
	                 url: "/emailtemplate/:id",
	                 controller: "emailTemplateController",
	                 templateUrl: "/pages/emails/emailTemplate.editor.html"
	             })
	             .state("layoutAdministration.skills",
	             {
	                 abstract: true,
	                 url: adminPrefix + "/skills",
	                 template: "<div ui-view></div>",
	                 resolve: {
	                     resolver: ["controllerProvider",function (controllerProvider) {
	                         return controllerProvider.resolveBundles(["skillAdmin"]);
	                     }]
	                 }
	             })
	            .state("layoutAdministration.skills.list",
	             {
	                 url: "",
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/skills/skill.list.html",
	                 controller: "skillController"
	             });

	         $stateProvider
	             .state("layoutMobSocial",
	             {
	                 abstract: true,
	                 url: "/social",
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/layouts/_layout-mobsocial.html"
	             })
	             .state("layoutMobSocial.activity",
	             {
	                 url: "",
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/users/activity.html",
	                 resolve: {
	                     resolver: ["controllerProvider",function (controllerProvider) {
	                         return controllerProvider
	                             .resolveBundles(["videogular", "social", "fileUpload", "users", "timeline", "education", "skillPublic"]);
	                     }]
	                 }
	             })
	             .state("layoutMobSocial.userprofile",
	             {
	                 abstract: true,
	                 url: "/u/:idOrUserName?tab",
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/users/user.profile.html",
	                 resolve: {
	                     resolver: ["controllerProvider",function (controllerProvider) {
	                         return controllerProvider
	                             .resolveBundles(["videogular", "social", "media", "fileUpload", "users", "timeline", "skillPublic"]);
	                     }]
	                 }
	             })
	             .state("layoutMobSocial.userprofile.tabs",
	             {
	                 url: "",
	                 templateProvider: ['$stateParams', '$templateFactory', function ($stateParams, $templateFactory) {
	                     if ([undefined, "main", "pictures", "videos", "friends", "followers", "following", "skills"].indexOf($stateParams.tab) == -1) {
	                         return $templateFactory.fromUrl(window.Configuration.pluginPath + "/app/pages/common/404.html");
	                     }
	                     return $templateFactory.fromUrl(window.Configuration.pluginPath + "/app/pages/users/user.profile." +
	                         ($stateParams.tab || "main") +
	                         ".html");
	                 }]
	             })
	            .state("layoutMobSocial.skill",
	             {
	                 url: "/skill/:slug",
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/skills/skill.single.html",
	                 resolve: {
	                     resolver: ["controllerProvider",function (controllerProvider) {
	                         return controllerProvider
	                             .resolveBundles(["videogular", "social", "media", "fileUpload", "skillPublic"]);
	                     }]
	                 },
	                 controller: "skillController"
	             })
	             .state("layoutMobSocial.business",
	                 {
	                     url: "/business-pages",
	                     templateUrl: window.Configuration.pluginPath + "/app/pages/business-pages/search.html",
	                     resolve: {
	                         resolver: ["controllerProvider", function (controllerProvider) {
	                             return controllerProvider
	                                 .resolveBundles(["businessPage"]);
	                         }]
	                     }
	             })
	             .state("layoutMobSocial.team",
	                 {
	                     url: "/team/:teamId",
	                     templateUrl: window.Configuration.pluginPath + "/app/pages/team-pages/index.html",
	                     resolve: {
	                         resolver: ["controllerProvider", function (controllerProvider) {
	                             return controllerProvider
	                                 .resolveBundles(["teamPage"]);
	                         }]
	                     }
	                 });

	         $stateProvider
	             .state("layoutMobSocial.twoColumns",
	             {
	                 abstract: true,
	                 templateUrl: window.Configuration.pluginPath + "/app/pages/layouts/_layout-mobsocial-two-columns.html"
	             })
	             .state("layoutMobSocial.twoColumns.editProfile",
	             {
	                 url: "/edit-profile/?tab",
	                 resolve: {
	                     resolver: ["controllerProvider",function (controllerProvider) {
	                         return controllerProvider
	                             .resolveBundles(["videogular", "fileUpload", "media", "users", "education", "skillPublic"]);
	                     }]
	                 },
	                 views: {
	                     "left": {
	                         templateUrl: window.Configuration.pluginPath + "/app/pages/users/user.profile.edit.navigation.html"
	                     },
	                     "right": {
	                         templateProvider: ["$stateParams", "$templateFactory", function ($stateParams, $templateFactory) {
	                             if ([undefined, "basic", "education", "skills"].indexOf($stateParams.tab) == -1) {
	                                 return $templateFactory.fromUrl(window.Configuration.pluginPath + "/app/pages/common/404.html");
	                             }
	                             return $templateFactory.fromUrl(window.Configuration.pluginPath + "/app/pages/users/user.profile.edit." + ($stateParams.tab || "basic") + ".html");
	                         }],
	                         resolve: {
	                             resolver: ["controllerProvider",function (controllerProvider) {
	                                 return controllerProvider
	                                     .resolveBundles(["education", "skillPublic"]);
	                             }]
	                         },
	                         controllerProvider: ["$stateParams", function ($stateParams) {
	                             if (!$stateParams.tab)
	                                 return "userEditController";
	                             switch ($stateParams.tab) {
	                                 case "basic":
	                                     return "userEditController";
	                                 case "education":
	                                     return "educationController";
	                                 case "skills":
	                                     return "skillController";

	                             }
	                         }]
	                     }
	                 }
	             });
	         $stateProvider
	             .state("layoutApplication",
	                 {
	                     abstract: true,
	                     url: "/apps",
	                     templateUrl: window.Configuration.pluginPath + "/app/pages/layouts/_layout-application.html",
	                     resolve: {
	                         auth: ["authProvider",function (authProvider) {
	                             return authProvider.isLoggedIn();
	                         }]
	                     },
	                 })
	             .state("layoutApplication.twoColumns",
	                 {
	                     abstract: true,
	                     templateUrl: window.Configuration.pluginPath + "/app/pages/layouts/_layout-mobsocial-two-columns.html",
	                     resolve: {
	                         resolver: ["controllerProvider",function (controllerProvider) {
	                             return controllerProvider
	                                 .resolveBundles(["applicationPublic"]);
	                         }]
	                     }
	             })
	             .state("layoutApplication.twoColumns.listApplications",
	                 {
	                     url: "",
	                     views: {
	                         "left" : {
	                             templateUrl: window.Configuration.pluginPath + "/app/pages/applications/application.navigation.html"
	                         },
	                         "right" : {
	                             templateUrl: window.Configuration.pluginPath + "/app/pages/applications/application.list.html"
	                         }
	                     }
	             })
	             .state("layoutApplication.twoColumns.editApplication",
	                 {
	                     url: "/edit/?id",
	                     views: {
	                         "left": {
	                             templateUrl: window.Configuration.pluginPath + "/app/pages/applications/application.navigation.html"
	                         },
	                         "right": {
	                             templateUrl: window.Configuration.pluginPath + "/app/pages/applications/application.edit.html"
	                         }
	                     }
	             })
	             .state("layoutApplication.twoColumns.logins",
	                 {
	                     url: "",
	                     views: {
	                         "left": {
	                             templateUrl: window.Configuration.pluginPath + "/app/pages/applications/application.navigation.html"
	                         },
	                         "right": {
	                             templateUrl: window.Configuration.pluginPath + "/app/pages/applications/application.logins.html"
	                         }
	                     }
	             })
	             .state("layoutApplication.twoColumns.listCustomFields",
	                 {
	                     url: "/:id/custom-fields/:type",
	                     resolve: {
	                         resolver: ["controllerProvider", function (controllerProvider) {
	                             return controllerProvider
	                                 .resolveBundles(["customField"]);
	                         }]
	                     },
	                     views: {
	                         "left": {
	                             templateUrl: window.Configuration.pluginPath + "/app/pages/applications/application.customfields.navigation.html",
	                             controller: ["applicationService", "$scope", "$state", function(applicationService, $scope, $state) {
	                                 applicationService.getById($state.params.id,
	                                     function(response) {
	                                         $scope.application = response.ResponseData.Application;
	                                     });
	                             }]
	                         },
	                         "right": {
	                             templateUrl: window.Configuration.pluginPath + "/app/pages/applications/application.customfields.list.html"
	                         }
	                     }
	                 });
	         $stateProvider.state("layoutZero.404",
	         {
	             templateUrl: window.Configuration.pluginPath + "/app/pages/common/404.html"
	         });
	         $urlRouterProvider.otherwise(function ($injector, $location) {
	             var state = $injector.get('$state');
	             state.go('layoutZero.404');
	             return $location.path();
	         });

	         // use the HTML5 History API
	         $locationProvider.html5Mode(true);

	         //local storage
	         localStorageServiceProvider.setPrefix('mobSocial');
	     }]);

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	window.mobSocial.factory('authProvider', ['$q', 'localStorageService', '$rootScope', 'webClientService', 'loggedInUserKey', 'userInfoKey', 'globalApiEndPoint', function ($q, localStorageService, $rootScope, webClientService, loggedInUserKey, userInfoKey, globalApiEndPoint) {
	    
	    var freshLoadComplete = false;
	    return {
	        markLoggedIn: function(user) {
	            localStorageService.set(loggedInUserKey, true);
	            localStorageService.set(userInfoKey, user);
	            this.setLoggedInUser(user);
	        },
	        setLoggedInUser: function (user) {
	            $rootScope.CurrentUser = user;
	            $rootScope.UnreadNotificationCount = function () {
	                if ($rootScope.CurrentUser || !$rootScope.CurrentUser.Notifications)
	                    return 0;
	                return $rootScope.CurrentUser.Notifications.reduce(function(total, n) {
	                    if (n.EventName != "UserSentFriendRequest" && !n.IsRead)
	                        total++;
	                    return total;
	                }, 0);
	            };
	            $rootScope.PendingFriendRequestsCount = function () {
	                if ($rootScope.CurrentUser || !$rootScope.CurrentUser.Notifications)
	                    return 0;
	                return $rootScope.CurrentUser.Notifications.reduce(function (total, n) {
	                    if (n.EventName == "UserSentFriendRequest") {
	                        if (!n.FriendStatus && n.FriendStatus != 0)
	                            n.FriendStatus = 2; //status to show accept or decline button
	                        if (n.FriendStatus == 2)
	                            total++;
	                    }
	                    return total;
	                }, 0);
	            };
	        },
	        getLoggedInUser: function () {
	            var defer = $q.defer();
	            var self = this;
	            if (!freshLoadComplete) {
	                //get user from server
	                webClientService.get(globalApiEndPoint + "/users/get/me", null,
	                    function (response) {
	                        if (response.Success) {
	                            self.markLoggedIn(response.ResponseData.User);
	                            freshLoadComplete = true;
	                            defer.resolve(response.ResponseData.User);
	                        }
	                    });
	            } else {
	                defer.resolve(localStorageService.get(userInfoKey));
	            }
	            return defer.promise;
	        },
	        isLoggedIn: function () {
	            //Authentication logic here
	            var defer = $q.defer();
	            this.getLoggedInUser().then(function (user) {
	                if (user != "") {
	                    defer.resolve(user);
	                }
	                else {
	                    return defer.reject('Not Authenticated');
	                }
	            });

	            return defer.promise;
	        },
	        logout: function() {
	            localStorageService.set(loggedInUserKey, false);
	            localStorageService.set(userInfoKey, null);
	        }
	    };
	}]);

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	window.mobSocial.factory('controllerProvider', ['$q', '$rootScope', "$ocLazyLoad", function ($q, $rootScope, $ocLazyLoad) {
	   return {
	       resolve: function (dependencies) {
	           return $ocLazyLoad.load(dependencies);
	       },
	        getBundlePath : function(bundleName) {
	            var formattedBundleName = window.Configuration.pluginPath + "/app/scripts/bundles/" + bundleName + ".bundle.js";
	            return formattedBundleName;
	        },
	        resolveBundle: function (bundleName) {
	            var formattedBundleName = this.getBundlePath(bundleName);
	            return this.resolve([formattedBundleName]);
	        },
	        resolveBundles: function (bundleNames) {
	            var bundles = [];
	            for (var i = 0; i < bundleNames.length; i++)
	                bundles.push(this.getBundlePath(bundleNames[i]));
	            return this.resolve(bundles);
	        }
	    };
	}]);

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	window.mobSocial.service("MobSocialInterceptor", ["$rootScope", "oauthService", "$injector", function ($rootScope, oauthService, $injector) {
	    this.request = function (config) {
	        if ($rootScope.clearMessages)
	            $rootScope.clearMessages();
	        return config;
	    };
	    this.response = function (response) {
	        $rootScope.checkTokenExpiration();
	        if (response.data) {
	            if (response.data.Messages) {
	                $rootScope._responseMessages = response.data.Messages;
	            }
	            if (response.data.ErrorMessages) {
	                $rootScope._errorMessages = response.data.ErrorMessages;
	            }
	        }
	        return response;
	    };

	    this.responseError = function (response) {
	        $rootScope.checkTokenExpiration();
	        if (response.status === 400) { //bad request
	            $rootScope._errorMessages = {
	                "_global": [response.data.message || "Oops, something went wrong"]
	            };
	        }
	        else if (response.status === 401) { //unauthorized
	            $rootScope.login();
	        }
	        else if (response.status === 403) {
	            ////get the token again and call the previous request again
	            oauthService.getAccessToken(function (token) {

	                var $http = $injector.get("$http");
	                if (token.startsWith("app_"))
	                    token = token.substr("app_".length);
	                response.config.headers["Authorization"] = 'Bearer ' + token;
	                $http(response.config).then(function (resp) {
	                    if (response.config.success)
	                        response.config.success(resp.data);
	                });

	            },
	                true);
	        }
	        else if (response.status === 404) {
	            //not found
	            // window.location.href = "/404";
	        }
	        else if (response.status === 412) {
	            //app token expired
	            oauthService.clearAccessToken();
	            window.location.reload();
	        }

	        return response;
	    };
	}
	]);
	window.mobSocial.config(['$httpProvider', function ($httpProvider) {
	    $httpProvider.interceptors.push('MobSocialInterceptor');
	}]);

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	window.mobSocial.service("webClientService", ["$http", "$rootScope", "oauthService", function ($http, $rootScope, oauthService) {

	    this._connect = function(method, url, params, success, error) {
	        var config = {
	            method: method,
	            url: url,
	            headers: { 'X-Requested-With': 'XMLHttpRequest'/*, 'Content-Type': 'application/x-www-form-urlencoded'*/ }
	            //transformRequest: function (obj) {
	            //    var str = [];
	            //    for (var p in obj)
	            //        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	            //    return str.join("&");
	            //}
	        };
	        //to make any calls access token is required
	        if (method === "GET")
	            config["params"] = params;
	        else {
	            config["data"] = params;
	            config["dataType"] = "json";
	        }
	        config.success = success;
	        config.error = error;
	        oauthService.getAccessToken(function(token) {
	            //set bearer token
	            //$http.defaults.headers.common.Authorization = 'Bearer ' + token;
	            if (token.startsWith("app_"))
	                token = token.substr("app_".length);

	            config.headers["Authorization"] = 'Bearer ' + token;
	            $rootScope.BlockUi = true;
	            $http(config).then(function(response) {
	                    $rootScope.BlockUi = false;
	                    if (success)
	                        success(response.data);
	                },
	                function(response) {
	                    $rootScope.BlockUi = false;
	                    if (error)
	                        error(response.data);
	                });
	        });

	    };

	    this.get = function (url, params, success, error) {
	        this._connect("GET", url, params, success, error);
	    };

	    this.post = function (url, params, success, error) {
	        this._connect("POST", url, params, success, error);
	    };

	    this.put = function (url, params, success, error) {
	        this._connect("PUT", url, params, success, error);
	    };

	    this.patch = function (url, params, success, error) {
	        this._connect("PATCH", url, params, success, error);
	    };

	    this.delete = function (url, params, success, error) {
	        this._connect("DELETE", url, params, success, error);
	    };
	}]);

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	window.mobSocial.service("entityPropertyService", ["globalApiEndPoint", "webClientService", "$http", function (globalApiEndPoint, webClientService, $http) {

	    var apiEndPoint = globalApiEndPoint + "/entityproperties";
	   
	    this.post = function (entityPropertyModel, success, error) {
	        webClientService.post(apiEndPoint + "/post", entityPropertyModel, success, error);
	    }

	    

	}]);

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	window.mobSocial.service("autoCompleteService", [
	    "webClientService", "$global", function (webClientService, $global) {
	        this.get = function (csvTypes, searchText, success, error) {
	            var url = $global.getApiUrl("/autocomplete/" + csvTypes + "/get");
	            webClientService.get(url, { search: searchText, count: 10 }, success, error);
	        }
	    }
	]);

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	window.mobSocial.service("notificationService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/notifications";

	    this.put = function (ids, success, error) {
	        webClientService.put(apiEndPoint + "/put", { notificationIds: ids}, success, error);
	    };
	    this.delete = function (id, success, error) {
	        webClientService.delete(apiEndPoint + "/delete/" + id, null, success, error);
	    };
	}]);


/***/ }),
/* 46 */
/***/ (function(module, exports) {

	window.mobSocial.service("conversationService", ["globalApiEndPoint", "webClientService", function (globalApiEndPoint, webClientService) {
	    var apiEndPoint = globalApiEndPoint + "/conversations";
	    this.postToUser = function (userId, replyText, success, error) {
	        webClientService.post(apiEndPoint + "/post/" + userId, { replyText: replyText }, success, error);
	    };

	    this.get = function (userId, page, success, error) {
	        webClientService.get(apiEndPoint + "/get", {userId: userId, page: page}, success, error);
	    };

	    this.getAll = function(success, error) {
	        webClientService.get(apiEndPoint + "/get/all", null, success, error);
	    }
	}]);


/***/ }),
/* 47 */
/***/ (function(module, exports) {

	window.mobSocial.factory('arrayHelper', function () {
	   return {
	       deleteObject: function (arr, objectKey, objectValue) {
	           if (!arr)
	               return arr;
	           if (Object.prototype.toString.call(arr) == "[object Array]") {
	               for (var i = 0; i < arr.length; i++) {
	                    if (arr[i][objectKey] == objectValue) {
	                        arr.splice(i, 1);
	                    }
	                }   
	           }
	           
	           return arr;
	       },
	       ///copies specified fields from provided object to a new object
	       stripObjectToFields : function(obj, fields) {
	           var newObj = {};
	           for (var i = 0; i < fields.length; i++) {
	               if (obj[fields[i]])
	                   newObj[fields[i]] = obj[fields[i]];
	           }
	           return newObj;
	       },
	       ///copies all fields except specified fields from provided object to a new object
	       stripObjectExceptFields: function (obj, fields) {
	           var newObj = {};
	           for (var i = 0; i < fields.length; i++) {
	               if (obj[fields[i]])
	                   continue;
	               newObj[fields[i]] = obj[fields[i]];
	           }
	           return newObj;
	       },
	       ///converts an integer array to string array and returns
	       intArrayToStringArray: function (intArray) {
	           if (intArray)
	            return intArray.map(function(x) { return x.toString(); });
	       },
	       distinct: function(arr) {
	           return arr.filter(function(v, i, a) { return a.indexOf(v) == i });
	       }
	    };
	});

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	window.mobSocial.directive("blockUi", ["$rootScope", "$compile", function($rootScope, $compile) {
	    return {
	        restrict: "A",
	        scope: false,
	        link: function (scope, elem, attr) {
	            elem.addClass("block-ui-container");
	            var blockTemplate = '<div class="block-ui" ng-show="BlockUi"><div class="spinner"></div></div>';
	            var newElem = angular.element(blockTemplate);
	            elem.prepend(newElem);
	            $compile(newElem)(scope);
	        }
	    }
	}]);

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	window.mobSocial.directive('icheck', function () {
	    return {
	        restrict: 'A',
	        scope: {
	            ngModel: '='
	        },
	        link: function (scope, element, attrs) {
	            element.iCheck({
	                checkboxClass: 'icheckbox_square-blue',
	                radioClass: 'iradio_square-blue',
	                increaseArea: '20%' // optional
	            });

	            element.on('ifChanged', function (event) {
	                scope.$apply(function () {
	                    scope.ngModel = true;
	                });
	            });

	            element.on('ifUnchecked', function (event) {
	                scope.$apply(function () {
	                    scope.ngModel = false;
	                });
	            });

	            scope.$watch("ngModel",
	                function(newValue) {
	                    if (scope.ngModel)
	                        element.parent().addClass("checked");
	                    else
	                        element.parent().removeClass("checked");
	                });
	            
	        }
	    };
	});

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	window.mobSocial.directive('wyswyg', function () {
	    return {
	        restrict: 'A',
	        scope: {
	            ngModel: '='
	        },
	        link: function (scope, element, attrs) {
	            jQuery(document)
	                .ready(function () {
	                    var id = jQuery(element).attr("id");
	                    CKEDITOR.replace(id);
	                    var instance = CKEDITOR.instances[id];
	                    instance.setData(scope.ngModel);
	                    var setFromInstanceChange = false;
	                    
	                    scope.$watch("ngModel",
	                        function (newValue, oldValue) {
	                            if (!setFromInstanceChange) {
	                                //for some weird reasons, setdata doesn't work directly, so 
	                                //for now we are just introducing some delay
	                                setTimeout(function() {
	                                    instance.setData(newValue);
	                                    },
	                                    300);
	                            }
	                        });

	                    //capture on change event
	                    instance.on('change', function () {
	                        var data = instance.getData();
	                        setFromInstanceChange = true;
	                        scope.$apply(function () {
	                            scope.ngModel = data;
	                        });
	                    });


	                });
	        }
	    };
	});

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	window.mobSocial.directive("datePicker", ["$rootScope", "$compile", function ($rootScope, $compile) {
	    return {
	        restrict: "A",
	        scope: {
	            "ngModel": "="
	        },
	        link: function (scope, elem, attr) {
	            elem.datepicker({
	                autoclose: true
	            });
	            if (scope.ngModel)
	            //set default date
	                elem.datepicker("setDate", new Date(scope.ngModel));
	        }
	    }
	}]);

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	window.mobSocial.directive("userProfileMini", ['$rootScope', function ($rootScope) {
	    return {
	        restrict: "E",
	        templateUrl: window.Configuration.pluginPath +  "/app/pages/components/userProfileMini.html",
	        replace: true,
	        scope: {
	            user: "=user"
	        }
	    }
	}]);

/***/ }),
/* 53 */
/***/ (function(module, exports) {

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

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	window.mobSocial.filter('unescape', function () {
	    
	    return function (html) {
	        return angular.element("<div/>").html(html).text();
	    }
	});

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	window.mobSocial.controller("navigationController",
	[
	    "$scope", "$state", function($scope, $state) {
	        $scope.$state = $state;
	    }
	]);

/***/ }),
/* 56 */
/***/ (function(module, exports) {

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

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	window.mobSocial.controller("loginController",[
	    "$scope", "loginService", "authProvider", "$location", function ($scope, loginService, authProvider, $location) {
	       
	        $scope.init = function() {
	            $scope.dataModel = {
	                Email: "",
	                Password: "",
	                Persist: false,
	                ReturnUrl: $location.search().ReturnUrl
	            };
	        }();

	        $scope.login = function() {
	            loginService.login($scope.dataModel,
	                function(response) {
	                    if (response.Success) {
	                        authProvider.markLoggedIn(response.ResponseData.User); //mark as logged in
	                        if (response.ResponseData && response.ResponseData.ReturnUrl)
	                            window.location.href = response.ResponseData.ReturnUrl;
	                        else
	                            window.location.href = "/";
	                    }
	                },
	                function(response) {

	                });
	        }

	        $scope.logout = function() {
	            loginService.logout(function (response) {
	                    if (response.Success) {
	                        authProvider.logout(); //logout current user
	                        window.location.href = "/";
	                    }
	                },
	                function (response) {

	                });
	        }
	    }
	]);

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	window.mobSocial.controller("notificationController",
	[
	    "$scope", "notificationService", "$rootScope", function ($scope, notificationService, $rootScope) {

	        $scope.markNotificationsRead = function () {
	            if ($rootScope.CurrentUser.UnreadNotificationCount == 0)
	                return;
	            notificationService.put([],
	                function (response) {
	                    if (response.Success) {
	                        //mark all the notifications in the currentuser object to true and set unread count to zero
	                        for (var i = 0; i < $rootScope.CurrentUser.Notifications.length; i++) {
	                            $rootScope.CurrentUser.Notifications[i].IsRead = true;
	                        }
	                        $rootScope.CurrentUser.UnreadNotificationCount = 0;
	                    }
	                });
	        }
	    }
	]);

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	window.mobSocial.factory('notificationHub', ['$q', 'Hub', '$rootScope', 'signalREndPoint', function ($q, Hub, $rootScope, signalREndPoint) {
	    var hub = new Hub('notification',
	    {
	        rootPath: signalREndPoint,
	        listeners: {
	            'notify': function (notification) {
	                $rootScope.CurrentUser.Notifications.push(notification);
	                $rootScope.CurrentUser.UnreadNotificationCount++;
	                $rootScope.$apply();
	            },
	            'notifyMultiple': function(notifications) {
	                $rootScope.CurrentUser.Notifications = $rootScope.CurrentUser.Notifications.concat(notifications);
	                $rootScope.CurrentUser.UnreadNotificationCount += notifications.length;
	                $rootScope.$apply();
	            }
	        }
	    });
	    return this;
	}]);

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	window.mobSocial.factory('conversationHub', ['$q', 'Hub', '$rootScope', 'signalREndPoint', 'conversationService', 'webClientService', 'globalApiEndPoint', '$timeout', function ($q, Hub, $rootScope, signalREndPoint, conversationService, webClientService, globalApiEndPoint, $timeout) {
	    //chat/conversation configurations
	    var scrollToBottom = function () {
	        $timeout(function () {
	            var scrollHeight = angular.element(".chat-scroll .conversation")[0].scrollHeight;
	            angular.element(".chat-scroll .conversation").animate({ scrollTop: scrollHeight });
	        },
	            0);
	    }
	    $rootScope.attachReadScroller = function () {
	        //marking conversation read when scrolled to bottom
	        jQuery(".chat-scroll .conversation")
	            .on("scroll", function () {
	                var elem = angular.element(this)[0];
	                var scrollTop = elem.scrollTop;
	                var scrollHeight = elem.scrollHeight;
	                var offsetHeight = elem.offsetHeight;
	                if (scrollHeight - scrollTop == offsetHeight) {
	                    //we are at bottom so we can mark active conversation as read
	                    if ($rootScope.Chat.activeChat.unreadCount > 0) {
	                        $rootScope.Chat.markConversationRead($rootScope.Chat.activeChat.conversation.ConversationId);
	                    }
	                }
	            });
	    }

	    var markChatOpen = function (userId) {
	        var opened = false;
	        var cu = $rootScope.CurrentUser;

	        for (var i = 0; i < $rootScope.Chat.openChats.length; i++) {
	            var conversation = $rootScope.Chat.openChats[i].conversation;
	            var conversationDetails = $rootScope.Chat.openChats[i].conversationDetails;
	            var canOpen = conversation.ReceiverId == userId && conversation.ReceiverType == "User" && conversationDetails;
	            if (canOpen) {
	                $rootScope.Chat.activeChat = $rootScope.Chat.openChats[i];
	                $rootScope.Chat.activeChat.toUserId = userId;
	                opened = true;
	                scrollToBottom();
	                break;
	            }
	        }
	        return opened;
	    }

	    var hub = new Hub('conversation',
	    {
	        rootPath: signalREndPoint,
	        listeners: {
	            'conversationReply': function (reply, conversationId) {
	                $timeout(function () {
	                    var chat = $rootScope.Chat.getChat(reply.UserId, conversationId);
	                    if (chat) {
	                        chat.conversationDetails.ConversationReplies.push(reply);
	                        chat.unreadCount = chat.unreadCount || 0;
	                        if (reply.UserId != $rootScope.CurrentUser.Id)
	                            chat.unreadCount++;
	                        chat.activeTypingUserId = 0;
	                    } else {
	                        $rootScope.Chat.globalUnreadCount++;
	                    }
	                    $rootScope.$apply();
	                    scrollToBottom();
	                }, 0);
	            },
	            'notifyTyping': function (conversationId, userId, typing) {
	                var chat = $rootScope.Chat.activeChat;
	                if (chat && chat.conversation.ConversationId == conversationId) {
	                    $timeout(function () {
	                        chat.activeTypingUserId = typing ? userId : 0;
	                        $rootScope.$apply();
	                        scrollToBottom();
	                    }, 0);
	                }
	            },
	            'markRead': function (conversationId) {
	                var chat = $rootScope.Chat.getChat(0, conversationId);
	                console.log("marking ", chat);
	                if (chat) {
	                    $timeout(function () {
	                        for (var i = 0; i < chat.conversationDetails.ConversationReplies.length; i++) {
	                            chat.conversationDetails.ConversationReplies[i].ReplyStatus = 3; //read
	                        }
	                        $rootScope.$apply();
	                    }, 0);
	                }
	            }
	        },
	        methods: ['postReply', 'markRead', 'notifyTyping']
	    });

	    $rootScope.Chat = {
	        openChats: [],
	        activeChat: null,
	        globalUnreadCount: 0,
	        firstLoadComplete: false,
	        getTotalUnreadCount: function () {
	            return $rootScope.Chat.openChats.reduce(function (total, chat) {
	                return total + (chat.unreadCount || 0);
	            }, 0);
	        },
	        isOpen: function () {
	            return $rootScope.Chat.activeChat != null;
	        },
	        isActiveChat: function (userId) {
	            if (!$rootScope.Chat.activeChat)
	                return false;
	            var chat = $rootScope.Chat.activeChat.conversationDetails;
	            if (!chat)
	                return false;
	            var canOpen = (chat.ReceiverId == userId || chat.UserId == userId) && chat.ReceiverType == "User";
	            return canOpen;
	        },
	        getChat: function (userId, conversationId) {
	            var cu = $rootScope.CurrentUser;
	            for (var i = 0; i < $rootScope.Chat.openChats.length; i++) {
	                var chat = $rootScope.Chat.openChats[i].conversation;
	                var canOpen = chat.ReceiverId == userId && chat.UserId == cu.Id && chat.ReceiverType == "User";

	                if (canOpen) {
	                    return $rootScope.Chat.openChats[i];
	                } else {
	                    if (chat.ConversationId == conversationId)
	                        return $rootScope.Chat.openChats[i];
	                }
	            }
	            return null;
	        },
	        loadChat: function (userId, page, callback) {
	            conversationService.get(userId, page,
	                    function (response) {
	                        if (response.Success) {
	                            var chat = $rootScope.Chat.getChat(userId);
	                            if (chat.conversation.ConversationId == 0) {
	                                if (response.ResponseData.Conversation) {
	                                    chat.conversationDetails = response.ResponseData.Conversation;
	                                    chat.loadedPage = page;
	                                    scrollToBottom();
	                                }
	                            }
	                            else {
	                                if (page == 1)
	                                    chat.conversationDetails = response.ResponseData.Conversation;
	                                else {
	                                    var replies = response.ResponseData.Conversation.ConversationReplies;
	                                    chat.conversationDetails.ConversationReplies = chat.conversationDetails.ConversationReplies || [];
	                                    for (var i = replies.length; i >= 0; i--)
	                                        chat.conversationDetails.ConversationReplies.unshift(replies[i]);
	                                }

	                            }
	                            markChatOpen(userId);

	                        }
	                    });
	        },
	        chatWith: function (userId, callback) {
	            if (!markChatOpen(userId)) {
	                this.loadChat(userId, 1, callback);
	            } else {
	                if (callback)
	                    callback();
	                scrollToBottom();
	            }
	        },
	        sendReply: function () {
	            hub.postReply($rootScope.Chat.activeChat.toUserId, $rootScope.Chat.activeChat.replyText);
	            $timeout(function () {
	                $rootScope.Chat.activeChat.replyText = "";
	                $rootScope.$apply();
	            },
	                0);

	        },
	        //get online friends
	        loadOnlineFriends: function (currentUserId) {
	            $rootScope.CurrentUser = {
	                Id: currentUserId
	            };
	            if (this.firstLoadComplete)
	                return;
	            conversationService.getAll(function (response) {
	                if (response.Success) {
	                    $rootScope.Chat.firstLoadComplete = true;
	                    var conversations = response.ResponseData.Conversations;
	                    for (var i = 0; i < conversations.length; i++) {
	                        var conversation = conversations[i];
	                        conversation.ReceiverType = "User";
	                        conversation.UserId = $rootScope.CurrentUser.Id;
	                        conversation.ConversationReplies = [];
	                        $rootScope.Chat.openChats.push({
	                            conversation: conversation,
	                            conversationDetails: null,
	                            replyText: '',
	                            loadedPage: 0,
	                            unreadCount: conversation.UnreadCount
	                        });
	                    }

	                }
	            });
	        },
	        markConversationRead: function (conversationId) {
	            hub.markRead(conversationId);
	            var chat = $rootScope.Chat.getChat(0, conversationId);
	            if (chat) {
	                chat.unreadCount = 0;
	            }
	        }
	    };

	    $rootScope.$watch("Chat.activeChat.replyText",
	        function (newValue, oldValue) {
	            var activeChat = $rootScope.Chat.activeChat;
	            if (!activeChat) {
	                return;
	            }
	            if (newValue == oldValue || newValue == "" || oldValue == undefined) {
	                return;
	            }

	            //some change has been done, we'll notify it or not depends on our previous notification
	            var now = new Date();
	            var nowSeconds = Math.round(now.getTime() / 1000);
	            var prevSeconds = activeChat.lastNotificationSeconds || 0;

	            var delay = nowSeconds - prevSeconds;
	            //we'll send notification only after 2 seconds wait
	            if (delay > 10) {
	                //notify typing
	                hub.notifyTyping(activeChat.conversation.ConversationId, true);
	                activeChat.lastNotificationSeconds = nowSeconds;
	                return;
	            }
	        });

	    return this;
	}]);

/***/ })
]);