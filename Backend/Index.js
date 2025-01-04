//to use the import method we had changed the setting of the 
// package.json and added a new field of (type that is "module"). 

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.router.js";

import cors from "cors";
const app=express();

app.use(cors()); //this is we are using beacuse we can not directly use the axios in the out frontend because our front
//end run on different server and our backend serve on different server..
app.use(express.json()); //this is a middleware we are doing this beacuse when we are taking the data of the login from postman it is
// in the from of json so we need to parse it
dotenv.config();

const PORT=process.env.PORT || 4001;
const URI=process.env.MONGODBURI;
// connect to mongoDB
try{
    
    mongoose.connect(URI);
    console.log("Data Base connected ...");
}catch(error){
    console.log("Error in connecting to the data base:" +error);
}

//defining routes
app.use("/book",bookRoute);
app.use("/user",userRoute);
app.listen(PORT,()=>{
    console.log(`Server is listening on the port ${PORT}`);
})
