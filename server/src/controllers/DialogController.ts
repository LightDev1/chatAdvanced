import express from 'express';
import { Dialog, Message } from '../models';
import { DialogModelInterface } from '../models/Dialog';

class DialogController {
    index(req: express.Request, res: express.Response) {
        const authorId: any = '611cfd8ba821bf26706b75ae';

        Dialog
            .find({ author: authorId })
            .populate(['author', 'partner'])
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
            author: req.body.author,
            partner: req.body.partner,
        };

        const dialog = new Dialog(postData);

        dialog.save().then((dialogObj: any) => {
            console.log('Диалог был создан');

            const message = new Message({
                dialog: dialogObj._id,
                text: req.body.text,
                user: req.body.author,
            });

            message.save().then(() => {
                res.json({
                    dialog: dialogObj,
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