import mongoose,{Schema} from "mongoose";

const userSchema=Schema({
    fullname:{
        type:String,
        require:true,
    },
    email :{
        type:String,
        require:true,
    },
    role :{
        type:String,
        required:true,
    },
    password:{
        type:String,
        require:true,
    },
    cart:[
        {
            type:Schema.Types.ObjectId,
            ref:'Book'
        }
    ],
    bought_books:[
        {
            type:Schema.Types.ObjectId,
            ref:'Book'
        }
    ],
},
    {timestaps: true}
);

export const User=mongoose.model("User",userSchema);
