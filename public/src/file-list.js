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
                self.keyword = $('#title').val();
                self.getList(1);
            })

            $('body').on('click','.delete',function(){
                var $this = $(this);
                var _id =$(this).attr('_id');
                lib.notification.confirm('确定要删除这些文件?','',function(e,isOk){
                    if(isOk){
                        self.fileDelete(_id);
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
                api:'/file/get',
                data: {
                    page: pno,
                    pagesize: 20,
                    keyword: self.keyword
                },
                success: function(data){
                    self.total = data.data.total;
                    self.pageCount = data.data.pageCount;
                    self.pageNumber = data.data.pageNumber;

                    var $inner = $('.common_table table');
                    $('.common_table table tr:not(.table_hd)').remove();
                    var filehtml = fileList_template({
                        files: data.data.results
                    });
                    $inner.append(filehtml);

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

        fileDelete: function(_id){
            var self = this;
            if(self.isDelete) return;
            self.isDelete = true;
            lib.api.post({
                api:'/file/del',
                data: {
                    id: _id
                },
                success: function(data){
                    location.reload();
                },
                error: function(err){
                    console.log(err);
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