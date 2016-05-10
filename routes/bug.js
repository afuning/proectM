/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var TaskModel = require('../models/Task').TaskModel;
var BugModel = require('../models/Bug').BugModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var dbHelper = require('../conf/dbHelper');
var moment = require('moment');
module.exports.autoroute = {
    'get':{
        '/bug/list': getList,
        '/bug/add': addBug,
        '/bug/change': changeBug,
        '/bug/complete': completeBug,
        '/bug/delete': deleteBug
    },
    'post':{

    }
};


function getList(req,res,next){
    var page = req.query.page || 1,
        pagesize = req.query.pagesize*1 || 1,
        keyword = req.query.keyword || '',
        isown = req.query.isown,
        status = req.query.status,
        project_id = req.query.project_id,
        sort = req.query.sort,
        rank = req.query.rank,
        qs=new RegExp(keyword);
    var result = new RestResult(); //添加返回状态格式
    var paixu = {updateTime: 'desc'};
    var screen = {};
    var _id = req.session.user._id;
    screen.name = qs;
    project_id?screen.project_id = project_id:'';
    status==''?'':screen.status = status;
    rank==''?'':screen.rank = rank;
    if(sort == "1"){
        paixu = {
            rank: 'asc'
        }
    }
    if(isown=='true'){
        screen.$or = [
            {to_id: _id},
            {from_id: _id},
        ]
    }

    dbHelper.pageQuery(page, pagesize, BugModel,{path: 'project_id from_id to_id'},screen, paixu, function(error, $page){
        if(error){
            next(error);
        }else{
            res.send(result.isSuccess($page));//返回成功结果
        }
    });
}

function addBug(req,res,next){
    var from_id = req.session.user._id,
        name = req.query.name,
        project_id = req.query.project_id,
        to_id = req.query.to_id,
        rank = req.query.rank,
        detail = req.query.detail;
    var result = new RestResult(); //添加返回状态格式
    var fromList = [],schedule_detail=[],schedule_time=[],schedule_user=[];
    fromList.push(from_id);
    schedule_detail.push('创建该BUG');
    schedule_time.push(moment().format());
    schedule_user.push(from_id);
    var bugEntity = new BugModel({
        name: name,
        detail: detail,
        project_id: project_id,
        schedule_detail: schedule_detail,
        schedule_time: schedule_time,
        schedule_user: schedule_user,
        from_id: fromList,
        to_id: to_id,
        rank: rank
    });

    bugEntity.save(function(err,row){
        if (err) {//服务器保存异常
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",err));
            return;
        }
        res.send(result.isSuccess(row));//返回成功结果
    })
}

function completeBug(req,res,next) {
    var _id = req.query._id,
        way = req.query.way;
    var user_id = req.session.user._id;
    var result = new RestResult(); //添加返回状态格式


    BugModel.findById(_id).exec(function(err,doc){
        if(user_id != doc.to_id) {
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","你不是当前任务处理用户,没有权限完成该任务"));
            return ;
        }
        doc.status = 1;
        doc.way = way;
        doc.endTime = Date.now();
        doc.updateTime = Date.now();
        doc.schedule_user.push(user_id);
        doc.schedule_detail.push('解决该BUG');
        doc.schedule_time.push(Date.now());
        delete doc._id;    //再将其删除
        BugModel.update({_id: _id},doc,function(err,task){
            if(task){
                res.send(result.isSuccess())
            }else {
                res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",err));
            }
        })
    })
}



function changeBug(req,res,next) {
    var _id = req.query._id,
        user_id = req.query.user_id,
        user_realname = req.query.user_realname,
        name = req.query.name;
        //detail = req.query.detail;
    var session_id = req.session.user._id;
    var result = new RestResult(); //添加返回状态格式
    var schedule_detail = '';

    BugModel.findById(_id).exec(function(err,doc){
        if(session_id != doc.to_id) {
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","你不是当前BUG处理用户,没有权限解决该BUG"));
            return ;
        }
        if(user_id) {
            schedule_detail = '将该BUG指向'+user_realname;
            doc.from_id.push(doc.to_id);
            doc.to_id = user_id;
        }
        if(name) {
            schedule_detail = '将该BUG标题'+doc.name+'改为'+name;
            doc.name = name
        }
        doc.updateTime = Date.now();
        doc.schedule_user.push(session_id);
        doc.schedule_detail.push(schedule_detail);
        doc.schedule_time.push(Date.now());
        delete doc._id;    //再将其删除
        BugModel.update({_id: _id},doc,function(err,bug){
            if(bug){
                res.send(result.isSuccess())
            }else {
                res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",err));
            }
        })
    })
}

function deleteBug(req,res,next){
    var _id = req.query._id;
    var result = new RestResult(); //添加返回状态格式
    var session_id = req.session.user._id;

    BugModel.findById(_id).exec(function(err,doc){
        if(session_id != doc.from_id[0]) {
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","你不是当前BUG创建者,没有权限确认该BUG是否解决"));
            return ;
        }
        BugModel.remove({_id: _id},function(err,bug){
            if(bug){
                res.send(result.isSuccess())
            }else {
                res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",err));
            }
        })
    })
}



