/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 00:52:07
 * @Description: 文件描述
 */
const Constant = require("../constant/constant");
const dateFormat = require("dateformat");
const token = require("../controllers/token");
const pool = require("../config");
const Common = require("../controllers/common");
/**
 * 文章列表
 * @param {*} req 
 * @param {*} res 
 */
function getArticleList(req, res) {
    //定义一个返回对象
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    //查询
    const sql = "SELECT * FROM  article ";
    pool.getConnection(function (err, connection) {
        if (err) {
            res.send(Constant.DEFAULT_ERROR)
        } else {
            console.log("mysql链接成功！")
            connection.query(sql, function (err, results) {
                if (err) {
                    res.send(Constant.DEFAULT_ERROR)
                } else {
                    const result = JSON.parse(JSON.stringify(results));
                    resObj.data = result;
                    res.send(resObj)
                }
            })
        }
    })
}
module.exports = {
    getArticleList,
}