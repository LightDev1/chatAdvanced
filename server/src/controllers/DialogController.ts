import express from 'express';

import { io } from '../index';
import { Dialog, Message } from '../models';
import { DialogModelInterface } from '../models/Dialog';

class DialogController {
    index(req: express.Request, res: express.Response) {
        const userId: any = req.user._id

        Dialog
            .find()
            .or([{ author: userId }, { partner: userId }])
            .populate(['author', 'partner', 'lastMessage'])
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'user',
                }
            })
            .exec((error, dialogs: DialogModelInterface[]) => {
                if (error) {
                    return res.status(404).json({
                        message: 'Диалог не найден'
                    });
                }
                return res.json(dialogs);
            });
    }

    // show(req: express.Request, res: express.Response) {
    //     const id: string = req.params.id;

    //     Dialog.findById(id, (error: any, user: UserModelInterface) => {
    //         if (error) {
    //             return res.status(404).json({
    //                 message: 'Пользователь не найден'
    //             });
    //         }
    //         res.json(user);
    //     });
    // }

    create(req: express.Request, res: express.Response) {
        const postData = {
            author: req.user._id,
            partner: req.body.partner,
        };

        const dialog = new Dialog(postData);

        dialog.save().then((dialogObj: any) => {
            console.log('Диалог был создан');

            const message = new Message({
                dialog: dialogObj._id,
                text: req.body.text,
                user: req.user._id,
            });

            message.save().then(() => {
                dialogObj.lastMessage = message._id;

                dialogObj.save().then(() => {
                    res.json({
                        dialog: dialogObj,
                    });

                    io.emit('SERVER:DIALOG_CREATED', {
                        ...postData,
                        dialog: dialogObj,
                    });
                });
            }).catch((error: any) => {
                console.log(error);
                res.json(error);
            });

        }).catch((error: any) => {
            console.log(error);
            res.json(error);
        });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        Dialog.findOneAndRemove({ _id: id })
            .then((dialog) => {
                if (!dialog) {
                    return res.status(404).json({
                        message: 'Диалог не найден'
                    });
                }
                res.json({ message: `Диалог был удален` });
            }).catch((e: any) => {
                res.status(500).json(e);
            });
    }
}

const dialogCtrl = new DialogController();

export default dialogCtrl;