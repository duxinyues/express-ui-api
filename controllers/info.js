/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:36:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 22:33:18
 * @Description: 文件描述
 */
const Common = require('./common');
const InfoModel = require('../models/info');
const Constant = require("../constant/constant");
const dateFormat = require('dateformat');

let info = (req, res) => {
    console.log("req", req);
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        query: (cb) => {
            InfoModel
                .findByPk(1)
                .then((result) => {
                    if (result) {
                        resObj.data = {
                            id: result.id,
                            title: result.title,
                            subtitle: result.subtitle,
                            about: result.about,
                            createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss'),
                        }
                        cb(null)
                    } else {
                        cb('blog info not exsit');
                    }
                })
                .catch((err) => {
                    cb(Constant.DEFAULT_ERROR);
                })
        }
    };
    Common.autoFn(tasks, res, resObj)
};
let update = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        update: cb => {
            InfoModel
                .update({
                    title: req.body.title,
                    subtitle: req.body.subtitle,
                    about: req.body.about
                }, {
                    where: {
                        id: 1
                    }
                })
                .then(result => {
                    if (result[0]) {
                        cb(null);
                    } else {
                        cb('blog info not exsit222');
                    }
                })
                .catch(err => {
                    cb(Constant.DEFAULT_ERROR);
                })
        }
    };

    Common.autoFn(tasks, res, resObj);
}
module.exports = {
    info,
    update
}