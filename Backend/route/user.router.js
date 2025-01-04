import express from "express";
import {signup,login} from "../Controller/user.controller.js"; //if we are using the named export instead of the default export then we have to use {} fro the that

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);

export default router;