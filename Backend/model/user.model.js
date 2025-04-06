import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true, // ✅ Fixed `require` to `required`
    },
    email: {
        type: String,
        required: true,
        unique: true, // ✅ Ensures no duplicate emails
    },
    role: {
        type: String,
        required: true,
        default: "user", // ✅ Sets default role
    },
    password: {
        type: String,
        required: true,
    },
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
    favourites:[
        {
            type:Schema.Types.ObjectId,
            ref:"Book"
        }
    ],
    bought_books: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
}, { timestamps: true }); // ✅ Fixed spelling error

export const User = mongoose.model("User", userSchema);
