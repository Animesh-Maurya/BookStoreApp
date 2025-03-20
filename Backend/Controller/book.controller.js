import {Book} from "../model/book.model.js";


export const getBook = async(req,res) => {
    try{
        const book= await Book.find();
        res.status(200).json(book);
    }catch(error){
        console.log("Error in fetching the book:"+ error);
        res.status(500).json(error);
    }
}

// controller is a place where our all the function 