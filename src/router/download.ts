import { readdir, stat, readdirSync, statSync, readFileSync } from "fs";

import { Request, Response } from "express";
const regex = {
    img: /\.(jpg|png|gif|bmp|jpeg)$/
}
let path = require("path");

export const download = async (req: Request, res: Response) => {
    console.log("文件预览", req)
    const { url } = req.body;
    if (!url) {
        return res.send({
            success: false,
            mes: "url参数不能为空！",
        })
    }
    // 读取path目录下的所有文件，
    let filePath = path.resolve(url);
    const imgData = readFileSync(filePath)
    console.log("imgData", imgData)
    res.send({
        success: true,
        mes: "成功扫描文件夹",
        data: imgData
    })
    // 同步扫描文件夹
    // function fileDisplay(filePath: string) {

    //     // readdir(filePath, function (err, file: []) {
    //     //     if (err) {
    //     //         console.log("err：", err)
    //     //     }
    //     //     file.forEach(fileName => {
    //     //         let fileDir = path.join(filePath, fileName)
    //     //         stat(fileDir, function (err, stat) {
    //     //             if (err) {
    //     //                 console.error("读取文件失败");
    //     //                 return;
    //     //             }

    //     //             if (stat.isFile()) {
    //     //                 console.log("这是一个文件", fileDir);
    //     //                 dirPath.push(fileDir)
    //     //                 return;
    //     //             }

    //     //             if (stat.isDirectory()) {
    //     //                 console.log("这是一个文件夹")
    //     //                 fileDisplay(fileDir);
    //     //             }
    //     //         })
    //     //     })
    //     // })
    // }



}