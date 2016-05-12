/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var NoticeModel = require('../models/Notice').NoticeModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var moment = require('moment');
var dbHelper = require('../conf/dbHelper');

//七牛获取uptoken
//七牛云存储
/*var qiniu = require('qiniu');
var settings = require('../conf/setting');
//七牛key
qiniu.conf.ACCESS_KEY = settings.QINIUACCESS_KEY;
qiniu.conf.SECRET_KEY = settings.QINIUSECRET_KEY;*/

module.exports.autoroute = {
    'get':{
        '/share/notice': renderNotice,
        '/notice/list': noticeList,
        '/notice/add': noticeAdd,
        '/notice/delete': noticeDelete,
        '/share/notice/detail': noticeDetail
    }
};

function renderNotice(req,res,next){
    var isadmin = req.session.user.isadmin;
    res.render('share-notice',{isadmin: isadmin});
}

function noticeDetail(req,res,next){
    var _id = req.query._id;

    NoticeModel.findById(_id).populate({path: 'creater_id'}).exec(function(err,doc){
        if(doc){
            doc.updatetime = moment(doc.updateTime).format("YYYY-MM-DD HH:mm:ss");
            res.render('share-notice-detail',{notice: doc});
        }else {
            next();
        }
    })

}

function noticeList(req,res,next){
    var page = req.query.page || 1;
    var pagesize = req.query.pagesize*1 || 10000;
    var result = new RestResult(); //添加返回状态格式

    dbHelper.pageQuery(page, pagesize, NoticeModel,{path: "creater_id" }, {ishide: 0}, {
        createTime: 'desc'
    }, function(error, $page){
        if(error){
            next(error);
        }else{
            res.send(result.isSuccess($page));//返回成功结果
        }
    });
}


function noticeAdd(req,res,next){
    var creater_id = req.session.user._id,
        title = req.query.title,
        detail = req.query.detail;
    var result = new RestResult(); //添加返回状态格式

    var noticeEntity = new NoticeModel({
        title: title,
        detail: detail,
        creater_id: creater_id
    });

    noticeEntity.save(function(err,row){
        if (err) {//服务器保存异常
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",err));
            return;
        }
        res.send(result.isSuccess(row));//返回成功结果
    })
}

function noticeDelete(req,res,next){
    var isadmin = req.session.user.isadmin,
        _id = req.query._id;
    var result = new RestResult(); //添加返回状态格式

    if(isadmin == 0){
        res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",'无权限删除该公告'));
        return;
    }

    NoticeModel.findById(_id).exec(function(err,doc){
        console.log(doc);
        doc.ishide = 1;
        delete doc._id;
        NoticeModel.update({_id: _id},doc,function(err,notice){
            if(notice){
                res.send(result.isSuccess())
            }else {
                res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",err));
            }
        })
    })
}







