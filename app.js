/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 23:28:40
 * @Description: app
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var verifyMiddleware = require('./routes/middleware/verify');
var indexRouter = require('./routes/index');
var infoRouter = require('./routes/info');
var cateRouter = require('./routes/cate');
var adminRouter = require('./routes/admin');
var atricleRoute = require('./routes/atricle');
var app = express();
app.all('*', (req, res, next) => {
  // 允许跨域，*表示允许任意域名跨域
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");

  next()
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cate', verifyMiddleware.verifyToken, cateRouter);
app.use('/atricle', verifyMiddleware.verifyToken, atricleRoute);
app.use('/admin', verifyMiddleware.verifyToken, adminRouter);
app.use('/info', verifyMiddleware.verifyToken, infoRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req)
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; 
