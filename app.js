var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./conf/setting');
var mongoose = require('mongoose');
/*var routes = require('./routes/index');
var users = require('./routes/users');*/
//设置路由
var autorouter = require('express-autoroute');
var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 设置 Session


app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    mongooseConnection : mongoose.connection
  })
}));


app.use(function(req, res, next){
  //console.dir(req.session.user);
  if(req.session.user){
    next();
  }else{
    var arr = req.url.split('/');

    if(arr.length>1&&arr[1]==''){
        next();
    }else if(arr.length>1&&(arr[1]=='login'||arr[1]=='reg')){
        next();
    }else{
        req.session.originalUrl = req.originalUrl ? req.originalUrl : null;
        //req.flash('error','请先登录');
        res.redirect('/');
    }
  }
});

//设置路由配置要放在bodyParser配置后面
autorouter(app, {
  throwErrors: false,
  routesDir: __dirname+'/routes'
});
//console.dir(__dirname);
//app.use(app.router);
/*app.use('/', routes);
app.use('/index', routes);
app.use('/users', users);*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





module.exports = app;
