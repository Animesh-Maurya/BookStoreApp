import { Admin } from "../model/admin.model.js";
import {Book} from "../model/book.model.js";
import { User } from "../model/user.model.js";
import { uploadMultipleFiles } from "../utils/cloudinary.js";


//user controllers
const getBook = async(req,res) => {
    try{
        const book= await Book.find();
        res.status(200).json(book);
    }catch(error){
        console.log("Error in fetching the book:"+ error);
        res.status(500).json(error);
    }
}

const getUserBoughtBooks = async (req, res) => {
  try {
      // console.log("reques ", req.user);
      
      const  userId  = req.user?._id;
      const user = await User.findById(userId).populate("bought_books").populate("cart");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // console.log("reached here in book controller");

      res.status(200).json(user.bought_books);
  } catch (error) {
      console.error("Error fetching user bought books:", error);
      res.status(500).json({ message: "Server error while fetching bought books" });
  }
};



//admin controllers
const createBook = async (req, res) => {
    try {
      console.log("reques.user", req?.admin);
      
      const { name, price, category, title, author } = req.body;
  
      if (!name || !price || !title || !author) {
        return res.status(400).json({ message: "All required fields must be filled!" });
      }
  
      if (!req.files || (!req.files.image && !req.files.file)) {
        return res.status(400).json({ message: "Image and file are required!" });
      }
  
      // Upload files to Cloudinary
      const uploadedFiles = await uploadMultipleFiles([
        req.files.image?.[0]?.path, // Image file
        req.files.file?.[0]?.path, // Document file
      ]);
  
      // Extract URLs (Ensure null-safe access)
      const imageUrl = uploadedFiles[0]?.secure_url || "";
      const fileUrl = uploadedFiles[1]?.secure_url || "";
  
      // Determine file type for images
      const allowedImageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
      let imageType = "other";
  
      if (req.files.image?.[0]) {
        const uploadedImageType = req.files.image[0].originalname.split(".").pop().toLowerCase();
        if (allowedImageTypes.includes(uploadedImageType)) {
          imageType = uploadedImageType;
        }
      }
  
      // Determine file type for documents
      const allowedFileTypes = ["pdf", "doc", "docx", "zip"];
      let fileType = "other";
  
      if (req.files.file?.[0]) {
        const uploadedFileType = req.files.file[0].originalname.split(".").pop().toLowerCase();
        if (allowedFileTypes.includes(uploadedFileType)) {
          fileType = uploadedFileType;
        }
      }
  
      // Ensure both file and image have URLs
      if (!imageUrl) {
        return res.status(400).json({ message: "Invalid or missing image file." });
      }
      if (!fileUrl) {
        return res.status(400).json({ message: "Invalid or missing document file." });
      }
  
      // Create book object
      const newBook = new Book({
        name,
        price,
        category,
        title,
        author,
        image: {
          url: imageUrl,
          fileType: imageType,
        },
        File: {
          url: fileUrl,
          fileType,
        },
      });
  
      await newBook.save();

      if (!req.admin) {
          return res.status(403).json({ message: "Unauthorized: Admin not found." });
      }

      const admin = await Admin.findById(req.admin._id);
      if (!admin) {
          return res.status(404).json({ message: "Admin not found." });
      }

      admin.createdBooks.push(newBook._id);
      await admin.save();
  
      res.status(201).json({ message: "📚 Book added successfully!", book: newBook });
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};
  
  
export{
    getBook,
    createBook,
    getUserBoughtBooks,
}

// controller is a place where our all the function 