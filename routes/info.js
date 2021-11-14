/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:24:49
 * @LastEditors: 
 * @LastEditTime: 2021-11-14 03:30:25
 * @Description: 文件描述
 */
const express = require('express');
const router = express.Router();
const InfoController = require('../controllers/info');

router.get('/', InfoController.info);
router.put('/', InfoController.update);
module.exports = router;