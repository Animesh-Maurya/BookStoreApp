// middleware/auth.js
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const secret = "jn4k5n6n5nnn6oi4n";

export const isAuthenticated = async (req, res, next) => {
  console.log("reached here \n");
  
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ message: "Authentication required" });
        }
        console.log("reached step 2");
        
        const token = req.cookies.token;
        const decoded = jwt.verify(token, secret);

        req.user = await User.findById(decoded._id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
