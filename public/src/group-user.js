/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
            //this.addPage();
            this.getList(1);
            this.keyword = '';
        },


        addEvent: function() {
            var self = this;
            $('.screen_submit').on('click',function(){
                self.keyword = $('#realname').val();
                self.getList(1);
            })

            $('body').on('click','.delete_action',function(){
                var _id = $(this).parent().parent().attr('_id');
                lib.notification.confirm('确定要删除该用户?','',function(e,isOk){
                    if(isOk){
                        self.deleteUser(_id);
                    }
                    this.hide();
                }).show();
            })
            $('body').on('click','.change_admin',function(){
                var _id = $(this).parent().parent().attr('_id');
                lib.notification.confirm('确定要修改该用户权限?','',function(e,isOk){
                    if(isOk){
                        self.addAdmin(_id);
                    }
                    this.hide();
                }).show();
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
                api:'/user/list',
                data: {
                    page: pno,
                    pagesize: 1,
                    keyword: self.keyword
                },
                success: function(data){
                    self.total = data.data.total;
                    self.pageCount = data.data.pageCount;
                    self.pageNumber = data.data.pageNumber;

                    var $inner = $('.common_table table');
                    $('.common_table table tr:not(.table_hd)').remove();
                    var userhtml = userList_template({
                        users: data.data.results,
                        isadmin: lib.storage.get('user').isadmin?lib.storage.get('user').isadmin: 0,
                        _id: lib.storage.get('user')._id
                    });
                    $inner.append(userhtml);

                    self.addPage();
                },
                error: function(err){
                    console.log(err);
                    //lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){

                }
            })
        },

        deleteUser: function(_id){
            var self = this;
            lib.api.get({
                api:'/user/delete',
                data: {
                    _id: _id
                },
                success: function(data){
                    location.reload();
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){

                }
            })
        },

        addAdmin: function(_id){
            var self = this;
            lib.api.get({
                api:'/user/addAdmin',
                data: {
                    _id: _id
                },
                success: function(data){
                    lib.notification.simple('设置成功',{bg:'#57c78b',font:'#fff'},2000);
                    location.reload();
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
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