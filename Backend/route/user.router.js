import express from "express";
import {signup,login, getUserDashboard, googleLogin, header, logoutUser} from "../Controller/user.controller.js"; //if we are using the named export instead of the default export then we have to use {} fro the that
import { getAdminDashboard } from "../Controller/admin.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/google", googleLogin);
router.route('/header').get(isAuthenticated,header);
router.route("/logout").post(logoutUser);


router.get('/dashboard', isAuthenticated, async (req, res) => {
  if (req.user.role === 'admin') {
    await getAdminDashboard(req, res);
  } else {
    await getUserDashboard(req, res);
  }
});

export default router;