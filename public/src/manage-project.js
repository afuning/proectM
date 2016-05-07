/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.getList();
            this.addEvent();
        },

        addEvent: function(){
            var self = this;
            var projectHtml = '<div class="input_group">';
                projectHtml+= '<div class="input_inner"><label>项目名称</label><input type="text" id="project_input" placeholder="请输入项目名称" autocomplete="off" />';
                projectHtml+= '</div></div>';

            $('body').on('click','.J-addProject',function(){
                var addProject = new lib.dialog.confirm('新增项目',
                    projectHtml,
                    function(e,isOk){
                        if(isOk){
                            var project_name = $('#project_input').val();
                            self.addProject(project_name);
                        }
                        this.hide()
                    }).show();
            })
        },

        addProject: function(name){
            var self = this;
            if(self.isAdd) return;
            self.isAdd = true;
            lib.api.get({
                api:'/project/add',
                data: {
                    name: name
                },
                success: function(data){
                    location.reload();
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
            lib.api.get({
                api:'/project/list',
                data: {
                    page: pno,
                    pagesize: 1,
                    keyword: self.keyword
                },
                success: function(data){
                    self.total = data.data.total;
                    data.data.pageCount==0?(self.pageCount = 1): (self.pageCount= data.data.pageCount) ;
                    self.pageNumber = data.data.pageNumber*1;

                    var $inner = $('.common_table table');
                    $('.common_table table tr:not(.table_hd)').remove();
                    var projecthtml = projectList_template({
                        projects: data.data.results,
                        isadmin: lib.storage.get('user').isadmin?lib.storage.get('user').isadmin: 0
                    });
                    $inner.append(projecthtml);

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