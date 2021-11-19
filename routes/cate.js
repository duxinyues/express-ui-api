/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 00:33:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 22:30:37
 * @Description: 分类管理
 */
const express = require('express');
const router = express.Router();

const CateController = require("../controllers/cate");
router.get('/list', CateController.list);
router.post('/add', CateController.add);
router.delete('/remove', CateController.remove);
module.exports = router;