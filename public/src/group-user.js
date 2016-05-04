/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
            this.addPage();
        },


        addEvent: function() {
            var self = this;

        },

        addPage: function(){
            lib.pagination.normal(6,20,20,'page',function(){//当前页码，总页码，数据总条数，容器，回调函数
                console.log(this);
            });
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)