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
            var wayhtml = '<div class="input_group"><div class="input_inner"><label>解决办法</label><select id="way_input" >';
            wayhtml +='<option>已解决</option>';
            wayhtml +='<option>设计如此</option>';
            wayhtml +='<option>延迟解决</option>';
            wayhtml +='<option>无法解决</option>';
            wayhtml +='</select></div></div>';
            $('.J-complete').on('click',function(){
                var _id = $(this).parent().attr('_id');
                /*lib.notification.confirm('确定该任务已解决?','',function(e,isOk){
                    if(isOk){
                        self.completeTask(_id);
                    }
                    this.hide();
                }).show();*/
                var complete_dialog = new lib.dialog.confirm('解决BUG',wayhtml,
                    function(e,isOk){
                        if(isOk){
                            var way = $('#way_input option:selected').text();
                            self.completeTask(_id,way);
                        }
                        this.hide()
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
                var transmit_dialog = new lib.dialog.confirm('修改BUG标题',
                    '<div class="input_group"><div class="input_inner"><label>BUG标题</label><input type="text" id="bugname_input" placeholder="请输入名称" autocomplete="off" /></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var bugname=$('#bugname_input').val();
                            self.transmitUser({_id: _id,name: bugname});
                        }
                        this.hide()
                    }).show();
            })

            $('.J-delete').on('click',function(){
                lib.notification.confirm('确定该BUG已修复?(不可恢复)','',function(e,isOk){
                    if(isOk){
                        self.deleteTask();
                    }
                    this.hide();
                }).show();
            })
        },

        deleteTask: function(){
            var self = this;
            if(self.isDel) return ;
            self.isDel = true;
            lib.api.get({
                api:'/bug/delete',
                data: {
                    _id: self._id
                },
                success: function(data){
                    location.replace('/manage/bug');
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isDel = false;
                }
            })
        },

        completeTask: function(_id,way){
            var self = this;
            if(self.isComplete) return ;
            self.isComplete = true;
            lib.api.get({
                api:'/bug/complete',
                data: {
                    _id: _id,
                    way: way
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
                api:'/bug/change',
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