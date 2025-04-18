// Import modules
import dotenv from "dotenv";
dotenv.config({ path: './.env'});
import express from "express";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.router.js";
import cartRoute from "./route/routes.cart.js";
import adminRoute from "./route/admin.route.js"
import chatRoutes from "./route/chatRoutes.js";
// import authRoute from "./route/auth.route.js"; // ✅ Ensure this file contains the googleLogin route
import cors from "cors";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// ✅ Fix: Remove problematic headers that may block OAuth requests
// ❌ Don't manually set `Cross-Origin-Opener-Policy` for OAuth
app.use(cors({ origin: "http://localhost:5173", credentials: true })); 
app.use(express.static("public"));

// MongoDB Connection
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODBURI;


class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true; // Marks it as a known, expected error
    }
}

try {
    mongoose.connect(URI);
    console.log("Database connected ...");
} catch (error) {
    console.log("Error connecting to the database:", error);
}

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image?.url], // assuming image is an object with url
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});


// Routes
app.use("/book/", bookRoute);
app.use("/user/", userRoute);
app.use("/cart/", cartRoute);
app.use("/admin/", adminRoute);
app.use("/chat/user/",chatRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
