/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2022-10-21 21:24:22
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2022-10-21 21:56:13
 * @FilePath: \node-sever\routes\article.js
 * @Description: 
 * Copyright (c) 2022 by duxinyues email: yongyuan253015@gmail.com, All Rights Reserved.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
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
  res.set('Content-Type', 'application/json');
  res.status(200)
  res.send(data);
});

module.exports = router;
