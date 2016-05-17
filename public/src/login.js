/**
 * Created by huning on 16/2/29.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvents();
        },
        addEvents: function(){
            var self= this;
            $('#login').on('click',function(){
                self.goLogin();
            })
        },
        goLogin: function(){
            var self = this;
            if(!self.verity()){
                return false;
            }

            if(self.isLogin){
                return ;
            }else{
                self.isLogin = true;
                lib.api.post({
                    api:'/login',
                    data: {
                        username : self.username,
                        password : self.password
                    },
                    success: function(data){
                        location.href='index';
                    },
                    error: function(err){
                        lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                    },
                    complete: function(){
                        self.isLogin = false;
                    }
                })
            }
        },
        verity: function(){

            this.username = $('#username').val();
            this.password = $('#password').val();

            if(this.username.length<=0){
                lib.notification.simple('请输入用户名',{bg:'#e15f63',font:'#fff'},2000);
                return false;
            }else if(this.password.length<=0){
                lib.notification.simple('请输入密码',{bg:'#e15f63',font:'#fff'},2000);
                return false;
            }

            return true;
        }
    }
    $(function(){
        main.init();
    })
})(jQuery,window)