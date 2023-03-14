/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-02-17 20:37:49
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-03-14 21:48:00
 * @FilePath: \api\src\app.ts
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
 */
import * as express from "express";
import * as expressWs from "express-ws";
import * as bodyParser from "body-parser";

class App {
  public app;
  constructor() {
    this.app = express();
    this.config();
  }
  private config(): void {
    // 支持WebSocket
    expressWs(this.app);

    // 支持JSON编码主体
    this.app.use(bodyParser.json());

    // 支持编码的主体
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    // 设置静态访问目录，比如Swagger
    this.app.use(express.static("public"));
    // 设置跨域访问
    this.app.all("*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By", " 3.2.1");
      res.header("Content-Type", "application/json;charset=utf-8");
      next();
    });
  }
}

export default new App().app;
