/**
 * Created by huning on 16/2/23.
 */
;(function($,win){
    var main = {
        init: function(){
            this.addEvent();
            this.initQiniuBtn();
        },


        addEvent: function() {
            var self = this;

            $('.save').on('click',function(){
                var _id = self._id;
                var title_dialog = new lib.dialog.confirm('设置标题',
                    '<div class="input_group"><div class="input_inner"><label>标题</label><input type="text" id="title_input" placeholder="请输入标题" autocomplete="off" /></div></div>',
                    function(e,isOk){
                        if(isOk){
                            var title = $('#title_input').val();
                            if(title){
                                self.saveFile(title);
                            }
                        }
                        this.hide()
                    }).show();
            })

            $('body').on('click','.delete',function(){
                var $this = $(this);
                lib.notification.confirm('确定要删除该文件?','',function(e,isOk){
                    if(isOk){
                        $this.parent().parent().remove();
                        $('#pickfiles').show();
                        if($('.common_table table tr').length<=1) {
                            $('.save').hide();
                            var htm='<tr class="empty" style="text-align: center"><td colspan="4"><span>文件列表为空</span></td></tr>';
                            $('.common_table table').append(htm);
                        }
                    }
                    this.hide();
                }).show();
            })
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
                dragdrop: false,                   //开启可拖曳上传
                drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                //分块上传时，每片的体积
                auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                /*filters: {
                    mime_types : [
                        {title : "Image files", extensions: "jpg,jpeg,gif,png"}
                    ]
                },*/
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
                    },
                    'FileUploaded': function(up, file, info) {
                        //var domain = up.getOption('domain');
                        var res = jQuery.parseJSON(info);
                        console.log(up);
                        console.log(file);
                        console.log(res);
                        var htm = '<tr key='+up.getOption('domain')+'/'+res.key+'><td>'+file.name+'</td><td>'+file.type+'</td><td>'+(file.size/1024).toFixed(2)+'KB</td><td><a href="javascript:void(0)" class="delete">删除</a></td></tr>'
                        $('.common_table table').find('.empty').remove();
                        $('.common_table table').append(htm);
                        $('.save').show();
                        if($('.common_table table tr').length>=4) {
                            $('#pickfiles').hide();
                        }
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

        saveFile: function(title){
            var self = this;
            if(self.isUp) return ;
            self.isUp = true;
            var fileList = [];
            $('.common_table table tr:not(.table_hd)').each(function(){
                var $tr = $(this);
                var file = {
                    key: $tr.attr('key'),
                    name: $tr.children('td').eq(0).text(),
                    type: $tr.children('td').eq(1).text(),
                    size: $tr.children('td').eq(2).text()
                }
                fileList.push(file);
            });
            lib.api.get({
                api:'/file/save',
                data: {
                    title: title,
                    file: fileList
                },
                success: function(data){
                    location.reload();
                },
                error: function(err){
                    //console.log(err);
                    lib.notification.simple(err.msg,{bg:'#e15f63',font:'#fff'},2000);
                },
                complete: function(){
                    self.isUp = false;
                }
            })
        }
    }

    $(function(){
        main.init();
    })
})(jQuery,window)