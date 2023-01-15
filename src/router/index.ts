import fs from "fs";
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

let generateVerify: number; // 保存验证
let expiresIn = 60000; // 过期时间
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
  let sql: string =
  `select * from users where username='${username}'`;
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
  console.log("000",req.body)
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
  console.log("更新",req.body,req.params)
  const { id } = req.params;
  const { username } = req.body;
  let payload = null;
  try {
    const authorizationHeader = req.get("Authorization") as string;
    const accessToken = authorizationHeader.substr("Bearer ".length);
    payload = jwt.verify(accessToken, secret.jwtSecret);
  } catch (error) {
    return res.status(401).end();
  }
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

export { login, register,updateList };
