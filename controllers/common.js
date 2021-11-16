/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-10-02 17:07:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-16 23:25:08
 * @Description: 公共方法文件
 */
const async = require("async");
const Constant = require("../constant/constant"); // 常量模块
const exportObj = {
    clone,
    checkParams,
    autoFn
}

/**
 *  克隆方法、对象
 * @param {*} obj 
 */
function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}
/**
 *  校验参数全局方法
 * @param {*} params   请求参数
 * @param {*} checkArr   需要验证的参数
 * @param {*} cb   回调
 */
function checkParams(params, checkArr, cb) {
    console.log("params",params)
    let flag = true;
    checkArr.forEach(key => {
        if (!params[key]) {
            flag = false;
        }
    });

    if (flag) {
        cb(null);
    } else {
        cb(Constant.LACK)
    }
}
/**
 *   返回JSON格式数据
 * @param {*} tasks    执行当前的controller
 * @param {*} res   当前controller  response
 * @param {*} resobj    当前controller返回json对象
 */
function autoFn(tasks, res, resobj) {
    async.auto(tasks, function (err) {
        if (!!err) {
            res.json({
                code: err.code || Constant.DEFAULT_ERROR.code,
                msg: err.msg || JSON.stringify(err)
            });
        } else {
            res.json(resobj)
        }
    })
}


module.exports = exportObj;