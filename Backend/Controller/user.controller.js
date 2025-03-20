import {User} from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const salt = bcrypt.genSaltSync(10);
const secret = "jn4k5n6n5nnn6oi4n";

const signup = async(req,res) => {
    try{
        const {fullname,email,password} = req.body;
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const hashPassword= await bcrypt.hash(password,10);
        const createUser = new User({
            fullname:fullname,
            email:email,
            password:hashPassword,
        });
       await createUser.save();
        res.status(201).json({message: "User created Successfully",
            user:{
                _id:createUser._id,
                fullname:createUser.fullname,
                email:createUser.email
            }
        });
    }catch(error){
        console.log("Error in Signin of the user :"+ error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

// login 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id }, 
            secret, 
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            message: "Login successful",
            token, // Send token to the client
            user: {
                _id: user._id,
                fullname: user.fullname,
                // email: user.email,
            },
        });
    } catch (error) {
        console.error("Error in logging the user:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {login,
    signup,

}