// const router = require('express').Router();
// const userController = require('../controllers/userControllers')
// const authGuard = require('../middleware/authGuard');


// // Creating user registration route
// // (postman)
// // http://localhost:5500/api/user/create
// // {
// //     "name" : "yourname",
// //     "email" : "your@gmail.com",
// //     "password" : "098765"
// // }


// // Creating user registration route
// router.post('/create', userController.createUser)

// // login routes
// router.post('/login', userController.loginUser)

// // homepage route
// router.get('/', (req, res) => {
//     res.send("Homepage")
// })
// router.post('/forgot_password', userController.forgotPassword)
// // verify otp and set password
// router.post('/verify_otp', userController.verifyOtpAndSetPassword)

// router.get('/:userId', authGuard, getUserProfile);
// router.put('/:userId', authGuard, updateUserProfile);


// // controller (Export) - Routes (inport) - use - (index.js)

// // exporting the router
// module.exports = router


const router = require('express').Router();
const userController = require('../controllers/userControllers');
const { authGuard } = require('../middleware/authGuard');

// Creating user registration route
router.post('/create', userController.createUser);

// Login route
router.post('/login', userController.loginUser);

// Forgot password route
router.post('/forgot_password', userController.forgotPassword);

// Verify OTP and set password route
router.post('/verify_otp', userController.verifyOtpAndSetPassword);

// Get user profile route
router.get('/:userId', authGuard, userController.getUserProfile);

// Update user profile route
router.put('/:userId', authGuard, userController.updateUserProfile);

module.exports = router;
