var express = require('express');
var userDao = require('../dao/userDao');
//var router = express.Router();


module.exports.autoroute = {
  'get' : {
    '/' : showIndexView
  }
};
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
function showIndexView(req,res,next){
  userDao.add(req, res, next);
  res.render('index', { title: 'Express' });
}

//module.exports = router;
