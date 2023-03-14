/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-01-14 20:50:22
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-03-14 20:37:35
 * @FilePath: \api\src\models\mysql\index.ts
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
 */
/** 创建用户表 */
const user =
  "CREATE TABLE if not EXISTS users(id int PRIMARY key auto_increment,username varchar(32),password varchar(32),time DATETIME,rule varchar(32))";

export { user };