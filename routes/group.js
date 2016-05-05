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
        '/group/user': userList,
        '/group/company': companyList
    },
    'post':{

    }
};

function userList(req,res,next){
    res.render('group-user', {});
}

function companyList(req,res,next){
    res.render('group-company', {});
}


