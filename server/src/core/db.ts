import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://admin:123qwe@cluster0.gihrf.mongodb.net/chatdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});