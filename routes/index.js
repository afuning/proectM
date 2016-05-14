var express = require('express');
var UserModel = require('../models/User').UserModel;
var TaskModel = require('../models/Task').TaskModel;
var BugModel = require('../models/Bug').BugModel;
var NoticeModel = require('../models/Notice').NoticeModel;
var eventproxy =require('eventproxy');
var moment = require('moment');
//var router = express.Router();


module.exports.autoroute = {
  'get' : {
    '/index' : showIndexView
  }
};
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
function showIndexView(req,res,next){
  //userDao.add(req, res, next);
  var _id = req.session.user._id;
  var ep = new eventproxy();

  ep.all('task', 'user','bug','myBug','myTask','notice', function (task, user,bug,myBug,myTask,notice) {
    res.render('index', {task: task,user: user,bug: bug,myBug:myBug,myTask: myTask,notice:notice});
  });
  /*var taskscreen = {
    status: 0
  };*/

  TaskModel.count({status: 0,ishide: {$ne: 1}}).exec(function(err,doc){
    if(err){
      next();
    }else {
      ep.emit('task', doc);
    }
  });
  TaskModel.count({status: 0,ishide: {$ne: 1},to_id:_id}).exec(function(err,doc){
    if(err){
      next();
    }else {
      ep.emit('myTask', doc);
    }
  });

  UserModel.count({ishide: {$ne: 1}}).exec(function(err,doc){
    if(err){
      next();
    }else {
      ep.emit('user', doc);
    }
  })

  BugModel.count({status: 0,ishide: {$ne: 1}}).exec(function(err,doc){
    if(err){
      next();
    }else {
      ep.emit('bug', doc);
    }
  })

  BugModel.count({status: 0,ishide: {$ne: 1},to_id: _id}).exec(function(err,doc){
    if(err){
      next();
    }else {
      ep.emit('myBug', doc);
    }
  })

  var time = {
    updateTime:{
      "$gte": new Date(moment().startOf('month')),
      "$lt":new Date(moment().endOf('month'))
    },
    ishide: 0
  }
  NoticeModel.find(time).sort({"updateTime":'desc'}).populate({path: 'creater_id'}).exec(function(err,doc){
    if(err){
      next();
    }else {
      console.log(doc);
      doc.forEach(function(item,i){
        item.updatetime = moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss");
      })
      ep.emit('notice', doc);
    }
  })
}

//module.exports = router;
