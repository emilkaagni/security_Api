// const jwt = require('jsonwebtoken')

// const authGuard = (req, res, next) => {

//     // check incomming data
//     console.log(req.headers) // pass 

//     // get authorization data from headers
//     const authHeader = req.headers.authorization;

//     // check or validate
//     if (!authHeader) {
//         return res.status(400).json({
//             success: false,
//             message: "Auth Header not found!"
//         })
//     }


//     // Split the data (Format : 'Bearer token-sdfg') - only token
//     const token = authHeader.split(' ')[1]

//     // if token not found : stop the process (res)
//     if (!token || token === '') {
//         return res.status(400).json({
//             success: false,
//             message: "Token not found!"
//         })
//     }

//     // verify
//     try {
//         const decodeUserData = jwt.verify(token, process.env.JWT_SECRET)
//         req.user = decodeUserData; // user info : id only
//         next()

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Not Authenticated!"
//         })
//     }
//     // if verified : next (function in controller)
//     // not verified : not auth

// }

// // Admin Guard
// const adminGuard = (req, res, next) => {

//     // check incomming data
//     console.log(req.headers) // pass 

//     // get authorization data from headers
//     const authHeader = req.headers.authorization;

//     // check or validate
//     if (!authHeader) {
//         return res.status(400).json({
//             success: false,
//             message: "Auth Header not found!"
//         })
//     }


//     // Split the data (Format : 'Bearer token-sdfg') - only token
//     const token = authHeader.split(' ')[1]

//     // if token not found : stop the process (res)
//     if (!token || token === '') {
//         return res.status(400).json({
//             success: false,
//             message: "Token not found!"
//         })
//     }

//     // verify
//     try {
//         const decodeUserData = jwt.verify(token, process.env.JWT_SECRET)
//         req.user = decodeUserData; // id, isAdmin
//         if (!req.user.isAdmin) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Permission Denied!"
//             })
//         }
//         next()

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "Not Authenticated!"
//         })
//     }
//     // if verified : next (function in controller)
//     // not verified : not auth

// }




// module.exports = {
//     authGuard,
//     adminGuard
// }





const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
    console.log('Headers received:', req.headers); // Log all headers received

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Authorization header must be provided and formatted correctly!"
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found!"
        });
    }

    try {
        const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decodedUserData); // Log decoded token
        req.user = decodedUserData;
        console.log('req.user set as:', req.user); // Log req.user
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error); // Log error
        res.status(401).json({
            success: false,
            message: "Invalid token or not authenticated!",
            error: error.message
        });
    }
};

module.exports = {
    authGuard
};


// Admin Guard
const adminGuard = (req, res, next) => {

    // check incomming data
    console.log(req.headers) // pass 

    // get authorization data from headers
    const authHeader = req.headers.authorization;

    // check or validate
    if (!authHeader) {
        return res.status(400).json({
            success: false,
            message: "Auth Header not found!"
        })
    }


    // Split the data (Format : 'Bearer token-sdfg') - only token
    const token = authHeader.split(' ')[1]

    // if token not found : stop the process (res)
    if (!token || token === '') {
        return res.status(400).json({
            success: false,
            message: "Token not found!"
        })
    }

    // verify
    try {
        const decodeUserData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodeUserData; // id, isAdmin
        if (!req.user.isAdmin) {
            return res.status(400).json({
                success: false,
                message: "Permission Denied!"
            })
        }
        next()

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Not Authenticated!"
        })
    }
    // if verified : next (function in controller)
    // not verified : not auth

}

module.exports = {
    authGuard,
    adminGuard
};
