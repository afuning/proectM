/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
        },

        addEvent: function(){
            $('.J-logout').on('click',function(){
                alert(1);
            })
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)