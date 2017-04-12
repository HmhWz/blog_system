var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/new_blog');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({
	secret: 'blogsystem',
	resave: true,
	saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));

//flash 显示通知
app.use(flash());
//注册这些变量
app.use(function(req, res, next){
  res.locals.user = req.session.user;
  res.locals.isAuthor = false; //进入用户主页是否本人
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

//文件上传
app.use(require('express-formidable')({
  encoding: 'utf-8',
  uploadDir: path.join(__dirname, 'public/images'), //上传目录
  keepExtensions: true   //保留后缀
}));
//routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;