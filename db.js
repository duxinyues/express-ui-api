/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 01:05:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 01:18:59
 * @Description: 数据库对象实例化
 */
const Sequelize = require('sequelize');
const CONFIG = require('./config');
const sequelize = new Sequelize(
    CONFIG.MYSQL.database,
    CONFIG.MYSQL.username,
    CONFIG.MYSQL.password, {
    host: CONFIG.MYSQL.host,
    dialect: 'mysql',
    logging: CONFIG.DEBUG ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00'
}
);

module.exports = sequelize