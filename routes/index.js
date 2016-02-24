var express = require('express');
var router = express.Router();

module.exports.autoroute = {
  'get' : {
    '/' : showIndexView
  }
};
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
function showIndexView(req,res){
  res.render('index', { title: 'Express' });
}

//module.exports = router;
