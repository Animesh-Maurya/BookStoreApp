import express from "express";
import {accessChat, allGroup} from "../Controller/chatController.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js"
const router = express.Router();

// this is for the chats if it is 
 router.route("/").get(isAuthenticated, allGroup).post(isAuthenticated,accessChat);
// router.route("/fetch").get(fetchChats);

export default router;
