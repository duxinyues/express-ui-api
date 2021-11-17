/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-17 23:49:41
 * @Description: login——api
 */
var express = require('express');
const loginController = require("../controllers/index");
var router = express.Router();
router.post('/login', loginController.login)
module.exports = router;
