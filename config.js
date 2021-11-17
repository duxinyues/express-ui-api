/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-17 22:42:36
 * @Description: 文件描述
 */
const mysql = require("mysql");
const config = {
    database: 'blog',
    username: 'root',
    password: '1234567',
    host: 'localhost',
    port: 3306
}
const pool = mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database
})
//开始连接数据库
pool.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err);
    }
    console.log('[pool connect]  succeed!');
});

module.exports = pool;