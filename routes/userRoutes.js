import express from "express";
import {
  login,
  register,
  logout,
  getMyprofile,
  changepassword,
  updateprofile,
  resetpassword,
  forgetpassword,
  deleteprofile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router
  .route("/me")
  .get(isAuthenticated, getMyprofile)
  .delete(isAuthenticated, deleteprofile);

router.route("/changepassword").post(isAuthenticated, changepassword);

router.route("/updateprofile").put(isAuthenticated, updateprofile);

router.route("/forgetpassword").post(forgetpassword);

router.route("/resetpassword/:token").put(resetpassword);

export default router;
