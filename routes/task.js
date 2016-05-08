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
        '/task/add': addTask
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
    var fromList = [],schedule_detail=[],schedule_time=[];
    fromList.push(from_id);
    schedule_detail.push('创建该任务');
    schedule_time.push(moment().format());
    var taskEntity = new TaskModel({
        name: name,
        detail: detail,
        project_id: project_id,
        schedule_detail: schedule_detail,
        schedule_time: schedule_time,
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



