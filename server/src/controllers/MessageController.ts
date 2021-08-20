import express from 'express';
import { Message } from '../models';
import { MessageModelInterface } from '../models/Message';

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
        const userId = '60de0f1495ccb71194d1cbe9';

        const postData = {
            dialog: req.body.dialog,
            text: req.body.text,
            user: userId,
        };

        const message = new Message(postData);

        message.save().then((obj: any) => {
            console.log('Диалог был создан');
            res.json(obj);
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