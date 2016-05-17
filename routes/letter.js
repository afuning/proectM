/**
 * Created by huning on 16/3/10.
 */
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var RoleModel = require('../models/Role').RoleModel;
var LetterModel = require('../models/Letter').LetterModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var moment = require('moment');
var dbHelper = require('../conf/dbHelper');


module.exports.autoroute = {
    'get':{
        '/letter/list': getList,
        '/letter/change': letterDel
    },
    'post':{

    }
};


function getList(req,res,next){
    var _id = req.session.user._id;
    var page = req.query.page || 1;
    var pagesize = req.query.pagesize*1 || 10000;
    var result = new RestResult(); //添加返回状态格式
    var screen = {
        $or: [
            {to_id:_id},
            {from_id:_id}
        ],
        ishide: {$ne:1}
    }
    dbHelper.pageQuery(page, pagesize, LetterModel,{path:"to_id from_id dialogue.to dialogue.from"}, screen, {
        updateTime: 'desc'
    }, function(error, $page){
        if(error){
            next(error);
        }else{
            console.log($page);
            res.send(result.isSuccess($page));//返回成功结果
        }
    });
}

function letterDel(req,res,next){
    var _id = req.query._id;
    var result = new RestResult();

    LetterModel.findById(_id).exec(function(err,doc){
        if(doc){
            doc.ishide = 1;
            doc.updateTime = Date.now();
            delete doc._id;
            LetterModel.update({_id:_id},doc,function(err,doc){
                if(err){
                    res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","服务器异常"));
                }else {
                    res.send(result.isSuccess());
                }
            })
        }
    })
}






