import mongoose from "mongoose";

const messageModel= mongoose.Schema(
    {
        sender: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
        content: {type:String,trim:true},
        chat:{type:mongoose.Schema.Types.ObjectId, ref:"Chat"},
    },
    {
        timeStamp:true,
    }
);

// in the scema in the required filed in place of just saying it to be only true we can pass an array
// like required:[true,"message when this field is not there"]


export const Message = mongoose.model("Message", messageModel);
