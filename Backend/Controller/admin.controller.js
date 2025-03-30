import { Admin } from "../model/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import { User } from "../model/user.model.js";
import { Book } from "../model/book.model.js";


const salt = bcrypt.genSaltSync(10);
const secret = "jn4k5n6n5nnn6oi4n";

const getAdminDashboard = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id)
      .populate('createdBooks')
      .populate('paid_books')
      .populate('customers');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({
      role: admin.role,
      createdBooks: admin.createdBooks,
      paidBooks: admin.paid_books,
      customers: admin.customers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signupAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 🔥 Check if user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔥 Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 🔥 Create user
    const createUser = await Admin.create({
      fullname,
      email,
      password: hashPassword,
    });

    // 🔥 Generate JWT Token
    const token = jwt.sign(
      { _id: createUser._id, email },
      secret,
      { expiresIn: "5h" }
    );

    // ✅ Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    console.log(res.cookies);
    

    res.status(201).json({
      message: "User created successfully",
      admin: {
        _id: createUser._id,
        fullname: createUser.fullname,
        email: createUser.email,
        role:"user"
      },
      token, // ✅ Sending token in response as well (optional)
    });

  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllPendingBooks = async (req, res) => {
  try {
    // Fetch all users and populate their pending_books
    const users = await User.find().populate("pending_books");

    // Extract pending books for each user
    const pendingBooksData = users.map(user => ({
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      pending_books: user.pending_books,
    }));

    res.status(200).json({ pendingBooksData });
  } catch (error) {
    console.error("Error fetching pending books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const approveBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ message: "User ID and Book ID are required." });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        // Remove book from cart if present
        user.cart = user.cart.filter(id => id.toString() !== bookId);

        // Remove book from pending_books if present
        user.pending_books = user.pending_books.filter(id => id.toString() !== bookId);

        // Add book to bought_books if not already present
        if (!user.bought_books.includes(bookId)) {
            user.bought_books.push(bookId);
        }

        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: "Book approved successfully.", user });
    } catch (error) {
        console.error("Error approving book:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


export {
    getAdminDashboard,
    signupAdmin,
    getAllPendingBooks,
    approveBook
}
