import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

import { dialogRoutes, messageRoutes, userRoutes } from './routes'
import { updateLastSeen, checkAuth } from './middlewares';

import './core/db';

const app = express();
const http = createServer(app);
const io = new Server(http, {
    cors: {
        origin: "http://127.0.0.1:5500",
    }
});

dotenv.config();

app.use(express.json());
app.use(updateLastSeen);
app.use(checkAuth);

app.use(userRoutes);
app.use(dialogRoutes);
app.use(messageRoutes);

io.on("connection", socket => {
    console.log('Пользователь подключен', socket.id);

    socket.emit('test', 'You are connected to sockets');
});

const PORT = process.env.PORT || 9999;

http.listen(PORT, () => {
    console.log(`Сервер был запущен на ${PORT} порте`);
});