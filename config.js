/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: 
 * @LastEditTime: 2021-09-19 17:43:17
 * @Description: 文件描述
 */
const mysql = require("mysql");
const config = {
    MYSQL: {
        database: 'blog',
        username: 'root',
        password: '1234567',
        host: 'localhost',
        port: 3306
    },
}
const pool = mysql.createPool({
    host: config.MYSQL.host,
    port: config.MYSQL.port,
    user: config.MYSQL.username,
    password: config.MYSQL.password,
    database: config.MYSQL.database
})
module.exports = pool;