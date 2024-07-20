// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema({
//     users: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     messages: [{
//         sender: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         },
//         content: {
//             type: String,
//             required: true
//         },
//         timestamp: {
//             type: Date,
//             default: Date.now
//         }
//     }]
// }, {
//     timestamps: true
// });

// const Chat = mongoose.model('Chat', chatSchema);
// module.exports = Chat;


const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    messages: [messageSchema]
});

module.exports = mongoose.model('Chat', chatSchema);