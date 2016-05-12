/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.getList(1);
            if(lib.storage.get('user').isadmin == 1){
                this.editor = new Simditor({
                    textarea: $('#editor'),
                    toolbarFloat: false,
                    pasteImage: true,
                    upload: true
                });
                this.addEvent();
            }

        },


        addEvent: function() {
            var self = this;

            $('body').on('click','.J-addTask',function(){
                $('.tab_list .tab_item[data-index="1"]').click();
            });

            $('.tab_list .tab_item').on('click',function(){
                var index = $(this).attr('data-index');
                $(this).addClass('active').siblings().removeClass('active');
                $('.main_bd[data-index = '+index+']').show().siblings('.main_bd').hide();
            });

            $('#submit').on('click',function(){
                if(self.verity()){
                    self.addNotice();
                }
            })
            $('#clear').on('click',function(){
                $('#title_input').val('');
                self.editor.setValue('');
            })

            $('body').on('click','.delete_action',function(){
                var _id = $(this).parent().parent().attr('_id');
                self.deleteNotice(_id);
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
                api:'/notice/list',
                data: {
                    page: pno,
                    pagesize: 20
                },
                success: function(data){
                    self.total = data.data.total;
                    data.data.pageCount==0?(self.pageCount = 1): (self.pageCount= data.data.pageCount) ;
                    self.pageNumber = data.data.pageNumber;

                    var $inner = $('.common_table table');
                    $('.common_table table tr:not(.table_hd)').remove();
                    var noticehtml = noticeList_template({
                        notices: data.data.results,
                        isadmin: lib.storage.get('user').isadmin?lib.storage.get('user').isadmin: 0
                    });
                    $inner.append(noticehtml);

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

        addNotice: function(){
            var self = this;
            if(self.isAdd) return;
            self.isAdd=true;
            lib.api.get({
                api:'/notice/add',
                data: {
                    title: self.title,
                    detail: self.detail
                },
                success: function(data){
                    lib.notification.simple('新建公告成功,3秒后自动刷新',{bg:'#57c78b',font:'#fff'},2000);
                    setInterval(function(){
                        location.reload();
                    },3000)
                    console.log(data.data);
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isAdd=false;
                }
            })
        },

        deleteNotice: function(_id){
            var self = this;
            if(self.isDel) return;
            self.isDel=true;
            lib.api.get({
                api:'/notice/delete',
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
                    self.isDel=false;
                }
            })
        },

        verity: function(){
            this.title = $('#title_input').val();
            this.detail = this.editor.getValue();

            if(!(this.title && this.detail)){
                lib.notification.simple("以上信息不能为空",{bg:'#e15f63',font:'#fff'},2000);
                return false;
            }
            return true;
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)