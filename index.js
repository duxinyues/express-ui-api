/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2022-10-19 13:13:07
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2022-10-19 13:40:06
 * @FilePath: \express-ui-api\app.js
 * @Description: 
 * Copyright (c) 2022 by duxinyues email: yongyuan253015@gmail.com, All Rights Reserved.
 */
let express = require("express");
let app = express();

app.set('port', process.env.PORT || 3000); // 设置端口
app.get('/', function (req, res) {
  res.type('text/plain');
  res.send("服务器启动")
});

app.get('/about', function (req, res) {
  res.type("text/plain");
  res.status(200)
  res.send('about的api接口')
})
//404状态
app.use(function (req, res) {
  res.type("text/plain");
  res.status(404);
  res.send('404-not found')
});

//500
app.use(function (err, req, res, next) {
  console.log('err', err);
  res.type('text/plain');
  res.status(500);
  res.send('500-Server Error');
});

// 监听端口号
app.listen(app.get('port'), function () {
  console.log("Express start：", app.get("port"))
})