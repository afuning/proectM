/**
 * Created by huning on 16/3/18.
 */
var check = require('validator').check,
    sanitize = require('validator').sanitize;
/*处理空值与注入*/
function handleParam(params){
    var params = params || {};
    var safeParam = {};
    for(var key in params){
        var trimed = sanitize(params[key]).xss();
        var blockXssed = sanitize(trimed).xss();
        safeParam[key] = blockXssed
    }
    return safeParam
}