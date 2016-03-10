/**
 * Created by huning on 16/3/10.
 */
var express = require('express');

module.exports.autoroute = {
    'get':{
        '/reg': showRegView
    },
    'post':{
        '/reg': goReg
    }
};

function showRegView(req,res,next){
    res.render('reg', { title: '注册页面' })
}

function goReg(req,res,next){

}