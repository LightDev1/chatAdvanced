import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';

import { dialogRoutes, messageRoutes, userRoutes } from './routes'
import { updateLastSeen, checkAuth } from './middlewares';
import createSocket from './core/socket';

import './core/db';

const app = express();
export const http = createServer(app);
export const io = createSocket(http);

dotenv.config();

app.use(express.json());
app.use(updateLastSeen);
app.use(checkAuth);

app.use(userRoutes);
app.use(dialogRoutes);
app.use(messageRoutes);

const PORT = process.env.PORT || 9999;

http.listen(PORT, () => {
    console.log(`Сервер был запущен на ${PORT} порте`);
});