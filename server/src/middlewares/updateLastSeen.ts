import express from 'express';
import { User } from '../models';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    User.findOneAndUpdate(
        { _id: '611cfd8ba821bf26706b75ae', },
        {
            $set: {
                last_seen: new Date()
            }
        },
        { new: true },
        () => { }
    );
    next();
};