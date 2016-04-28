/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
            this.renderUser();
        },


        addEvent: function(){
            var self = this;
            $('.tab_item').on('click',function(){
                var index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $('.change_table').eq(index).show()
                    .siblings('.change_table').hide();
            })
            $('.J-head').on('click',function(){
                var head_dialog = new lib.dialog.confirm('账号详情修改',
                    '<a href="../index">头像</a>',
                    function(e,isOk){
                    if(isOk){
                        alert(1);
                    }else {

                    }
                    this.hide()
                }).show();
            })

            $('.J-qq').on('click',function(){
                var qq_dialog = new lib.dialog.confirm('账号详情修改','<a href="../index">qq</a>',function(e,isOk){
                    if(isOk){
                        alert(1);
                    }else {

                    }
                    this.hide()
                }).show();
            })
        },

        renderUser: function(){
            var user = lib.storage.get('user');
            var username = user.username;
            var realname = user.realname;
            var qq = user.qq? user.qq: '未设置';
            var mobile = user.mobile? user.mobile: '未设置';
            var head_img = user.head? user.head: '';
            var role = user.role?user.role.name: '未设置';
            var depart = user.role?user.role.department.name: '未设置';

            $('#realname').text(realname);
            $('#qqnum').text(qq);
            $('#mobile').text(mobile);
            $('#role').text(role+'-'+depart);
            $('#username').text(username);
            if(head_img){
                $('#head_img').clear().append('<img src='+head_img+' />');
            }
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)