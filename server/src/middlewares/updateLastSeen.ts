import express from 'express';
import { User } from '../models';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    User.findOneAndUpdate(
        { _id: req.user._id, },
        {
            last_seen: new Date()
        },
        { new: true },
        () => { }
    );
    next();
};