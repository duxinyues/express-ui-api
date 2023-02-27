/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-02-17 20:37:30
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-02-27 23:15:42
 * @FilePath: \api\src\server.ts
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
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
const expressSwagger = require("express-swagger-generator")(app);

expressSwagger(config.options);
queryTable(user);

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
app
  .listen(8098, () => {
    Logger.info(`
    ################################################
    🛡️ 文档地址: http://47.108.65.133:8098/ 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    Logger.error(err);
    process.exit(1);
  });
