import mongoose from "mongoose";

const chatModel=mongoose.Schema(
    {
        chatName: {type:String,trim:true}, 
        isPending:{type:Boolean,default:false}, // this is for the Admin that admin is not granted the grp
        pendingUsers:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],

        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        }], 
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Admin",
        },
        location: {
            type: String,
            require: true,
        },
        book:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
            require: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        
    },
    {
        timestamp:true, // menas every time a new chat is going to be there it creates a time stamp for that
    }
);

export const Chat = mongoose.model("Chat", chatModel);