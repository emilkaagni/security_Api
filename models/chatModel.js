const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
});

module.exports = mongoose.model('Chat', chatSchema);


// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
//     content: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now }
// });

// const chatSchema = new mongoose.Schema({
//     users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
//     messages: [messageSchema]
// });

// module.exports = mongoose.model('Chat', chatSchema);