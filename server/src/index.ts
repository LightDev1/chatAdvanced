import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';

import { dialogRoutes, messageRoutes, userRoutes, fileRoutes } from './routes'
import { updateLastSeen, checkAuth } from './middlewares';
import createSocket from './core/socket';

import './core/db';

const app = express();
export const http = createServer(app);
export const io = createSocket(http);

app.use(express.json());
app.use(checkAuth);
app.use(updateLastSeen);

app.use(userRoutes);
app.use(dialogRoutes);
app.use(messageRoutes);
app.use(fileRoutes);

const PORT = process.env.PORT || 9999;

http.listen(PORT, () => {
    console.log(`Сервер был запущен на ${PORT} порте`);
});