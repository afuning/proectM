/**
 * Created by huning on 16/2/29.
 */

var express = require('express');
var crypto = require('../util/tokenUtils');
var UserModel = require('../models/User').UserModel;
var RestResult = require('../conf/RestResult');
var validator = require('validator');
var eventproxy =require('eventproxy');


module.exports.autoroute = {
    'get':{
        '/': showLoginView,
        '/login': showLoginView,
        '/logout': goLogout,
        '/islogin': isLogin
    },

    'post':{
        '/login': goLogin
    }
};

function showLoginView(req,res,next){
    res.render('login', { isLogin: 0 });
}

function goLogin(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var passwordMd5 = crypto.updateMd5(password);
    var query = {username: username,password:passwordMd5};
    var result = new RestResult();

    UserModel.find(query).exec(function(err, user){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
        console.log(user.length);
        if(user.length >= 1){
            res.statusCode = 200;
            req.session.user = user[0];
            res.send(result.isSuccess());
        }else{
            res.statusCode = 200;
            res.send(result.isError('SERVER_EXCEPTION_ERROR_CODE','该用户不存在或密码不正确'));
        }
    });
}

function goLogout(req,res,next){
    req.session.destroy(function () {
        res.redirect('/');
    });
}

function isLogin(req,res,next){
    if(req.session.user){
        res.send({ code: 10000,msg:'已登录',data:{isLogin:1}});
    }else{
        res.send({ code: 10000,msg:'未登录',data:{isLogin:0}});
    }
}