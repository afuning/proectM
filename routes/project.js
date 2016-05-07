/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var ProjectModel = require('../models/Project').ProjectModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var dbHelper = require('../conf/dbHelper');
module.exports.autoroute = {
    'get':{
        '/project/list': getList,
        '/project/add': addProject
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

    dbHelper.pageQuery(page, pagesize, ProjectModel,{path: 'creater_id'},{name: qs}, {
        createTime: 'desc'
    }, function(error, $page){
        if(error){
            next(error);
        }else{
            res.send(result.isSuccess($page));//返回成功结果
        }
    });
}

function addProject(req,res,next){
    var isadmin = req.session.user.isadmin,
        creater_id = req.session.user._id,
        name = req.query.name;
    var result = new RestResult(); //添加返回状态格式
    if(isadmin ==0){
        res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE",'该用户没有权限'));
    }
    var projectEntity = new ProjectModel({
        name: name,
        creater_id: creater_id
    });

    projectEntity.save(function(err,row){
        if (err) {//服务器保存异常
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","服务器异常"));
            return;
        }
        res.send(result.isSuccess(row));//返回成功结果
    })
}


