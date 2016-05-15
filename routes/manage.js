/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var ProjectModel = require('../models/Project').ProjectModel;
var TaskModel = require('../models/Task').TaskModel;
var BugModel = require('../models/Bug').BugModel;
var DepartmentModel = require('../models/Department').DepartmentModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var moment = require('moment');
module.exports.autoroute = {
    'get':{
        '/manage/project': projectList,
        '/manage/task': taskList,
        '/manage/task/detail': taskDetail,
        '/manage/project/detail': projectDetail,
        '/manage/bug': bugList,
        '/manage/bug/detail': bugDetail,
        '/manage/message': renderMessage
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

function projectDetail(req,res,next){
    var project_id = req.query._id;
    var _id = req.session.user._id;
    var ep = new eventproxy();
    ep.all('project','task','bug', function (project,task,bug) {
        res.render('manage-project-detail', {project: project,task: task,bug: bug});
    });
    ProjectModel.findById(project_id).populate({path: 'creater_id'})
        .exec(function(err,doc){
            if(doc){
                doc.createtime =  moment(doc.createTime).format("YYYY-MM-DD HH:mm:ss");
                doc.updatetime =  moment(doc.updateTime).format("YYYY-MM-DD HH:mm:ss");
                ep.emit('project', doc);
                //res.render('manage-project-detail', {projectDetail: doc});
            }else{
                next();
            }
        })
    TaskModel.find({project_id: project_id})
        .exec(function(err,doc){
            var isEnd = 0,isIng = 0 ;
            if(doc){
                doc.forEach(function(item){
                    if(item.status==0) {
                        isIng++;
                    }else {
                        isEnd++
                    }
                })
                ep.emit('task', {isIng: isIng,isEnd: isEnd});
                //res.render('manage-project-detail', {projectDetail: doc});
            }else{
                next();
            }
        })
    BugModel.find({project_id: project_id})
        .exec(function(err,doc){
            var isEnd = 0,isIng = 0 ;
            if(doc){
                doc.forEach(function(item){
                    if(item.status==0) {
                        isIng++;
                    }else {
                        isEnd++
                    }
                })
                ep.emit('bug', {isIng: isIng,isEnd: isEnd});
                //res.render('manage-project-detail', {projectDetail: doc});
            }else{
                next();
            }
        })
}

function bugList(req,res,next){
    var ep = new eventproxy();
    ep.all('project', 'user', function (project, user) {
        res.render('manage-bug', {project: project,user: user});
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

function bugDetail(req,res,next){
    var bug_id = req.query._id;
    var _id = req.session.user._id;
    BugModel.findById(bug_id).populate({path: 'project_id from_id to_id schedule_user'})
        .exec(function(err,doc){
            if(doc){
                for(var i in doc.schedule_time){
                    doc.schedule_time[i]= moment(doc.schedule_time[i]).format("YYYY-MM-DD HH:mm:ss");
                }

                doc.createtime = moment(doc.createTime).format("YYYY-MM-DD HH:mm:ss");
                doc.updatetime = moment(doc.updateTime).format("YYYY-MM-DD HH:mm:ss");
                if(doc.endTime){
                    doc.endtime = moment(doc.endTime).format("YYYY-MM-DD HH:mm:ss");
                }
                doc.schedule_detail.reverse();
                doc.schedule_time.reverse();
                doc.schedule_user.reverse();
                res.render('manage-bug-detail', {bugDetail: doc});
            }else{
                next();
            }
        })
}

function renderMessage(req,res,next){
    DepartmentModel.find({}).exec(function(err,doc){
        if(err){
            next();
        }else {
            res.render('manage-message', {depart:doc});
        }
    })
}


