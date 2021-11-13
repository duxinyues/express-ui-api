/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 01:20:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 02:40:39
 * @Description: 文件描述
 */
const Sequelize = require('sequelize');
const db = require('../db');
const Info = db.define('Info', {
    id: {
        type: Sequelize.INTEGER, primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    // 博客名称
    title: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    subtitle: {
        type: Sequelize.TEXT,
        allowNull: false
    },
}, {
    underscored: true,
    tableName: 'info'
});

module.exports = Info;