import express from 'express';
import { User } from '../models'
import { UserModelInterface } from '../models/User';
import { createJWToken } from '../utils';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

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

    getMe(req: express.Request, res: express.Response) {
        const id: any = req.user._id;
        User.findById(id, (error: any, user: UserModelInterface) => {
            if (error || !user) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                });
            }
            res.json(user);
        });
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

    async login(req: express.Request, res: express.Response) {
        try {
            const postData = {
                email: req.body.email,
                password: req.body.password,
            };

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const user = await User.findOne({ email: postData.email });

            if (!user) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                });
            }

            if (bcrypt.compareSync(postData.password, user.password)) {
                const token = createJWToken(user);

                res.json({
                    status: 'Success',
                    token,
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'Неверный пароль или email'
                });
            }

        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Произошла ошибка, попробуйте позднее',
            });
        }
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