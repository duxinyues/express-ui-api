/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2022-10-21 21:24:22
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2022-10-21 22:17:53
 * @FilePath: \node-sever\app.js
 * @Description: 
 * Copyright (c) 2022 by duxinyues email: yongyuan253015@gmail.com, All Rights Reserved.
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require("cors");

var indexRouter = require('./routes/index');
var articleRouter = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.all('*', (req, res, next) => {
  // 允许跨域，*表示允许任意域名跨域
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "content-type");
  res.header('Access-Control-Allow-Methods', "DELETE,PUT,POST,GET,OPTTONS");
  next()
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
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
