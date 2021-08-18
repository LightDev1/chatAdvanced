import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

import { userCtrl } from './controllers';

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://admin:123qwe@cluster0.gihrf.mongodb.net/chatdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.get('/user/:id', userCtrl.show);
app.post('/user/registration', userCtrl.create);
app.delete('/user/:id', userCtrl.delete);

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
    console.log(`Сервер был запущен на ${PORT} порте`);
});