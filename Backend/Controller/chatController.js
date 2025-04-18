import asyncHandler from "express-async-handler";
import { Chat } from "../model/chatModal.js";
import { Book } from "../model/book.model.js";
import { User } from "../model/user.model.js";
import { Admin } from "../model/admin.model.js";

const accessChat = asyncHandler(async(req,res)=>{
    const { bookId } = req.body; 
    console.log("BookId->",bookId);

    if(!bookId){
        console.log("Book Id is not found");
        return res.sendStatus(400);
    }

    // now you have to do that the given book id matched with 
    // given book id
    var isChat = await Chat.find({
        location: req.user.location,
        book: bookId,
        pendingUsers:{$eleMatch: {$eq: req.user._id}},
    })
    .populate("pendingUsers","-password");
    
    if(isChat){
        console.log("This User is in the pending");
        res.send(isChat);
    }

    isChat = await Chat.find({
        location:req.user.location,
        book: bookId,
        users:{$elematch: {$eq: req.user._id}},
    })
    .populate("users","-password")
    .populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select: "fullName profilePic email",
    })
    if(isChat){
        console.log("There is previous chat");
        res.send(isChat);
    }else{

        try{
            let isChat = await Chat.findOne({
            location: req.user.location,
            book: bookId,
            });

            if(isChat){
                isChat.pendingUsers.push(req.user._id);
                await isChat.save();
                return res.status(200).json(isChat);
            }
        } catch(error){
            res.status(400);
            throw new Error("error in adding to the group->",error.message);
        }
       
       
        try{

            const admin = await Admin.find({
            location: req.user.location,
            });

            var chatData= {
            chatName:"BookChat",
            isPending:false,
            pendingUsers:[req.user._id],
            groupAdmin: admin._id,
            book:bookId,
            location:req.user.location,
        }

        console.log("Group is created->",chatData);
        const fullChat = await Chat.findOne({_id:chatData._id}).populate("groupAdmin","-password");
        console.log("FullChat->",fullChat);
        res.status(200).send(fullChat);
        } catch(error){
            res.status(400);
            throw new Error("Error in Adding to the group->",error.message);
        }
        
        
    }
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

    if (searchQuery) {
        const keywordRegex = new RegExp(searchQuery, "i"); // case-insensitive
        filteredBooks = boughtBooks.filter(book =>
            keywordRegex.test(book.name)
        );
    }
    console.log("Filtered Books->",filteredBooks);

    res.status(200).json(filteredBooks);
});


export {accessChat,allGroup};