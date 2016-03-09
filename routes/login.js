/**
 * Created by huning on 16/2/29.
 */
var express = require('express');
var user = require('../conf/db').user;


module.exports.autoroute = {
    'get':{
        '/': showLoginView
    },
    'post':{
        '/login': goLogin
    }
}

function showLoginView(req,res,next){
    res.render('login', { title: 'Express' });
}

function goLogin(req,res,next){
    var query = {username: req.body.username,password:req.body.password};
    user.count(query).exec(function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
        console.dir(doc);
        if(doc == 1){
            res.statusCode = 200;
            res.send({ code: 10000,msg:'登录成功',data:{}});
        }else{
            res.statusCode = 200;
            res.send({ code: 10000,msg:'该用户不存在或密码不正确',data:{}});
        }
    });
}