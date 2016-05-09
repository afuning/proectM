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

            $('.J-Name').on('click',function(){
                var _id = self._id;
                var name_dialog = new lib.dialog.confirm('修改项目名称',
                    '<div class="input_group"><div class="input_inner"><label>项目名称</label><input type="text" id="name_input" placeholder="请输入名称" autocomplete="off" /></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var name=$('#name_input').val();
                            self.changeProject({_id: _id,name: name});
                        }
                        this.hide()
                    }).show();
            })

            $('.J-Detail').on('click',function(){
                var _id = self._id;
                var detail_dialog = new lib.dialog.confirm('修改项目详情',
                    '<div class="input_group"><div class="input_inner"><label>项目详情</label><textarea id="detail_input" placeholder="请输入详情"></textarea></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var detail=$('#detail_input').val();
                            self.changeProject({_id: _id,detail: detail});
                        }
                        this.hide()
                    }).show();
            })
        },

        changeProject: function(_data){
            var self = this;
            if(self.isChange) return ;
            self.isChange = true;
            lib.api.get({
                api:'/project/change',
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