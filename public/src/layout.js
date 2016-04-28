/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            /*配置左侧*/
            this.config();
            this.addEvent();
            this.isLogin();
        },

        config: function(){
            var httpurl = new lib.httpurl(location.href);
            var pathname = httpurl.pathname.substring(1).replace('/','-');
            $('li[data-index='+pathname+']').addClass('active');
        },

        addEvent: function(){
            var self = this;
            $('header').on('click','.J-logout',function(){
                location.replace('/logout');
            })
        },

        isLogin: function(){
            var self = this;
            lib.api.get({
                api:'/isLogin',
                success: function(data){
                    if(data.data.isLogin == 1){
                        self.renderUser(data.data.isLogin);
                    }else{
                        var $inner = $('header .inner');
                        var user = topUser_template({
                            isLogin: data.data.isLogin
                        })
                        $inner.append(user);
                    }
                },
                error: function(err){
                    //console.log(err);
                    //lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){

                }
            })
        },

        renderUser: function(isLogin){
            lib.api.get({
                api:'/user/detail',
                success: function(data){
                    var user = data.data;
                    if(user.role){
                        var $inner = $('header .inner');
                        var userhtml = topUser_template({
                            isLogin: isLogin,
                            depart: user.role.department.name,
                            role: user.role.name,
                            realname: user.realname
                        });
                        $inner.append(userhtml);
                    }
                    lib.storage.set('user',user);
                },
                error: function(err){
                    //console.log(err);
                    //lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){

                }
            })
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)