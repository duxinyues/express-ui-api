/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2022-10-23 13:07:19
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2022-10-23 14:08:13
 * @FilePath: \express-ui-api\db.js
 * @Description: 连接数据库
 * Copyright (c) 2022 by duxinyues email: yongyuan253015@gmail.com, All Rights Reserved.
 */

const Sequelize = require("sequelize");
const db_name = "blog";
const username = "root";
const password = "123456";
const sequelize = new Sequelize(db_name, username, password, {
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
    }
});

class Content extends Sequelize.Model { };

Content.init({
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    url: Sequelize.STRING,
    alexa: Sequelize.BIGINT,
}, {
    sequelize,
    timestamps: false,
    tableName: 'content'
});

const data = [{
    name: "百度",
    url: "https://baidu.com",
    alexa: 200
}];
data.forEach((item)=>{
    Content.create(item).then(res => {
        console.log("插入数据成功", res.id)
    }).catch(err => {
        console.log("插入数据失败", err)
    })
})

// sequelize.authenticate().then(() => {
//     console.log("数据库连接成功");
// }).catch(err => {
//     console.log("连接失败：", err)
// })