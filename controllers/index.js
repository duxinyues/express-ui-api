/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-10-02 17:07:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-17 23:19:08
 * @Description: 登录接口
 */
const Common = require('./common');
const Constant = require("../constant/constant");
const dateFormat = require('dateformat');
const Token = require('./token');
const pool = require('../config')
const TOKEN_EXPRESS_SENCOND = 360000000; // token有效期
const login = (req, res) => {
    const sql = `select * from admin where username='${req.body.username}' and password='${req.body.password}'`
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    pool.query(sql, (err, result) => {
        if (err) {
            res.send(Constant.DEFAULT_LOGIN_FAIL)
            return;
        }
        if(result){
            let token=Token.encrypt({id:result[0].id,TOKEN_EXPRESS_SENCOND})
            resObj.data={
                id: result[0].id,
                username: result[0].username,
                name: result[0].name,
                role: result[0].role,
                lastLoginAt: dateFormat(result[0].last_login_at, 'yyyy-mm-dd HH:MM:ss'),
                createAt: dateFormat(result[0].created_at, 'yyyy-mm-dd HH:MM:ss'),
                updateAt: dateFormat(result[0].updated_at, 'yyyy-mm-dd HH:MM:ss')
            };
            resObj.data.token = token;
            res.send(resObj);
        }
    })
}
module.exports = {
    login
};