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
        '/login': showLoginView
    },
    'post':{
        '/login': goLogin
    }
};

function showLoginView(req,res,next){
    res.render('login', { isLogin: 0 });
}

function goLogin(req,res,next){
    var username =
    //var query = {username: req.body.username,password:req.body.password};

    UserModel.count(query).exec(function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
        //console.log(doc);
        if(doc == 1){
            res.statusCode = 200;
            res.send({ code: 10000,msg:'登录成功',data:{}});
        }else{
            res.statusCode = 200;
            res.send({ code: 10000,msg:'该用户不存在或密码不正确',data:{}});
        }
    });
}