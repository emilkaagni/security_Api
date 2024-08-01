// const Chat = require('../models/chatModel');
// const User = require('../models/userModel');

// // Create or get a chat between two users
// const getOrCreateChat = async (req, res) => {
//     const { userId1, userId2 } = req.body;

//     try {
//         let chat = await Chat.findOne({ users: { $all: [userId1, userId2] } });

//         if (!chat) {
//             chat = new Chat({
//                 users: [userId1, userId2]
//             });
//             await chat.save();
//         }

//         res.status(200).json({ success: true, chat });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to create or get chat', error });
//     }
// };

// // Get all chats for a user
// const getAllChats = async (req, res) => {
//     const userId = req.user.id;

//     try {
//         const chats = await Chat.find({ users: userId })
//             .populate('users', 'name avatar')
//             .populate('messages.sender', 'name avatar');
//         res.status(200).json({ success: true, chats });
//     } catch (error) {
//         console.error('Error fetching chats:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch chats', error });
//     }
// };

// // Send a message in a chat
// const sendMessage = async (req, res) => {
//     const { chatId, senderId, content } = req.body;

//     try {
//         const chat = await Chat.findById(chatId);

//         if (!chat) {
//             return res.status(404).json({ success: false, message: 'Chat not found' });
//         }

//         const message = {
//             sender: senderId,
//             content,
//             timestamp: new Date()
//         };

//         chat.messages.push(message);
//         await chat.save();

//         res.status(200).json({ success: true, chat });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to send message', error });
//     }
// };

// module.exports = {
//     getOrCreateChat,
//     getAllChats,
//     sendMessage
// };


// const Chat = require('../models/chatModel');
// const User = require('../models/userModel');

// // Create or get a chat between two users
// const getOrCreateChat = async (req, res) => {
//     const { userId1, userId2 } = req.body;

//     try {
//         let chat = await Chat.findOne({ users: { $all: [userId1, userId2] } });

//         if (!chat) {
//             chat = new Chat({
//                 users: [userId1, userId2]
//             });
//             await chat.save();
//         }

//         res.status(200).json({ success: true, chat });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to create or get chat', error });
//     }
// };

// // Get all chats for a user
// const getAllChats = async (req, res) => {
//     const userId = req.user.id;

//     try {
//         const chats = await Chat.find({ users: userId })
//             .populate('users', 'fname lname username')
//             .populate('messages.sender', 'fname lname username');
//         res.status(200).json({ success: true, chats });
//     } catch (error) {
//         console.error('Error fetching chats:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch chats', error });
//     }
// };

// // Send a message in a chat
// const sendMessage = async (req, res) => {
//     const { chatId, senderId, content } = req.body;

//     try {
//         const chat = await Chat.findById(chatId);

//         if (!chat) {
//             return res.status(404).json({ success: false, message: 'Chat not found' });
//         }

//         const message = {
//             sender: senderId,
//             content,
//             timestamp: new Date()
//         };

//         chat.messages.push(message);
//         await chat.save();

//         res.status(200).json({ success: true, chat });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to send message', error });
//     }
// };

// module.exports = {
//     getOrCreateChat,
//     getAllChats,
//     sendMessage
// };

const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

exports.getOrCreateChat = async (req, res) => {
    const { userId1, userId2 } = req.body;
    try {
        let chat = await Chat.findOne({
            users: { $all: [userId1, userId2] },
        }).populate('users messages');

        if (!chat) {
            chat = new Chat({
                users: [userId1, userId2],
            });
            await chat.save();
        }
        res.status(200).json({ success: true, chat });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

exports.getAllChats = async (req, res) => {
    const { userId } = req.query;
    try {
        const chats = await Chat.find({ users: userId }).populate('users messages');
        res.status(200).json({ success: true, chats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

exports.sendMessage = async (req, res) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id; // Assuming req.user is populated by auth middleware

    try {
        let chat = await Chat.findOne({
            users: { $all: [senderId, receiverId] },
        });

        if (!chat) {
            chat = new Chat({
                users: [senderId, receiverId],
            });
            await chat.save();
        }

        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            content: message,
            chat: chat._id,
        });

        await newMessage.save();
        chat.messages.push(newMessage._id);
        await chat.save();

        res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
        console.log('Error in sendMessage controller: ', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getMessages = async (req, res) => {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    try {
        const chat = await Chat.findOne({
            users: { $all: [senderId, userToChatId] },
        }).populate('messages');

        if (!chat) return res.status(200).json([]);

        const messages = chat.messages;
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.log('Error in getMessages controller: ', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};