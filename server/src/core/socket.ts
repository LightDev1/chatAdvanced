import { Server } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

export default (http: Server) => {
    const io = new SocketServer(http, {
        cors: {
            origin: "http://127.0.0.1:5500",
        }
    });

    io.on("connection", (socket: Socket) => {
        console.log('Пользователь подключен', socket.id);

        socket.on('DIALOGS:JOIN', (dialogId: string) => {
            socket.data.dialogId = dialogId;
            socket.join(dialogId);
            console.log(dialogId);
        });

        socket.on('DIALOGS:TYPING', (obj: any) => {
            socket.to(obj.dialogId).emit('DIALOGS:TYPING', obj);
        });
    });

    return io;
};
