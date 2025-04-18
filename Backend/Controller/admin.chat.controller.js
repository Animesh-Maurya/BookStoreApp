import asyncHandler from "express-async-handler";
import { Chat } from "../model/chatModal.js";
import { Book } from "../model/book.model.js";
import { User } from "../model/user.model.js";
import { Admin } from "../model/admin.model.js";

const accessAdminChat = asyncHandler(async (req, res) => {
    //console.log("Printing the admin->",req.admin);
  const adminId = req.admin._id;
  //console.log("AdminId ->", adminId);

  try {
    const chats = await Chat.find({ groupAdmin: adminId })
      .populate("pendingUsers", "-password") // exclude password field
      .populate("users", "-password")         // exclude password field
      .populate("latestMessage")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name email",  // if you want extra sender info
        },
      })
      .populate("book"); // optional if you want book details

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching admin chats ->", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin chats",
    });
  }
});

// here i am going to write the logic for the addition of the user to the
// group
const AddToGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;
  
  if (!userId || !chatId) {
    res.status(400);
    throw new Error("userId and chatId are both required");
  }
  
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      // Remove from pendingUsers
      $pull: { pendingUsers: userId },
      // Add to users (won't duplicate if already present)
      $addToSet: { users: userId },
    },
    { new: true } // return the updated document
  )
    .populate("pendingUsers", "-password")
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("book")
    .populate("latestMessage")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "fullName profilePic email",
      },
    });

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  console.log("Updated chat after adding->",updatedChat);

  res.status(200).json(updatedChat);
});

const RemoveFromGroup = asyncHandler(async(req,res)=>{

  const {userId, chatId} = req.body;

  if (!userId || !chatId) {
    res.status(400);
    throw new Error("userId and chatId are both required");
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      // Remove from pendingUsers
      $pull: { users: userId },
      // Add to users (won't duplicate if already present)
      $addToSet: { pendingUsers: userId },
    },
    { new: true } // return the updated document
  )
    .populate("pendingUsers", "-password")
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("book")
    .populate("latestMessage")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "fullName profilePic email",
      },
    });

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat not found");
    }

    console.log("Updated chat after adding->",updatedChat);

    res.status(200).json(updatedChat);

})

export {accessAdminChat, AddToGroup, RemoveFromGroup};