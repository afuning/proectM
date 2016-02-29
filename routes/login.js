/**
 * Created by huning on 16/2/29.
 */
var express = require('express');


module.exports.autoroute = {
    'get':{
        '/': showLoginView
    }
}

function showLoginView(req,res,next){
    res.render('login', { title: 'Express' });
}