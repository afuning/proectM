/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
            this.renderUser();
        },


        addEvent: function(){
            var self = this;
            $('.tab_item').on('click',function(){
                var index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $('.change_table').eq(index).show()
                    .siblings('.change_table').hide();
            })
            $('.J-head').on('click',function(){
                var head_dialog = new lib.dialog.confirm('账号详情修改',
                    '<div class="selectHeaderLog" id="upContainer"><div class="btn" role="button" id="pickfiles"><i class="iconfont">&#xe639;</i></div><p>jpg、gif、png格式，尺寸要求：<font color="#c00">100x100/px</font></p> </div>',
                    function(e,isOk){
                    if(isOk){
                        var head_src = $('#head_src').prop('src');
                        head_src&&self.changeUser({head_url: head_src});
                    }else {

                    }
                    this.hide()
                }).show();
                self.initQiniuBtn();
            });

            $('.J-qq').on('click',function(){
                var qq_dialog = new lib.dialog.confirm('账号详情修改',
                    '<div class="input_group"><div class="input_inner"><label>QQ号码</label><input type="text" id="QQ_input" placeholder="请输入您的QQ号，方便同事联系你" autocomplete="off" /></div></div>',
                    function(e,isOk){
                    if(isOk){
                        var qq_num = $('#QQ_input').val();
                        qq_num&&self.changeUser({qq_num: qq_num});
                    }
                    this.hide()
                }).show();
            })

            $('.J-role').on('click',function(){
                var role_dialog = new lib.dialog.confirm('账号详情修改',
                    '<div class="input_group"><div class="input_inner"><label>部门</label><select class="J-depart" style="332px"></select></div><br /><div class="input_inner"><label>职位</label><select class="J-role" style="332px"></select></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var role = $('.J-role option:selected').val();
                            self.changeUser({role: role});
                        }
                        this.hide()
                    }).show();
                self.getJob();
            })

            $('.J-mobile').on('click',function(){
                var mobile_dialog = new lib.dialog.confirm('账号详情修改',
                    '<div class="input_group"><div class="input_inner"><label>手机号码</label><input type="text" id="mobile_input" placeholder="请输入您的手机号，方便同事联系你" autocomplete="off" /></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var mobile = $('#mobile_input').val();
                            mobile&&self.changeUser({mobile: mobile});
                        }
                        this.hide()
                    }).show();
            })
            $('.J-password').on('click',function(){
                var password_dialog = new lib.dialog.confirm('账号详情修改',
                    '<div class="input_group"><div class="input_inner"><label>旧密码</label><input type="password" id="old_input" placeholder="请输入旧密码" autocomplete="off" /></div><br /><div class="input_inner"><label>新密码</label><input type="password" id="new_input" placeholder="请输入新密码" autocomplete="off" /></div><br /><div class="input_inner"><label>重复密码</label><input type="password" id="re_input" placeholder="请输入重复密码" autocomplete="off" /></div></div>',
                    function(e,isOk){
                        if(isOk){
                            if(self.verity()){
                                self.changePwd();
                            }
                        }
                        this.hide()
                    }).show();
            })
        },

        renderUser: function(){
            var user = lib.storage.get('user');
            var username = user.username;
            var realname = user.realname;
            var qq = user.qq_num? user.qq_num: '未设置';
            var mobile = user.mobile? user.mobile: '未设置';
            var head_url = user.head_url? user.head_url: '';
            var role = user.role?user.role.name: '未设置';
            var depart = user.role?user.role.department.name: '未设置';

            $('#realname').text(realname);
            $('#qqnum').text(qq);
            $('#mobile').text(mobile);
            $('#role').text(role+'-'+depart);
            $('#username').text(username);
            if(head_url){
                $('#head_img').html('<img src='+head_url+' />');
            }
        },

        initQiniuBtn: function(){
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',    //上传模式,依次退化
                browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
                uptoken_url: '/qiniu/upToken',
                save_key: true,
                domain: 'http://7xthm1.com1.z0.glb.clouddn.com',
                container: 'upContainer',           //上传区域DOM ID，默认是browser_button的父元素，
                max_file_size: '5mb',           //最大文件体积限制
                flash_swf_url: 'plugin/qiniu/Moxie.swf',  //引入flash,相对路径
                max_retries: 3,                   //上传失败最大重试次数
                dragdrop: true,                   //开启可拖曳上传
                drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                //分块上传时，每片的体积
                auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                filters: {
                    mime_types : [
                        {title : "Image files", extensions: "jpg,jpeg,gif,png"}
                    ]
                },
                multi_selection : false,
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        // 每个文件上传前,处理相关的事情
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时,处理相关的事情
                        $('.selectHeaderLog .btn i.iconfont').html('&#xe63a;').addClass('change');
                    },
                    'FileUploaded': function(up, file, info) {
                        //var domain = up.getOption('domain');
                        //var res = jQuery.parseJSON(info);
                        $('.selectHeaderLog .btn i.iconfont').html('').removeClass('change').hide();
                        console.log(up);
                        console.log(file);
                        console.log(info);
                        var res = JSON.parse(info);
                        /*var domain = up.getOption('domain');
                        var res = JSON.parse(info);
                        var sourceLink = domain +'/'+ res.key;
                        $('.selectHeaderLog .btn').append('<img src='+sourceLink+'>');*/
                        var imgLink = Qiniu.imageView2({
                            mode: 1,  // 缩略模式，共6种[0-5]
                            w: 200,   // 具体含义由缩略模式决定
                            h: 200,   // 具体含义由缩略模式决定
                            q: 100,   // 新图的图像质量，取值范围：1-100
                            format: 'jpg'  // 新图的输出格式，取值范围：jpg，gif，png，webp等
                        },res.key);
                        $('.selectHeaderLog .btn').append('<img id="head_src" src='+imgLink+'>');
                    },
                    'Error': function(up, err, errTip) {
                        //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function() {
                        //队列文件处理完毕后,处理相关的事情
                    },
                    'Key': function(up, file) {
                        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                        // 该配置必须要在 unique_names: false , save_key: false 时才生效
                        var key = "";
                        // do something with key here
                        return key
                    }
                }
            });
        },

        changeUser: function(data){
            var self = this;
            //var head_img = $("#head_src").prop('src');
            var _data = $.extend({},data);
            if(self.isUpdate) return;
            self.isUpdate = true;
            lib.api.post({
                api:'/user/change',
                data: _data,
                success: function(data){
                    var user = data.data;
                    user.head_url&&$('#head_img,#user .head').html('<img src='+user.head_url+'/>');
                    user.qq_num&&$('#qqnum').text(user.qq_num);
                    user.mobile&&$('#mobile').text(user.mobile);
                    user.role&&$('#role').text(user.role.name+'-'+user.role.department.name);
                    lib.storage.set('user',user);
                },
                error: function(err){
                    //console.log(data);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isUpdate = false;
                }
            })
        },

        //修改密码
        changePwd : function(){
            var old_pwd = $('#old_input').val();
            var new_pwd = $('#new_input').val();
            if(self.isUpdatePwd) return;
            self.isUpdatePwd = true;
            lib.api.post({
                api:'/user/changpwd',
                data: {
                    old_pwd: old_pwd,
                    new_pwd: new_pwd
                },
                success: function(data){
                    lib.notification.simple("密码修改成功",{bg:'#57c78b',font:'#fff'},2000);
                    //lib.storage.set('user',data.data);
                },
                error: function(err){
                    //console.log(data);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isUpdatePwd = false;
                }
            })
        },

        //获取职位列表
        getJob: function(){
            lib.api.get({
                api:'/department/get',
                success: function(data){
                    var role = data.data;
                    var $depart = $('.d-float-popWrap .J-depart');
                    var $role = $('.d-float-popWrap .J-role');
                    var depart = {};
                    role.forEach(function(ele,i){
                        console.log(depart[ele.department._id]);
                        if(!(depart[ele.department._id] && depart[ele.department._id].length > 0)){
                            depart[ele.department._id] = [];
                        }
                        depart[ele.department._id].push(ele);
                    });

                    for(var one in depart){
                        $depart.append('<option value='+one+'>'+depart[one][0].department.name+'</option>');
                    }

                    $depart.on('change',function(){
                        var val = $(this).val();
                        $role.html('');
                        depart[val].forEach(function(ele,i){
                            $role.append('<option value='+ele._id+'>'+ele.name+'</option>');
                        })
                    })
                    $depart.change();
                },
                error: function(err){
                    console.log(err);
                    //lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){

                }
            })
        },

        //判断格式是否正确
        verity: function(){
            //this.username = $('#username').val();
            this.password = $('#new_input').val();
            this.password_repeat = $('#re_input').val();

            if(this.password.length<8){
                $('#new_input').closest('.input_inner').append('<p class="tip tip-warn">请输入符合规则的密码:字母、数字或者英文符号，最短8位，区分大小写</p>')
                //$('.tip-warn').eq(1).show();
                return false;
            }else if(this.password != this.password_repeat){
                $('#re_input').closest('.input_inner').append('<p class="tip tip-warn">两次输入密码不一致</p>');
                //$('.tip-warn').eq(2).show();
                return false;
            }
            return true;
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)