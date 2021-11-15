/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:30:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 22:18:45
 * @Description: 文件描述
 */
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');

router.get('/', AdminController.list);
router.get('/:id', AdminController.info);
router.post('/', AdminController.add);
router.put('/', AdminController.update);
router.delete('/', AdminController.remove);
module.exports = router;