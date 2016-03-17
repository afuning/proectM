/**
 * Created by huning on 16/3/16.
 */
var RestResult = function(){
    this.code = RestResult.NO_ERROR;
    this.data = {};
    this.msg = "";
    this.isSuccess = isSuccess;
    this.isError = isError;
};

function isSuccess(jsonStr){
    this.code = RestResult.NO_ERROR;
    this.data = jsonStr?jsonStr:{};
    this.msg = "success";
    return{
        "code" : this.code,
        "data" : this.data,
        "msg" : this.msg
    }
}
function isError(str,msg){
    this.code = RestResult[str];
    this.data = {};
    this.msg = msg;
    return{
        "code" : this.code,
        "data" : this.data,
        "msg" : this.msg
    }
}

RestResult.NO_ERROR = 10000;//成功
RestResult.ILLEGAL_ARGUMENT_ERROR_CODE = 50007;//参数错误
RestResult.SERVER_EXCEPTION_ERROR_CODE = 50000;//服务器异常

module.exports = RestResult;
