import * as mysql from "mysql2";
import mysqlConfig from "../config";
import Logger from "../loaders/logger";

/** user数据库 */
let connection = mysql.createConnection(
  Object.assign({ database: "blogs" }, mysqlConfig.mysql)
);

connection.connect();
connection.on("error",(err)=>{
  console.log("数据库连接错误",err);
  // 重新连接
  connection = mysql.createConnection(Object.assign({ database: "blogs" }, mysqlConfig.mysql))
})

function queryTable(s: string): void {
  connection.query(s, (err) => {
    err ? Logger.error(err) : Logger.info(`${s}表创建成功`);
  });
}

export { connection, queryTable };
