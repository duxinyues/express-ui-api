/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2022-10-22 20:12:32
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2022-10-22 21:51:38
 * @FilePath: \node-sever\routes\users.js
 * @Description: 
 * Copyright (c) 2022 by duxinyues email: yongyuan253015@gmail.com, All Rights Reserved.
 */

var express = require('express');
var { expressjwt: jwt } = require("express-jwt");
var sign = require("jsonwebtoken").sign;
var router = express.Router();
const secretKey = 'strongest ^0^';

router.post('/login', (req, res, next) => {
  if (req.body.name === 'admin' && req.body.password === 'admin') {
    // req.session.user = req.body.name;
    // res.json({ code: 0, msg: '登录成功' });
    res.json({
      code: 0,
      token: sign({ name: req.body.name }, secretKey, {
        expiresIn: '600s'
      })
    })
    return;
  }
  res.json({ code: 1, msg: '用户名或者密码错误' })
})
router.post('/validate', jwt({ secret: secretKey, algorithms: ["HS256"] }), function (req, res, next) {
  res.json({ code: 0 })
})
/* GET users listing. */
router.get('/logout', function (req, res, next) {
  req.session.destroy(); // 销毁cookie，也就是session
  res.json({ code: 0, msg: '注销成功' })
});

module.exports = router;
