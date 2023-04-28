import { createReadStream } from "fs";

import { Request, Response } from "express";
let path = require("path");

export const download = async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
        return res.send({
            success: false,
            mes: "url参数不能为空！",
        })
    }
    // 读取path目录下的所有文件，
    let filePath = path.resolve(url);
    const pdfStream = createReadStream(filePath);
    pdfStream.on("close", () => {
        res.end();
    })
    pdfStream.pipe(res)
}