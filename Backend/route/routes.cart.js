import { addPendingBook, getUserCart } from "../Controller/cart.controller.js";
import { isAdminAuthenticated, isAuthenticated } from "../middlewares/auth.middleware.js";
import express from "express";

const router= express.Router()

router.get("/:userId", getUserCart);
router.post("/add-pending-book", addPendingBook);

export default router;