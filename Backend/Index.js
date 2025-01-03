//to use the import method we had changed the setting of the 
// package.json and added a new field of (type that is "module"). 

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import cors from "cors";
const app=express();

app.use(cors());

dotenv.config();

const PORT=process.env.PORT || 4001;
const URI=process.env.MONGODBURI;
// connect to mongoDB
try{

    //we need this because we are using the mongodb compass
    mongoose.connect(URI);
    console.log("Data Base connected ...");
}catch(error){
    console.log("Error in connecting to the data base:" +error);
}

//defining routes
app.use("/book",bookRoute);

app.listen(PORT,()=>{
    console.log(`Server is listening on the port ${PORT}`);
})
