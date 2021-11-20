/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:36:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 00:51:07
 * @Description: 文件描述
 */
const Common = require('./common');
const ArticleMOdel = require('../models/article');
const CateModel = require('../models/cate');
const Constant = require("../constant/constant");
const dateFormat = require('dateformat');

let list = (res, req) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => { Common.checkParams(req.body, ['page', 'rows'], cb) },
        query: ['checkParams', (res, cb) => {
            let offset = req.body.rows * (req.body.page - 1) || 0;
            let limit = parseInt(req.query.rows) || 20;
            let whereCondition = {}; // 查询条件
            if (req.body.title) {
                whereCondition.title = req.body.title;
            }

            ArticleMOdel
                .findAndCountAll({
                    where: whereCondition,
                    offset: offset,
                    limit: limit,
                    order: [['create_at', 'DESC']],
                    include: [{
                        model: CateModel
                    }]
                })
                .then((result) => {
                    let list = [];
                    result.rows.forEach((value, index) => {
                        let obj = {
                            id: value.id,
                            title: value.title,
                            desc: value.desc.substr(0, 20) + '...',
                            cate: value.cate,
                            cateName: value.Cate.name,
                            content: value.content,
                            createAt: dateFormat(value.createAt, 'yyyy-mm-dd HH:MM:ss')
                        };
                        list.push(obj)
                    });
                    resObj.data = {
                        list,
                        count: result.count
                    };
                    cb(null);
                })
                .catch((err) => {
                    cb(Constant.DEFAULT_ERROR)
                })
        }]
    };
    Common.autoFn(tasks, res, resObj);
};
let info = (res, req) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => { Common.checkParams(req.params, ['id'], cb) },
        query: ['checkParams', (results, cb) => {
            ArticleMOdel
                .findByPk(req.params.id, {
                    include: [{
                        model: CateModel
                    }]
                })
                .then((res) => {
                    if (res) {
                        res.data = {
                            id: res.id,
                            name: res.name,
                            desc: res.desc,
                            content: res.content,
                            cate: res.cate,
                            cateName: res.Cate.name,
                            createAt: dateFormat(res.createAt, 'yyyy-mm-dd HH:MM:ss')
                        };
                        cb(null);
                    } else {
                        cb('article not exsit');
                    }
                })
                .catch(err => {
                    cb(Constant.DEFAULT_ERROR);
                })
        }]
    };

    Common.autoFn(tasks, res, resObj);
};
let add = (res, req) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let task = {
        checkParams: (cb) => { Common.checkParams(req.body, ['title', 'cate', 'desc', 'content'], cb); },
        add: ['checkParams', (results, cb) => {
            ArticleMOdel
                .create({
                    title: req.body.title,
                    desc: req.body.desc,
                    content: req.body.content,
                    cate: req.body.cate,
                })
                .then(() => {
                    cb(null)
                })
                .catch(err => {
                    cb(COnstant.DEFAULT_ERROR)
                });
        }]
    };
    Common.autoFn(task, res, resObj)
};
let update = (res, req) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => { Common.checkParams(req.body, ['id', 'title', 'cate', 'desc', 'content'], cb); },
        update: ['checkParams', (results, cb) => {
            ArticleMOdel
                .update({
                    title: req.body.title,
                    desc: req.body.desc,
                    content: req.body.content,
                    cate: req.body.cate,
                }, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(res => {
                    if (res[0]) {
                        cb(null);
                    } else {
                        cb("article not  exsit");
                    }
                })
                .catch(err => {
                    console.log(err)
                    cb(Constant.DEFAULT_ERROR);
                })
        }]
    }
    Common.autoFn(tasks, res, resObj);
};
let remove = (res, req) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => { Common.checkParams(req.body, ['id'], cb) },
        remove: ['checkParams', (results, cb) => {
            ArticleMOdel
            .destroy({
                where: { id: req.body.id}
            })
            .then(res =>{
                if(res){
                    cb(null);
                }else{
                    cb('article not  exsit');
                }
            })
            .catch(err=>{
                console.log(err);
                cb(Constant.DEFAULT_ERROR);
            });
         }]
    };
    Common.autoFn(tasks, res, resObj);
};
module.exports = {
    list,
    info,
    add,
    update,
    remove
}