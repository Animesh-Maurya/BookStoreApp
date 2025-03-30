import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
    password: {
      type: String,
      required: true,
    },
    createdBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    paid_books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    customers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    
    // Contact Form Messages
    contactMessages: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);
