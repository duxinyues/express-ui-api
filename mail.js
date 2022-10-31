/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2022-10-31 21:20:48
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2022-10-31 21:22:30
 * @FilePath: \express-ui-api\mail.js
 * @Description: 
 * Copyright (c) 2022 by duxinyues email: yongyuan253015@gmail.com, All Rights Reserved.
 */
const nodemailer = require("nodemailer");
const mailTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "",
        password: '',
    }
})