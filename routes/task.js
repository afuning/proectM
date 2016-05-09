/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var TaskModel = require('../models/Task').TaskModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var dbHelper = require('../conf/dbHelper');
var moment = require('moment');
module.exports.autoroute = {
    'get':{
        '/task/list': getList,
        '/task/add': addTask,
        '/task/complete': completeTask,
        '/task/change': changeTask
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
        qs=new RegExp(keyword);
    var result = new RestResult(); //添加返回状态格式
    var paixu = {updateTime: 'desc'};
    var screen = {};
    var _id = req.session.user._id;
    screen.name = qs;
    project_id?screen.project_id = project_id:'';
    status==''?'':screen.status = status;
    if(sort == "1"){
        paixu = {
            forecastTime: 'desc'
        }
    }
    if(isown=='true'){
        screen.$or = [
            {to_id: _id},
            {from_id: _id},
        ]
    }

    dbHelper.pageQuery(page, pagesize, TaskModel,{path: 'project_id from_id to_id'},screen, paixu, function(error, $page){
        if(error){
            next(error);
        }else{
            res.send(result.isSuccess($page));//返回成功结果
        }
    });
}

function addTask(req,res,next){
    var from_id = req.session.user._id,
        name = req.query.name,
        project_id = req.query.project_id,
        to_id = req.query.to_id,
        time = req.query.time,
        detail = req.query.detail;
    var result = new RestResult(); //添加返回状态格式
    var fromList = [],schedule_detail=[],schedule_time=[],schedule_user=[];
    fromList.push(from_id);
    schedule_detail.push('创建该任务');
    schedule_time.push(moment().format());
    schedule_user.push(from_id);
    var taskEntity = new TaskModel({
        name: name,
        detail: detail,
        project_id: project_id,
        schedule_detail: schedule_detail,
        schedule_time: schedule_time,
        schedule_user: schedule_user,
        from_id: fromList,
        to_id: to_id,
        forecastTime: new Date(time)//要求完成时间
    });

    taskEntity.save(function(err,row){
        if (err) {//服务器保存异常
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",err));
            return;
        }
        res.send(result.isSuccess(row));//返回成功结果
    })
}

function completeTask(req,res,next) {
    var _id = req.query._id;
    var user_id = req.session.user._id;
    var result = new RestResult(); //添加返回状态格式


    TaskModel.findById(_id).exec(function(err,doc){
        if(user_id != doc.to_id) {
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","你不是当前任务处理用户,没有权限完成该任务"));
            return ;
        }
        doc.status = 1;
        doc.endTime = Date.now();
        doc.updateTime = Date.now();
        doc.schedule_user.push(user_id);
        doc.schedule_detail.push('完成该任务');
        doc.schedule_time.push(Date.now());
        delete doc._id;    //再将其删除
        TaskModel.update({_id: _id},doc,function(err,task){
            if(task){
                res.send(result.isSuccess())
            }else {
                res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",err));
            }
        })
    })
}

function changeTask(req,res,next) {
    var _id = req.query._id,
        user_id = req.query.user_id,
        user_realname = req.query.user_realname,
        name = req.query.name,
        detail = req.query.detail;
    var session_id = req.session.user._id;
    var result = new RestResult(); //添加返回状态格式
    var schedule_detail = '';

    TaskModel.findById(_id).exec(function(err,doc){
        if(session_id != doc.to_id) {
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","你不是当前任务处理用户,没有权限完成该任务"));
            return ;
        }
        if(user_id) {
            schedule_detail = '将该任务指向'+user_realname;
            doc.from_id.push(doc.to_id);
            doc.to_id = user_id;
        }
        if(name) {
            schedule_detail = '将该任务名称'+doc.name+'改为'+name;
            doc.name = name
        }
        if(detail) {
            schedule_detail = '将该任务详情'+doc.detail+'改为'+detail;
            doc.detail = detail
        }
        doc.updateTime = Date.now();
        doc.schedule_user.push(session_id);
        doc.schedule_detail.push(schedule_detail);
        doc.schedule_time.push(Date.now());
        delete doc._id;    //再将其删除
        TaskModel.update({_id: _id},doc,function(err,task){
            if(task){
                res.send(result.isSuccess())
            }else {
                res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE",err));
            }
        })
    })
}



