/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:06:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 23:51:20
 * @Description: cateController
 */
const Common = require("./common");
const CateModel = require("../models/cate");
const Constant = require("../constant/constant");
const dateFormat = require('dateformat');

const list = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => {
            if (req.query.dropList) {
                cb(null);
            } else {
                Common.checkParams(req.query, ['page', 'rows'], cb);
            }
        },
        query: ['checkParams', (results, cb) => {
            let searchOption;
            if (req.query.dropList) {
                searchOption = {
                    order: [['create_at', 'DESC']]
                }
            } else {
                let offset = req.query.rows * (req.query.page - 1) || 0;
                let limit = parseInt(req.query.rows) || 20;
                let whereCondition = {};
                if (req.query.name) {
                    whereCondition.name = req.query.name;
                }

                searchOption = {
                    where: whereCondition,
                    offset: offset,
                    limit: limit,
                    order: [['create_at', 'DESC']]
                }
            }

            CateModel
                .findAndCountAll(searchOption)
                .then((results) => {
                    let list = [];
                    results.rows.forEach((value, index) => {
                        let object = {
                            id: value.id,
                            name: value.name,
                            createdAt: dateFormat(value.createdAt, 'yyyy-mm-dd HH:MM:ss')
                        }
                        list.push(object)
                    });
                    resObj.data = {
                        list,
                        count: results.count
                    };
                    cb(null);
                })
                .catch((err) => {
                    cb(Constant.DEFAULT_ERROR)
                });
        }]
    };
    Common.autoFn(tasks, res, resObj);
}
const info = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => {
            Common.checkParams(req.params, ['id'], cb);
        },
        query: ['checkParams', (results, cb) => {
            CateModel
                .findByPk(req.params.id)
                .then((result) => {
                    if (result) {
                        resObj.data = {
                            id: result.id,
                            name: result.name,
                            createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
                        }

                        cb(null);
                    } else {
                        cb("cate not exsit")
                    }
                })
                .catch((err) => {
                    cb(Constant.DEFAULT_ERROR);
                })
        }]
    }
    Common.autoFn(tasks, res, resObj);
}
const add = (req, res) => {
    const resObj = Common.clone(COnstant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => {
            Common.checkParams(req.body, ['name'], cb);
        },
        add: ['checkParams', (results, cb) => {
            CateModel
                .create({
                    name: req.body.name
                })
                .then(result => {
                    console.log('插入分类的处理结果', result);
                    cb(null);
                })
                .catch(err => {
                    console.log(err);
                    cb(Constant.DEFAULT_ERROR);
                })
        }]
    }

    Common.autoFn(tasks, res, resObj)
}
const update = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => {
            Common.checkParams(req.body, ['id', 'name'], cb);
        },
        update: ['checkParams', (results, cb) => {
            CateModel
                .update({
                    name: req.body.name
                }, {
                    where: {
                        id: res.body.id
                    }
                })
                .then(results => {
                    if (results[0]) {
                        cb(null);
                    } else {
                        console.log("分类更新失败");
                        cb("cate not exsit")
                    }
                })
        }]
    }
    Common.autoFn(tasks, res, resObj);
}
const remove = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => {
            Common.checkParams(req.body, ['id'], cb);
        },
        remove: ['checkParams', (results, cb) => {
            CateModel
                .destroy({
                    where: {
                        id: req.body.id
                    }
                })
                .then(function (result) {
                    if (result) {
                        cb(null);
                    } else {
                        cb("cate not  exsit");
                    }
                })
                .catch(err => {
                    cb(Constant.DEFAULT_ERROR);
                })
        }]
    }
    Common.autoFn(tasks, res, resObj);
}

module.exports = {
    list,
    info,
    add,
    update,
    remove
}