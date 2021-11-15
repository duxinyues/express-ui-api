/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:37:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 23:06:00
 * @Description: 管理员列表接口
 */
const Common = require('./common');
const AdminModel = require('../models/admin');
const Constant = require("../constant/constant");
const dateFormat = require("dateformat");
let list = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => { Common.checkParams(req.query, ['page', 'rows'], cb); },
        query: ['checkParams', (results, cb) => {
            let offset = req.query.rows * (req.query.page - 1) || 0;
            let limit = parseInt(req.query.rows) || 20;
            let whereCondition = {}; // 设置一个查询条件
            if (req.query.username) {
                whereCondition.username = req.query.username;
            }
            AdminModel
                .findAndCountAll({
                    where: whereCondition,
                    offset: offset,
                    limit: limit,
                    order: [['create_at', 'DESC']]
                })
                .then((results) => {
                    let list = [];
                    results.rows.forEach((value, index) => {
                        let obj = {
                            id: value.id,
                            username: value.username,
                            name: value.name,
                            role: value.role,
                            lastLoginAt: dateFormat(value.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
                            createdAt: dateFormat(value.createdAt, 'yyyy-mm-dd HH:MM:ss')
                        };
                        list.push(obj);
                    });

                    resObj.data = {
                        list,
                        count: results.count
                    };
                    cb(null);
                })
                .catch(err => {
                    cb(Constant.DEFAULT_ERROR)
                })
        }]
    };
    Common.autoFn(tasks, res, resObj);
};
let info = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => { Common.checkParams(req.params, ['id'], cb); },
        query: ['checkParams', (results, cb) => {
            AdminModel
                .findByPk(req.params.id)
                .then((results) => {
                    if (results) {
                        resObj.data = {
                            id: results.id,
                            name: results.name,
                            userName: results.userName,
                            role: results.role,
                            lastLoginAt: dateFormat(results.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
                            createdAt: dateFormat(results.createdAt, 'yyyy-mm-dd HH:MM:ss')
                        };
                        cb(null);
                    } else {
                        cb('admin not exsit')
                    }
                })
                .catch(err => {
                    cb(Constant.DEFAULT_ERROR)
                })
        }]
    };
    Common.autoFn(tasks, res, resObj);
};
let add = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => { Common.checkParams(req.body, ['name', 'username', 'password', 'role'], cb); },
        query: ['checkParams', (results, cb) => {
            AdminModel
                .create({
                    username: req.body.userName,
                    password: req.body.password,
                    name: req.body.name,
                    role: req.body.role
                })
                .then((results) => {
                    cb(null);
                })
                .catch(err => {
                    cb(Constant.DEFAULT_ERROR)
                })
        }]
    };
    Common.autoFn(tasks, res, resObj);
};
let update = (req, res) => { };
let remove = (req, res) => { };
module.exports = {
    list,
    info,
    add,
    update,
    remove
}