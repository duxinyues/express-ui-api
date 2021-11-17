// /*
//  * @Author: yongyuan253015@gmail.com
//  * @Date: 2021-11-14 01:19:56
//  * @LastEditors: Please set LastEditors
//  * @LastEditTime: 2021-11-15 00:14:34
//  * @Description: 文章 model
//  */
// const Sequelize = require('sequelize');
// const CateModel = require('./cate');
// const db = require('../db');

// const Article = db.define('Article', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     title: {
//         type: Sequelize.STRING(30),
//         allowNull: false,
//     },
//     decs: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     content: {
//         type: Sequelize.TEXT, allowNull: false
//     },
//     cate: {
//         type: Sequelize.INTEGER, allowNull: false
//     }
// }, {
//     underscored: true,
//     tableName: 'article',
// })


// module.exports = Article;

// // 文章关联所属分类
// Article.belongsTo(CateModel, { foreignKey: 'cate', constraints: false })