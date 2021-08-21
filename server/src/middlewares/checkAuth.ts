import express from "express";
import { verifyJWToken } from '../utils';

export default (req: any, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.token;

    verifyJWToken(token).then((user) => {
        req.user = user;
        next();
    }).catch(() => {
        res.status(403).json({ message: 'Неверный токен' })
    });
};