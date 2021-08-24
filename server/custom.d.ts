import { Request } from "express";
import { UserModelInterface } from './src/models/User';

declare global {
    namespace Express {
        export interface Request {
            user: UserModelInterface;
        }
    }
}