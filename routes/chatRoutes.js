// const router = require('express').Router();
// const chatController = require('../controllers/chatController');
// const authMiddleware = require('../middleware/authGuard');

// router.post('/get_or_create_chat', authMiddleware.authGuard, chatController.getOrCreateChat);
// router.get('/get_all_chats', authMiddleware.authGuard, chatController.getAllChats);
// router.post('/send_message', authMiddleware.authGuard, chatController.sendMessage);

// module.exports = router;



// const router = require('express').Router();
// const chatController = require('../controllers/chatController');
// const authMiddleware = require('../middleware/authGuard');

// router.post('/get_or_create_chat', authMiddleware.authGuard, chatController.getOrCreateChat);
// router.get('/get_all_chats', authMiddleware.authGuard, chatController.getAllChats);
// router.post('/send_message', authMiddleware.authGuard, chatController.sendMessage);

// module.exports = router;


const express = require('express');
const protectRoute = require('../middleware/protectRoute'); // Adjust the path as necessary
const router = express.Router();
const chatController = require('../controllers/chatController');

// Define routes with protectRoute as middleware
router.post('/get_or_create_chat', protectRoute, chatController.getOrCreateChat);
router.get('/get_all_chats', protectRoute, chatController.getAllChats);
router.post('/send_message/:id', protectRoute, chatController.sendMessage);
router.get('/get_messages/:id', protectRoute, chatController.getMessages);

module.exports = router;