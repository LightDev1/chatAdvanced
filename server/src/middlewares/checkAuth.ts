import express from "express";
import { verifyJWToken } from '../utils';

export default (req: any, res: express.Response, next: express.NextFunction) => {
    if (req.path === '/user/login' || req.path === '/user/registration') {
        return next();
    }

    const token = req.headers.token;

    verifyJWToken(token).then((user) => {
        req.user = user;
        next();
    }).catch(() => {
        res.status(403).json({ message: 'Неверный токен' })
    });
};