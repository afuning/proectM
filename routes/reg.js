/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');
module.exports.autoroute = {
    'get':{
        '/reg': showRegView
    },
    'post':{
        '/reg': goReg
    }
};

function showRegView(req,res,next){
    var step = req.query.step;
    if(step == '0' || step == '1' || step == '2'){
        res.render('reg', { isLogin: 1,step: step });
    }else{
        res.render('error', {
            message: "未找到该页",
            error: ""
        });;
    }
}

function goReg(req,res,next){
    var username        = validator.trim(req.body.username);
    var password        = validator.trim(req.body.password);
    var password_repeat = validator.trim(req.body['password-repeat']);

    var result = new RestResult(); //添加返回状态格式

    var ep = new eventproxy();  // 控制并发
    ep.fail(next);

    ep.on('prop_err', function (msg) {
        res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE",msg));
    });
    if(username==""||username.length<8){
        ep.emit('prop_err', '0');
        return ;
    }
    if(password==""||password.length<8){
        ep.emit('prop_err', '1');
        return ;
    }
    if(password != password_repeat){
        ep.emit('prop_err', '2');
        return ;
    }

    var passwordMd5 = crypto.updateMd5(password);

    var userEntity = new UserModel({
        username : username,
        password : passwordMd5
    });

    UserModel.count({username:req.body.username}).exec(function(err,doc){
        if(doc){
            res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","该用户已注册"));
        }else{
            userEntity.save(function(err,row){
                if (err) {//服务器保存异常
                    res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","服务器异常"));
                    return;
                }
                res.send(result.isSuccess());//返回成功结果
            })
        }
    })
}