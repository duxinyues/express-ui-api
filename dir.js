/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-10-22 21:07:43
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-10-22 21:17:29
 * @FilePath: /node/dir.js
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
const fs = require("fs");
// fs.mkdir("./src/add", (err) => {
//   console.log(err)
// })


fs.readdir("src", (err, data) => {
  if (err) return;
  console.log(data)
})