const express = require("express");
const connectDatabase = require("./database/database");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketHandler = require("./server/socket"); // Import socketHandler
const chatRoutes = require("./routes/chatRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const acceptFormData = require("express-fileupload");
const https = require("https");
const fs = require("fs");

dotenv.config();

// Create an express app
const app = express();

// // Create HTTP server
// const server = http.createServer(app);

// Create HTTPS server
const server = https.createServer(
  // sslOptions,
  app
);
//
const sslOptions = {
  key: fs.readFileSync("/Users/emilbasnyat/server.key"),
  cert: fs.readFileSync("/Users/emilbasnyat/server.cert"),
};

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
app.use(express.static("public"));

// Define the port
const PORT = process.env.PORT || 5500;

// Test endpoint
app.get("/test", (req, res) => {
  res.send("Test API is Working!...");
});

// Configure routes

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/chat", chatRoutes);
app.use("/api/review", reviewRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}!`);
});
