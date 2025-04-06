import express from "express";
import {signup,login, getUserDashboard, googleLogin, header, logoutUser, AdminLogin, addToCart, getBoughtBooks, addToFavourites, getFavourites, removeFromCart, completePayment, getUserById, getFavorites, removeFavorite} from "../Controller/user.controller.js"; //if we are using the named export instead of the default export then we have to use {} fro the that
import { getAdminDashboard } from "../Controller/admin.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/google", googleLogin);
router.route("/admin/login").post( AdminLogin);
router.route('/header').get(isAuthenticated,header);
router.route("/logout").post(logoutUser);
router.post("/add-to-cart", addToCart);

router.get('/dashboard', isAuthenticated, async (req, res) => {
  if (req.user.role === 'admin') {
    await getAdminDashboard(req, res);
  } else {
    await getUserDashboard(req, res);
  }
});
router.post("/favourites/:userId", addToFavourites);
router.post("/remove-favorite", removeFavorite);
router.get("/bought-books/:userId", getBoughtBooks);
router.get("/favourites/:userId", getFavourites);
router.post("/remove/:userId", removeFromCart);
router.post("/complete-payment", completePayment);
router.get("/:id", getUserById);

router.get("/favorites/:userId", getFavorites);

export default router;