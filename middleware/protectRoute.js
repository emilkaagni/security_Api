const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as necessary

const protectRoute = async (req, res, next) => {
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
        const user = await User.findById(decodedUserData.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found, authentication failed!"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token or not authenticated!",
            error: error.message
        });
    }
};

module.exports = protectRoute;