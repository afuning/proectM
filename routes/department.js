/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var RoleModel = require('../models/Role').RoleModel;
var DepartmentModel = require('../models/Department').DepartmentModel;
var RestResult = require('../conf/RestResult');
var eventproxy =require('eventproxy');
module.exports.autoroute = {
    'get':{
        '/department/get': getRole
    }
};


//获取所有部门，职位
function getRole(req,res,next){
    var department = [];
    var ep = new eventproxy();
    var result = new RestResult(); //添加返回状态格式
    /*ep.all('role','department',function(role,department){
        res.send(result.isSuccess({department: department,role: role}));
    });*/

    RoleModel.find({}).populate('department').exec(function(err,doc){
        if(err){
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","服务器异常"));
        }else{
            // ep.emit('role', doc);
            res.send(result.isSuccess(doc));
        }
    });

    /*DepartmentModel.find({}).exec(function(err,doc){
        if(err){
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","服务器异常"));
        }else{
            ep.emit('department', doc);
        }
    });*/
}