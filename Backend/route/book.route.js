import express from "express";
import {createBook, getBook, getUserBoughtBooks} from "../Controller/book.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdminAuthenticated, isAuthenticated } from "../middlewares/auth.middleware.js";

const router= express.Router();

router.get("/",getBook);


router.post(        //admin-route
    "/create-book",
    isAdminAuthenticated,
    upload.fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]),
    createBook
);
router.get("/bought-books/user",isAuthenticated, getUserBoughtBooks);   //user route


export default router;