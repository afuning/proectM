/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var ProjectModel = require('../models/Project').ProjectModel;
var TaskModel = require('../models/Task').TaskModel;
var BugModel = require('../models/Bug').BugModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var moment = require('moment');
module.exports.autoroute = {
    'get':{
        '/count/bug': bugCount,
        '/count/bug/month': bugMonthCount
    },
    'post':{

    }
};

function bugCount(req,res,next){
    var starttime = moment().startOf('day');
    var endtime = moment().endOf('day');
    var ep = new eventproxy();
    ep.all('today_new', 'today_done','month_new','month_done','total' ,function (today_new, today_done,month_new,month_done,total) {
        res.render('count-bug', {today_new: today_new,today_done: today_done,month_new: month_new,month_done: month_done,total: total});
    });

    BugModel.count({
        createTime:{
            "$gte": new Date(starttime),
            "$lt":new Date(endtime)
        }
    }).exec(function(err,doc){
        ep.emit('today_new', doc);
    });

    BugModel.count({
        endTime:{
            "$gte": new Date(starttime),
            "$lt":new Date(endtime)
        }
    }).exec(function(err,doc){
        ep.emit('today_done', doc);
    });

    BugModel.count({
        createTime:{
            "$gte": new Date(starttime),
            "$lt":new Date(endtime)
        }
    }).exec(function(err,doc){
        ep.emit('today_new', doc);
    });

    BugModel.count({
        createTime:{
            "$gte": new Date(moment().startOf('month')),
            "$lt":new Date(moment().endOf('month'))
        }
    }).exec(function(err,doc){
        ep.emit('month_new', doc);
    });

    BugModel.count({
        endTime:{
            "$gte": new Date(moment().startOf('month')),
            "$lt":new Date(moment().endOf('month'))
        }
    }).exec(function(err,doc){
        //console.log(doc);
        ep.emit('month_done', doc);
    });

    BugModel.count({
        status:0
    }).exec(function(err,doc){
        //console.log(doc);
        ep.emit('total', doc);
    });
}

function bugMonthCount(req,res,next){
    var year = req.query.year;
    var month = req.query.month;
    var time = moment().set({'year': year, 'month': month});
    var starttime = moment(time).startOf('month');
    var endtime = moment(time).endOf('month');
    var result = new RestResult(); //添加返回状态格式
    var ep = new eventproxy();

    console.log(starttime);
    console.log(endtime);
    ep.all('new_bug','done','total' ,function (new_bug, done,total) {
        res.send(result.isSuccess({new_bug: new_bug,done :done,total: total}))
    });

    BugModel.find({
        createTime:{
            "$gte": new Date(starttime),
            "$lt":new Date(endtime)
        }
    }).exec(function(err,doc){
        ep.emit('new_bug', doc);
    });

    BugModel.find({
        endTime:{
            "$gte": new Date(starttime),
            "$lt":new Date(endtime)
        }
    }).exec(function(err,doc){
        ep.emit('done', doc);
    });

    BugModel.find({
        status: 0,
        createTime:{
            "$lt":new Date(endtime)
        }
    }).exec(function(err,doc){
        ep.emit('total', doc);
    });
}





