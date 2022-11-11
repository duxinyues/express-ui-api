/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2022-11-10 09:03:03
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2022-11-11 16:24:41
 * @FilePath: \express-ui-api\ws.js
 * @Description: 
 * Copyright (c) 2022 by duxinyues email: yongyuan253015@gmail.com, All Rights Reserved.
 */
const express = require("express");
const http = require("http");
const Ws = require("ws").Server;
const app = express();

const server = http.createServer(app);

server.listen(3000);
app.use(express.static('www'));

let wsServer = new Ws({server});

wsServer.on("connection",function(socket){
    console.log("连接成功");
    socket.on("message",msg=>{
        console.log("客户端信息",msg)
        socket.send("客户端发送的信息："+msg+","+new Date().getTime())
    })
})