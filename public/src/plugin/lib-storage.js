/**
 * Created by huning on 16/2/29.
 */
;(function(win,lib){
    /*
    * 本地存储
    * localstorage
    * */
    var ST = (function(){
        var main = {
            isLocalstorage : false,
            data : {},
            init: function(){
                this.checkLocalstorage();
            },

            checkLocalstorage: function(){
                if ('localStorage' in window && window['localStorage'] !== null) {
                    try{
                        window.localStorage.setItem('test', 'test');
                        window.localStorage.removeItem('test');

                        this.isLocalStorageOk = true;
                    } catch (e) {
                        console.log();
                        //console.error(e);
                    }
                }
            },

            set: function(key,value){
                this.data[key] = value;
                if(typeof value == 'object'){
                    value = JSON.stringify(value)
                }

                localStorage.setItem(key,value);
            },

            get: function(key){
                var d = this.data[key];

                if (typeof d == 'undefined') {
                    d = localStorage.getItem(key);

                    try {
                        d = JSON.parse(d);
                    } catch(e) {
                        // do sth
                    }
                }
                return d;
            },

            rm: function(key){
                if (key) {
                    key = key;
                    localStorage.removeItem(key);
                }
            }
        };

        return main.init();
    })();

    /*
    * cookie存储
    * */
    var docCookies = {
        prefix:'',
        setPrefix: function(prefix){
            this.prefix = prefix;
        },
        _key: function(key){
            return this.prefix+key;
        },
        get: function(key){
            return this.getItem(this._key(key));
        },
        set: function(key, sValue, vEnd, sPath, sDomain, bSecure){
            var that = this;
            vEnd = vEnd || 7*24*60*60;
            sPath = sPath || '/';
            if (!sDomain) {
                var host = location.hostname;
                // not ip
                if (!host.match(/.+\..+\..+\..+/)) {
                    var reg = /.+\.([^\.]+\.[^\.]+)$/;
                    var match = host.match(reg);

                    if (match && match[0]) {
                        sDomain = match[0];
                    }
                }
            }
            return this.setItem(that._key(key), sValue, vEnd, sPath, sDomain, bSecure);
        },
        rm: function(key, sPath, sDomain){
            var that = this;
            sPath = sPath || '/';
            if (!sDomain) {
                var host = location.hostname;
                // not ip
                if (!host.match(/.+\..+\..+\..+/)) {
                    var reg = /.+\.([^\.]+\.[^\.]+)$/;
                    var match = host.match(reg);

                    if (match && match[0]) {
                        sDomain = match[0];
                    }
                }
            }

            return this.removeItem(that._key(key), sPath, sDomain);
        },
        getItem: function (sKey) {
            if (!sKey) { return null; }

            var nameEQ = sKey + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                var val = '';
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    val = c.substring(nameEQ.length,c.length);
                }
                if (val) {
                    return val;
                }
            }
            return null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!this.hasItem(sKey)) { return false; }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            if (!sKey) { return false; }
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        }
    };

    /*
    * 登陆操作
    * */
    var login = {
        isLogin: function(){
           return !!lib.cookie.get('access_token');
       }
    };


    lib.storage = ST;
    lib.cookie = docCookies;
    lib.login = login;
    console.log(lib);
})(window,window['lib'] || (window['lib'] = {}))