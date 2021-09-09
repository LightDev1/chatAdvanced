import express from 'express';
import { Message, Dialog } from '../models';
import { io } from '../index';
import { MessageModelInterface } from '../models/Message';

class MessageController {
    index(req: express.Request, res: express.Response) {
        const dialogId: any = req.query.dialog;
        const userId: any = req.user._id;

        Message.updateMany(
            { 'dialog': dialogId, 'user': { $ne: userId } },
            // @ts-ignore
            { $set: { 'read': true } },
            (err: any) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        status: "error",
                        message: err
                    });
                }
            }
        );

        Message
            .find({ dialog: dialogId })
            .populate(['dialog', 'user', 'attachments'])
            .exec((error, messages: MessageModelInterface[]) => {
                if (error) {
                    return res.status(404).json({
                        message: 'Сообщение не найдено'
                    });
                }
                return res.json(messages);
            });
    }

    // show(req: express.Request, res: express.Response) {
    //     const id: string = req.params.id;

    //     Message.findById(id, (error: any, user: UserModelInterface) => {
    //         if (error) {
    //             return res.status(404).json({
    //                 message: 'Пользователь не найден'
    //             });
    //         }
    //         res.json(user);
    //     });
    // }

    create(req: express.Request, res: express.Response) {
        const userId = req.user._id;

        const postData = {
            dialog: req.body.dialog,
            text: req.body.text,
            user: userId,
            attachments: req.body.attachments,
        };

        const message = new Message(postData);

        message.save().then((obj: any) => {
            obj.populate(['dialog', 'user', 'attachments'], (err: any, message: any) => {
                if (err) {
                    return res.status(500).json({
                        status: 'error',
                        message: err,
                    });
                }

                Dialog.findOneAndUpdate(
                    { _id: postData.dialog },
                    { lastMessage: message._id },
                    { upsert: true },
                    (err,) => {
                        if (err) {
                            return res.status(500).json({
                                status: 'error',
                                message: err,
                            });
                        }
                    });

                res.json(message);
                io.emit('MESSAGES:NEW_MESSAGE', obj);
            })
        }).catch((error: any) => {
            console.log(error);
            res.json(error);
        });
    }

    delete(req: express.Request, res: express.Response) {
        const id = req.query.id;
        const userId = req.user._id;

        console.log(id);
        Message.findById(id, (error: any, message: any) => {
            if (error || !message) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Сообщение не найдено'
                });
            }

            if (message.user.toString() === userId) {
                Message.findOne({ dialog: message.dialog }, {}, { sort: { 'created_at': -1 } }, (err, lastMessage) => {
                    if (err) {
                        return res.status(500).json({
                            status: 'error',
                            message: err,
                        });
                    }


                    Dialog.findById(message.dialog, (err: any, dialog: any) => {
                        if (err) {
                            return res.status(404).json({
                                status: 'error',
                                message: err,
                            });
                        }

                        dialog.lastMessage = lastMessage;
                        dialog.save();
                    });
                });

                message.remove();
                return res.json({
                    status: 'success',
                    message: 'Сообщение удалено'
                });
            } else {
                return res.status(403).json({
                    status: 'error',
                    message: 'Нет прав на это действие'
                });
            }
        });
    }
}

const messageCtrl = new MessageController();

export default messageCtrl;