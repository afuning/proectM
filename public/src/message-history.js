/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            var httpurl = new lib.httpurl(location.href);
            var params = httpurl.params;
            this._id = params["_id"]?params["_id"]:'';
            this.user_id = lib.storage.get('user')._id;
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
                self.submitLetter();
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
            var self = this;
            this.socket = io();

            this.socket.on(self.user_id, function(obj){
                if(obj.from._id==obj.to._id) {
                    return;
                }
                self.appendText(obj);
            });

            this.socket.on(self._id, function(obj){
                self.appendText(obj);
            });
        },

        appendText: function(obj){
            //console.log(obj);
            var isme = (obj.from._id == this.user_id) ? true : false;
            var $inner = $('.message-left-content');
            var msghtml = msgSend_template({
                msg: obj,
                isme: isme
            });
            $inner.append(msghtml);
            $('#message_input').val('');
        },

        submitLetter: function(){
            var self = this;
            var text = $('#message_input').val();
            if(text.length<=0) return;
            var obj = {
                from: self.user_id,
                content: text,
                time: Date.now(),
                to: self._id
            }
            this.socket.emit('message', obj);
        }


    }

    $(function(){
        main.init();
    })
})(jQuery,window)