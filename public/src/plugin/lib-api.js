/**
 * Created by huning on 16/3/6.
 */
;(function($,lib){

    function handleError(opts,data){
        switch(data.code){
            case 10000:
                // 调用成功
                opts.success && opts.success(data);
                break;
            case 50001:
            // 缺少参数session_token
            case 50002:
                // session_token无效或已过期
                //console.log(data);
                break;
            case 50003:
            // 缺少access_token
            case 50004:
                // access_token无效或已过期
                break;
            case 50005:
            // refresh_token参数缺少
            case 50006:
                // refresh_token令牌错误或过期, 原先登陆状态退出

                break;
            default :
                // 其他情况
                opts.error && opts.error(data);
        }
    }

    function fun_ajax(opts,ajaxType){
        // 支持mock数据
        if (opts.mock) {
            var mockData = opts.mock;

            $.getJSON(mockData.path, function (data) {
                if (mockData.error) {
                    opts.error && opts.error(data);
                } else {
                    opts.success && opts.success(data);
                }
                opts.complete && opts.complete();
            });
            return;
        }


        var data = opts.data? $.extend({},opts.data):{};


        //var url = opts.ssl ? Env.sslApiUrl : Env.apiUrl;
        $.ajax({
            url: opts.api,
            type: ajaxType,
            data: data,
            dataType: 'json',
            success: function (data) {
                //状态码处理
                handleError(opts,data);
                opts.complete && opts.complete();
            },
            error: function (xhr, errorType, error) {
                opts.error && opts.error(xhr);
                opts.complete && opts.complete();
            },
            complete: function (xhr, status) {
                //opts.complete && opts.complete();
            }
        })
    };

    lib.api={
        get: function(option){
            if(!option){
                option = {};
            }

            fun_ajax(option,'get');
        },
        post: function(option){
            if(!option){
                option = {};
            }

            fun_ajax(option,'post');
        }
    }
})(jQuery,window[lib]||(window.lib = {}));