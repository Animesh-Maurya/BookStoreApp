import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import oauth2Client from "../utils/googleConfig.js";
import cookieParser from "cookie-parser";
import axios from 'axios'
import { asyncHandler } from "../utils/asyncHandler.js";

const salt = bcrypt.genSaltSync(10);
const secret = "jn4k5n6n5nnn6oi4n";

const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 🔥 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔥 Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 🔥 Create user
    const createUser = await User.create({
      fullname,
      email,
      password: hashPassword,
    });

    // 🔥 Generate JWT Token
    const token = jwt.sign(
      { _id: createUser._id, email },
      secret,
      { expiresIn: "1h" }
    );

    // ✅ Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    console.log(res.cookies);
    

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createUser._id,
        fullname: createUser.fullname,
        email: createUser.email,
      },
      token, // ✅ Sending token in response as well (optional)
    });

  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const header = asyncHandler(async (req, res) => {
    console.log("req cookie  ", req.cookies);
    
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      return res.json(info);
    });
});

//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "1h" });

        // ✅ Set token as HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true, // 🔥 Prevents XSS attacks
            secure: false,
        });
        console.log(res.cookies);
        

        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email, // ✅ Keeping email for reference
            },
            token, // ✅ Sending token for frontend use (optional)
        });

    } catch (error) {
        console.error("Error in logging the user:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logoutUser = asyncHandler(async (req, res) => {
    try {
      // Clear the token cookie
      return res
        .cookie("token", "", {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json({ message: "Successfully logged out" });
    } catch (error) {
      res.status(500).json({ message: "Logout failed", error: error.message });
    }
  });

  const googleLogin = async (req, res) => {
    try {
      const { code } = req.query;
      if (!code) {
        return res.status(400).json({ message: "Authorization code is required" });
      }
  
      // Exchange code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
  
      // Fetch user info from Google
      const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
      );
      const { email, name } = userRes.data; // Use 'name' from Google
  
      // Check if user exists; if not, create one
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ fullname: name, email, role: "user" });
      }
  
      // Generate JWT Token
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "1h" });
  
      // Set token as an HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,                     // Prevents XSS
        secure: false,                   // Helps with CSRF issues
      });
  
      // (Note: console.log(req.cookies) here will likely show an empty object,
      // because cookies are sent in the request from the client, not on the response object.)
      console.log("Cookie set for google login.");
  
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
        token, // Optionally sent for frontend use
      });
    } catch (error) {
      console.error("Error in Google login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

const getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('cart')
      .populate('bought_books');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      role: user.role,
      cart: user.cart,
      bought_books: user.bought_books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {login,
    logoutUser,
    header,
    signup,
    getUserDashboard,
    googleLogin
}