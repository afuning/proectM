/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var RestResult = require('../conf/RestResult');
module.exports.autoroute = {
    'get':{
        '/reg': showRegView
    },
    'post':{
        '/reg': goReg
    }
};

function showRegView(req,res,next){
    res.render('reg', { isLogin: 1 })
}

function goReg(req,res,next){
    if(req.body['password-repeat'] != req.body['password']){
        return res.redirect('/reg');
    }
    var password = crypto.updateMd5(req.body['password']);

    var userEntity = new UserModel({
        username : req.body.username,
        password : password
    });

    UserModel.count({username:req.body.username}).exec(function(err,doc){
        var result = new RestResult();
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