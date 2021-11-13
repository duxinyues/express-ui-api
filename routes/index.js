/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 01:00:58
 * @Description: 文件描述
 */
var express = require('express');
const IndexController = require("../controllers/index");
const verifyMiddleware = require("./middleware/verify");
var router = express.Router();
// router.post('/login', verifyMiddleware.verifyToken, IndexController.login);
router.get('/articleList', verifyMiddleware.verifyToken, IndexController.getArticleList);
// router.post('/addArticles', verifyMiddleware.verifyToken, IndexController.addArticle);
module.exports = router;
