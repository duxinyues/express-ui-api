/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 01:20:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 02:46:20
 * @Description: 文件描述
 */
const Sequelize = require('sequelize');
const db = require('../db');

const Admin = db.define('Admin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    password: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    name: {
        type: Sequelize.INTEGER, allowNull: false
    },
    role: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    lastLoginAt: {
        type: Sequelize.DATE,
    }
}, {
    underscored: true,
    tableName: 'admin'
})