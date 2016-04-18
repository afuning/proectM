/**
 * Created by huning on 16/2/23.
 */
;(function($){
    var main = {
        init: function(){

        },

        addEvent: function(){
            $('.J-logout').on('click',function(){
                lib.cookie.remove('projectM');
            })
        }
    }

    $(function(){
        main.init();
    })
})(jQuery)