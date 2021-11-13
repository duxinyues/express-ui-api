/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:12:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 03:21:26
 * @Description: 文件描述
 */
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/atricle');

router.get('/', ArticleController.list);
router.get('/:id', ArticleController.info);
router.post('/', ArticleController.add);
router.put('/', ArticleController.update);
router.delete('/', ArticleController.remove);

module.exports = router;