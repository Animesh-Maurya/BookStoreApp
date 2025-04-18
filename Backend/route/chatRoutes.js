import express from "express";
import {accessChat, allGroup, fetchChats} from "../Controller/chatController.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js"
const router = express.Router();

// this is for the chats if it is 
 router.route("/").get(isAuthenticated, allGroup).post(isAuthenticated,accessChat);
router.route("/fetch").get(isAuthenticated,fetchChats);

export default router;
