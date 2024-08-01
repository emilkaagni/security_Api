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
const socketHandler = require('./server/socket'); // Import socketHandler
const chatRoutes = require('./routes/chatRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const acceptFormData = require('express-fileupload');

dotenv.config();

// Create an express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
socketHandler(server); // Call the socketHandler function with the server

// Configure CORS policy
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(acceptFormData());

// Connect to the database
connectDatabase();

// Static files
app.use(express.static('public'));

// Define the port
const PORT = process.env.PORT || 5500;

// Test endpoint
app.get('/test', (req, res) => {
    res.send('Test API is Working!...');
});

// Configure routes

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/chat', chatRoutes);
app.use('/api/review', reviewRoutes);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}!`);
});

// const express = require('express');
// const connectDatabase = require('./database/database');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const http = require('http');
// const socketio = require('socket.io');
// const chatRoutes = require('./routes/chatRoutes');
// const socketIo = require('socket.io')

// const acceptFormData = require('express-fileupload');

// // Creating an express app
// const app = express();

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.io server
// // const io = socketio(server);

// // Configure Cors Policy
// const corsOptions = {
//     origin: true,
//     credentials: true,
//     optionSuccessStatus: 200
// };

// const reviewRoutes = require('./routes/reviewRoutes');
// app.use('/api/review', reviewRoutes);


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
// app.use('/api/chat', chatRoutes);

// const io = socketio(server, {
//     cors: {
//         origin: ["http://localhost:3000"],
//         methods: ['GET', 'POST']
//     }
// });


// // Socket.io integration
// io.on('connection', (socket) => {
//     console.log('New client connected');
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
//     socket.on('sendMessage', async ({ chatId, senderId, content }) => {
//         try {
//             const chat = await Chat.findById(chatId);
//             if (!chat) {
//                 return;
//             }
//             const message = { sender: senderId, content };
//             chat.messages.push(message);
//             await chat.save();
//             io.to(chatId).emit('message', message);
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     });
// }


// );

// // Starting the server
// server.listen(PORT, () => {
//     console.log(`Server is Running on port ${PORT}!`);
// });