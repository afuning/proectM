/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var RoleModel = require('../models/Role').RoleModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
var settings = require('../conf/setting');
var moment = require('moment');
var dbHelper = require('../conf/dbHelper');
//七牛获取uptoken
//七牛云存储
var qiniu = require('qiniu');
//七牛key
qiniu.conf.ACCESS_KEY = settings.QINIUACCESS_KEY;
qiniu.conf.SECRET_KEY = settings.QINIUSECRET_KEY;

module.exports.autoroute = {
    'get':{
        '/user/detail': getUser,
        '/qiniu/upToken': getupToken,
        '/user/list': getList,
        '/user/delete': deleteUser,
        '/user/addAdmin': addAdmin
    },
    'post':{
        '/user/change': changeUser,
        '/user/changpwd': changePwd
    }
};

function getUser(req,res,next){
    var _id = req.session.user._id;
    var result = new RestResult();
    UserModel.findById(_id).populate('role').exec(function(erruser,user){
        if(erruser){
            res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE",err));
        }else{
            if(user.role){
                RoleModel.findById(user.role._id).populate('department').exec(function(errrole,role){
                    if(errrole) {
                        res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE",err));
                    }else {
                        user.role = role ;
                        res.send(result.isSuccess(user));//返回成功结果
                    }
                })
            } else {
                res.send(result.isSuccess(user));//返回成功结果
            }

        }
    });
}


function changeUser(req,res,next){
    var _id = req.session.user._id;
    var role = req.body.role;
    var realname = req.body.realname;
    var head_url = req.body.head_url;
    var qq_num = req.body.qq_num;
    var mobile = req.body.mobile;
    var result = new RestResult();
    console.log(qq_num);

    /*UserModel.findByIdAndUpdate(_id,{$set:{realname:realname}},function(err,person){
        console.log(person); //MDragon
    });*/
    UserModel.findById(_id,function(err,user){
        realname&&(user.realname = realname);
        role&&(user.role = role);
        head_url&&(user.head_url = head_url);
        qq_num&&(user.qq_num = qq_num);
        mobile&&(user.mobile = mobile);
        console.log(user);
        user.updateTime = Date.now();
        delete user._id;    //再将其删除
        UserModel.update({_id:_id},user,function(err,docs){
            if(err){
                res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE",err));
            }else{
                res.send(result.isSuccess());//返回成功结果
            }
        });
    });
}

function getupToken(req,res,next){
    var myUptoken = new qiniu.rs.PutPolicy(settings.QINIUCMSBUCKETNAME);
    var token = myUptoken.token();
    var result = new RestResult();
    moment.locale('en');
    var currentKey = moment(new Date()).format('YYYY-MM-DD--HH-mm-ss');
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (token) {
        res.send({
            uptoken: token,
            sava_key :currentKey
        });//返回成功结果
    }
}

function changePwd(req,res,next){
    var old_password    = validator.trim(req.body.old_pwd);
    var new_password    = validator.trim(req.body['new_pwd']);

    var result = new RestResult(); //添加返回状态格式

    var ep = new eventproxy();  // 控制并发
    ep.fail(next);

    ep.on('prop_err', function (msg) {
        res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","新密码格式错误"));
    });

    if(new_password != new_password){
        ep.emit('prop_err');
        return ;
    }

    var passwordMd5_old = crypto.updateMd5(old_password);
    var passwordMd5_new = crypto.updateMd5(new_password);

    UserModel.count({password:passwordMd5_old}).exec(function(err,doc){
        //console.dir(doc);
        if(doc){
            var _id = req.session.user._id;
            UserModel.findById(_id,function(err,user){
                user.password = passwordMd5_new
                user.updateTime = Date.now();
                delete user._id;    //再将其删除
                UserModel.update({_id:_id},user,function(err,docs){
                    if(err){
                        res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE",err));
                    }else{
                        res.send(result.isSuccess());//返回成功结果
                    }
                });
            });
        }else{
            res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","旧密码错误"));
        }
    })
}

function getList(req,res,next){
    var page = req.query.page || 1;
    var pagesize = req.query.pagesize*1 || 1;
    var keyword = req.query.keyword || '';
    var qs=new RegExp(keyword);
    var result = new RestResult(); //添加返回状态格式

    dbHelper.pageQuery(page, pagesize, UserModel,{path:"role",populate: { path: "department" }}, {realname: qs}, {
        createTime: 'desc'
    }, function(error, $page){
        if(error){
            next(error);
        }else{
            res.send(result.isSuccess($page));//返回成功结果
        }
    });
}


function deleteUser(req,res,next){
    var isadmin = req.session.user.isadmin;
    var _id = req.query._id;
    var result =  new RestResult(); //添加返回状态格式
    if(isadmin==1){
        UserModel.remove({_id: _id}).exec(function(err,docs){
            if(docs){
                res.send(result.isSuccess());
            }else{
                res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","删除失败"));
            }
        })
    }else{
        res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","你不是管理员"));
    }
}

function addAdmin(req,res,next){
    var isadmin = req.session.user.isadmin;
    var _id = req.query._id;
    var result =  new RestResult(); //添加返回状态格式
    if(isadmin==1){
        UserModel.findById(_id,function(err,user){
            user.isadmin = 1;
            user.updateTime = Date.now();
            delete user._id;    //再将其删除
            UserModel.update({_id:_id},user,function(err,docs){
                if(err){
                    res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE",err));
                }else{
                    res.send(result.isSuccess());//返回成功结果
                }
            });
        });
    }else{
        res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","你不是管理员"));
    }
}


