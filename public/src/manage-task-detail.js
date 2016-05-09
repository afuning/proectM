/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
            var httpurl = new lib.httpurl(location.href);
            var params = httpurl.params;
            this._id = params["_id"]?params["_id"]:'';

        },

        addEvent: function(){
            var self = this;

            $('.J-complete').on('click',function(){
                var _id = $(this).parent().attr('_id');
                lib.notification.confirm('确定该任务已解决?','',function(e,isOk){
                    if(isOk){
                        self.completeTask(_id);
                    }
                    this.hide();
                }).show();
            })

            $('.J-transmit').on('click',function(){
                var _id = $(this).parent().attr('_id');
                var transmit_dialog = new lib.dialog.confirm('选择转发用户',
                '<div class="input_group"><div class="input_inner"><label>真实姓名</label><select id="name_input" ></select></div></div>',
                function(e,isOk){
                    if(isOk){
                        var user_id=$('#name_input option:selected').val();
                        var user_realname = $('#name_input option:selected').text();
                        self.transmitUser({_id: _id,user_id: user_id,user_realname: user_realname});
                    }
                    this.hide()
                }).show();
                self.getList();
            })

            $('.J-changeName').on('click',function(){
                var _id = self._id;
                var transmit_dialog = new lib.dialog.confirm('修改任务名称',
                    '<div class="input_group"><div class="input_inner"><label>任务名称</label><input type="text" id="taskname_input" placeholder="请输入名称" autocomplete="off" /></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var taskname=$('#taskname_input').val();
                            self.transmitUser({_id: _id,name: taskname});
                        }
                        this.hide()
                    }).show();
            })

            $('.J-changeDetail').on('click',function(){
                var _id = self._id;
                var transmit_dialog = new lib.dialog.confirm('修改任务详情',
                    '<div class="input_group"><div class="input_inner"><label>任务详情</label><textarea id="taskdetail_input" placeholder="请输入任务详情" autocomplete="off"></textarea></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var taskdetail=$('#taskdetail_input').val();
                            self.transmitUser({_id: _id,detail: taskdetail});
                        }
                        this.hide()
                    }).show();
            })
        },

        completeTask: function(_id){
            var self = this;
            if(self.isComplete) return ;
            self.isComplete = true;
            lib.api.get({
                api:'/task/complete',
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
                    self.isComplete = false;
                }
            })
        },

        getList: function(){
            var self = this;
            lib.api.get({
                api:'/user/list',
                success: function(data){
                    data.data.results.forEach(function(value,i){
                        $('#name_input').append('<option value='+value._id+'>'+value.realname+'</option>')
                    })
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){

                }
            })
        },

        transmitUser: function(_data){
            var self = this;
            if(self.isChange) return ;
            self.isChange = true;
            lib.api.get({
                api:'/task/change',
                data: _data,
                success: function(data){
                    location.reload();
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isChange = false;
                }
            })
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)