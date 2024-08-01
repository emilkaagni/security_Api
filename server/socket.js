// const socketIo = require('socket.io');

// const initializeSocketServer = (server) => {
//     const io = socketIo(server, {
//         cors: {
//             origin: ["http://localhost:3000"],
//             methods: ['GET', 'POST'],
//         },
//     });

//     io.on('connection', (socket) => {
//         console.log('New client connected', socket.id);

//         socket.on('join_chat', (chatId) => {
//             socket.join(chatId);
//             console.log(`User joined chat: ${chatId}`);
//         });

//         socket.on('send_message', (message) => {
//             io.to(message.chatId).emit('receive_message', message);
//         });

//         socket.on('disconnect', () => {
//             console.log('Client disconnected', socket.id);
//         });
//     });

//     return io;
// };

// module.exports = initializeSocketServer;

const socketIo = require('socket.io');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

const initializeSocketServer = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: ["http://localhost:3000"],
            methods: ['GET', 'POST'],
        },
    });

    const getReceiverSocketId = (receiverId) => {
        // Implement logic to get the receiver's socket ID
        // This will depend on how you're managing connected users
    };

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        socket.on('join_chat', (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });

        socket.on('send_message', async (data) => {
            const { message, chatId } = data;
            const senderId = socket.userId; // Assuming socket.userId is set when the user connects

            try {
                const chat = await Chat.findById(chatId);

                if (!chat) {
                    console.log('Chat not found');
                    return;
                }

                const newMessage = new Message({
                    sender: senderId,
                    content: message,
                    chat: chat._id,
                });

                await newMessage.save();
                chat.messages.push(newMessage._id);
                await chat.save();

                const receiverSocketId = getReceiverSocketId(receiverId); // Function to get receiver's socket ID
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('newMessage', newMessage);
                }

                io.to(chatId).emit('message', newMessage);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });
    });

    return io;
};

module.exports = initializeSocketServer;