const router = require('express').Router();
const userController = require('../controllers/userControllers')

// Creating user registration route
// (postman)
// http://localhost:5500/api/user/create
// {
//     "name" : "yourname",
//     "email" : "your@gmail.com",
//     "password" : "098765"
// }


// Creating user registration route
router.post('/create', userController.createUser)

// login routes
router.post('/login', userController.loginUser)

// homepage route
router.get('/', (req, res) => {
    res.send("Homepage")
})
router.post('/forgot_password', userController.forgotPassword)
// verify otp and set password
router.post('/verify_otp', userController.verifyOtpAndSetPassword)


// controller (Export) - Routes (inport) - use - (index.js)

// exporting the router
module.exports = router