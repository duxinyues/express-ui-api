import app from "./app";
import config from "./config";
import { user } from "./models/mysql";
import Logger from "./loaders/logger";
import {queryTable}  from "./utils/mysql";
import { login,register } from "./router";
const expressSwagger = require("express-swagger-generator")(app);

expressSwagger(config.options);
// queryTable(user);

app.post("/login",(req,res)=>{
    login(req,res)
})
app.post("/register",(req,res)=>{
    register(req,res)
})
app
  .listen(config.port, () => {
    Logger.info(`
    ################################################
    🛡️  Swagger文档地址: http://localhost:${config.port} 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    Logger.error(err);
    process.exit(1);
  });