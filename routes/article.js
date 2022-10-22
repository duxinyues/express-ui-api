/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2022-10-21 21:24:22
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2022-10-22 21:42:13
 * @FilePath: \node-sever\routes\article.js
 * @Description: 
 * Copyright (c) 2022 by duxinyues email: yongyuan253015@gmail.com, All Rights Reserved.
 */
var express = require('express');
var router = express.Router();

//用户校验
function verifyUser(req, res, next) {
  console.log("token",req)
  next()
  if (!req.session.user) {
    res.json({ code: 2, msg: '未登录' })
  } else {
    next()
  }
}
/* GET users listing. */
router.get('/', verifyUser, function (req, res, next) {
  const data = [
    {
      id: 1,
      content: "文章内容"
    },
    {
      id: 2,
      content: "文章内容2"
    }
  ]
  res.json({ code: 0, msg: 'successful', data })
});

module.exports = router;
