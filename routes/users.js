var express = require('express');
var router = express.Router();

module.exports.autoroute = {
  'get' : {
    '/users' : showUserView
  }
};
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
function showUserView(req,res){
  res.send('respond with a resource');
}

//module.exports = router;
