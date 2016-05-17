/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
            //this.addPage();
            this.getList(1);
            //this.keyword = '';
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

            $('body').on('click','.J-delete',function(){
                var _id = $(this).attr('_id');
                self.deleteMsg(_id);
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

        deleteMsg: function(_id){
            var self = this;
            if(self.isDel) return ;
            self.isDel = true;
            lib.api.get({
                api:'/letter/change',
                data: {
                    _id: _id
                },
                success: function(data){
                    location.reload();
                },
                error: function(err){
                    console.log(err);
                    //lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isDel = false;
                }
            })
        },

        addPage: function(){
            var self = this;
            lib.pagination.normal(self.pageNumber,self.pageCount,self.total,'page',function(){//当前页码，总页码，数据总条数，容器，回调函数
                //console.log(this);
                self.getList(this.pno);
            });
        },

        getList: function(pno){
            var self = this;
            lib.api.get({
                api:'/letter/list',
                data: {
                    page: pno,
                    pagesize: 20
                },
                success: function(data){
                    self.total = data.data.total;
                    data.data.pageCount==0?(self.pageCount = 1): (self.pageCount= data.data.pageCount) ;
                    self.pageNumber = data.data.pageNumber;
                    var item = data.data.results[0]
                    //console.log(item.dialogue[item.dialogue[item.dialogue.length-1]])
                    var $inner = $('.message-left .message_group');
                    var letterhtml = msgLetter_template({
                        letters: data.data.results,
                        _id: lib.storage.get('user')._id
                    });

                    $inner.append(letterhtml);

                    self.addPage();
                },
                error: function(err){
                    console.log(err);
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