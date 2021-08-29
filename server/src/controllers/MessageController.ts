import express from 'express';
import { Message, Dialog } from '../models';
import { MessageModelInterface } from '../models/Message';
import { io } from '../index';

class MessageController {
    index(req: express.Request, res: express.Response) {
        const dialogId: any = req.query.dialog;

        Message
            .find({ dialog: dialogId })
            .populate(['dialog'])
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
        };

        const message = new Message(postData);

        message.save().then((obj: any) => {
            obj.populate('dialog', (err: any, message: any) => {
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

                res.json(obj);
                io.emit('MESSAGES:NEW_MESSAGE', obj);
            })
        }).catch((error: any) => {
            console.log(error);
            res.json(error);
        });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        Message.findOneAndRemove({ _id: id })
            .then((message) => {
                if (!message) {
                    return res.status(404).json({
                        message: 'Сообщение не найдено'
                    });
                }
                res.json({ message: `Сообщение было удалено` });
            }).catch((e: any) => {
                res.status(500).json(e);
            });
    }
}

const messageCtrl = new MessageController();

export default messageCtrl;