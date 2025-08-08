import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({
            success: false,
            message: "No token provided!"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if it's a user token (has userId)
        if (!decoded.userId) {
            return res.json({
                success: false,
                message: "Invalid user token!"
            });
        }

        // Verify user exists
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found!"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.json({
            success: false,
            message: "Invalid Token!"
        });
    }
}
