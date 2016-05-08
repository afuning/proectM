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
    TaskModel.findById(task_id).populate({path: 'project_id from_id to_id'})
        .exec(function(err,doc){
            if(doc){
                res.render('manage-task-detail', {taskDetail: doc});
            }else{
                next();
            }
        })
}


