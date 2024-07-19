const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Chat = require('../models/chatModel');
const dotenv = require('dotenv');

dotenv.config();

const chatServer = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000", // Ensure this matches your frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('chat message', async (msg) => {
            console.log('message: ' + msg);

            const chatMessage = new Chat({ message: msg });
            await chatMessage.save();

            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

module.exports = chatServer;