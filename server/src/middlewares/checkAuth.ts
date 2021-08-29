import express from "express";
import { verifyJWToken } from '../utils';

export default (req: any, res: express.Response, next: express.NextFunction) => {
    if (req.path === '/user/login' || req.path === '/user/registration' || req.path === '/user/verify') {
        return next();
    }

    const token = req.headers.token;

    verifyJWToken(token).then((user: any) => {
        req.user = user.data._doc;
        next();
    }).catch(() => {
        res.status(403).json({ message: 'Неверный токен' })
    });
};