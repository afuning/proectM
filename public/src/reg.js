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
            $('#reg').on('click',function(){
                self.goReg();
            })
        },
        goReg: function(){
            var self = this;
            if(!self.verity()){
                return false;
            }

            if(self.isReg){
                return ;
            }else{
                self.isReg = true;
                lib.api.post({
                    api:'/reg',
                    data: {
                        "username" : self.username,
                        "password" : self.password,
                        "password-repeat" : self.password_repeat
                    },
                    success: function(data){
                        //location.href='index';
                        console.log(data);
                    },
                    error: function(err){
                        console.log(err.message);
                    },
                    complete: function(){
                        self.isReg = false;
                    }
                })
            }
        },
        verity: function(){

            this.username = $('#username').val();
            this.password = $('#password').val();
            this.password_repeat = $('#password-repeat').val();

            if(this.username.length<=0){
                alert('请输入用户名');
                return false;
            }else if(this.password.length<=0){
                alert('请输入密码');
                return false;
            }else if(this.password != this.password_repeat){
                alert('密码与重复密码不一致');
                return false;
            }
            return true;
        }
    }
    $(function(){
        main.init();
    })
})(jQuery,window)