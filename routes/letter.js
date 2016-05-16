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
        '/letter/list': getList
    },
    'post':{

    }
};


function getList(req,res,next){
    var page = req.query.page || 1;
    var pagesize = req.query.pagesize*1 || 10000;
    var result = new RestResult(); //添加返回状态格式

    dbHelper.pageQuery(page, pagesize, LetterModel,{path:"from_id to_id",populate: { path: "user" }}, {ishide: {$ne:1}}, {
        createTime: 'desc'
    }, function(error, $page){
        if(error){
            next(error);
        }else{
            console.log($page);
            res.send(result.isSuccess($page));//返回成功结果
        }
    });
}






