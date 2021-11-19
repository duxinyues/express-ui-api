/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:06:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-16 23:56:52
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
            if (req.body.dropList) {
                cb(null);
            } else {
                Common.checkParams(req.body, ['page', 'rows'], cb);
            }
        },
        query: ['checkParams', (results, cb) => {
            let searchOption;
            if (req.body.dropList) {
                searchOption = {
                    order: [['create_at', 'DESC']]
                }
            } else {
                let offset = req.body.rows * (req.body.page - 1) || 0;
                let limit = parseInt(req.body.rows) || 20;
                let whereCondition = {};
                if (req.body.name) {
                    whereCondition.name = req.body.name;
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
                    console.log("结果", results)
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
                    console.log("分类列表报错", res)
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
    const params = {
        // id: 3,
        name: req.body.name,
        // update_at: new Date().getTime(),
        // create_at: new Date().getTime()
    };
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => {
            Common.checkParams(params, ['name'], cb);
        },
        add: ['checkParams', (results, cb) => {
            CateModel
                .create({
                    // id: 3,
                    name: req.body.name,
                    // update_at: new Date().getTime(),
                    // create_at: new Date().getTime()
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