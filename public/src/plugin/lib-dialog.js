/**
 * Created by huning on 16/3/6.
 */
;(function(win, lib){
    var doc = win.document,
        body = doc.body,
        E_float, E_floatMsg, E_floatContent, E_floatOk, E_floatCancel, E_mask,
        initDom = false,
        flashTimeoutId
    ;
    E_mask = doc.createElement('div');
    E_mask.className = 'd-mask hide';

    E_float = doc.createElement('div');
    E_float.className = 'd-float-popWrap hide';
    E_float.innerHTML = [
        '<div class="d-float-modePop">',
        '<h3 class="warnMsg"></h3>',
        '<div class="content"></div>',
        '<div class="doBtn">',
        '<a href="javascript:void(0)" class="cancel">取消</a>',
        '<a href="javascript:void(0)" class="ok">确定</a>',
        '</div>',
        '</div>'].join('');

    E_floatMsg = E_float.querySelector('.warnMsg');
    E_floatContent = E_float.querySelector('.content');
    E_floatOk = E_float.querySelector('.doBtn .ok');
    E_floatCancel = E_float.querySelector('.doBtn .cancel');

    function _extend(a, b) {
        for(var key in b ){
            a[ key ] = b[ key ]
        }
        return a;
    }

    function successHandler(e) {
        this.callback && this.callback(e, true);
    }

    function failureHandler(e) {
        this.callback && this.callback(e, false);
    }

    function ModePop(options) {
        this._options = _extend({
            mode : 'msg',
            text : '网页提示',
            okText: '',
            noText: '',
            mask: true,
            useTap : false
        }, options || {});

        this._init();
    }

    _extend(ModePop.prototype, {
        _init : function() {
            var that = this,
                opt = that._options,
                hasMask = opt.mask,
                mode = opt.mode,
                text = opt.text,
                okText = opt.okText,
                noText = opt.noText,
                content = opt.content,
                callback = opt.callback,
                background = opt.background,
                color = opt.color,
                clickEvent = opt.useTap ? 'touchend' : 'click'
                ;

            // set mode
            var classTxt = E_float.className;
            classTxt = classTxt.replace(/(msg|alert|confirm)Mode/i, mode + 'Mode');
            E_float.className = classTxt;

            // set background
            background && (E_float.firstChild.style.background = background);
            color && (E_float.firstChild.firstChild.style.color = color);

            // set text & content
            text && (E_floatMsg.innerHTML = text);
            okText && (E_floatOk.innerHTML = okText);
            noText && (E_floatCancel.innerHTML = noText);
            content && (E_floatContent.innerHTML = content);

            // click event
            E_floatOk.removeEventListener('touchend', successHandler);
            E_floatOk.removeEventListener('click', successHandler);
            E_floatCancel.removeEventListener('touchend', successHandler);
            E_floatCancel.removeEventListener('click', successHandler);
            E_floatOk.addEventListener(clickEvent, successHandler, false);
            E_floatCancel.addEventListener(clickEvent, failureHandler, false);
            E_floatOk.callback = E_floatCancel.callback = function() {
                callback.apply(that, arguments);
            };

            if (!initDom) {
                initDom = true;
                hasMask && doc.body.appendChild(E_mask);
                doc.body.appendChild(E_float);
                win.addEventListener('resize', function() {
                    setTimeout(function() {
                        that._pos();
                    }, 500);
                }, false);
            }
        },

        _pos : function() {
            var that = this;
            var bodyRect;
            var top, left;
            var iW, iH;
            var floatRect;
            var eW, eH;

            if (!that.isHide()) {
                bodyRect = doc.body.getBoundingClientRect();
                //top = doc.body.scrollTop;
                //left = doc.documentElement.scrollLeft;
                top = -bodyRect.top;
                left = -bodyRect.left;
                iW = win.innerWidth;
                iH = win.innerHeight;
                floatRect = E_float.getBoundingClientRect();
                eW = floatRect.width;
                eH = floatRect.height;
                if(that._options.mode !='msg'){
                    E_float.style.top = (top + (iH - eH) / 2) + 'px';
                }
                E_float.style.left = (left + (iW - eW) / 2) + 'px';
            }
        },

        isShow : function() {
            return E_float.className.indexOf('show') > -1;
        },

        isHide : function() {
            return E_float.className.indexOf('hide') > -1;
        },

        _cbShow : function() {
            var that = this,
                opt = that._options,
                onShow = opt.onShow
                ;

            E_float.style.opacity = '1';
            E_float.className = E_float.className.replace(/\b(?:show|hide)/, 'show');

            if (opt.mask) {
                setTimeout(function () {
                    E_mask.className = E_mask.className.replace(/\b(?:show|hide)/, 'show');
                    // fix: ios 下拉、输入框引起的mask不能撑满的bug
                    E_mask.style.height = (document.body.scrollHeight + 50) + 'px';
                    E_mask.style.top = '-50px';
                }, 0);
            }

            onShow && onShow.call(that);
        },

        show : function() {
            var that = this
                ;

            if (flashTimeoutId) {
                clearTimeout(flashTimeoutId);
                flashTimeoutId = undefined;
            }

            if (!that.isShow()) {

                E_float.style.opacity = '0';
                E_float.className = E_float.className.replace('hide', '');
                that._pos();

                setTimeout(function() {
                    that._cbShow();
                }, 300);
                setTimeout(function() {
                    E_float.style.webkitTransition = 'opacity 0.4s linear 0';
                    E_float.style.opacity = '1';
                    //E_float.animate({'opacity': '1'}, 300, 'linear');
                }, 1);

            } else {
                that._cbShow();
            }
        },

        _cbHide : function() {
            var that = this,
                opt = that._options,
                onHide = opt && opt.onHide
                ;

            E_float.style.opacity = '0';
            E_float.className = E_float.className.replace(/\s*show|hide/, '') + ' hide';

            if (opt.mask) {
                E_mask.className = E_mask.className.replace(/\s*show|hide/, '') + ' hide';
            }

            onHide && onHide.call(that);
        },

        hide : function() {
            var that = this
                ;

            if (!that.isHide()) {
                E_float.style.opacity = '1';
                E_float.className = E_float.className.replace('show', '');

                setTimeout(function() {
                    that._cbHide();
                }, 300);
                setTimeout(function() {
                    E_float.style.webkitTransition = 'opacity 0.4s linear 0';
                    E_float.style.opacity = '0';
                }, 1);

            } else {
                that._cbHide();
            }
        }
    });

    lib.dialog = new function() {

        this.confirm = function(text, content, callback, options) {
            return new ModePop(_extend({
                mode : 'confirm',
                text : text,
                content : content,
                callback : callback,
            }, options || {}));
        }

    };
})(window, window['lib'] || (window['lib'] = {}));