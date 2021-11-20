/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:06:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-20 13:02:52
 * @Description: cateController
 */
const formatDate = require("../utils")
const Common = require("./common");
const Constant = require("../constant/constant");
const pool = require('../config');

const list = (req, res) => {
    const sql = `SELECT * FROM cate LIMIT ${(req.body.page - 1) * req.body.pageSize},${req.body.pageSize}`
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
}

const add = (req, res) => {
    const params = {
        cate_name: JSON.stringify(req.body.name),
        create_at: JSON.stringify(formatDate.checkDate()),
        update_at: JSON.stringify(formatDate.checkDate())
    }
    const sql = `insert into cate(cate_name,create_at,update_at) values(${params.cate_name},${params.create_at},${params.update_at})`;
    const querySql = `select * from cate where cate_name=${params.cate_name}`
    pool.query(querySql, (err, result) => {
        if (err) {
            console.log(err)
            res.send(Constant.DEFAULT_ADD_CATE_FAIL);
            return;
        }
        if (result && result.length === 0) {
            pool.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(Constant.DEFAULT_ADD_CATE_FAIL);
                    return;
                }
                res.send(Common.clone(Constant.DEFAULT_SUCCESS));
            })
        } else {
            res.send(Constant.DEFAULT_CATE_FAIL_REPEAT)
        }
    })
}

const remove = (req, res) => {
    const sql = `DELETE FROM cate  WHERE id=${req.body.id}`;
    const deleteSql = `select * from cate where id=${req.body.id}`
    pool.query(deleteSql, (err, result) => {
        if(result &&result.length>=1) {
            pool.query(sql,(err,result)=>{
                if (err) {
                    console.log(err)
                    res.send(Common.clone(Constant.DEFAULT_DELETE_FAIL));
                    return;
                }
                res.send(Common.clone(Constant.DEFAULT_DELETE_SUCCESS))
            })
        }else{
            res.send({code:400,msg:"分类不存在！"})
        }
    })
}

module.exports = {
    list,
    add,
    remove
}