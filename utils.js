
// author : HyoukJoon
String.prototype.uriencode = function () {
    return unescape(encodeURIComponent(this));
}
String.prototype.uridecode = function () {
    return escape(this);
}
String.prototype.parseToArray = function () {
    var result = {};
    var e,
    //a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g;
    //,d = function (s) { return decodeURIComponent(s.replace(a, " ")); };

    while (e = r.exec(this))
        result[e[1]] = e[2].uridecode();

    return result;
}

function updateHash(name, value) {
    var hashes = (location.hash.length > 1 ? location.hash.substr(1).parseToArray() : {});
    hashes[name] = value;
    var str = '';
    for (key in hashes) {
        if (str != '') str += '&';
        str += key + '=' + unescape(encodeURIComponent(hashes[key]));
    }
    location.hash = '#' + str;
}

String.prototype.digits = function () {
    var s = this;
    s = s.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return s;
}
String.prototype.format = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

String.prototype.GetDate = function () { return new Date(parseInt(this.substr(6))); }


String.prototype.zf = function (l) { return '0'.string(l - this.length) + this; }
String.prototype.string = function (l) { var s = '', i = 0; while (i++ < l) { s += this; } return s; }
Number.prototype.zf = function (l) { return this.toString().zf(l); }
var gsMonthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
var gsDayNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
Date.prototype.format = function (f) {
    if (!this.valueOf())
        return ' ';

    var d = this;

    return f.replace(/(yyyy|yy|mmmm|mmm|mm|dddd|ddd|dd|hh|nn|ss|a\/p)/gi,
        function ($1) {
            switch ($1.toLowerCase()) {
                case 'yyyy': return d.getFullYear();
                case 'yy': return (d.getFullYear() + '').substr(2);
                case 'mmmm': return gsMonthNames[d.getMonth()];
                case 'mmm': return gsMonthNames[d.getMonth()].substr(0, 3);
                case 'mm': return (d.getMonth() + 1).zf(2);
                case 'dddd': return gsDayNames[d.getDay()];
                case 'ddd': return gsDayNames[d.getDay()].substr(0, 3);
                case 'dd': return d.getDate().zf(2);
                case 'hh': return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case 'nn': return d.getMinutes().zf(2);
                case 'ss': return d.getSeconds().zf(2);
                case 'a/p': return d.getHours() < 12 ? 'a' : 'p';
            }
        }
    );
};
