import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
const auth = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
    }       
 catch (error) {
  return res.status(401).json({ message: "Invalid token" })

        console.error("Authentication error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export default auth;
