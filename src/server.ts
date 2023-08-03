/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-05-06 23:40:43
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-03 23:06:52
 * @FilePath: /node/src/server.ts
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import app from "./app";
import config from "./config";
import { user } from "./models/mysql";
import Logger from "./loaders/logger";
import { queryTable } from "./utils/mysql";
import * as multer from "multer";
import {
  login,
  register,
  updateList,
  searchPage,
  searchVague,
  upload,
} from "./router";
import { download } from "./router/download";
import { viewBytes } from "./router/bytes"
// const expressSwagger = require("express-swagger-generator")(app);

// expressSwagger(config.options);
// queryTable(user);
app.get("/", (req, res) => {
  res.send(200);
});
app.post("/login", (req, res) => {
  login(req, res);
});
app.post("/register", (req, res) => {
  register(req, res);
});
app.put("/updateList/:id", (req, res) => {
  updateList(req, res);
});
app.post("/searchPage", (req, res) => {
  searchPage(req, res);
});
app.post("/searchVague", (req, res) => {
  searchVague(req, res);
});
// 新建存放临时文件的文件夹
const upload_tmp = multer({ dest: "./public/uploads" });
app.post("/upload", upload_tmp.any(), (req, res) => {
  upload(req, res);
});

app.post("/imageView/reviewImage", upload_tmp.any(), (req, res) => {
  res.header("Content-Type", "application/json;charset=utf-8")
  viewBytes(req, res);
});
app.listen(8098, () => {
  Logger.info(`
    ################################################
    🛡️ 文档地址: http://localhost:8098/ 🛡️
    ################################################
  `);
}).on("error", (err) => {
  Logger.error(err);
  process.exit(1);
});
