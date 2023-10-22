/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-10-22 21:47:25
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-10-22 22:27:53
 * @FilePath: /node/os.js
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
const os = require('os');

console.log("剩余内存：", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("总内容：", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log(os.networkInterfaces()); //网络信息
console.log(os.homedir()) //当前用户的目录
console.log(os.tmpdir()); // 临时目录
console.log("主机名称：",os.hostname());
console.log("系统类型：",os.type());
console.log("操作系统名：",os.platform());
console.log("CPU：",os.arch());
console.log("操作系统发行版本：",os.release());
console.log("操作系统内核版本：",os.version());
console.log("cpu内核信息",os.cpus());
console.log("操作系统运行时间",os.uptime());
console.log("进程调度优先级：",os.getPriority(47156));
console.log("设置进程调度优先级：",os.setPriority(47156,10));