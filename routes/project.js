/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var ProjectModel = require('../models/Project').ProjectModel;
var RoleModel = require('../models/Role').RoleModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var dbHelper = require('../conf/dbHelper');
module.exports.autoroute = {
    'get':{
        '/project/list': getList
    },
    'post':{

    }
};


function getList(req,res,next){
    var page = req.query.page || 1;
    var pagesize = req.query.pagesize*1 || 1;
    var keyword = req.query.keyword || '';
    var qs=new RegExp(keyword);
    var result = new RestResult(); //添加返回状态格式

    dbHelper.pageQuery(page, pagesize, ProjectModel,"user", {name: qs}, {
        createTime: 'desc'
    }, function(error, $page){
        if(error){
            next(error);
        }else{
            res.send(result.isSuccess($page));//返回成功结果
        }
    });
}


