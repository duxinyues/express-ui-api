/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-10-02 17:07:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-16 22:53:54
 * @Description: 文件描述
 */
const Common = require('./common');
const AdminModel = require('../models/admin');
const Constant = require("../constant/constant");
const dateFormat = require('dateformat');
const Token = require('./token');

const TOKEN_EXPRESS_SENCOND = 360000000; // token有效期

const login = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let task = {
        checkParams: (cb) => {
            Common.checkParams(req.body, ['username', 'password'], cb)
        },
        query: ['checkParams', (results, cb) => {
            AdminModel.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
                .then((result) => {
                    if (result) {
                        resObj.data = {
                            id: result.id,
                            username: result.username,
                            name: result.name,
                            role: result.role,
                            lastLoginAt: dateFormat(result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
                            createAt: dateFormat(result.createAt, 'yyyy-mm-dd HH:MM:ss')
                        }
                        const adminInfo = {
                            id: result.id
                        }
                        let token = Token.encrypt(adminInfo, TOKEN_EXPRESS_SENCOND);
                        resObj.data.token = token;
                        cb(null, result.id)
                    } else {
                        // 没有查询到结果
                        cb(Constant.LOGIN_ERROR)
                    }
                })
                .catch(err => {
                    cb(Constant.DEFAULT_ERROR);
                })
        }],
        writeLastLoginAt: ['query', (results, cb) => {
            let adminId = results['query'];
            AdminModel.update({
                lastLoginAt: new Date()
            }, {
                where: {
                    id: adminId
                }
            })
                .then((result) => {
                    if (result) {
                        cb(null);
                    } else {
                        cb(Constant.DEFAULT_ERROR);
                    }
                })
                .catch((err) => {
                    cb(Constant.DEFAULT_ERROR);
                });
        }]
    }
    Common.autoFn(task, res, resObj)
}
module.exports = {
    login
};