/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:12:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-20 13:03:23
 * @Description: 文件描述
 */
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/atricle');

router.get('/list', ArticleController.list);
router.get('/detail', ArticleController.info);
router.post('/add', ArticleController.add);
router.put('/update', ArticleController.update);
router.delete('/delete', ArticleController.remove);

module.exports = router;