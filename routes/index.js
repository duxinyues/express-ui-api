/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-02 00:02:46
 * @Description: 文件描述
 */
var express = require('express');
const IndexController = require("../controllers/index")
var router = express.Router();

router.post('/login', IndexController.login);
router.get('/articleList', IndexController.getArticleList);
router.post('/addArticles', IndexController.addArticle);
module.exports = router;
