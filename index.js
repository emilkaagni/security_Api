// Imporing the packages (express)
const express = require('express');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv')
const cors = require('cors')
const acceptFormData = require('express-fileupload')
const chatServer = require('./server/chatServer');

// Creating an express app
const app = express();

// Configure Cors Policy
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))


// Express Json Config
app.use(express.json())

// config formdata
app.use(acceptFormData())

// dotenv Configuration
dotenv.config()

// Connecting to database
connectDatabase()

// static
app.use(express.static('public'))

// Defining the port
const PORT = process.env.PORT;

// Making a test endpoint
// Endpoints : POST, GET, PUT, DELETE
app.get('/test', (req, res) => {
    res.send("Test API is Working!...")
})

// http://localhost:5500/test


// configuring Routes of User
app.use('/api/user', require('./routes/userRoutes'))

// for product
app.use('/api/product', require('./routes/productRoutes'))
// app.use('/api/product', require('./routes/productRoutes'))

// app.use('/api/ads', adRoutes)

app.use('/api/chat', require('./routes/chatRoutes'));

// http://localhost:5500/api/user/create




// Starting the server
const server = app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}!`)
})


// Integrating chat server with the existing HTTP server
chatServer(server);