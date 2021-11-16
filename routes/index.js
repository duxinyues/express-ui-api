/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 23:44:05
 * @Description: 文件描述
 */
var express = require('express');
const loginController = require("../controllers/index");
var router = express.Router();
router.post('/login', loginController.login)
module.exports = router;
