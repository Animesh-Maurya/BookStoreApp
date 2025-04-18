import express from "express";
import { accessAdminChat, AddToGroup, RemoveFromGroup } from "../Controller/admin.chat.controller.js";
import { isAdminAuthenticated } from "../middlewares/auth.middleware.js"
const router = express.Router();

// this is for the chats if it is 
 router.route("/").get(isAdminAuthenticated, accessAdminChat)//.post(isAuthenticated,accessChat);
 router.route("/addToGroup").post(AddToGroup)
 router.route("/removeFromGroup").post(RemoveFromGroup);
// router.route("/fetch").get(fetchChats);

export default router;