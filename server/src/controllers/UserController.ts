import express from 'express';
import { User } from '../models'
import { UserModelInterface } from '../models/User';

class UserController {
    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        User.findById(id, (error: any, user: UserModelInterface) => {
            if (error) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                });
            }
            res.json(user);
        });
    }

    getMe() {
        //Потом
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
            confirmed_hash: '23ev3kvk4k43kv3kv',
        };

        const user = new User(postData);

        user.save().then((obj: any) => {
            console.log('Пользователь был создан');
            res.json(obj);
        }).catch((error: any) => {
            console.log(error);
            res.json(error);
        });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        User.findOneAndRemove({ _id: id })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({
                        message: 'Пользователь не найден'
                    });
                }
                res.json({ message: `Пользователь ${user.fullname} был удален` });
            }).catch((e: any) => {
                res.status(500).json(e);
            });
    }
}

const userCtrl = new UserController();

export default userCtrl;