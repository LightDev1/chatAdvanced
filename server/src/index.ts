import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

import { userCtrl, dialogCtrl, messageCtrl } from './controllers';
import { updateLastSeen, checkAuth } from './middlewares';
import { LoginValidation } from './utils/validators'

const app = express();

app.use(express.json());
app.use(updateLastSeen);
app.use(checkAuth);

mongoose.connect('mongodb+srv://admin:123qwe@cluster0.gihrf.mongodb.net/chatdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.get('/user/:id', userCtrl.show);
app.post('/user/registration', userCtrl.create);
app.delete('/user/:id', userCtrl.delete);
app.post('/user/login', LoginValidation, userCtrl.login);

app.get('/dialogs', dialogCtrl.index);
app.delete('/dialogs/:id', dialogCtrl.delete);
app.post('/dialogs', dialogCtrl.create);

app.get('/messages', messageCtrl.index);
app.post('/messages', messageCtrl.create);
app.delete('/messages/:id', messageCtrl.delete);

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
    console.log(`Сервер был запущен на ${PORT} порте`);
});