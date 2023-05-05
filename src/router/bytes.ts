/**
 * 读取字节流
 */
import { readFileSync } from "fs";
import { Request, Response } from "express";
import { Buffer } from "buffer";
import {decode} from "iconv-lite"
let path = require("path");

export const viewBytes = async (req: Request, res: Response) => {
    res.setHeader("Content-type","image/png")
    const { url } = req.body;
    if (!url) {
        return res.send({
            success: false,
            mes: "url参数不能为空！",
        })
    }
    // 读取path目录下的所有文件，
    let filePath = path.resolve(url);
    const pdfStream = readFileSync(filePath, {encoding:'binary'});
    console.log("文件",pdfStream)
    const buf = Buffer.from(pdfStream,"binary")
    res.send({
        success: true,
        mes: "影像件解密成功！",
        data:pdfStream,
    });
}