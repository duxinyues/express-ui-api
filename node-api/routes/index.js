var express = require('express');
const Constant = require("../constant/constant");
const dateFormat = require("dateformat");
const token = require("../controllers/token");
const pool = require("../config");
const Common = require("../controllers/common");
const TOKEN_EXPIER_SENCOND = 3600;
var router = express.Router();
/* GET home page. */
router.get('/login', function (req, res) {

  //定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  //查询
  const sql = "SELECT * FROM admin1"
  // const sql = "SELECT * FROM admin  where username=" + JSON.stringify(req.query.username) + " limit 1"
  // + req.query.username;
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log("mysql链接失败")
    } else {
      console.log("mysql链接成功！")
      connection.query(sql, function (err, results) {
        if (err) {
          console.log(err)
        } else {
          const result = JSON.parse(JSON.stringify(results));
          //将admin的id保存在token
          const adminInfo = {
            id: result[0].id
          };
          //生成token
          let tokens = token.encrypt(adminInfo, TOKEN_EXPIER_SENCOND);
          console.log(result)
          // resObj.data.id = result[0].id;
          resObj.data = {
            id: result[0].id,
            username: result[0].username,
            name: result[0].name,
            role: result[0].role,
            token: tokens,
            lastLoginAt: dateFormat(result[0].last_login_at, 'yyyy-mm-dd HH:MM:ss'),
            createdAt: dateFormat(result[0].created_at, 'yyyy-mm-dd HH:MM:ss'),
            updateAt: dateFormat(result[0].updated_at, 'yyyy-mm-dd HH:MM:ss'),
          };
          res.send(resObj)
        }
      })
    }
  })
});

module.exports = router;
