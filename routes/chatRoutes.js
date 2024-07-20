// const router = require('express').Router();
// const chatController = require('../controllers/chatController');
// const authMiddleware = require('../middleware/authGuard');

// router.post('/get_or_create_chat', authMiddleware.authGuard, chatController.getOrCreateChat);
// router.get('/get_all_chats', authMiddleware.authGuard, chatController.getAllChats);
// router.post('/send_message', authMiddleware.authGuard, chatController.sendMessage);

// module.exports = router;



const router = require('express').Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authGuard');

router.post('/get_or_create_chat', authMiddleware.authGuard, chatController.getOrCreateChat);
router.get('/get_all_chats', authMiddleware.authGuard, chatController.getAllChats);
router.post('/send_message', authMiddleware.authGuard, chatController.sendMessage);

module.exports = router;