/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.getDepartment();
            this.addEvent();
        },

        addEvent: function(){
            var self = this;

            $('body').on('click','#department .select',function(){
                var _id = $(this).attr('_id');
                self.getRole(_id);
            })

            $('body').on('click','#role .addRole',function(){
                var _id = $(this).attr('depart_id');
                var role_dialog = new lib.dialog.confirm('新增职位',
                    '<div class="input_group"><div class="input_inner"><label>职位名称</label><input type="text" id="role_input" placeholder="请输入新的职位名称" autocomplete="off" /></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var role_name = $('#role_input').val();
                            self.addRole(_id,role_name);
                        }
                        this.hide()
                    }).show();
            })

            $('body').on('click','#department .addDepart',function(){
                var _id = $(this).attr('depart_id');
                var depart_dialog = new lib.dialog.confirm('新增部门',
                    '<div class="input_group"><div class="input_inner"><label>部门名称</label><input type="text" id="depart_input" placeholder="请输入新的部门名称" autocomplete="off" /></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var depart_name = $('#depart_input').val();
                            self.addDepart(depart_name);
                        }
                        this.hide()
                    }).show();
            })

            $('body').on('click','#role .back',function(){
                $('#department').show().siblings().hide();
            })
        },

        getDepartment: function(){
            var self = this;
            lib.api.get({
                api:'/department/list',
                success: function(data){
                    var $inner = $('#department');
                    var departhtml = departList_template({
                        depart: data.data,
                        isAdmin: lib.storage.get('user').isadmin?lib.storage.get('user').isadmin: 0
                    });
                    $inner.html(departhtml);
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){

                }
            })
        },

        addDepart: function(name){
            var self = this;
            if(self.isAdd) return;
            self.isAdd = true;
            lib.api.get({
                api:'/department/add',
                data:{
                    name: name
                },
                success: function(data){
                    var $inner = $('#department .select_action');
                    var departhtml='<div class="select_inner"><a class="select" href="javascript:void(0);" _id= '+data.data._id+'>';
                    departhtml+=data.data.name+'</a>';
                    if(lib.storage.get('user').isadmin==1){
                        departhtml+='<i class="iconfont delete">&#xe600</i>';
                    }
                    departhtml+='</div>';
                    $inner.before(departhtml);
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isAdd = false;
                }
            })
        },

        getRole: function(_id){
            var self = this;
            lib.api.get({
                api:'/role/list',
                data:{
                  _id: _id
                },
                success: function(data){
                    var $inner = $('#role');
                    var rolehtml = roleList_template({
                        role: data.data,
                        isAdmin: lib.storage.get('user').isadmin?lib.storage.get('user').isadmin: 0
                    });
                    $inner.html(rolehtml);
                    $inner.show().siblings().hide();
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){

                }
            })
        },

        addRole: function(_id,name){
            var self = this;
            if(self.isAdd) return;
            self.isAdd = true;
            lib.api.get({
                api:'/role/add',
                data:{
                    depart_id: _id,
                    name: name
                },
                success: function(data){
                    var $inner = $('#role .select_action');
                    var rolehtml='<div class="select_inner"><a class="select" href="javascript:void(0);" _id= '+data.data._id+'>';
                        rolehtml+=data.data.name+'</a>';
                        if(lib.storage.get('user').isadmin==1){
                            rolehtml+='<i class="iconfont delete">&#xe600</i>';
                        }
                        rolehtml+='</div>';
                    $inner.before(rolehtml);
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isAdd = false;
                }
            })
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)