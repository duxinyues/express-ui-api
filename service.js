/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-10-23 23:57:23
 * @LastEditors: weiyy26445 weiyy26445@yunrong.cn
 * @LastEditTime: 2023-10-24 12:48:07
 * @FilePath: /node/service.js
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
 */
const fs = require("fs");
const http = require("http");
const Ws = require("ws").Server;

const service = http.createServer((request, response) => {
  if (request.url == '/') {
    fs.readFile("./index.html", (err, data) => {
      if (err) { return };
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    });
  }
})
service.listen(34421, () => {
  console.log("监听地址：http://127.0.0.1:34421")
})

let wsServer = new Ws({ server: service });
wsServer.on("connection", function (socket) {
  console.log("连接成功");
  socket.on("message", msg => {
    console.log("客户端信息", msg)
    socket.send("客户端发送的信息：" + msg + "," + new Date().getTime())
  })
})
