import asyncHandler from "express-async-handler";
import { Chat } from "../model/chatModal.js";
import { Book } from "../model/book.model.js";
import { User } from "../model/user.model.js";
import { Admin } from "../model/admin.model.js";

const accessChat = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user._id;
  const location = req.user.location;

  if (!bookId) {
    console.log("Book Id is not provided");
    return res.sendStatus(400);
  }

  // 1️⃣  Is the user already in pendingUsers?
  let chat = await Chat.findOne({
    location,
    book: bookId,
    pendingUsers: userId,
  })
    .populate("pendingUsers", "-password")
    .populate("groupAdmin", "-password");

  if (chat) {
    console.log("User is already pending in this chat");
    return res.status(200).json(chat);
  }

  // 2️⃣  Is the user already in users?
  chat = await Chat.findOne({
    location,
    book: bookId,
    users: userId,
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .populate("groupAdmin", "-password");

  if (chat) {
    // also populate the sender of latestMessage
    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "fullName profilePic email",
    });
    console.log("User is already in users for this chat");
    return res.status(200).json(chat);
  }

  // 3️⃣  Does a chat for this book/location exist at all?
  chat = await Chat.findOne({ location, book: bookId });
  if (chat) {
    // if yes, add them to pendingUsers
    chat.pendingUsers.push(userId);
    await chat.save();
    console.log("Added user to pendingUsers of existing chat");
    return res.status(200).json(chat);
  }

  // 4️⃣  No chat exists — create a new one
  const admin = await Admin.findOne({ location });
  if (!admin) {
    res.status(404);
    throw new Error("No admin found for this location");
  }

  // create the chat
  let newChat = await Chat.create({
    chatName: "BookChat",
    isPending: true,
    pendingUsers: [userId],
    groupAdmin: admin._id,
    users: [admin._id],       // initially only admin in the group
    book: bookId,
    location,
  });

  // re-fetch it with the populations we want
  newChat = await Chat.findById(newChat._id)
    .populate("groupAdmin", "-password")
    .populate("pendingUsers", "-password");

  console.log("Created new chat group ->", newChat);
  return res.status(201).json(newChat);
});


// here this is the code for the searching the 
// /chat?search

const allGroup = asyncHandler(async (req, res) => {
    const searchQuery = req.query.search;
    console.log("I am printing the query->", searchQuery);
    // Ensure user is logged in
    const userId = req.user?._id;
    if (!userId) {
        res.status(401);
        throw new Error("User not authenticated");
    }

    // Get the logged-in user
    const user = await User.findById(userId).populate("bought_books");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Extract bought_books
    const boughtBooks = user.bought_books;
    console.log("Printing the bougntBooks->",boughtBooks);

    // Filter based on search query (case-insensitive)
    let filteredBooks = boughtBooks;
    // if(filteredBooks.size() === 0){
    //     res.status(404).json([]);
    //     // means i am sending the empty book so that front end .slice function will did not give any error
    // }

    if (searchQuery) {
        const keywordRegex = new RegExp(searchQuery, "i"); // case-insensitive
        filteredBooks = boughtBooks.filter(book =>
            keywordRegex.test(book.name)
        );
    }
    console.log("Filtered Books->",filteredBooks);

    res.status(200).json(filteredBooks);
});

// here is the function for the fetching the chats for the currently
// loggedin user

const fetchChats = asyncHandler(async (req,res)=>{
    try{
        Chat.find({
            $or: [
                    { users: { $elemMatch: { $eq: req.user._id } } },
                    { pendingUsers: { $elemMatch: { $eq: req.user._id } } }
                ]
        })
        .populate("book")
        .populate("users", "-password")
        .populate("pendingUsers", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
        results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "fullName profilePic email", // or "name pic email" depending on your User model
        });

        console.log("Logged User chats->",results);
        res.status(200).send(results);
        })
    } catch(error){
       res.status(400);
        throw new Error("Error in fetching the user->",error.message);

    }
});


export {accessChat,allGroup,fetchChats};