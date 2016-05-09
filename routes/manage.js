/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var ProjectModel = require('../models/Project').ProjectModel;
var TaskModel = require('../models/Task').TaskModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var moment = require('moment');
module.exports.autoroute = {
    'get':{
        '/manage/project': projectList,
        '/manage/task': taskList,
        '/manage/task/detail': taskDetail
    },
    'post':{

    }
};

function projectList(req,res,next){
    res.render('manage-project', {});
}


function taskList(req,res,next){
    var ep = new eventproxy();
    ep.all('project', 'user', function (project, user) {
        res.render('manage-task', {project: project,user: user});
    });
    ProjectModel.find({}).exec(function(err,project){
        if(project){
            ep.emit('project', project);
        }else{
            next();
        }
    });

    UserModel.find({}).exec(function(err,user){
        if(user){
            ep.emit('user', user);
        }else{
            next();
        }
    });
}

function taskDetail(req,res,next){
    var task_id = req.query._id;
    var _id = req.session.user._id;
    TaskModel.findById(task_id).populate({path: 'project_id from_id to_id schedule_user'})
        .exec(function(err,doc){
            if(doc){
                for(var i in doc.schedule_time){
                    doc.schedule_time[i]= moment(doc.schedule_time[i]).format("YYYY-MM-DD HH:mm:ss");
                }

                doc.createtime = moment(doc.createTime).format("YYYY-MM-DD HH:mm:ss");
                doc.forecasttime = moment(doc.forecastTime).format("YYYY-MM-DD HH:mm:ss");
                doc.updatetime = moment(doc.updateTime).format("YYYY-MM-DD HH:mm:ss");
                if(doc.endTime){
                    doc.endtime = moment(doc.endTime).format("YYYY-MM-DD HH:mm:ss");
                }
                doc.schedule_detail.reverse();
                doc.schedule_time.reverse();
                doc.schedule_user.reverse();
                res.render('manage-task-detail', {taskDetail: doc});
            }else{
                next();
            }
        })
}


