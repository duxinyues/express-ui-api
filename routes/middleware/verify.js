/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 00:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 00:48:49
 * @Description: 验证token的中间件
 */

const Token = require("../../controllers/token");
const Constant = require("../../constant/constant");
const exportObj = {
    verifyToken
}
function verifyToken(req, res, next) {
    if(req.path === '/login') return next();
    let token = req.headers.token;
    let tokenVerifyObj =Token.decrypt(token);
    if(tokenVerifyObj.token){
        next()
    }else{
        res.json(Constant.TOKEN_ERROR)
    }
}
module.exports = exportObj
