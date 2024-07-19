const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Define your chat routes here
router.get('/messages', chatController.getMessages);

module.exports = router;