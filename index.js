// // Imporing the packages (express)
// const express = require('express');
// const connectDatabase = require('./database/database');
// const dotenv = require('dotenv')
// const cors = require('cors')
// const acceptFormData = require('express-fileupload')
// const chatServer = require('./server/chatServer');

// // Creating an express app
// const app = express();

// // Configure Cors Policy
// const corsOptions = {
//     origin: true,
//     credentials: true,
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOptions))


// // Express Json Config
// app.use(express.json())

// // config formdata
// app.use(acceptFormData())

// // dotenv Configuration
// dotenv.config()

// // Connecting to database
// connectDatabase()

// // static
// app.use(express.static('public'))

// // Defining the port
// const PORT = process.env.PORT;

// // Making a test endpoint
// // Endpoints : POST, GET, PUT, DELETE
// app.get('/test', (req, res) => {
//     res.send("Test API is Working!...")
// })

// // http://localhost:5500/test


// // configuring Routes of User
// app.use('/api/user', require('./routes/userRoutes'))

// // for product
// app.use('/api/product', require('./routes/productRoutes'))
// // app.use('/api/product', require('./routes/productRoutes'))

// // app.use('/api/ads', adRoutes)

// app.use('/api/chat', require('./routes/chatRoutes'));

// // http://localhost:5500/api/user/create




// // Starting the server
// const server = app.listen(PORT, () => {
//     console.log(`Server is Running on port ${PORT}!`)
// })


// // Integrating chat server with the existing HTTP server
// chatServer(server);

// // cccccccccccccccccccccccccccccccccc

// // Imporing the packages (express)
// const express = require('express');
// const connectDatabase = require('./database/database');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const http = require('http');
// const initializeSocketServer = require('./server/chatServer');

// const acceptFormData = require('express-fileupload');

// // Creating an express app
// const app = express();

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.io server
// const io = initializeSocketServer(server);

// // Configure Cors Policy
// const corsOptions = {
//     origin: true,
//     credentials: true,
//     optionSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// // Express Json Config
// app.use(express.json());

// // config formdata
// app.use(acceptFormData());

// // dotenv Configuration
// dotenv.config();

// // Connecting to database
// connectDatabase();

// // static
// app.use(express.static('public'));

// // Defining the port
// const PORT = process.env.PORT;

// // Making a test endpoint
// // Endpoints : POST, GET, PUT, DELETE
// app.get('/test', (req, res) => {
//     res.send('Test API is Working!...');
// });

// // http://localhost:5500/test

// // configuring Routes of User
// app.use('/api/user', require('./routes/userRoutes'));

// // for product
// app.use('/api/product', require('./routes/productRoutes'));

// // chat routes
// app.use('/api/chat', require('./routes/chatRoutes'));

// // Starting the server
// server.listen(PORT, () => {
//     console.log(`Server is Running on port ${PORT}!`);
// });



const express = require('express');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const chatRoutes = require('./routes/chatRoutes');

const acceptFormData = require('express-fileupload');

// Creating an express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io server
const io = socketio(server);

// Configure Cors Policy
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Express Json Config
app.use(express.json());

// config formdata
app.use(acceptFormData());

// dotenv Configuration
dotenv.config();

// Connecting to database
connectDatabase();

// static
app.use(express.static('public'));

// Defining the port
const PORT = process.env.PORT;

// Making a test endpoint
// Endpoints : POST, GET, PUT, DELETE
app.get('/test', (req, res) => {
    res.send('Test API is Working!...');
});

// http://localhost:5500/test

// configuring Routes of User
app.use('/api/user', require('./routes/userRoutes'));

// for product
app.use('/api/product', require('./routes/productRoutes'));

// chat routes
app.use('/api/chat', chatRoutes);

// Socket.io integration
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    socket.on('sendMessage', async ({ chatId, senderId, content }) => {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) {
                return;
            }
            const message = { sender: senderId, content };
            chat.messages.push(message);
            await chat.save();
            io.to(chatId).emit('message', message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });
});

// Starting the server
server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}!`);
});