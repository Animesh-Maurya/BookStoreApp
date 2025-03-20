import mongoose,{Schema} from "mongoose";

const adminSchema= Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdBooks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    //i'll just make a query of it for unpaid books by asking the books which are in createdBooks but not in paid_books
    paid_books:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    customers:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

},
{timestamps: true}
);

export const Admin=mongoose.model('Admin', adminSchema);

