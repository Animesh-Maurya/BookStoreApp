import mongoose,{Schema} from "mongoose";

const bookSchema = Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
    },
    image: {
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    File:
    {
        url: {
        type: String,
        required: [true, 'File URL is required'],
        },
        fileType: {
        type: String,
        enum: ['pdf', 'doc', 'docx', 'zip', 'other'],
        default: 'other',
        },
    },
},
{timestamps: true}

);
export const Book = mongoose.model("Book",bookSchema);

