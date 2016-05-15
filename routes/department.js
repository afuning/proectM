/**
 * Created by huning on 16/3/10.
 */
var express = require('express');
var crypto = require('../util/tokenUtils');
var RoleModel = require('../models/Role').RoleModel;
var UserModel = require('../models/User').UserModel;
var DepartmentModel = require('../models/Department').DepartmentModel;
var RestResult = require('../conf/RestResult');
var eventproxy =require('eventproxy');
module.exports.autoroute = {
    'get':{
        '/department/get': getRole,
        '/department/list': getDepartment,
        '/department/add': addDepartment,
        '/role/list': getRolelist,
        '/role/add': addRole,
        '/department/user/list': departUser
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

//获取所有部门
function getDepartment(req,res,next){
    var result = new RestResult(); //添加返回状态格式

    DepartmentModel.find({}).exec(function(err,doc){
        if(doc){
            res.send(result.isSuccess(doc));//返回成功结果
        }else {
            res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","获取失败"));
        }
    })
}

function addDepartment(req,res,next){
    var name = req.query.name;

    var result = new RestResult(); //添加返回状态格式

    var departEntity = new DepartmentModel({
        name : name
    });
    departEntity.save(function(err,doc){
        if (err) {//服务器保存异常
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","服务器异常"));
            return;
        }
        var roleEntity = new RoleModel({
            name : '未分组',
            department : doc._id
        });
        roleEntity.save(function(err,row){
            if (err) {//服务器保存异常
                res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","服务器异常"));
                return;
            }
            res.send(result.isSuccess(doc));//返回成功结果
        })
    })
}

function getRolelist(req,res,next){
    var _id = req.query._id;
    var result = new RestResult(); //添加返回状态格式
    RoleModel.find({department: _id}).exec(function(err,doc){
        if(doc){
            res.send(result.isSuccess(doc));//返回成功结果
        }else {
            res.send(result.isError("ILLEGAL_ARGUMENT_ERROR_CODE","获取失败"));
        }
    })
}

function addRole(req,res,next){
    var _id = req.query.depart_id;
    var name = req.query.name;

    var result = new RestResult(); //添加返回状态格式

    var roleEntity = new RoleModel({
        name : name,
        department : _id
    });
    roleEntity.save(function(err,row){
        if (err) {//服务器保存异常
            res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","服务器异常"));
            return;
        }
        res.send(result.isSuccess(row));//返回成功结果
    })
}

function departUser(req,res,next){
    var _id = req.query._id;
    var result = new RestResult();
    RoleModel.find({department: _id}).select('_id').exec(function(err,doc){
        var roles = [];
        doc.forEach(function(item,i){
            roles.push({'role':item._id})
        });
        UserModel.find({
            $or: roles,
            ishide: {$ne:1}
        }).exec(function(err,user){
            if(err){
                res.send(result.isError("SERVER_EXCEPTION_ERROR_CODE","服务器异常"));
                return;
            }else {
                res.send(result.isSuccess(user));
            }
        })
    })
}