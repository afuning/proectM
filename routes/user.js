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
module.exports.autoroute = {
    'get':{
        '/user/detail': getUser
    },
    'post':{
        '/user/change': changeUser
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
    var result = new RestResult();
    //console.log(_id+'&'+role+'&'+realname);

    /*UserModel.findByIdAndUpdate(_id,{$set:{realname:realname}},function(err,person){
        console.log(person); //MDragon
    });*/
    UserModel.findById(_id,function(err,user){
        user.realname = realname;
        user.role = role;
        user.updateTime = Date.now();
        delete user._id;    //再将其删除
        UserModel.update({_id:_id},user,function(err){
            if(err){
                res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE",err));
            }else{
                res.send(result.isSuccess());//返回成功结果
            }
        });
    });
}


