const Chat = require('../models/chatModel');

const getMessages = async (req, res) => {
    try {
        const messages = await Chat.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages' });
    }
};

module.exports = {
    getMessages
};