/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-10-19 23:39:54
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-10-22 21:02:07
 * @FilePath: /node/fs.js
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */

const fs = require('fs');

fs.access("./build.json", fs.constants.w_OK, (err) => {
   if (err) {
      console.log("文件不存在", err);
      return;
   }

   console.log("文件存在")
})

fs.readFile("./build.json", "ascii", (err, data) => {
   if (err) {
      console.log(err)
      return;
   }

   console.log("文件内容：", data);

   fs.writeFile("test.json", JSON.stringify({
      data,
      name: "duxin"
   }), "utf-8", (err) => {
      if (err) {
         throw error
      }

      console.log("异步写入文件完成")
   })
})


fs.appendFile("test.json","添加测试内容",(err)=>{
   if(err){
      return;
   }
   console.log("添加完成")
})

fs.stat("./test.json",(err,data)=>{
   if(err){
      console.log("文件错了",err)
   }
   console.log(`文件大小：${data.size}字节`)
})

fs.unlink("./test.json",(err)=>{
   if(err){
      console.log("文件删除报错了")
   }

   console.log("文件删除成功")
})

fs.copyFile("fs.js","test.js",(err)=>{
   if(err){
      console.log("文件复制失败");

      return;
   }

   console.log("文件复制成功！")
})