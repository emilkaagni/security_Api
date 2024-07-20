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

exports.getOrCreateChat = async (req, res) => {
    const { userId1, userId2 } = req.body;
    try {
        let chat = await Chat.findOne({ users: { $all: [userId1, userId2] } });
        if (!chat) {
            chat = await Chat.create({ users: [userId1, userId2] });
        }
        res.status(200).json({ success: true, chat });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create or get chat', error });
    }
};

exports.getAllChats = async (req, res) => {
    const userId = req.user.id;
    try {
        const chats = await Chat.find({ users: userId }).populate('users', 'username').populate('messages.sender', 'username');
        res.status(200).json({ success: true, chats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch chats', error });
    }
};

exports.sendMessage = async (req, res) => {
    const { chatId, senderId, content } = req.body;
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }
        const message = { sender: senderId, content };
        chat.messages.push(message);
        await chat.save();
        res.status(200).json({ success: true, chat });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message', error });
    }
};