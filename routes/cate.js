/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 00:33:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-16 23:50:04
 * @Description: 分类管理
 */
const express = require('express');
const router = express.Router();

const CateController = require("../controllers/cate");
router.get('/', CateController.list);
router.get('/:id', CateController.info);
router.post('/add', CateController.add);
router.put('/', CateController.update);
router.delete('/', CateController.remove);
module.exports = router;