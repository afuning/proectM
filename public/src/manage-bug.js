/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.getList();
            this.addEvent();
            this.editor = new Simditor({
                textarea: $('#editor'),
                toolbarFloat: false,
                pasteImage: true,
                upload: true
            });
        },

        addEvent: function(){
            var self = this;

            $('.input_inner .rank_label').on('click',function(){
                $(this).addClass('active').siblings('.rank_label').removeClass('active');
            });

            $('body').on('click','.J-addTask',function(){
                $('.tab_list .tab_item[data-index="1"]').click();
            });

            $('.screen_submit').on('click',function(){
                self.keyword = $('#project_name').val();
                self.getList(1);
            });

            $('.tab_list .tab_item').on('click',function(){
                var index = $(this).attr('data-index');
                $(this).addClass('active').siblings().removeClass('active');
                $('.main_bd[data-index = '+index+']').show().siblings('.main_bd').hide();
            });

            $('#submit').on('click',function(){
                if(self.verity()){
                    self.addBug();
                }
            });

            $('#clear').on('click',function(){
                $('#name_input').val('');
                $("#project_input option:first").prop("selected",'selected');
                $('#to_input option:first').prop("selected",'selected');
                $('.input_inner .rank_label').eq(0).click();
                self.editor.setValue('');
            })

            $('.sort').on('click',function(){
                $(this).addClass('active').siblings().removeClass('active');
                var sort = $(this).attr('sort-type');
                self.sort = sort;
            })

            $('.isown').on('click',function(){
                $(this).toggleClass('active');
                var isown = $(this).hasClass('active');
                self.isown = isown;
            });

        },

        addBug: function(name){
            var self = this;
            if(self.isAdd) return;
            self.isAdd = true;
            lib.api.get({
                api:'/bug/add',
                data: {
                    name:self.name,
                    project_id:self.project_id,
                    to_id: self.to_id,
                    rank: self.rank,
                    detail: self.detail
                },
                success: function(data){
                    //location.reload();
                    lib.notification.simple('新建BUG成功,3秒后自动刷新',{bg:'#57c78b',font:'#fff'},2000);
                    setInterval(function(){
                        location.reload();
                    },3000)
                    console.log(data.data);
                },
                error: function(err){
                    console.log(err);
                    //lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isAdd= false
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
            self.project_id = $('#screen_project option:selected').val();
            self.status = $('#screen_status option:selected').val();
            self.keyword = $('#project_name').val();
            self.rank = $('#screen_rank option:selected').val();
            lib.api.get({
                api:'/bug/list',
                data: {
                    page: pno,
                    pagesize: 10,
                    keyword: self.keyword,
                    status: self.status,
                    project_id: self.project_id,
                    sort: self.sort,
                    isown: self.isown,
                    rank: self.rank
                },
                success: function(data){
                    self.total = data.data.total;
                    data.data.pageCount==0?(self.pageCount = 1): (self.pageCount= data.data.pageCount) ;
                    self.pageNumber = data.data.pageNumber*1;

                    var $inner = $('.common_table table');
                    $('.common_table table tr:not(.table_hd)').remove();
                    var bughtml = bugList_template({
                        tasks: data.data.results,
                        isadmin: lib.storage.get('user').isadmin?lib.storage.get('user').isadmin: 0
                    });
                    $inner.append(bughtml);

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

        verity: function(){
            this.name = $('#name_input').val();
            this.project_id = $('#project_input option:selected').val();
            this.to_id = $('#to_input option:selected').val();
            this.rank = $('a.rank_label.active').attr('data-index');
            this.detail = this.editor.getValue();

            if(!(this.name && this.project_id && this.to_id && this.rank && this.detail)){
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