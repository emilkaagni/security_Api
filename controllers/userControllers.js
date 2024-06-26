const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    // 1. Check incomming data
    console.log(req.body);

    // 2. Destructure the incomming data
    const { fname, lname, email, phone, username, password } = req.body;

    // 3. Validate the data (if empty, stop the process and send res)
    if (!fname || !lname || !email ||!phone || !username || !password) {
        // res.send("Please enter all fields!")
        return res.json({
            "success": false,
            "message": "Please enter all fields!"
        })
    }

    // 4. Error Handling (Try Catch)
    try {
        // 5. Check if the user is already registered
        const existingUser = await userModel.findOne({ email: email })

        // 5.1 if user found: Send response 
        if (existingUser) {
            return res.json({
                "success": false,
                "message": "User Already Exists!"
            })
        }

        // Hashing/Encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, randomSalt)

        // 5.2 if user is new:
        const newUser = new userModel({
            // Database Fields : Client's Value
            fname: fname,
            lname: lname,

            email: email,
            phone: phone,
            username: username,
            password: hashedPassword
        })

        // Save to database
        await newUser.save()

        // send the response
        res.json({
            "success": true,
            "message": "User Created Successfully!"
        })


    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Internal Server Error!"
        })
    }



}

// Login function
const loginUser = async (req, res) => {

    // Check incomming data
    console.log(req.body)

    // Destructuring
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.json({
            "success": false,
            "message": "Please enter all fields!"
        })
    }


    // try catch
    try {

        // find user (email)
        const user = await userModel.findOne({ email: email })
        // found data : firstName, lastname, email, password

        // not found (error message)
        if (!user) {
            return res.json({
                "success": false,
                "message": "User does not exists!"
            })
        }

        // Compare password (bcrypt)
        const isValidPassword = await bcrypt.compare(password, user.password)

        // not valid (error)
        if (!isValidPassword) {
            return res.json({
                "success": false,
                "message": "Password is incorrect!"
            })
        }

        // token (Generate - user Data + KEY)
        const token = await jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        )

        // response (token, user data)
        res.json({
            "success": true,
            "message": "User Logginned Successul!",
            "token": token,
            "userData": user
        })

    } catch (error) {
        console.log(error)
        return res.json({
            "success": false,
            "message": "Internal Server Error!"
        })
    }

}


// exporting
module.exports = {
    createUser,
    loginUser
}