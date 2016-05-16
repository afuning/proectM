/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
            this.chat();
        },


        addEvent: function() {
            var self = this;

            $('.J-depart').on('click',function(){
                var has = $(this).siblings('.user_list');
                var index = $(this).parent().index();
                if($(this).hasClass('active')){
                    $(this).removeClass('active').siblings('.user_list').hide()
                    return;
                }
                $(this).addClass('active').parent().siblings().children('a').removeClass('active');
                if(has.length>=1){
                    has.parent().parent().find('.user_list').hide();
                    has.show();
                }else {
                    var _id = $(this).attr('_id');
                    $('.user_group').find('.user_list').hide();
                    self.getUser(_id,index);
                }

            })

            //发送信息
            $('#send').on('click',function(){

            })
        },

        getUser: function(_id,index){
            var self = this;
            if(self.isGetuser) return;
            self.isGetuser = true;
            lib.api.get({
                api:'/department/user/list',
                data: {
                    _id: _id
                },
                success: function(data){
                    console.log(data);
                    var $inner = $('.user_inner').eq(index);
                    var userhtml = msgUser_template({
                        users: data.data
                    });
                    console.log(index);
                    $inner.append(userhtml);
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isGetuser = false;
                }
            })
        },

        chat: function(){
            //连接websocket后端服务器
            var socket = io();

            socket.on('message', function(obj){
                console.log(obj);
            });
        },

        submitLetter: function(){
            var text = $('#message_input').val();

        }


    }

    $(function(){
        main.init();
    })
})(jQuery,window)