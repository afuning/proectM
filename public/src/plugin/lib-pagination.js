/**
 * Created by huning on 16/3/6.
 */
;(function(win, lib){
    var doc = win.document,
        P_group,
        P_inner,
        P_prev,
        P_next;

    P_group = doc.createElement('ul');
    P_group.className = 'pagination_group';

    P_prev = doc.createElement('li');
    P_prev.innerHTML = '<a href="javascript:void(0)">上一页</a>';
    P_prev.className = 'pagination-prev';

    P_inner = doc.createElement('li');
    P_inner.className = 'pagination-item';

    P_next = doc.createElement('li');
    P_next.innerHTML = '<a href="javascript:void(0)">下一页</a>';
    P_next.className = 'pagination-next';

    P_group.appendChild(P_prev);
    P_group.appendChild(P_next);

    function _extend(a, b) {
        for(var key in b ){
            a[ key ] = b[ key ]
        }
        return a;
    }


    function page(options) {
        this._options = _extend({

        }, options || {});

        this._init();
    }

    _extend(page.prototype, {
        _init : function() {
            var that       = this;
                that.pno        = this._options.pno;
                that.total      = this._options.total;
                that.totalRecord= this._options.totalRecord;
            var container  = this._options.container,

                page_item  = '';
            ;


            this._doc();
            this._action();
            // click event
            //E_floatOk.removeEventListener('touchend', successHandler);
            //E_floatOk.removeEventListener('click', successHandler);
            //E_floatCancel.removeEventListener('touchend', successHandler);
            //E_floatCancel.removeEventListener('click', successHandler);
            //E_floatOk.addEventListener(clickEvent, successHandler, false);
            //E_floatCancel.addEventListener(clickEvent, failureHandler, false);
            //E_floatOk.callback = E_floatCancel.callback = function() {
            //    callback.apply(that, arguments);
            //};

        },
        _doc: function(){
            var that = this,
                page_item = '',
                container  = this._options.container,
                page_container = doc.getElementById(container),
                callback   = this._options.callback,
                item = '';
            P_group.innerHTML='';
            P_group.appendChild(P_prev);
            if(that.total<=5){
                for(var i = 1;i<=that.total;i++){
                    page_item=P_inner.cloneNode(false);
                    if(i == that.pno) {
                        page_item.className = 'pagination-item pagination-item-active';
                    }
                    page_item.innerHTML = '<a href="javascript:void(0)">'+i+'</a>';
                    P_group.appendChild(page_item);
                }
            }else if(that.total>5 && that.pno<4){
                for(var i = 1;i<=6;i++){
                    page_item=P_inner.cloneNode(false);
                    if(i == that.pno) {
                        page_item.className = 'pagination-item pagination-item-active';
                    }else if(i == 5) {
                        page_item.className = 'pagination-item pagination-item-ellipsis';
                    }

                    if(i == 5) {
                        page_item.innerHTML = '<a href="javascript:void(0)">…</a>';
                    }else if(i == 6){
                        page_item.innerHTML = '<a href="javascript:void(0)">'+that.total+'</a>';
                    }else {
                        page_item.innerHTML = '<a href="javascript:void(0)">'+i+'</a>';
                    }
                    P_group.appendChild(page_item);
                }
            }else if(that.total>5 && that.pno>=4 && that.pno < that.total-1){
                for(var i = 1;i<=7;i++){
                    page_item=P_inner.cloneNode(false);
                    if(i == 4) {
                        page_item.className = 'pagination-item pagination-item-active';
                    }else if(i == 2 || i == 6) {
                        page_item.className = 'pagination-item pagination-item-ellipsis';
                    }

                    if(i == 2 || i == 6) {
                        page_item.innerHTML = '<a href="javascript:void(0)">…</a>';
                    }else if(i == 7){
                        page_item.innerHTML = '<a href="javascript:void(0)">'+that.total+'</a>';
                    }else if(i==1){
                        page_item.innerHTML = '<a href="javascript:void(0)">'+1+'</a>';
                    }else {
                        page_item.innerHTML = '<a href="javascript:void(0)">'+(that.pno*1+i-4)+'</a>';
                    }
                    P_group.appendChild(page_item);
                }
            }else{
                for(var i = 1;i<=6;i++){
                    page_item=P_inner.cloneNode(false);
                    if(i == that.pno*1+6-that.total) {
                        page_item.className = 'pagination-item pagination-item-active';
                    }else if(i == 2) {
                        page_item.className = 'pagination-item pagination-item-ellipsis';
                    }

                    if(i == 2) {
                        page_item.innerHTML = '<a href="javascript:void(0)">…</a>';
                    }else if(i == 1){
                        page_item.innerHTML = '<a href="javascript:void(0)">1</a>';
                    }else {
                        page_item.innerHTML = '<a href="javascript:void(0)">'+(that.total*1+i-6)+'</a>';
                    }
                    P_group.appendChild(page_item);
                }
            }
            P_group.appendChild(P_next);
            page_container.appendChild(P_group);

            item = P_group.querySelectorAll('.pagination-item');

            for(var i =0;i<item.length;i++){
                item[i].addEventListener('click',function(e){
                    that._go.apply(that, arguments);
                });
            }

            callback.apply(that, arguments);
        },

        _goNext: function(){
            if(this.pno<=this.total-1){
                this.pno++;
                this._doc();
            }

        },
        _goPrev: function(){
            if(this.pno>1){
                this.pno--;
                this._doc();
            }
        },

        _go: function(a){
            var index = a.target.innerText;
            this.pno = index;
            this._doc();
        },

        _action: function(){
            var that = this;
            P_prev.addEventListener('click',function(){
                that._goPrev.apply(that, arguments);
            });
            P_next.addEventListener('click',function(){
                that._goNext.apply(that, arguments);
            });
        }
    });

    lib.pagination = new function() {

        this.normal = function(pageNo, totalPage, totalRecord,container,callback, options) {
            return new page(_extend({
                pno  : pageNo,
                total: totalPage,
                totalRecord: totalRecord,
                container: container,
                callback : callback
            }, options || {}));
        }

    };
})(window, window['lib'] || (window['lib'] = {}));