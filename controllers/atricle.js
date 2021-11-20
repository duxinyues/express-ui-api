/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:36:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-20 13:04:36
 * @Description: 文件描述
 */
const Common = require('./common');
const Constant = require("../constant/constant");
const pool = require('../config');
const formatDate = require("../utils")
let list = (req, res) => {
    const sql = `SELECT * FROM article LIMIT ${(req.body.page - 1) * req.body.pageSize},${req.body.pageSize}`
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    pool.query(sql, (err, result) => {
        if (err) {
            res.send(Constant.DEFAULT_LOGIN_FAIL);
            return;
        }
        if (result) {
            resObj.data = result
            res.send(resObj);
        }
    })
};
let info = (req, res) => {
    const params = { id: JSON.stringify(req.body.id) }
    const sql = `SELECT * FROM article  WHERE id=${params.id}`;
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
    pool.query(sql, (err, result) => {
        if (err) {
            console.log("什么", err);
            res.send(Constant.DEFAULT_ERROR);
        }
        if (result && result.length>0) {
            resObj.data = { ...result[0] }
            res.send(resObj);
            return;
        }
        
    })
};
let add = (req, res) => {
    const params = {
        title: JSON.stringify(req.body.title),
        desc: JSON.stringify(req.body.desc),
        cate: JSON.stringify(req.body.cate),
        content: JSON.stringify(req.body.content),
        create_at: JSON.stringify(formatDate.checkDate()),
        update_at: JSON.stringify(formatDate.checkDate())
    }
    const sql = `insert into article(title,decs,cate,content,create_at,update_at) values(${params.title},${params.desc},${params.cate},${params.content},${params.create_at},${params.update_at})`;
    const querySql = `SELECT * FROM article WHERE title=${params.title};`
    pool.query(querySql, (err, results) => {
        if (err) {
            console.log(err);
            res.send(Constant.DEFAULT_ERROR);
            return;
        }
        if (results && results.length === 0) {
            pool.query(sql, (error, _res) => {
                if (error) {
                    console.log("发布报错：", error);
                    res.send(Constant.DEFAULT_ERROR);
                    return;
                }
                if (_res) {
                    console.log(_res);
                    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
                    res.send(resObj)
                }
            })
            return;
        }
        res.send({
            code: 400,
            msg: "文章已经存在，请重新设置"
        })
    })
};
let update = (req, res) => {
    const params = {
        id: JSON.stringify(req.body.id),
        title: JSON.stringify(req.body.title),
        desc: JSON.stringify(req.body.desc),
        cate: JSON.stringify(req.body.cate),
        content: JSON.stringify(req.body.content),
        update_at: JSON.stringify(formatDate.checkDate())
    }
    const sql = `UPDATE article SET title=${params.title} ,decs=${params.desc},content=${params.content},cate=${params.cate},update_at=${params.update_at} WHERE id=${params.id}`;

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(Constant.DEFAULT_ERROR);
        }
        if (result) {
            res.send({
                code: 200,
                msg: '文章修改成功！'
            })
        }
    })
};
let remove = (req, res) => {
    const sql = `DELETE FROM article  WHERE id=${req.body.id}`;
    const deleteSql = `select * from article where id=${req.body.id}`;
    pool.query(deleteSql, (err, result) => {
        if (result && result.length >= 1) {
            pool.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(Common.clone(Constant.DEFAULT_DELETE_FAIL));
                    return;
                }
                res.send(Common.clone(Constant.DEFAULT_DELETE_SUCCESS))
            })
        } else {
            res.send({ code: 400, msg: "文章不存在！" })
        }
    })
};
module.exports = {
    list,
    info,
    add,
    update,
    remove
}