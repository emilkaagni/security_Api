// const userModel = require('../models/userModel')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const sendOtp = require('../service/sendOtp');
// const User = require('../models/userModel');
// // const multer = require('multer');
// const fs = require('fs');

// const createUser = async (req, res) => {
//     // 1. Check incomming data
//     console.log(req.body);

//     // 2. Destructure the incomming data
//     const { fname, lname, email, phone, username, password } = req.body;

//     // 3. Validate the data (if empty, stop the process and send res)
//     if (!fname || !lname || !email || !phone || !username || !password) {
//         // res.send("Please enter all fields!")
//         return res.json({
//             "success": false,
//             "message": "Please enter all fields!"
//         })
//     }

//     // 4. Error Handling (Try Catch)
//     try {
//         // 5. Check if the user is already registered
//         const existingUser = await userModel.findOne({ email: email })

//         // 5.1 if user found: Send response 
//         if (existingUser) {
//             return res.json({
//                 "success": false,
//                 "message": "User Already Exists!"
//             })
//         }

//         // Hashing/Encryption of the password
//         const randomSalt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, randomSalt)

//         // 5.2 if user is new:
//         const newUser = new userModel({
//             // Database Fields : Client's Value
//             fname: fname,
//             lname: lname,

//             email: email,
//             phone: phone,
//             username: username,
//             password: hashedPassword
//         })

//         // Save to database
//         await newUser.save()

//         // send the response
//         res.json({
//             "success": true,
//             "message": "User Created Successfully!"
//         })


//     } catch (error) {
//         console.log(error)
//         res.json({
//             "success": false,
//             "message": "Internal Server Error!"
//         })
//     }



// }

// // Login function
// const loginUser = async (req, res) => {

//     // Check incomming data
//     console.log(req.body)

//     // Destructuring
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//         return res.json({
//             "success": false,
//             "message": "Please enter all fields!"
//         })
//     }


//     // try catch
//     try {

//         // find user (email)
//         const user = await userModel.findOne({ email: email })
//         // found data : firstName, lastname, email, password

//         // not found (error message)
//         if (!user) {
//             return res.json({
//                 "success": false,
//                 "message": "User does not exists!"
//             })
//         }
//         console.log('User Password:', user.password); // Debugging line
//         console.log('Entered Password:', password); // Debugging line

//         // Compare password (bcrypt)
//         const isValidPassword = await bcrypt.compare(password, user.password)

//         // not valid (error)
//         if (!isValidPassword) {
//             return res.json({
//                 "success": false,
//                 "message": "Password is incorrect!"
//             })
//         }

//         // token (Generate - user Data + KEY)
//         const token = await jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET
//         )

//         // response (token, user data)
//         res.json({
//             "success": true,
//             "message": "User Logginned Successul!",
//             "token": token,
//             "userData": user
//         })

//     } catch (error) {
//         console.log(error)
//         return res.json({
//             "success": false,
//             "message": "Internal Server Error!"
//         })
//     }

// }

// // Forgot password by using phone number
// const forgotPassword = async (req, res) => {
//     const { phone } = req.body;

//     if (!phone) {
//         return res.status(400).json({
//             'success': false,
//             'message': 'Provide your phone number!'
//         })
//     }

//     try {

//         // finding user
//         const user = await userModel.findOne({ phone: phone })
//         if (!user) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': 'User Not Found!'
//             })
//         }

//         // generate random 6 digit otp
//         const otp = Math.floor(100000 + Math.random() * 900000)

//         // generate expiry date
//         const expiryDate = Date.now() + 360000;

//         // save to database for verification
//         user.resetPasswordOTP = otp;
//         user.resetPasswordExpires = expiryDate;
//         await user.save();

//         // send to registered phone number
//         const isSent = await sendOtp(phone, otp)
//         if (!isSent) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': 'Error Sending OTP Code!'
//             })
//         }

//         // if success
//         res.status(200).json({
//             'success': true,
//             'message': 'OTP Send Successfully!'
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             'success': false,
//             'message': 'Server Error!'
//         })
//     }
// }

// // Verify otp and set new password
// const verifyOtpAndSetPassword = async (req, res) => {

//     // get data
//     const { phone, otp, newPassword } = req.body;
//     if (!phone || !otp || !newPassword) {
//         return res.status(400).json({
//             'success': false,
//             'message': 'Required fields are missing!'
//         })
//     }

//     try {
//         const user = await userModel.findOne({ phone: phone })
//         console.log(user.resetPasswordOTP)

//         // Verify otp
//         if (user.resetPasswordOTP != otp) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': 'Invalid OTP!'
//             })
//         }

//         if (user.resetPasswordExpires < Date.now()) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': 'OTP Expired!'
//             })
//         }

//         // password hash
//         // Hashing/Encryption of the password
//         const randomSalt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(newPassword, randomSalt)

//         // update to databse
//         user.password = hashedPassword;
//         await user.save()

//         // response
//         res.status(200).json({
//             'success': true,
//             'message': 'OTP Verified and Password Updated!'
//         })


//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             'success': false,
//             'message': 'Server Error!'
//         })
//     }

// }

// const getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId).select('-password');
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }
//         res.json({ success: true, user });
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// };





// // const updateUserProfile = async (req, res) => {
// //     const { fname, lname, email, phone, username } = req.body;
// //     try {

// //         let user = await User.findById(req.params.userId);
// //         if (!user) {
// //             return res.status(404).json({ success: false, message: 'User not found' });
// //         }



// //         user.fname = fname || user.fname;
// //         user.lname = lname || user.lname;
// //         user.email = email || user.email;
// //         user.phone = phone || user.phone;
// //         user.username = username || user.username;

// //         await user.save();
// //         res.json({ success: true, user });
// //     } catch (error) {
// //         console.error('Error updating user profile:', error);
// //         res.status(500).json({ success: false, message: 'Server error', error: error.message });
// //     }
// // };


// // // const uploadProfilePicture = async (req, res) => {
// // //     if (!req.file) {
// // //         return res.status(400).json({ success: false, message: 'No file uploaded' });
// // //     }

// // //     try {
// // //         const user = await User.findById(req.user.id);
// // //         if (!user) {
// // //             return res.status(404).json({ success: false, message: 'User not found' });
// // //         }

// // //         user.profilePicture = req.file.path;
// // //         await user.save();

// // //         res.status(200).json({ success: true, message: 'Profile picture uploaded successfully', user });
// // //     } catch (error) {
// // //         console.error('Error uploading profile picture:', error);
// // //         res.status(500).json({ success: false, message: 'Server error', error: error.message });
// // //     }
// // // };





// // // Configure multer storage
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, 'public/profile_pictures');
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, `${Date.now()}-${file.originalname}`);
// //     }
// // });

// // const upload = multer({ storage });

// // const uploadProfilePicture = async (req, res) => {
// //     if (!req.file) {
// //         return res.status(400).json({ success: false, message: 'No file uploaded' });
// //     }

// //     try {

// //         const user = await User.findById(req.user.id);
// //         if (!user) {
// //             return res.status(404).json({ success: false, message: 'User not found' });
// //         }

// //         user.profileImage = req.file.path;
// //         await user.save();

// //         res.status(200).json({ success: true, message: 'Profile picture uploaded successfully', profileImage: user.profileImage });
// //     } catch (error) {
// //         console.error('Error uploading profile picture:', error);
// //         res.status(500).json({ success: false, message: 'Server error', error: error.message });
// //     }
// // };




// const updateUserProfile = async (req, res) => {
//     const { fname, lname, email, phone, username } = req.body;
//     try {
//         let user = await User.findById(req.params.userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         user.fname = fname || user.fname;
//         user.lname = lname || user.lname;
//         user.email = email || user.email;
//         user.phone = phone || user.phone;
//         user.username = username || user.username;

//         if (req.files && req.files.profileImage) {
//             const { profileImage } = req.files;
//             const imageName = `${Date.now()}-${profileImage.name}`;
//             const imageUploadPath = path.join(__dirname, `../public/profile_pictures/${imageName}`);
//             await profileImage.mv(imageUploadPath);
//             user.profileImage = imageName;

//             // If user already has a profile picture, delete the old one
//             if (user.profileImage) {
//                 const oldImagePath = path.join(__dirname, `../public/profile_pictures/${user.profileImage}`);
//                 fs.unlinkSync(oldImagePath);
//             }
//         }

//         await user.save();
//         res.json({ success: true, user });
//     } catch (error) {
//         console.error('Error updating user profile:', error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// };

// const uploadProfilePicture = async (req, res) => {
//     if (!req.files || !req.files.profileImage) {
//         return res.status(400).json({ success: false, message: 'No file uploaded' });
//     }

//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         const { profileImage } = req.files;
//         const imageName = `${Date.now()}-${profileImage.name}`;
//         const imageUploadPath = path.join(__dirname, `../public/profile_pictures/${imageName}`);

//         await profileImage.mv(imageUploadPath);
//         user.profileImage = imageName;

//         await user.save();

//         res.status(200).json({ success: true, message: 'Profile picture uploaded successfully', profileImage: user.profileImage });
//     } catch (error) {
//         console.error('Error uploading profile picture:', error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// };


// // exporting
// module.exports = {
//     createUser,
//     loginUser,
//     forgotPassword,
//     verifyOtpAndSetPassword,
//     getUserProfile,
//     updateUserProfile,
//     uploadProfilePicture
// }


const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendOtp = require('../service/sendOtp');
const User = require('../models/userModel');
const fs = require('fs');

const createUser = async (req, res) => {
    const { fname, lname, email, phone, username, password } = req.body;

    if (!fname || !lname || !email || !phone || !username || !password) {
        return res.json({
            success: false,
            message: "Please enter all fields!"
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "User Already Exists!"
            });
        }

        const randomSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, randomSalt);

        const newUser = new User({
            fname,
            lname,
            email,
            phone,
            username,
            password: hashedPassword
        });

        await newUser.save();

        res.json({
            success: true,
            message: "User Created Successfully!"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields!"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist!"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect!"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            success: true,
            message: "User Logged in Successfully!",
            token,
            userData: user
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const forgotPassword = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({
            success: false,
            message: 'Provide your phone number!'
        });
    }

    try {
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User Not Found!'
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiryDate = Date.now() + 360000;

        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = expiryDate;
        await user.save();

        const isSent = await sendOtp(phone, otp);
        if (!isSent) {
            return res.status(400).json({
                success: false,
                message: 'Error Sending OTP Code!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'OTP Sent Successfully!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
};

const verifyOtpAndSetPassword = async (req, res) => {
    const { phone, otp, newPassword } = req.body;

    if (!phone || !otp || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing!'
        });
    }

    try {
        const user = await User.findOne({ phone });

        if (user.resetPasswordOTP != otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP!'
            });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'OTP Expired!'
            });
        }

        const randomSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, randomSalt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'OTP Verified and Password Updated!'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    const { fname, lname, email, phone, username } = req.body;
    try {
        let user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.fname = fname || user.fname;
        user.lname = lname || user.lname;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.username = username || user.username;

        if (req.files && req.files.profileImage) {
            const { profileImage } = req.files;
            const imageName = `${Date.now()}-${profileImage.name}`;
            const imageUploadPath = path.join(__dirname, `../public/profile_pictures/${imageName}`);
            await profileImage.mv(imageUploadPath);

            // If user already has a profile picture, delete the old one
            if (user.profileImage) {
                const oldImagePath = path.join(__dirname, `../public/profile_pictures/${user.profileImage}`);
                fs.unlinkSync(oldImagePath);
            }

            user.profileImage = imageName;
        }

        await user.save();
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const uploadProfilePicture = async (req, res) => {
    if (!req.files || !req.files.profileImage) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { profileImage } = req.files;
        const imageName = `${Date.now()}-${profileImage.name}`;
        const imageUploadPath = path.join(__dirname, `../public/profile_pictures/${imageName}`);

        await profileImage.mv(imageUploadPath);

        // If user already has a profile picture, delete the old one
        if (user.profileImage) {
            const oldImagePath = path.join(__dirname, `../public/profile_pictures/${user.profileImage}`);
            fs.unlinkSync(oldImagePath);
        }

        user.profileImage = imageName;
        await user.save();

        res.status(200).json({ success: true, message: 'Profile picture uploaded successfully', profileImage: user.profileImage });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    forgotPassword,
    verifyOtpAndSetPassword,
    getUserProfile,
    updateUserProfile,
    uploadProfilePicture
};