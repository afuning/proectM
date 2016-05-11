/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var FileModel = require('../models/File').FileModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var moment = require('moment');
var dbHelper = require('../conf/dbHelper');

//七牛获取uptoken
//七牛云存储
var qiniu = require('qiniu');
var settings = require('../conf/setting');
//七牛key
qiniu.conf.ACCESS_KEY = settings.QINIUACCESS_KEY;
qiniu.conf.SECRET_KEY = settings.QINIUSECRET_KEY;

module.exports.autoroute = {
    'get':{
        '/file/up': fileUp,
        '/file/save': fileSave,
        '/file/list': fileList,
        '/file/get': getList
    },
    'post':{
        '/file/del': fileDelete
    }
};

function fileUp(req,res,next){
    res.render('file-up',{});
}

function fileList(req,res,next){
    res.render('file-list',{});
}

function fileSave(req,res,next){
    var title = req.query.title;
    var file = req.query.file;
    var _id = req.session.user._id;
    var result = new RestResult();
    var policy = new qiniu.rs.GetPolicy();
    file.forEach(function(item,i){
        var downloadUrl = policy.makeRequest(item.key);
        item.url = downloadUrl;
    });


    var Entity = new FileModel({
        title: title,
        file: file,
        creater_id: _id
    });

    Entity.save(function(err,doc){
        if(doc){
            res.send(result.isSuccess(doc));
        }
    })
}

function getList(req,res,next){
    var page = req.query.page || 1;
    var pagesize = req.query.pagesize*1 || 10000;
    var keyword = req.query.keyword || '';
    var qs=new RegExp(keyword);
    var result = new RestResult(); //添加返回状态格式

    dbHelper.pageQuery(page, pagesize, FileModel,{path:"creater_id"},{title: qs}, {
        createTime: 'desc'
    }, function(error,$page){
        if(error){
            next(error);
        }else{
            res.send(result.isSuccess($page));//返回成功结果
        }
    });
}

function fileDelete(res,req,next){

    var _id = req.body.id;
    var isAdmin = req.session.user.isadmin;
    var result = new RestResult(); //添加返回状态格式

    if(isAdmin){
        res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","没有该权限"));
    }else {
        FileModel.remove({_id: _id}).exec(function(err,docs){
            if(docs){
                res.send(result.isSuccess());
            }else{
                res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","删除失败"));
            }
        })
    }
}




