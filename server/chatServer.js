const socketIo = require('socket.io');

const initializeSocketServer = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: ["http://localhost:3000"],
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        socket.on('join_chat', (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });

        socket.on('send_message', (message) => {
            io.to(message.chatId).emit('receive_message', message);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });
    });

    return io;
};

module.exports = initializeSocketServer;