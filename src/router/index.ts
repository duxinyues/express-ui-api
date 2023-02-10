import { rename } from "fs";
import secret from "../config";
import * as mysql from "mysql2";
import * as jwt from "jsonwebtoken";
import Logger from "../loaders/logger";
import { Message } from "../utils/mes";
import { createHash } from "crypto";
import getFormatDate from "../utils/date";
import { connection } from "../utils/mysql";
import { Request, Response } from "express";
import { createMathExpr } from "svg-captcha";

let path = require("path");

let generateVerify: number; // 保存验证
let expiresIn = 60000; // 过期时间
function verifyToken(req, res) {
  try {
    let accessToken = req.get("Authorization") as string;
    if (accessToken.indexOf("Bearer") >= 0) {
      accessToken = accessToken.replace("Bearer", "");
    }
    jwt.verify(accessToken, secret.jwtSecret);
  } catch (error) {
    res.status(401).end();
    return res.json({ code: 401, mes: "暂无权限" }).end();
  }
}
/**
 * @typedef Error
 * @property {string} code.required
 */

/**
 * @typedef Response
 * @property {[integer]} code
 */

/**
 * @typedef Login
 * @property {string} username.required - 用户名 - eg: admin
 * @property {string} password.required - 密码 - eg: admin123
 */

/**
 * @route POST /login
 * @param {Login.model} point.body.required - the new point
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @summary 登录
 * @group 用户登录、注册相关
 * @returns {Response.model} 200
 * @returns {Array.<Login>} Login
 * @headers {integer} 200.X-Rate-Limit
 * @headers {string} 200.X-Expires-After
 * @security JWT
 */
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let sql: string = `select * from users where username='${username}'`;
  connection.query(sql, async function (err, data: any) {
    if (data.length == 0) {
      await res.json({
        success: false,
        data: { message: Message[1] },
      });
    } else {
      if (
        createHash("md5").update(password).digest("hex") == data[0].password
      ) {
        const accessToken = jwt.sign(
          {
            accountId: data[0].id,
          },
          secret.jwtSecret,
          { expiresIn }
        );
        if (username === "admin") {
          await res.json({
            success: true,
            data: {
              message: Message[2],
              username,
              // 这里模拟角色，根据自己需求修改
              roles: ["admin"],
              accessToken,
              // 这里模拟刷新token，根据自己需求修改
              refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
              expires: new Date(new Date()).getTime() + expiresIn,
            },
          });
        } else {
          await res.json({
            success: true,
            data: {
              message: Message[2],
              username,
              // 这里模拟角色，根据自己需求修改
              roles: ["common"],
              accessToken,
              // 这里模拟刷新token，根据自己需求修改
              refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
              expires: new Date(new Date()).getTime() + expiresIn,
            },
          });
        }
      } else {
        await res.json({
          success: false,
          data: { message: Message[3] },
        });
      }
    }
  });
};
/**
 * @typedef Register
 * @property {string} username.required - 用户名
 * @property {string} password.required - 密码
 */
/**
 * @route POST /register
 * @param {Register.model} point.body.required - the new point
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @summary 注册
 * @group 用户登录、注册相关
 * @returns {Response.model} 200
 * @returns {Array.<Register>} Register
 * @headers {integer} 200.X-Rate-Limit
 * @headers {string} 200.X-Expires-After
 * @security JWT
 */
const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.json({
      success: false,
      data: {
        message: Message[4],
      },
    });
  }

  let sql: string = `select * from users where username='${username}'`;

  connection.query(sql, async (err, data: any) => {
    if (data.length > 0) {
      await res.json({
        success: false,
        data: {
          message: Message[5],
        },
      });
    } else {
      let time = await getFormatDate();
      let sql = `insert into users (username,password,time) value('${username}','${createHash(
        "md5"
      )
        .update(password)
        .digest("hex")}','${time}')`;

      connection.query(sql, async (err) => {
        if (err) {
          Logger.error(err);
        } else {
          await res.json({
            success: true,
            data: {
              message: Message[6],
            },
          });
        }
      });
    }
  });
};
/**
 * @typedef UpdateList
 * @property {string} username.required - 用户名 - eg: admin
 */

/**
 * @route PUT /updateList/{id}
 * @summary 列表更新
 * @param {UpdateList.model} point.body.required - 用户名
 * @param {UpdateList.model} id.path.required - 用户id
 * @group 用户管理相关
 * @returns {object} 200
 * @returns {Array.<UpdateList>} UpdateList
 * @security JWT
 */

const updateList = async (req: Request, res: Response) => {
  console.log("更新", req.body, req.params);
  const { id } = req.params;
  const { username } = req.body;
  verifyToken(req, res);
  let modifySql: string = "UPDATE users SET username = ? WHERE id = ?";
  let sql: string = "select * from users where id=" + id;
  connection.query(sql, function (err, data) {
    connection.query(sql, function (err) {
      if (err) {
        Logger.error(err);
      } else {
        let modifyParams: string[] = [username, id];
        // 改
        connection.query(modifySql, modifyParams, async function (err, result) {
          if (err) {
            Logger.error(err);
          } else {
            await res.json({
              success: true,
              data: { message: Message[7] },
            });
          }
        });
      }
    });
  });
};
/**
 * @typedef SearchPage
 * @property {integer} page.required - 第几页 - eg: 1
 * @property {integer} size.required - 数据量（条）- eg: 5
 */

/**
 * @route POST /searchPage
 * @param {SearchPage.model} point.body.required - the new point
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @summary 分页查询
 * @group 用户管理相关
 * @returns {Response.model} 200
 * @returns {Array.<SearchPage>} SearchPage
 * @headers {integer} 200.X-Rate-Limit
 * @headers {string} 200.X-Expires-After
 * @security JWT
 */

const searchPage = async (req: Request, res: Response) => {
  const { page, size } = req.body;
  verifyToken(req, res);
  let sql: string =
    "select * from users limit " + size + " offset " + size * (page - 1);
  connection.query(sql, async function (err, data) {
    if (err) {
      Logger.error(err);
    } else {
      await res.json({
        success: true,
        data,
      });
    }
  });
};
/**
 * @typedef SearchVague
 * @property {string} username.required - 用户名  - eg: admin
 */

/**
 * @route POST /searchVague
 * @param {SearchVague.model} point.body.required - the new point
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @summary 模糊查询
 * @group 用户管理相关
 * @returns {Response.model} 200
 * @returns {Array.<SearchVague>} SearchVague
 * @headers {integer} 200.X-Rate-Limit
 * @headers {string} 200.X-Expires-After
 * @security JWT
 */

const searchVague = async (req: Request, res: Response) => {
  console.log("模糊查询", req.body);
  const { username } = req.body;
  verifyToken(req, res);
  if (username === "" || username === null)
    return res.json({
      success: false,
      data: { message: Message[9] },
    });
  let sql: string = "select * from users";
  sql += " WHERE username LIKE " + mysql.escape("%" + username + "%");
  connection.query(sql, function (err, data) {
    connection.query(sql, async function (err) {
      if (err) {
        Logger.error(err);
      } else {
        await res.json({
          success: true,
          data,
        });
      }
    });
  });
};
// 多文件上传
const upload = async (req: any, res: Response) => {
  // 文件存放地址
  const des_filesPath = "./public/uploads/";
  let filesLength: number = req.files.length;
  let result = [];
  let filesInfo: any = {};
  if (filesLength === 0) {
    res.render("error", { mes: "文件不能为空" });
    return;
  }
  req.files.forEach((element) => {
    rename(
      des_filesPath + element.filename,
      des_filesPath + element.originalname,
      (err) => {
        if (err) {
          console.log("文件重名错误", err);
        }
      }
    );
    filesInfo.mimetype = element.mimetype;
    filesInfo.originalname = element.originalname;
    filesInfo.size = element.size;
    filesInfo.path = des_filesPath + element.originalname;
    result.push(filesInfo);
  });

  console.log("结果", result);
  res.set({ "content-type": "application/json;charset=uft-8" });
  res.send({
    success: true,
    mes: "上传成功",
    data: result,
  });
};
export { login, register, updateList, searchPage, searchVague, upload };
