import express from 'express';

import cloudinary from '../core/uploader';
import { UploadedFile } from '../models';

class UploadFileController {
    create(req: express.Request, res: express.Response) {
        const file = req.file;
        const userId = req.user._id;

        cloudinary.uploader.upload_stream({ resource_type: "auto" }, (err, result) => {
            if (err || !result) {
                return res.status(500).json({
                    status: 'error',
                    message: err || 'Ошибка загрузки',
                });
            }

            const fileData = {
                filename: result.original_filename,
                size: Math.round(result.bytes / 1024),
                ext: result.format,
                url: result.url,
                user: userId,
            };

            const uploadFile = new UploadedFile(fileData);

            uploadFile.save().then((fileObj: any) => {
                res.json({
                    status: 'success',
                    file: fileObj,
                });
            }).catch((err) => {
                res.json({
                    status: 'error',
                    file: err,
                });
            });
        }).end(file?.buffer);
    }

    delete(req: express.Request, res: express.Response) {

    }
}

const uploadFileCtrl = new UploadFileController();

export default uploadFileCtrl;