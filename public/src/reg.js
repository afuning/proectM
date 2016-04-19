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
            });

            $('input').on('focus',function(){
                $(this).siblings('.tip-warn').hide();
            })

            $('input').on('input propertychange',function(){
                if($('#username').val()&&$('#password').val()&&$('#password-repeat').val()){
                    $('.J-reg').addClass('btn-success').removeClass('btn-disable');
                }else{
                    $('.J-reg').addClass('btn-disable').removeClass('btn-success');
                }
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
                        //alert(data.msg);
                        lib.notification.simple("注册成功",{bg:'#44b549',font:'#fff'},2000);
                        self.goLogin()
                    },
                    error: function(err){
                        if(typeof err.msg === 'string'){
                            lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                        }else if(typeof  Number(err.msg) === 'number'){
                            var i = err.msg;
                            var tip = $('.tip-warn').eq(i);
                            tip.show();
                        }
                    },
                    complete: function(){
                        self.isReg = false;
                    }
                })
            }
        },

        //登录
        goLogin: function(){
            var self = this;
            if(self.isLogin) return;
            self.isLogin = true;
            lib.api.post({
                api:'/login',
                data: {
                    "username" : self.username,
                    "password" : self.password
                },
                success: function(data){
                    location.replace('./reg?step=1');
                },
                error: function(err){
                    //console.log(data);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isLogin = false;
                }
            })
        },

        //判断格式是否正确
        verity: function(){
            this.username = $('#username').val();
            this.password = $('#password').val();
            this.password_repeat = $('#password-repeat').val();

            if(this.username.length<8){
                $('.tip-warn').eq(0).show();
                return false;
            }else if(this.password.length<8){
                $('.tip-warn').eq(1).show();
                return false;
            }else if(this.password != this.password_repeat){
                $('.tip-warn').eq(2).show();
                return false;
            }
            return true;
        }
    };
    $(function(){
        main.init();
    })
})(jQuery,window)